// app/find-gpu/GPUComparisonTable.tsx
'use client'

import React, { useState, useMemo, useEffect, useRef } from 'react'
import clsx from 'clsx'
import * as Slider from '@radix-ui/react-slider'
import { motion, AnimatePresence } from 'framer-motion'
import { Info, DollarSign, Leaf, ArrowUp, ArrowDown } from 'lucide-react'

interface GPU {
  id: number
  type: string
  provider: string
  region: string
  price: number
  carbonIntensity: number
  efficiency: 'high' | 'medium' | 'low'
}

const getEfficiencyTag = (efficiency: string) =>
  clsx(
    'inline-flex items-center justify-center text-[10px] font-medium px-1.5 py-0.5 rounded-full',
    {
      high: 'bg-green-50 text-green-700 ring-1 ring-green-600/20 dark:bg-green-800 dark:text-green-300 dark:ring-green-500/40',
      medium: 'bg-yellow-50 text-yellow-800 ring-1 ring-yellow-600/20 dark:bg-yellow-800 dark:text-yellow-300 dark:ring-yellow-500/40',
      low: 'bg-red-50 text-red-700 ring-1 ring-red-600/10 dark:bg-red-800 dark:text-red-300 dark:ring-red-500/30',
    }[efficiency]
  )

const ScoreWeightCard = ({
  pricePercent,
  carbonPercent,
}: {
  pricePercent: number;
  carbonPercent: number;
}) => {
  let infoText: React.ReactNode;

  if (pricePercent === 100) {
    infoText = (
      <span>
        You value the price{' '}
        <span className="font-semibold text-blue-400 dark:text-indigo-300">
          100%
        </span>
      </span>
    );
  } else if (carbonPercent === 100) {
    infoText = (
      <span>
        You value the carbon intensity{' '}
        <span className="font-semibold text-green-400 dark:text-indigo-300">
          100%
        </span>
      </span>
    );
  } else {
    const factor = (carbonPercent / pricePercent).toFixed(2);
    const factorValue = parseFloat(factor);

    const colorClass =
      factorValue > 1
        ? 'text-green-400'
        : factorValue < 1
        ? 'text-blue-400'
        : 'text-gray-400';

    if (factorValue === 1) {
      infoText = (
        <span>
          You value price and carbon intensity equally{' '}
          <span className={`font-semibold ${colorClass}`}>1×</span>
        </span>
      );
    } else if (factorValue > 1) {
      infoText = (
        <span>
          You value the carbon intensity{' '}
          <span className={`font-semibold ${colorClass}`}>{factor}×</span>{' '}
          more than price
        </span>
      );
    } else {
      const inverseFactor = (pricePercent / carbonPercent).toFixed(2);
      infoText = (
        <span>
          You value the price{' '}
          <span className="font-semibold text-blue-400">{inverseFactor}×</span>{' '}
          more than carbon
        </span>
      );
    }
  }


  return (
    <div className="
      w-full max-w-md mx-auto p-1 rounded-3xl shadow-2xl
      bg-gradient-to-br from-cyan-500 via-purple-700 to-pink-600
    ">
      <div className="
        rounded-[calc(1.5rem-4px)] bg-gray-900/90 backdrop-blur-md
        p-6 border border-gray-700
      ">
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <Info className="w-5 h-5 text-purple-300" />
          <h2 className="text-xs sm:text-sm tracking-wider uppercase font-medium text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">
            Price vs Carbon Tradeoff
          </h2>
        </div>

        {/* Body Text */}
        <p className="mb-6 text-center text-gray-300 text-sm sm:text-base leading-relaxed">
          {infoText}
        </p>

        {/* Price vs Carbon Row */}
        <div className="flex justify-center items-center space-x-10">
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2">
              <DollarSign className="w-5 h-5 text-blue-400" />
              <span className="text-3xl font-bold text-blue-200 drop-shadow-sm">
                {pricePercent}%
              </span>
            </div>
            <span className="text-xs text-gray-400 uppercase mt-1 tracking-wide">
              Price
            </span>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-2">
              <Leaf className="w-5 h-5 text-green-400" />
              <span className="text-3xl font-bold text-green-200 drop-shadow-sm">
                {carbonPercent}%
              </span>
            </div>
            <span className="text-xs text-gray-400 uppercase mt-1 tracking-wide">
              Carbon
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}


export default function GPUComparisonTable({ gpus }: { gpus: GPU[] }) {
  const carbonWeight = 1
  const initialPriceWeight = 3.5
  const initialPercent = Math.round(
    (initialPriceWeight / (initialPriceWeight + carbonWeight)) * 100
  )
  const [pricePercent, setPricePercent] = useState(initialPercent)
  const carbonPercent = 100 - pricePercent

  const [deltaMap, setDeltaMap] = useState<Record<number, number>>(
    () => Object.fromEntries(gpus.map(gpu => [gpu.id, 0]))
  )
  const [prevRankMap, setPrevRankMap] = useState<Record<number, number>>({})

  const prices = gpus.map(g => g.price)
  const carbons = gpus.map(g => g.carbonIntensity)
  const minPrice = useMemo(() => Math.min(...prices), [prices])
  const maxPrice = useMemo(() => Math.max(...prices), [prices])
  const minCarbon = useMemo(() => Math.min(...carbons), [carbons])
  const maxCarbon = useMemo(() => Math.max(...carbons), [carbons])

  const gpusWithScores = useMemo(() => {
    const scored = gpus.map(gpu => {
      const priceRange = maxPrice - minPrice
      const carbonRange = maxCarbon - minCarbon

      const normPrice =
        priceRange === 0 ? 1 : (maxPrice - gpu.price) / priceRange
      const normCarbon =
        carbonRange === 0
          ? 1
          : (maxCarbon - gpu.carbonIntensity) / carbonRange

      const priceScore = pricePercent * normPrice
      const carbonScore = carbonPercent * normCarbon
      const totalScore = Math.round(priceScore + carbonScore)

      return { ...gpu, score: totalScore }
    })
    return scored.sort((a, b) => b.score - a.score)
  }, [pricePercent, carbonPercent, minPrice, maxPrice, minCarbon, maxCarbon, gpus])

  const rankRef = useRef<Record<number, number>>({})
  const freshRankMap = useMemo(() => {
    const m: Record<number, number> = {}
    gpusWithScores.forEach((gpu, idx) => {
      m[gpu.id] = idx + 1
    })
    return m
  }, [gpusWithScores])
  const currentRankMap = useMemo(() => {
    const prev = rankRef.current
    const changed = Object.keys(freshRankMap).some(
      id => freshRankMap[+id] !== prev[+id]
    )
    if (!changed) return prev
    rankRef.current = freshRankMap
    return freshRankMap
  }, [freshRankMap])

  useEffect(() => {
    const newDelta: Record<number, number> = {}
    Object.entries(currentRankMap).forEach(([id, curr]) => {
      const last = prevRankMap[+id] ?? curr
      newDelta[+id] = last - curr
    })
    if (Object.values(newDelta).some(d => d !== 0)) setDeltaMap(newDelta)
    setPrevRankMap(currentRankMap)
  }, [currentRankMap, prevRankMap])

  return (
    <div className="flex flex-col items-center overflow-x-auto p-6 space-y-6">
      <ScoreWeightCard
        pricePercent={pricePercent}
        carbonPercent={carbonPercent}
      />

      {/* Slider */}
      <div className="w-full max-w-md">
        <div className="flex items-center">
          <div className="flex flex-col items-center">
            <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Price
            </span>
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
              <Slider.Thumb className="relative flex h-6 w-6 items-center justify-center rounded-full bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-gray-600 shadow-md transform transition-transform hover:scale-110" />
            </Slider.Root>
            <div className="absolute inset-0 flex justify-between items-center pointer-events-none">
              {[0, 1, 2, 3, 4].map(i => (
                <span key={i} className="w-px h-4 bg-gray-300 dark:bg-gray-600" />
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Leaf className="w-5 h-5 text-green-600 dark:text-green-400" />
            <span className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Carbon
            </span>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 text-sm">
          <thead className="bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300 text-xs font-medium uppercase tracking-wide">
            <tr>
              <th className="px-6 py-4 text-left text-black dark:text-white">
                Score
              </th>
              <th className="px-6 py-4 text-left">GPU</th>
              <th className="px-6 py-4 text-left">Provider</th>
              <th className="px-6 py-4 text-right">Price/hr</th>
              <th className="px-6 py-4 text-right">Carbon Intensity</th>
              <th className="px-6 py-4 text-center">Efficiency</th>
            </tr>
          </thead>
          <motion.tbody
            layout
            className="divide-y divide-gray-100 dark:divide-gray-700 text-gray-800 dark:text-gray-200"
          >
            <AnimatePresence initial={false}>
              {gpusWithScores.map(gpu => (
                <motion.tr
                  key={gpu.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="px-6 py-4 text-center font-bold text-black dark:text-white text-base whitespace-nowrap">
                    <div className="inline-flex items-center space-x-2">
                      <span>{gpu.score}</span>
                      <div className="w-4 h-4 flex-shrink-0 flex items-center justify-center">
                        <AnimatePresence>
                          {deltaMap[gpu.id] !== 0 && (
                            <motion.span
                              key={deltaMap[gpu.id]}
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 4 }}
                              transition={{ duration: 0.2 }}
                            >
                              {deltaMap[gpu.id] > 0 ? (
                                <ArrowUp className="text-green-500 w-4 h-4" />
                              ) : (
                                <ArrowDown className="text-red-500 w-4 h-4" />
                              )}
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-black dark:text-white whitespace-nowrap">
                    {gpu.type}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm dark:text-gray-200">
                      {gpu.provider}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {gpu.region}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {gpu.price.toFixed(2)}{' '}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      USD
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-gray-700 dark:text-gray-300 whitespace-nowrap">
                    {gpu.carbonIntensity}{' '}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      gCO₂/kWh
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center whitespace-nowrap">
                    <span className={getEfficiencyTag(gpu.efficiency)}>
                      {gpu.efficiency}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </motion.tbody>
        </table>
      </div>
    </div>
  )
}

