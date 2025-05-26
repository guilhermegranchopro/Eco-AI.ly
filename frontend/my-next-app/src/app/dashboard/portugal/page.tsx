"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area
} from 'recharts';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';

// Types
interface HistoryData {
  datetime: string;
  value: number;
}

interface ApiResponse {
  history: HistoryData[];
  scaled_history: number[];
  prediction_class: number;
}

interface ChartDataPoint extends HistoryData {
  time: string;
  fullTime: string;
}

// Constants
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

// Prediction class descriptions
const PREDICTION_CLASSES = {
  carbon_intensity: {
    0: { label: 'Very Low', color: '#10B981', description: 'Excellent carbon efficiency' },
    1: { label: 'Low', color: '#34D399', description: 'Good carbon efficiency' },
    2: { label: 'Moderate', color: '#FDE047', description: 'Average carbon efficiency' },
    3: { label: 'High', color: '#FB923C', description: 'Poor carbon efficiency' },
    4: { label: 'Very High', color: '#F87171', description: 'Very poor carbon efficiency' },
    5: { label: 'Extreme', color: '#DC2626', description: 'Extremely poor carbon efficiency' },
  },
  renewable_percentage: {
    0: { label: 'Very Low', color: '#DC2626', description: 'Very low renewable energy' },
    1: { label: 'Low', color: '#F87171', description: 'Low renewable energy' },
    2: { label: 'Moderate', color: '#FB923C', description: 'Moderate renewable energy' },
    3: { label: 'Good', color: '#FDE047', description: 'Good renewable energy' },
    4: { label: 'High', color: '#34D399', description: 'High renewable energy' },
    5: { label: 'Excellent', color: '#10B981', description: 'Excellent renewable energy' },
  }
};

// Icon Components
const BackIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
  </svg>
);

const RefreshIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
  </svg>
);

const CarbonIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
  </svg>
);

const RenewableIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636a9 9 0 1012.728 0z" />
  </svg>
);

// Loading Component
const LoadingSpinner = () => (
  <motion.div
    className="flex items-center justify-center p-8"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div
      className="w-8 h-8 border-4 border-green-500 border-t-transparent rounded-full"
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  </motion.div>
);

// Error Component
const ErrorComponent = ({ message, onRetry }: { message: string; onRetry: () => void }) => (
  <motion.div
    className="flex flex-col items-center justify-center p-8 text-center"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="text-red-500 mb-4">
      <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
      </svg>
    </div>
    <p className="text-gray-600 dark:text-gray-400 mb-4">{message}</p>
    <motion.button
      onClick={onRetry}
      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      Try Again
    </motion.button>
  </motion.div>
);

