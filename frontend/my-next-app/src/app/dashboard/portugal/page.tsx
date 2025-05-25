"use client";

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts'; // Added TooltipProps
import Link from 'next/link'; // Import Link

// Define interfaces for the data
interface CarbonIntensityDataPoint {
  time: string; 
  value: number; 
  unit: string;
}

// API response structure for the history part
interface ApiHistoryPoint {
  datetime: string;
  value: number;
}

interface CarbonIntensityDisplayProps {
  title: string;
  data: CarbonIntensityDataPoint[];
  isLoading?: boolean;
  error?: string | null;
}

// Placeholder data for Next 24 Hours Prediction (until API is available)
const next24HoursPredictionPlaceholder: CarbonIntensityDataPoint[] = [
  { time: "10:00", value: 155, unit: "gCO2/kWh (predicted)" },
  { time: "11:00", value: 150, unit: "gCO2/kWh (predicted)" },
  { time: "12:00", value: 148, unit: "gCO2/kWh (predicted)" },
  { time: "13:00", value: 145, unit: "gCO2/kWh (predicted)" },
  { time: "14:00", value: 142, unit: "gCO2/kWh (predicted)" },
  { time: "15:00", value: 165, unit: "gCO2/kWh (predicted)" },
];

// Component to display carbon intensity data with a chart
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    const dataPoint = payload[0].payload as CarbonIntensityDataPoint;
    return (
      <div className="p-2 bg-gray-700 bg-opacity-90 border border-gray-600 rounded-md shadow-lg text-white">
        <p className="label text-sm text-gray-300">{`Time : ${label}`}</p>
        <p className="intro text-sm font-semibold">{`Intensity : ${payload[0].value} ${dataPoint.unit}`}</p>
      </div>
    );
  }
  return null;
};

const CarbonIntensityDisplay: React.FC<CarbonIntensityDisplayProps> = ({ title, data, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-800 flex flex-col items-center justify-center min-h-[438px]">
        <svg className="animate-spin h-12 w-12 text-green-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-gray-500 dark:text-gray-400">Loading {title}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 border border-red-300 dark:border-red-700 rounded-xl shadow-lg bg-red-50 dark:bg-red-900 flex flex-col items-center justify-center min-h-[438px]">
        <svg className="h-12 w-12 text-red-500 dark:text-red-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
        <p className="text-xl font-semibold text-red-700 dark:text-red-300 mb-2">Error loading {title}</p>
        <p className="text-red-600 dark:text-red-400 text-sm text-center px-4">{error}</p>
      </div>
    );
  }

  return (
    <div className="w-full p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700 dark:text-gray-200">{title}</h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart 
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 20, 
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis 
              dataKey="time" 
              stroke="#718096" 
              tick={{ fontSize: 12 }}
              angle={-30}
              textAnchor="end"
              height={50}
            />
            <YAxis 
              stroke="#718096" 
              tick={{ fontSize: 12 }} 
              label={{ 
                value: data[0]?.unit.replace(" (predicted)", ""),
                angle: -90, 
                position: 'insideLeft', 
                fill: '#A0AEC0', 
                fontSize: 14, 
                dy: 70, 
                dx: -10
              }} 
            />
            <Tooltip 
              content={<CustomTooltip />} // Use custom tooltip
              cursor={{fill: 'rgba(113, 128, 150, 0.3)'}}
            />
            <Legend 
              wrapperStyle={{ color: '#A0AEC0', paddingTop: '15px' }} 
              formatter={() => <span style={{ color: '#A0AEC0' }}>{title.split(" (")[0]}</span>} // Simplified legend
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#38A169" 
              strokeWidth={2.5} 
              activeDot={{ r: 8, strokeWidth: 2, stroke: '#2F855A'}} 
              dot={{ r: 4, fill: '#38A169' }}
              name={title.split(" (")[0]} // Simplified name for legend matching
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-10">No data available for {title}.</p>
      )}
    </div>
  );
};

export default function PortugalDashboardPage() {
  const [last24HoursApiData, setLast24HoursApiData] = useState<CarbonIntensityDataPoint[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [predictionData, setPredictionData] = useState<CarbonIntensityDataPoint[]>(next24HoursPredictionPlaceholder);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/carbon-intensity');
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
      }
      const apiData = await response.json();

      const transformedHistory = apiData.history.map((point: ApiHistoryPoint) => ({
        time: new Date(point.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        value: point.value,
        unit: "gCO2/kWh",
      }));
      setLast24HoursApiData(transformedHistory);
      setLastFetchTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));

      console.log("API Prediction Class:", apiData.prediction_class);

    } catch (err: unknown) { // Changed 'e: any' to 'err: unknown'
      console.error("Failed to fetch carbon intensity data:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
      setLast24HoursApiData([]);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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

      <main className="flex flex-col gap-8 md:gap-12 w-full max-w-6xl px-4">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {lastFetchTime && !isLoading && !error && (
              <span>Last updated: {lastFetchTime}</span>
            )}
          </div>
          <button
            onClick={fetchData}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-800 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`w-5 h-5 mr-2 ${isLoading ? 'animate-spin' : ''}`}>
              <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.204 4.306A5.532 5.532 0 0 1 4.5 12.5c0-1.404.524-2.69 1.386-3.697L4.303 7.21C3.36 8.435 2.75 10.068 2.75 11.852c0 3.444 2.724 6.25 6.083 6.25 2.434 0 4.568-1.423 5.526-3.512l.001-.002-1.048-2.164ZM4.688 8.576l1.048 2.164A5.5 5.5 0 0 1 14.94 6.434a5.532 5.532 0 0 1 1.56 3.216c0 1.404-.524 2.69-1.386 3.697l1.583 1.593c.944-1.226 1.553-2.86 1.553-4.642 0-3.444-2.724-6.25-6.083-6.25-2.434 0-4.568 1.423-5.526 3.512l-.001.002Z" clipRule="evenodd" />
            </svg>
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <CarbonIntensityDisplay 
            title="Last 24 Hours" 
            data={last24HoursApiData} 
            isLoading={isLoading} 
            error={error} 
          />
          <CarbonIntensityDisplay 
            title="Next 24 Hours Prediction (Placeholder)"
            data={predictionData} 
          />
        </div>

        {error && (
          <div className="mt-4 p-4 rounded-md bg-red-100 dark:bg-red-900 border border-red-300 dark:border-red-700 w-full">
            <p className="text-red-700 dark:text-red-200 font-semibold">API Error:</p>
            <p className="text-red-600 dark:text-red-300 text-sm">{error}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">Please ensure your FastAPI backend is running on http://localhost:8080 and the /api/carbon-intensity endpoint is accessible.</p>
          </div>
        )}

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 font-[family-name:var(--font-geist-mono)]">
          <p>Data for &quot;Last 24 Hours&quot; is fetched from your local API. &quot;Next 24 Hours Prediction&quot; currently uses placeholder data.</p>
          <p className="mt-2">
            <Link href="/" className="text-green-600 dark:text-green-400 hover:underline">
              &larr; Back to Homepage
            </Link>
          </p>
        </div>
      </main>

      <footer className="mt-16 py-8 border-t border-gray-200 dark:border-gray-700 w-full max-w-6xl text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Eco AI.ly
        </p>
      </footer>
    </div>
  );
}
