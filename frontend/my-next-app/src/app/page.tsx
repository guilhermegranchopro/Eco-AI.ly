import Image from "next/image";

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
  // ... more data points
  { time: "2025-05-23 09:00", value: 160, unit: "gCO2/kWh" },
];

const next24HoursPrediction: CarbonIntensityDataPoint[] = [
  { time: "2025-05-23 10:00", value: 155, unit: "gCO2/kWh (predicted)" },
  { time: "2025-05-23 11:00", value: 150, unit: "gCO2/kWh (predicted)" },
  // ... more data points
  { time: "2025-05-24 09:00", value: 165, unit: "gCO2/kWh (predicted)" },
];

// Component to display carbon intensity data
const CarbonIntensityDisplay: React.FC<CarbonIntensityDisplayProps> = ({ title, data }) => {
  return (
    <div className="w-full p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">{title}</h2>
      <ul className="space-y-2">
        {data.map((point, index) => (
          <li key={index} className="text-sm text-gray-600 dark:text-gray-300 flex justify-between">
            <span>{point.time}:</span>
            <span className="font-medium">{point.value} {point.unit}</span>
          </li>
        ))}
        {data.length === 0 && <p className="text-gray-500 dark:text-gray-400">No data available.</p>}
      </ul>
    </div>
  );
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 font-[family-name:var(--font-geist-sans)] text-gray-900 dark:text-white">
      <header className="text-center mb-10 sm:mb-16">
        <h1 className="text-4xl sm:text-5xl font-bold text-green-600 dark:text-green-400">
          Eco AI.ly
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 mt-2">
          Portugal Carbon Intensity Dashboard
        </p>
      </header>

      <main className="flex flex-col gap-8 md:gap-12 row-start-2 w-full max-w-5xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <CarbonIntensityDisplay title="Last 24 Hours" data={last24HoursData} />
          <CarbonIntensityDisplay title="Next 24 Hours Prediction" data={next24HoursPrediction} />
        </div>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 font-[family-name:var(--font-geist-mono)]">
          <p>This is a placeholder for more detailed charts and information.</p>
          <p>Data displayed is for demonstration purposes only and will be replaced with live API data.</p>
        </div>
      </main>

      <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 w-full max-w-5xl text-center">
        <div className="flex flex-wrap items-center justify-center gap-6 mb-4">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 dark:text-gray-300"
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/file.svg" // Assuming these icons are in the public folder
              alt="File icon"
              width={16}
              height={16}
              className="dark:invert"
            />
            Learn Next.js
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 dark:text-gray-300"
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg" // Assuming these icons are in the public folder
              alt="Window icon"
              width={16}
              height={16}
              className="dark:invert"
            />
            Examples
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-gray-600 dark:text-gray-300"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg" // Assuming these icons are in the public folder
              alt="Globe icon"
              width={16}
              height={16}
              className="dark:invert"
            />
            Go to nextjs.org
          </a>
        </div>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Eco AI.ly. Powered by Next.js and Vercel.
        </p>
      </footer>
    </div>
  );
}
