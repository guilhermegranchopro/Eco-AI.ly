"use client";

import { useEffect, useState } from 'react'; // Added useEffect and useState
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
const CarbonIntensityDisplay: React.FC<CarbonIntensityDisplayProps> = ({ title, data, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="w-full p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-800 flex items-center justify-center min-h-[438px]">
        <p className="text-gray-500 dark:text-gray-400">Loading data for {title}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6 border rounded-xl shadow-lg bg-white dark:bg-gray-800 flex flex-col items-center justify-center min-h-[438px]">
        <p className="text-red-500 dark:text-red-400">Error loading data for {title}:</p>
        <p className="text-red-400 dark:text-red-300 text-sm">{error}</p>
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
              contentStyle={{ 
                backgroundColor: 'rgba(45, 55, 72, 0.95)', 
                border: '1px solid #4A5568', 
                borderRadius: '0.5rem', 
                color: '#E2E8F0' 
              }} 
              itemStyle={{ color: '#E2E8F0' }}
              labelStyle={{ color: '#CBD5E0', fontWeight: 'bold' }} 
              cursor={{fill: 'rgba(113, 128, 150, 0.3)'}}
              formatter={(value: number, name: string, props: any) => [`${value} ${props.payload.unit}`, 'Intensity']} 
            />
            <Legend 
              wrapperStyle={{ color: '#A0AEC0', paddingTop: '15px' }} 
              formatter={(value, entry) => <span style={{ color: '#A0AEC0' }}>{title}</span>} 
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#38A169" 
              strokeWidth={2.5} 
              activeDot={{ r: 8, strokeWidth: 2, stroke: '#2F855A'}} 
              dot={{ r: 4, fill: '#38A169' }}
              name={title} 
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
  const [predictionData, setPredictionData] = useState<CarbonIntensityDataPoint[]>(next24HoursPredictionPlaceholder);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Assuming your FastAPI backend is running on http://localhost:8080
        const response = await fetch('http://localhost:8080/api/carbon-intensity');
        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}: ${await response.text()}`);
        }
        const data = await response.json();

        // Transform API history data for the chart
        const transformedHistory = data.history.map((point: ApiHistoryPoint) => ({
          time: new Date(point.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          value: point.value,
          unit: "gCO2/kWh", // Assuming this unit from your previous setup
        }));
        setLast24HoursApiData(transformedHistory);

        // TODO: Handle prediction_class from data.prediction_class if needed
        // For now, prediction chart uses placeholder data.
        console.log("API Prediction Class:", data.prediction_class);

      } catch (e: any) {
        console.error("Failed to fetch carbon intensity data:", e);
        setError(e.message || "An unknown error occurred");
        setLast24HoursApiData([]); // Clear data on error
      }
      setIsLoading(false);
    };

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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          <CarbonIntensityDisplay 
            title="Last 24 Hours" 
            data={last24HoursApiData} 
            isLoading={isLoading} 
            error={error} 
          />
          <CarbonIntensityDisplay 
            title="Next 24 Hours Prediction (Placeholder)" // Updated title
            data={predictionData} 
            // This chart is not currently driven by API, so no isLoading/error from this fetch
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
          <p>Data for "Last 24 Hours" is fetched from your local API. "Next 24 Hours Prediction" currently uses placeholder data.</p>
          <p className="mt-2">
            <a href="/" className="text-green-600 dark:text-green-400 hover:underline">
              &larr; Back to Homepage
            </a>
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
