\
"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
  { time: "10:00", value: 150, unit: "gCO2/kWh" },
  { time: "11:00", value: 145, unit: "gCO2/kWh" },
  { time: "12:00", value: 140, unit: "gCO2/kWh" },
  { time: "13:00", value: 135, unit: "gCO2/kWh" },
  { time: "14:00", value: 130, unit: "gCO2/kWh" },
  { time: "15:00", value: 160, unit: "gCO2/kWh" },
];

const next24HoursPrediction: CarbonIntensityDataPoint[] = [
  { time: "10:00", value: 155, unit: "gCO2/kWh (predicted)" },
  { time: "11:00", value: 150, unit: "gCO2/kWh (predicted)" },
  { time: "12:00", value: 148, unit: "gCO2/kWh (predicted)" },
  { time: "13:00", value: 145, unit: "gCO2/kWh (predicted)" },
  { time: "14:00", value: 142, unit: "gCO2/kWh (predicted)" },
  { time: "15:00", value: 165, unit: "gCO2/kWh (predicted)" },
];

// Component to display carbon intensity data with a chart
const CarbonIntensityDisplay: React.FC<CarbonIntensityDisplayProps> = ({ title, data }) => {
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
              bottom: 20, // Increased bottom margin for XAxis labels
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4A5568" />
            <XAxis 
              dataKey="time" 
              stroke="#718096" 
              tick={{ fontSize: 12 }}
              angle={-30} // Angle labels to prevent overlap
              textAnchor="end" // Anchor angled labels correctly
              height={50} // Allocate space for angled labels
            />
            <YAxis 
              stroke="#718096" 
              tick={{ fontSize: 12 }} 
              label={{ 
                value: data[0]?.unit.replace(" (predicted)", ""), // Use base unit for label
                angle: -90, 
                position: 'insideLeft', 
                fill: '#A0AEC0', 
                fontSize: 14, 
                dy: 70, // Adjust dy for better positioning with angled X-axis labels
                dx: -10 // Adjust dx for better positioning
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
              formatter={(value: number, name: string, props: any) => [`${value} ${props.payload.unit}`, 'Intensity']} // Custom formatter for tooltip
            />
            <Legend 
              wrapperStyle={{ color: '#A0AEC0', paddingTop: '15px' }} 
              formatter={(value, entry) => <span style={{ color: '#A0AEC0' }}>{title}</span>} // Use chart title for legend
            />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="#38A169" 
              strokeWidth={2.5} 
              activeDot={{ r: 8, strokeWidth: 2, stroke: '#2F855A'}} 
              dot={{ r: 4, fill: '#38A169' }}
              name={title} // Use chart title for line name (can be used by legend/tooltip)
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
          <CarbonIntensityDisplay title="Last 24 Hours" data={last24HoursData} />
          <CarbonIntensityDisplay title="Next 24 Hours Prediction" data={next24HoursPrediction} />
        </div>

        <div className="mt-10 text-center text-sm text-gray-500 dark:text-gray-400 font-[family-name:var(--font-geist-mono)]">
          <p>Data displayed is for demonstration purposes and will be replaced with live API data.</p>
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
