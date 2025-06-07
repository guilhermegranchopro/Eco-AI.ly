import React, { useState, useMemo, useEffect, useRef } from 'react';
import clsx from 'clsx';
import { Info, DollarSign, Leaf, ArrowUp, ArrowDown } from 'lucide-react';
import * as Slider from '@radix-ui/react-slider';
import { motion, AnimatePresence } from 'framer-motion';
import { Pool } from 'pg';
import type { GetStaticProps } from 'next';

interface GPU {
  id: number;
  type: string;
  provider: string;
  region: string;
  price: number;
  carbonIntensity: number;
  efficiency: 'high' | 'medium' | 'low';
}

export const getStaticProps: GetStaticProps = async () => {
  try {
    const pool = new Pool({
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT || 5432),
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      ssl: { rejectUnauthorized: false },
    });

    const client = await pool.connect();
    const result = await client.query(`
      SELECT 
        id,
        type,
        provider,
        region,
        price,
        carbon_intensity AS "carbonIntensity",
        efficiency
      FROM gpus
    `);
    client.release();

    return {
      props: {
        gpus: result.rows,
      },
      revalidate: 43200,
    };
  } catch (error) {
    console.error('Error in getStaticProps:', error);  // 🛠️ print real error
    throw error;  // Let Next.js still show error page but now you see logs
  }
};

const getEfficiencyTag = (efficiency: string) =>
  clsx(
    'inline-flex items-center justify-center text-[10px] font-medium px-1.5 py-0.5 rounded-full',
    {
      high: 'bg-green-50 text-green-700 ring-1 ring-green-600/20',
      medium: 'bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20',
      low: 'bg-red-50 text-red-700 ring-1 ring-red-600/10',
    }[efficiency]
  );

// Conditional info text based on percentages
const ScoreWeightCard = ({ pricePercent, carbonPercent }: { pricePercent: number; carbonPercent: number }) => {
  let infoText: React.ReactNode;
  if (pricePercent === 100) {
    infoText = <span>You value the price <span className="font-semibold text-indigo-800">{100}%</span></span>;
  } else if (carbonPercent === 100) {
    infoText = <span>You value the carbon intensity <span className="font-semibold text-indigo-800">{100}%</span></span>;
  } else if (carbonPercent > pricePercent) {
    const factor = (carbonPercent / pricePercent).toFixed(2);
    infoText = (
      <span>
        You value the carbon intensity <span className="font-semibold text-indigo-800">{factor}×</span> more than price
      </span>
    );
  } else {
    const factor = (pricePercent / carbonPercent).toFixed(2);
    infoText = (
      <span>
        You value the price <span className="font-semibold text-indigo-800">{factor}×</span> more than carbon
      </span>
    );
  }

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-indigo-50 via-white to-green-50 border border-indigo-200 rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-shadow">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Info className="w-5 h-5 text-indigo-600" />
        <h2 className="text-sm uppercase tracking-wide text-indigo-600 font-semibold">
          Move slider to balance price vs carbon
        </h2>
      </div>
      <p className="mb-6 text-center text-gray-700">
        {infoText}
      </p>
      <div className="flex justify-center items-center space-x-16">
        <div className="flex flex-col items-center space-y-0 -ml-3">
          <div className="flex items-center space-x-2">
            <DollarSign className="w-6 h-6 text-blue-600" />
            <span className="text-2xl font-bold text-blue-800">{pricePercent}%</span>
          </div>
          <span className="text-sm text-gray-600 uppercase">Price</span>
        </div>
        <div className="flex flex-col items-center space-y-0">
          <div className="flex items-center space-x-2">
            <Leaf className="w-6 h-6 text-green-600" />
            <span className="text-2xl font-bold text-green-800">{carbonPercent}%</span>
          </div>
          <span className="text-sm text-gray-600 uppercase">Carbon</span>
        </div>
      </div>
    </div>
  );
};

