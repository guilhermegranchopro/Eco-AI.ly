'use client';
import React from 'react';
import InteractiveCard from './InteractiveCard';

const CarbonIntensityCard = () => {
  return (
    <InteractiveCard className="p-10 bg-gray-800/70 border border-gray-700/40 hover:border-green-400/40 transition-all duration-300 max-w-3xl mx-auto text-white text-base sm:text-lg leading-relaxed">
      <h3 className="text-3xl font-bold text-green-300 text-center mb-6">
        Carbon Intensity
      </h3>

      <p className="text-gray-200 mb-4 text-center">
        How much CO₂ is emitted per one unit of electricity consumed.
      </p>

      <p className="text-center text-lg font-semibold text-gray-100 mb-1">
        Carbon Intensity = CO₂ Emissions ÷ Electricity Produced
      </p>
      <p className="text-center text-sm text-gray-400 mb-6">
        Units: grams CO₂ per kilowatt-hour (gCO₂/kWh)
      </p>

      <p className="text-green-300 text-center mb-4 font-medium">
        Understand and reduce your emissions when training AI:
      </p>
      <ul className="list-disc pl-6 text-gray-300 text-base space-y-2">
        <li>
          <strong>Training locally?</strong> Dashboard lets you check the best time to train.
        </li>
        <li>
          <strong>Training on the cloud?</strong> GPU Finder balances price and carbon intensity.
        </li>
      </ul>
    </InteractiveCard>
  );
};

export default CarbonIntensityCard;