// Metric Card Component
const MetricCard = ({ title, value, unit, icon, trend, className }: {
  title: string;
  value: number | string;
  unit?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  const trendColors = {
    up: 'text-green-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  };

  return (
    <motion.div
      ref={ref}
      className={`bg-white dark:bg-gray-800/30 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl p-6 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0px 10px 25px rgba(0, 255, 255, 0.1)"
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="text-green-500">
          {icon}
        </div>
        {trend && (
          <div className={`text-sm ${trendColors[trend]}`}>
            {trend === 'up' && '↗'}
            {trend === 'down' && '↘'}
            {trend === 'neutral' && '→'}
          </div>
        )}
      </div>
      <div className="space-y-1">
        <p className="text-sm text-gray-600 dark:text-gray-400">{title}</p>
        <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {value}
          {unit && <span className="text-lg text-gray-500 ml-1">{unit}</span>}
        </p>
      </div>
    </motion.div>
  );
};

// Prediction Badge Component
const PredictionBadge = ({ predictionClass, type }: { 
  predictionClass: number; 
  type: 'carbon_intensity' | 'renewable_percentage';
}) => {
  const prediction = PREDICTION_CLASSES[type][predictionClass as keyof typeof PREDICTION_CLASSES[typeof type]];
  
  return (
    <motion.div
      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
      style={{ 
        backgroundColor: `${prediction.color}20`,
        color: prediction.color,
        border: `1px solid ${prediction.color}40`
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 }}
    >
      <div 
        className="w-2 h-2 rounded-full mr-2"
        style={{ backgroundColor: prediction.color }}
      />
      {prediction.label}
    </motion.div>
  );
};

// Chart Component
const ChartCard = ({ title, data, type, prediction }: {
  title: string;
  data: HistoryData[];
  type: 'carbon_intensity' | 'renewable_percentage';
  prediction: number;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [chartData, setChartData] = useState<ChartDataPoint[]>([]);

  useEffect(() => {
    if (data) {
      const processedData: ChartDataPoint[] = data.map(item => ({
        ...item,
        time: format(parseISO(item.datetime), 'HH:mm'),
        fullTime: format(parseISO(item.datetime), 'MMM dd, HH:mm'),
      }));
      setChartData(processedData);
    }
  }, [data]);

  const chartColor = type === 'carbon_intensity' ? '#ef4444' : '#10b981';
  const gradientId = `gradient-${type}`;

  return (
    <motion.div
      ref={ref}
      className="bg-white dark:bg-gray-800/30 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl p-6"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">Last 24 hours</p>
        </div>
        <PredictionBadge predictionClass={prediction} type={type} />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(156, 163, 175, 0.2)" />
            <XAxis 
              dataKey="time" 
              stroke="rgba(156, 163, 175, 0.8)"
              fontSize={12}
              tick={{ fill: 'currentColor' }}
            />
            <YAxis 
              stroke="rgba(156, 163, 175, 0.8)"
              fontSize={12}
              tick={{ fill: 'currentColor' }}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                border: 'none',
                borderRadius: '8px',
                color: 'white'
              }}
              labelFormatter={(value) => `Time: ${value}`}
              formatter={(value: number | string) => [
                `${value}${type === 'carbon_intensity' ? ' gCO₂/kWh' : '%'}`, 
                type === 'carbon_intensity' ? 'Carbon Intensity' : 'Renewable %'
              ]}
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke={chartColor}
              strokeWidth={2}
              fill={`url(#${gradientId})`}
              dot={{ fill: chartColor, strokeWidth: 2, r: 3 }}
              activeDot={{ r: 5, fill: chartColor }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <span>Current: {data[data.length - 1]?.value}{type === 'carbon_intensity' ? ' gCO₂/kWh' : '%'}</span>
        <span>24h avg: {Math.round(data.reduce((acc, curr) => acc + curr.value, 0) / data.length)}{type === 'carbon_intensity' ? ' gCO₂/kWh' : '%'}</span>
      </div>
    </motion.div>
  );
};

// Main Dashboard Component
export default function PortugalDashboard() {
  const [carbonData, setCarbonData] = useState<ApiResponse | null>(null);
  const [renewableData, setRenewableData] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [carbonResponse, renewableResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/carbon-intensity`),
        fetch(`${API_BASE_URL}/api/renewable-percentage`)
      ]);

      if (!carbonResponse.ok || !renewableResponse.ok) {
        throw new Error('Failed to fetch data from API');
      }

      const carbonData = await carbonResponse.json();
      const renewableData = await renewableResponse.json();

      setCarbonData(carbonData);
      setRenewableData(renewableData);
      setLastUpdate(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    
    // Auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !carbonData && !renewableData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
          </div>
        </div>
      </div>
    );
  }

  if (error && !carbonData && !renewableData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center min-h-screen">
            <ErrorComponent message={error} onRetry={fetchData} />
          </div>
        </div>
      </div>
    );
  }

  const currentCarbon = carbonData?.history[carbonData.history.length - 1]?.value || 0;
  const currentRenewable = renewableData?.history[renewableData.history.length - 1]?.value || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <motion.header 
        className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/"
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              >
                <BackIcon />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
                  Portugal Energy Dashboard
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Real-time energy analytics
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Last updated: {format(lastUpdate, 'HH:mm:ss')}
              </span>
              <motion.button
                onClick={fetchData}
                disabled={loading}
                className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors disabled:opacity-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <motion.div
                  animate={loading ? { rotate: 360 } : {}}
                  transition={loading ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
                >
                  <RefreshIcon />
                </motion.div>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Metrics Overview */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MetricCard
            title="Current Carbon Intensity"
            value={currentCarbon}
            unit="gCO₂/kWh"
            icon={<CarbonIcon />}
            trend={currentCarbon > 150 ? 'up' : currentCarbon < 100 ? 'down' : 'neutral'}
          />
          
          <MetricCard
            title="Current Renewable %"
            value={currentRenewable}
            unit="%"
            icon={<RenewableIcon />}
            trend={currentRenewable > 80 ? 'up' : currentRenewable < 60 ? 'down' : 'neutral'}
          />
          
          <MetricCard
            title="Carbon Prediction"
            value={carbonData?.prediction_class !== undefined ? 
              PREDICTION_CLASSES.carbon_intensity[carbonData.prediction_class as keyof typeof PREDICTION_CLASSES.carbon_intensity].label : 
              'Loading...'
            }
            icon={<CarbonIcon />}
          />
          
          <MetricCard
            title="Renewable Prediction"
            value={renewableData?.prediction_class !== undefined ? 
              PREDICTION_CLASSES.renewable_percentage[renewableData.prediction_class as keyof typeof PREDICTION_CLASSES.renewable_percentage].label : 
              'Loading...'
            }
            icon={<RenewableIcon />}
          />
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {carbonData && (
            <ChartCard
              title="Carbon Intensity Forecast"
              data={carbonData.history}
              type="carbon_intensity"
              prediction={carbonData.prediction_class}
            />
          )}
          
          {renewableData && (
            <ChartCard
              title="Renewable Energy Percentage"
              data={renewableData.history}
              type="renewable_percentage"
              prediction={renewableData.prediction_class}
            />
          )}
        </div>

        {/* Insights Section */}
        <motion.div
          className="mt-8 bg-white dark:bg-gray-800/30 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Energy Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Carbon Intensity Status</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {carbonData && PREDICTION_CLASSES.carbon_intensity[carbonData.prediction_class as keyof typeof PREDICTION_CLASSES.carbon_intensity].description}
              </p>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Renewable Energy Status</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {renewableData && PREDICTION_CLASSES.renewable_percentage[renewableData.prediction_class as keyof typeof PREDICTION_CLASSES.renewable_percentage].description}
              </p>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}