const GPUComparisonTable = ({ gpus }: { gpus: GPU[] }) => {
  const carbonWeight = 1;
  const initialPriceWeight = 3.5;
  const initialPercent = Math.round((initialPriceWeight / (initialPriceWeight + carbonWeight)) * 100);
  const [pricePercent, setPricePercent] = useState(initialPercent);
  const carbonPercent = 100 - pricePercent;

  const [deltaMap, setDeltaMap] = useState<Record<number, number>>(
    () => Object.fromEntries(gpus.map(gpu => [gpu.id, 0])));
  const [prevRankMap, setPrevRankMap] = useState<Record<number,number>>({});

  const prices = gpus.map(g => g.price);
  const carbons = gpus.map(g => g.carbonIntensity);
  const minPrice = useMemo(() => Math.min(...prices), [prices]);
  const maxPrice = useMemo(() => Math.max(...prices), [prices]);
  const minCarbon = useMemo(() => Math.min(...carbons), [carbons]);
  const maxCarbon = useMemo(() => Math.max(...carbons), [carbons]);

  const gpusWithScores = useMemo(() => {
    const scored = gpus.map(gpu => {
      const priceRange = maxPrice - minPrice;
      const carbonRange = maxCarbon - minCarbon;

      const normPrice = priceRange === 0
        ? 1
        : (maxPrice - gpu.price) / priceRange;
      const normCarbon = carbonRange === 0
        ? 1
        : (maxCarbon - gpu.carbonIntensity) / carbonRange;

      const priceScore = pricePercent * normPrice;
      const carbonScore = carbonPercent * normCarbon;
      const totalScore = Math.round(priceScore + carbonScore);

      return { ...gpu, score: totalScore };
    });
    return scored.sort((a, b) => b.score - a.score);
  }, [pricePercent, carbonPercent, minPrice, maxPrice, minCarbon, maxCarbon]);

  const rankRef = useRef<Record<number,number>>({});
  const freshRankMap = useMemo(() => {
    const m: Record<number,number> = {};
    gpusWithScores.forEach((gpu, idx) => { m[gpu.id] = idx + 1; });
    return m;
  }, [gpusWithScores]);
  const currentRankMap = useMemo(() => {
    const prev = rankRef.current;
    const changed = Object.keys(freshRankMap).some(id => freshRankMap[+id] !== prev[+id]);
    if (!changed) return prev;
    rankRef.current = freshRankMap;
    return freshRankMap;
  }, [freshRankMap]);

  useEffect(() => {
    const newDelta: Record<number,number> = {};
    Object.entries(currentRankMap).forEach(([id, curr]) => {
      const last = prevRankMap[+id] ?? curr;
      newDelta[+id] = last - curr;
    });
    if (Object.values(newDelta).some(d => d !== 0)) setDeltaMap(newDelta);
    setPrevRankMap(currentRankMap);
  }, [currentRankMap, prevRankMap]);

  return (
    <div className="flex flex-col items-center overflow-x-auto p-6 space-y-6">
      <ScoreWeightCard pricePercent={pricePercent} carbonPercent={carbonPercent} />
      <div className="w-full max-w-md">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <DollarSign className="w-5 h-5 text-blue-600" />
            <span className="mt-1 text-xs text-gray-600">Price</span>
          </div>
          <div className="relative flex-1 mx-4">
            <Slider.Root
              value={[carbonPercent]}
              max={100}
              step={1}
              onValueChange={vals => setPricePercent(100 - vals[0])}
              className="relative flex h-8 items-center"
            >
              <Slider.Track className="relative flex-1 h-2 bg-gradient-to-r from-blue-500 via-blue-400 to-green-500 rounded-full shadow-inner">
                <Slider.Range className="absolute h-full rounded-full bg-transparent" />
              </Slider.Track>
              <Slider.Thumb className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white border-2 border-gray-300 shadow-md transform transition-transform hover:scale-110" />
            </Slider.Root>
            <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
              {[0,1,2,3,4].map(i => <span key={i} className="w-px h-4 bg-gray-300" />)}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Leaf className="w-5 h-5 text-green-600" />
            <span className="mt-1 text-xs text-gray-600">Carbon</span>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 text-sm">
          <thead className="bg-gray-50 text-gray-600 text-xs font-medium uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left text-black">Score</th>
              <th className="px-6 py-4 text-left">GPU</th>
              <th className="px-6 py-4 text-left">Provider</th>
              <th className="px-6 py-4 text-right">Price/hr</th>
              <th className="px-6 py-4 text-right">Carbon Intensity</th>
              <th className="px-6 py-4 text-center">Efficiency</th>
            </tr>
          </thead>
          <motion.tbody layout className="divide-y divide-gray-100 text-gray-800">
          <AnimatePresence initial={false}>
            {gpusWithScores.map(gpu => (
              <motion.tr
                key={gpu.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Score + reserved arrow space */}
                <td className="px-6 py-4 text-center font-bold text-black text-base whitespace-nowrap">
                  <div className="inline-flex items-center space-x-2">
                    <span>{gpu.score}</span>
                    <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                      <AnimatePresence>
                        {deltaMap[gpu.id] !== 0 && (
                          <motion.span key={deltaMap[gpu.id]} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.2 }}>
                            {deltaMap[gpu.id] > 0 ? <ArrowUp className="text-green-500 w-4 h-4" /> : <ArrowDown className="text-red-500 w-4 h-4" />}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </td>

                {/* GPU Type */}
                <td className="px-6 py-4 text-black whitespace-nowrap">{gpu.type}</td>

                {/* Provider & Region */}
                <td className="px-6 py-4">
                  <div className="text-sm font-medium">{gpu.provider}</div>
                  <div className="text-xs text-gray-500">{gpu.region}</div>
                </td>

                {/* Price/hr */}
                <td className="px-6 py-4 text-right text-gray-700 whitespace-nowrap">{gpu.price.toFixed(2)} <span className="text-xs text-gray-500">USD</span></td>

                {/* Carbon Intensity */}
                <td className="px-6 py-4 text-right text-gray-700 whitespace-nowrap">{gpu.carbonIntensity} <span className="text-xs text-gray-500">gCO₂/kWh</span></td>

                {/* Efficiency */}
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  <span className={getEfficiencyTag(gpu.efficiency)}>{gpu.efficiency}</span>
                </td>
              </motion.tr>
            ))}
          </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
      {/* Bottom notice card */}
      <div className="w-full max-w-md bg-gradient-to-br from-indigo-50 via-white to-green-50 border border-indigo-200 rounded-2xl shadow-lg p-6 mt-4">
      <p className="text-center text-gray-700">Only the top 15 GPUs are displayed</p>
      </div>
    </div>
  );
};

export default GPUComparisonTable;
