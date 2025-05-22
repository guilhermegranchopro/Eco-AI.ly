\
"use client"; // Required for components with event handlers or state, good practice for pages with components

import Image from "next/image"; // Though not used directly in this version, good to keep if icons are added later

// Define interfaces for the data
interface CarbonIntensityDataPoint {
  time: string; // Or Date
  value: number; // Or string, depending on the API
  unit: string;
}

interface CarbonIntensityDisplayProps {
  title: string;
  data: CarbonIntensityDataPoint[];
}

// Placeholder data - In a real application, this would come from an API
const last24HoursData: CarbonIntensityDataPoint[] = [
  { time: "2025-05-22 10:00", value: 150, unit: "gCO2/kWh" },
  { time: "2025-05-22 11:00", value: 145, unit: "gCO2/kWh" },
  { time: "2025-05-22 12:00", value: 140, unit: "gCO2/kWh" },
  { time: "2025-05-22 13:00", value: 135, unit: "gCO2/kWh" },
  { time: "2025-05-22 14:00", value: 130, unit: "gCO2/kWh" },
  { time: "2025-05-23 09:00", value: 160, unit: "gCO2/kWh" },
];

const next24HoursPrediction: CarbonIntensityDataPoint[] = [
  { time: "2025-05-23 10:00", value: 155, unit: "gCO2/kWh (predicted)" },
  { time: "2025-05-23 11:00", value: 150, unit: "gCO2/kWh (predicted)" },
  { time: "2025-05-23 12:00", value: 148, unit: "gCO2/kWh (predicted)" },
  { time: "2025-05-23 13:00", value: 145, unit: "gCO2/kWh (predicted)" },
  { time: "2025-05-23 14:00", value: 142, unit: "gCO2/kWh (predicted)" },
  { time: "2025-05-24 09:00", value: 165, unit: "gCO2/kWh (predicted)" },
];

// Component to display carbon intensity data
const CarbonIntensityDisplay: React.FC<CarbonIntensityDisplayProps> = ({ title, data }) => {
  return (
    <div className="w-full p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">{title}</h2>
      {data.length > 0 ? (
        <ul className="space-y-2">
          {data.map((point, index) => (
            <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700 last:border-b-0">
              <span>{point.time}:</span>
              <span className="font-medium text-lg">{point.value} <span className="text-xs">{point.unit}</span></span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 dark:text-gray-400">No data available for {title}.</p>
      )}
    </div>
  );
};

export default function PortugalDashboardPage() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4 sm:p-8 font-[family-name:var(--font-geist-sans)] text-gray-900 dark:text-white">
      <header className="text-center my-8 sm:my-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-600 dark:text-green-400">
          🇵🇹 Portugal Carbon Intensity
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Real-time and predicted carbon intensity levels.
        </p>
      </header>

      <main className="flex flex-col gap-8 md:gap-12 w-full max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <CarbonIntensityDisplay title="Last 24 Hours" data={last24HoursData} />
          <CarbonIntensityDisplay title="Next 24 Hours Prediction" data={next24HoursPrediction} />
        </div>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 font-[family-name:var(--font-geist-mono)]">
          <p>Data displayed is for demonstration purposes and will be replaced with live API data.</p>
          <p>
            <a href="/" className="text-green-600 dark:text-green-400 hover:underline">
              &larr; Back to Homepage
            </a>
          </p>
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700 w-full max-w-5xl text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Eco AI.ly
        </p>
      </footer>
    </div>
  );
}
