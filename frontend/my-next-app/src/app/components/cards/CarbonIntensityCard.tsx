'use client';
import React from 'react';
import Link from 'next/link';

const CarbonIntensityCard = () => {
  return (
    <div className="p-12 bg-gray-900 border border-gray-700 rounded-3xl max-w-7xl w-full mx-auto shadow-xl">
      <h3 className="text-4xl font-bold text-green-300 text-center mb-6">
        Carbon Intensity
      </h3>

      <p className="text-gray-200 mb-4 text-center text-lg">
        How much CO₂ is emitted per one unit of electricity consumed
      </p>

      <p className="text-center text-xl font-semibold text-gray-100 mb-1">
        Carbon Intensity = CO₂ Emissions ÷ Electricity Produced
      </p>
      <p className="text-center text-sm text-gray-400 mb-6">
        Units: grams CO₂ per kilowatt-hour (gCO₂/kWh)
      </p>

      <p className="text-green-300 text-center mb-4 font-medium">
        Understand and reduce your emissions when training AI:
      </p>

      <ul className="list-disc pl-8 text-gray-300 text-base space-y-2 max-w-xl mx-auto">
        <li>
          <strong>Training locally?</strong>{' '}
          Use the{' '}
          <Link href="/dashboard" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:underline">
            Dashboard
          </Link>{' '}
          to find the best time to train.
        </li>
        <li>
          <strong>Training on the cloud?</strong>{' '}
          <Link href="/find-gpu" className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 hover:underline">
            GPU Finder
          </Link>{' '}
          balances price and carbon intensity.
        </li>
      </ul>
    </div>
  );
};

export default CarbonIntensityCard;
