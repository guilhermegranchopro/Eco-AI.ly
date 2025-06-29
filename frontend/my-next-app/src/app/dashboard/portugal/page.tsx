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
  Area,
  PieChart,
  Pie,
  Cell
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

// Power Breakdown Types
interface PowerBreakdownItem {
  [key: string]: number;
}

interface PowerBreakdownHistoryEntry {
  datetime: string;
  powerConsumptionBreakdown: PowerBreakdownItem;
  powerProductionBreakdown: PowerBreakdownItem;
  powerImportBreakdown: PowerBreakdownItem;
  powerExportBreakdown: PowerBreakdownItem;
  fossilFreePercentage: number;
  renewablePercentage: number;
  powerConsumptionTotal: number;
  powerProductionTotal: number;
  powerImportTotal: number;
  powerExportTotal: number;
  isEstimated: boolean;
}

interface PowerBreakdownResponse {
  zone: string;
  history: PowerBreakdownHistoryEntry[];
  latest: PowerBreakdownHistoryEntry;
}

interface PieDataPoint {
  name: string;
  value: number;
  color: string;
}

// Time frame options for pie chart data
interface TimeFrameOption {
  label: string;
  hours: number;
  description: string;
}

const TIME_FRAME_OPTIONS: TimeFrameOption[] = [
  { label: "Last Hour", hours: 1, description: "Current hour data" },
  { label: "Last 3 Hours", hours: 3, description: "Average of last 3 hours" },
  { label: "Last 6 Hours", hours: 6, description: "Average of last 6 hours" },
  { label: "Last 12 Hours", hours: 12, description: "Average of last 12 hours" },
  { label: "Last 24 Hours", hours: 24, description: "Average of all available data" },
];

// Constants
// Using internal API routes to avoid CORS issues

// Enhanced power source colors with muted tones to match dark UI theme
const POWER_SOURCE_COLORS: { [key: string]: string } = {
  // Renewables (muted eco-friendly tones with better transparency compatibility)
  'solar': '#D97706', // Muted amber for solar energy
  'wind': '#047857', // Darker eco green for wind
  'hydro': '#0891B2', // Muted blue for hydro
  'hydro discharge': '#0891B2', // Consistent cyan for hydro discharge
  'hydro pumped storage': '#2563EB', // Muted blue for pumped storage
  'biomass': '#4D7C0F', // Darker natural green for biomass
  'geothermal': '#B91C1C', // Muted earth red for geothermal
  'nuclear': '#6D28D9', // Darker purple for nuclear
  
  // Fossil fuels (muted tones to show environmental impact without being harsh)
  'gas': '#DC2626', // Muted red to indicate emissions
  'coal': '#374151', // Dark gray for coal
  'oil': '#78350F', // Darker brown for oil
  
  // Import/Export (muted professional tones)
  'imports': '#1E3A8A', // Darker blue for imports
  'exports': '#047857', // Muted eco green for exports (positive)
  
  // Other/Unknown (neutral tones that blend with dark theme)
  'unknown': '#6B7280', // Neutral gray
  'other': '#9CA3AF', // Light gray
  'battery': '#D97706', // Muted golden for battery
  'battery discharge': '#D97706', // Consistent amber for battery discharge
};

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

const ConsumptionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
  </svg>
);

const ProductionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
  </svg>
);

const ImportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

const ExportIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
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

// Enhanced Power Breakdown Pie Chart Component with Modern Minimalistic Design
const PowerBreakdownChart = ({ title, data, icon, total }: {
  title: string;
  data: PieDataPoint[];
  icon: React.ReactNode;
  total: number;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderCustomizedLabel = ({ cx, cy, midAngle, outerRadius, percent }: {
    cx: number;
    cy: number;
    midAngle: number;
    outerRadius: number;
    percent: number;
  }) => {
    if (percent < 0.08) return null; // Only show labels for segments > 8%
    
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 28; // Position labels outside the chart
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <motion.text 
        x={x} 
        y={y} 
        fill="#6B7280" 
        className="dark:fill-gray-300"
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        fontSize={10}
        fontWeight="500"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2 + percent, duration: 0.3 }}
      >
        {`${(percent * 100).toFixed(1)}%`}
      </motion.text>
    );
  };

  // Create enhanced gradient definitions for subtle glow effect on hover
  const gradientDefs = data.map((entry, index) => (
    <defs key={`gradient-${index}`}>
      <radialGradient id={`gradient-${index}`} cx="50%" cy="50%">
        <stop offset="0%" stopColor="rgba(255, 255, 255, 0.15)" />
        <stop offset="40%" stopColor={entry.color} stopOpacity="1" />
        <stop offset="100%" stopColor={entry.color} stopOpacity="0.85" />
      </radialGradient>
    </defs>
  ));

  return (
    <motion.div
      ref={ref}
      className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/30 rounded-3xl p-8 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.1, type: "spring", bounce: 0.2 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.05)"
      }}
    >
      {/* Subtle background gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          background: 'radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 80% 80%, rgba(34, 197, 94, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 20% 20%, rgba(34, 197, 94, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Minimalistic Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-700 dark:text-gray-200 shadow-lg"
            whileHover={{ scale: 1.05, rotate: 2 }}
            transition={{ type: "spring", bounce: 0.6 }}
          >
            {icon}
          </motion.div>
          <div>
            <motion.h3 
              className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {title}
            </motion.h3>
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Total: <span className="font-medium text-gray-700 dark:text-gray-300">{total.toFixed(1)} MW</span>
              </p>
              <motion.div
                className="w-1.5 h-1.5 bg-green-500 rounded-full"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Subtle status indicator */}
        <motion.div
          className="px-3 py-1 bg-green-50/80 dark:bg-green-900/30 border border-green-200/50 dark:border-green-700/50 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <div className="text-xs font-medium text-green-700 dark:text-green-300">
            Live Data
          </div>
        </motion.div>
      </div>

      {/* Modern Minimalistic Donut Chart */}
      <div className="h-80 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            {gradientDefs}
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={hoveredIndex !== null ? 125 : 120} // Slight size increase on hover
              innerRadius={75}
              fill="#8884d8"
              dataKey="value"
              animationBegin={300}
              animationDuration={1200}
              animationEasing="ease-out"
              onMouseEnter={(_, index) => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={hoveredIndex === index ? `url(#gradient-${index})` : entry.color}
                  stroke="rgba(255, 255, 255, 0.15)"
                  strokeWidth={hoveredIndex === index ? 1 : 0.5}
                  style={{
                    cursor: 'pointer',
                    transition: 'all 0.25s ease-out',
                    filter: hoveredIndex === index ? 'brightness(1.1) saturate(1.2)' : 'none'
                  }}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                color: '#1F2937',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(8px)',
                fontSize: '14px',
                padding: '8px 12px'
              }}
              formatter={(value: number, name: string) => [
                `${value.toFixed(0)} MW`, 
                name
              ]}
              labelStyle={{ color: '#059669', fontWeight: '600', marginBottom: '2px' }}
            />
          </PieChart>
        </ResponsiveContainer>

        {/* Minimalistic Center Content */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <div className="text-center">
            <motion.div
              className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-1"
              animate={{ 
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 4, 
                repeat: Infinity, 
                ease: "easeInOut"
              }}
            >
              {total.toFixed(0)}
            </motion.div>
            <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">
              MW Total
            </div>
          </div>
        </motion.div>
      </div>

      {/* Clean, Minimalistic Legend */}
      <div className="mt-8 space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
        {data.map((entry, index) => (
          <motion.div
            key={index}
            className="flex items-center justify-between p-3 rounded-2xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-sm border border-white/20 dark:border-gray-700/20 hover:bg-white/60 dark:hover:bg-gray-800/60 transition-all duration-300 cursor-pointer group"
            whileHover={{ scale: 1.01, x: 2 }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + index * 0.05, duration: 0.4 }}
          >
            <div className="flex items-center space-x-3">
              <motion.div 
                className="w-3 h-3 rounded-full border border-white/20"
                style={{ backgroundColor: entry.color }}
                animate={hoveredIndex === index ? { 
                  scale: 1.15,
                  filter: 'brightness(1.2) saturate(1.3)'
                } : { 
                  scale: 1,
                  filter: 'none'
                }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.2 }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                {entry.name}
              </span>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {entry.value.toFixed(0)} MW
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {((entry.value / total) * 100).toFixed(1)}%
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// Minimalistic Time Frame Selector Component
const TimeFrameSelector = ({ selectedTimeFrame, onTimeFrameChange }: {
  selectedTimeFrame: TimeFrameOption;
  onTimeFrameChange: (timeFrame: TimeFrameOption) => void;
}) => {
  return (
    <motion.div
      className="backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/30 rounded-3xl p-6 mb-8 shadow-xl"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <motion.h3 
            className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Power Breakdown Time Frame
          </motion.h3>
          <motion.p 
            className="text-sm text-gray-500 dark:text-gray-400"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {selectedTimeFrame.description}
          </motion.p>
        </div>
        
        <motion.div 
          className="flex flex-wrap gap-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {TIME_FRAME_OPTIONS.map((option, index) => (
            <motion.button
              key={option.hours}
              onClick={() => onTimeFrameChange(option)}
              className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-all duration-300 backdrop-blur-sm border ${
                selectedTimeFrame.hours === option.hours
                  ? 'bg-green-500/90 text-white border-green-400/50 shadow-lg shadow-green-500/25'
                  : 'bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 hover:border-gray-300/50 dark:hover:border-gray-600/50'
              }`}
              whileHover={{ 
                scale: 1.05,
                boxShadow: selectedTimeFrame.hours === option.hours 
                  ? "0 10px 25px -5px rgba(34, 197, 94, 0.3)"
                  : "0 4px 15px -2px rgba(0, 0, 0, 0.1)"
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.05, duration: 0.3 }}
            >
              {option.label}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

// Minimalistic Zero Data Animation Component
const ZeroDataAnimation = ({ title, icon, timeFrame }: {
  title: string;
  icon: React.ReactNode;
  timeFrame: string;
}) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <motion.div
      ref={ref}
      className="relative backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border border-white/20 dark:border-gray-700/30 rounded-3xl p-8 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, y: 40, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay: 0.1, type: "spring", bounce: 0.2 }}
    >
      {/* Subtle background gradient overlay */}
      <motion.div
        className="absolute inset-0 opacity-20 dark:opacity-10"
        style={{
          background: 'radial-gradient(circle at 50% 50%, rgba(107, 114, 128, 0.1) 0%, transparent 50%)',
        }}
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(107, 114, 128, 0.1) 0%, transparent 50%)',
            'radial-gradient(circle at 30% 70%, rgba(107, 114, 128, 0.08) 0%, transparent 50%)',
            'radial-gradient(circle at 50% 50%, rgba(107, 114, 128, 0.1) 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Minimalistic Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <div className="flex items-center space-x-4">
          <motion.div 
            className="p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200/50 dark:border-gray-600/50 rounded-2xl text-gray-400 dark:text-gray-500 shadow-lg"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={inView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 0.3, type: "spring", bounce: 0.4 }}
          >
            {icon}
          </motion.div>
          <div>
            <motion.h3 
              className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {title}
            </motion.h3>
            <motion.p 
              className="text-sm text-gray-500 dark:text-gray-400"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Total: 0 MW
            </motion.p>
          </div>
        </div>

        {/* Status indicator */}
        <motion.div
          className="px-3 py-1 bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/50 dark:border-gray-600/50 rounded-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
            No Data
          </div>
        </motion.div>
      </div>

      <div className="h-80 flex flex-col items-center justify-center">
        {/* Minimalistic Zero Data Visualization */}
        <motion.div
          className="relative"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {/* Outer Circle with subtle animation */}
          <motion.div
            className="w-24 h-24 border-2 border-gray-200/60 dark:border-gray-600/60 rounded-full flex items-center justify-center backdrop-blur-sm"
            animate={{ 
              rotate: [0, 360],
              borderColor: [
                "rgba(156, 163, 175, 0.3)",
                "rgba(156, 163, 175, 0.5)", 
                "rgba(156, 163, 175, 0.3)"
              ]
            }}
            transition={{ 
              rotate: { duration: 12, repeat: Infinity, ease: "linear" },
              borderColor: { duration: 3, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            {/* Inner animated dots */}
            <motion.div
              className="relative w-16 h-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-1.5 h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full"
                  style={{
                    top: '50%',
                    left: '50%',
                    transformOrigin: '0 0',
                  }}
                  initial={{ 
                    rotate: i * 120,
                    x: -3,
                    y: -3,
                    scale: 0 
                  }}
                  animate={{ 
                    rotate: i * 120,
                    x: -3,
                    y: -3,
                    scale: [0, 1, 0] 
                  }}
                  transition={{
                    scale: {
                      duration: 2.5,
                      repeat: Infinity,
                      delay: i * 0.4,
                      ease: "easeInOut"
                    }
                  }}
                />
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Minimalistic message */}
        <motion.div
          className="text-center mt-8 space-y-3"
          initial={{ y: 20, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
        >
          <h4 className="text-base font-medium text-gray-600 dark:text-gray-400">
            No Data Available
          </h4>
          <p className="text-sm text-gray-500 dark:text-gray-500 max-w-xs mx-auto leading-relaxed">
            No {title.toLowerCase()} activity recorded during the {timeFrame.toLowerCase()}.
          </p>
          
          {/* Subtle pulse effect */}
          <motion.div
            className="w-16 h-0.5 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mx-auto mt-6 rounded-full"
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ 
              scaleX: [0, 1, 0],
              opacity: [0, 0.6, 0]
            }}
            transition={{ 
              duration: 3, 
              repeat: Infinity, 
              ease: "easeInOut",
              delay: 1.5
            }}
          />
        </motion.div>
      </div>

      {/* Clean suggestion text */}
      <motion.div 
        className="mt-6 text-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div className="text-xs text-gray-400 dark:text-gray-500 bg-gray-50/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-xl px-4 py-2 border border-gray-200/30 dark:border-gray-700/30">
          Try selecting a different time frame to view data from other periods.
        </div>
      </motion.div>
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
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
                color: '#1F2937',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                fontSize: '14px'
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
  const [powerBreakdownData, setPowerBreakdownData] = useState<PowerBreakdownResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [selectedTimeFrame, setSelectedTimeFrame] = useState<TimeFrameOption>(TIME_FRAME_OPTIONS[0]); // Default to "Last Hour"

  // Helper function to process power breakdown data for pie charts based on time frame
  const processPowerData = (breakdown: PowerBreakdownItem, total: number): PieDataPoint[] => {
    if (!breakdown || total === 0) return [];
    
    return Object.entries(breakdown)
      .filter(([, value]) => value > 0)
      .map(([source, value]) => ({
        name: source.charAt(0).toUpperCase() + source.slice(1),
        value: value,
        color: POWER_SOURCE_COLORS[source.toLowerCase()] || POWER_SOURCE_COLORS['other']
      }))
      .sort((a, b) => b.value - a.value);
  };

  // Helper function to aggregate power breakdown data over a time period
  const aggregatePowerDataByTimeFrame = (history: PowerBreakdownHistoryEntry[], hours: number) => {
    if (!history || history.length === 0) return null;

    // Get the most recent entries based on selected hours
    const recentEntries = history.slice(-hours);
    
    if (recentEntries.length === 0) return null;

    // If only one entry (Last Hour), return that entry
    if (hours === 1) {
      return recentEntries[recentEntries.length - 1];
    }

    // For multiple hours, calculate averages
    const aggregated = {
      datetime: recentEntries[recentEntries.length - 1].datetime, // Use latest datetime
      powerConsumptionBreakdown: {} as PowerBreakdownItem,
      powerProductionBreakdown: {} as PowerBreakdownItem,
      powerImportBreakdown: {} as PowerBreakdownItem,
      powerExportBreakdown: {} as PowerBreakdownItem,
      fossilFreePercentage: 0,
      renewablePercentage: 0,
      powerConsumptionTotal: 0,
      powerProductionTotal: 0,
      powerImportTotal: 0,
      powerExportTotal: 0,
      isEstimated: false,
    };

    // Aggregate all breakdown categories
    const breakdownCategories = [
      'powerConsumptionBreakdown',
      'powerProductionBreakdown', 
      'powerImportBreakdown',
      'powerExportBreakdown'
    ] as const;

    breakdownCategories.forEach(category => {
      const sourceData: { [key: string]: number[] } = {};
      
      recentEntries.forEach(entry => {
        const breakdown = entry[category];
        if (breakdown) {
          Object.entries(breakdown).forEach(([source, value]) => {
            if (value !== null && value !== undefined) {
              if (!sourceData[source]) sourceData[source] = [];
              sourceData[source].push(value);
            }
          });
        }
      });

      // Calculate averages for each source
      Object.entries(sourceData).forEach(([source, values]) => {
        const validValues = values.filter(v => v >= 0); // Filter out negative values for averages
        if (validValues.length > 0) {
          aggregated[category][source] = validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
        }
      });
    });

    // Calculate average totals and percentages
    const validEntries = recentEntries.filter(entry => 
      entry.powerConsumptionTotal !== null && 
      entry.powerProductionTotal !== null
    );

    if (validEntries.length > 0) {
      aggregated.powerConsumptionTotal = validEntries.reduce((sum, entry) => sum + entry.powerConsumptionTotal, 0) / validEntries.length;
      aggregated.powerProductionTotal = validEntries.reduce((sum, entry) => sum + entry.powerProductionTotal, 0) / validEntries.length;
      aggregated.powerImportTotal = validEntries.reduce((sum, entry) => sum + entry.powerImportTotal, 0) / validEntries.length;
      aggregated.powerExportTotal = validEntries.reduce((sum, entry) => sum + entry.powerExportTotal, 0) / validEntries.length;
      aggregated.fossilFreePercentage = validEntries.reduce((sum, entry) => sum + (entry.fossilFreePercentage || 0), 0) / validEntries.length;
      aggregated.renewablePercentage = validEntries.reduce((sum, entry) => sum + (entry.renewablePercentage || 0), 0) / validEntries.length;
      aggregated.isEstimated = recentEntries.some(entry => entry.isEstimated);
    }

    return aggregated;
  };

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('🔄 Fetching data from internal API routes');

      const [carbonResponse, renewableResponse, powerBreakdownResponse] = await Promise.all([
        fetch('/api/carbon-intensity', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        fetch('/api/renewable-percentage', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        fetch('/api/power-breakdown', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      ]);

      console.log('📡 Response status:', {
        carbon: carbonResponse.status,
        renewable: renewableResponse.status,
        powerBreakdown: powerBreakdownResponse.status
      });

      if (!carbonResponse.ok || !renewableResponse.ok || !powerBreakdownResponse.ok) {
        throw new Error(`Failed to fetch data from API. Carbon: ${carbonResponse.status}, Renewable: ${renewableResponse.status}, Power: ${powerBreakdownResponse.status}`);
      }

      const carbonData = await carbonResponse.json();
      const renewableData = await renewableResponse.json();
      const powerBreakdownData = await powerBreakdownResponse.json();

      console.log('✅ Data received:', {
        carbonData: carbonData ? 'Success' : 'Failed',
        renewableData: renewableData ? 'Success' : 'Failed',
        powerBreakdownData: powerBreakdownData ? 'Success' : 'Failed'
      });

      setCarbonData(carbonData);
      setRenewableData(renewableData);
      setPowerBreakdownData(powerBreakdownData);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('❌ Fetch error:', err);
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

  if (loading && !carbonData && !renewableData && !powerBreakdownData) {
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

  if (error && !carbonData && !renewableData && !powerBreakdownData) {
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
  
  // Power breakdown metrics based on selected time frame
  const aggregatedPowerData = powerBreakdownData ? 
    aggregatePowerDataByTimeFrame(powerBreakdownData.history, selectedTimeFrame.hours) : null;
  
  const currentConsumption = aggregatedPowerData?.powerConsumptionTotal || 0;
  const currentProduction = aggregatedPowerData?.powerProductionTotal || 0;
  const currentImport = aggregatedPowerData?.powerImportTotal || 0;
  const currentExport = aggregatedPowerData?.powerExportTotal || 0;

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
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <MetricCard
            title="Carbon Intensity"
            value={currentCarbon}
            unit="gCO₂/kWh"
            icon={<CarbonIcon />}
            trend={currentCarbon > 150 ? 'up' : currentCarbon < 100 ? 'down' : 'neutral'}
          />
          
          <MetricCard
            title="Renewable %"
            value={currentRenewable}
            unit="%"
            icon={<RenewableIcon />}
            trend={currentRenewable > 80 ? 'up' : currentRenewable < 60 ? 'down' : 'neutral'}
          />
          
          <MetricCard
            title="Consumption"
            value={parseFloat(currentConsumption.toFixed(1))}
            unit="MW"
            icon={<ConsumptionIcon />}
            trend="neutral"
          />
          
          <MetricCard
            title="Production"
            value={parseFloat(currentProduction.toFixed(1))}
            unit="MW"
            icon={<ProductionIcon />}
            trend="neutral"
          />
          
          <MetricCard
            title="Import"
            value={parseFloat(currentImport.toFixed(1))}
            unit="MW"
            icon={<ImportIcon />}
            trend={currentImport > 1000 ? 'up' : 'neutral'}
          />
          
          <MetricCard
            title="Export"
            value={parseFloat(currentExport.toFixed(1))}
            unit="MW"
            icon={<ExportIcon />}
            trend={currentExport > 500 ? 'up' : 'neutral'}
          />
        </motion.div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
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

        {/* Power Breakdown Charts */}
        {powerBreakdownData && aggregatedPowerData && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Power Breakdown Analysis
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Power generation, consumption, and trade breakdown for Portugal
              </p>
            </div>
            
            {/* Time Frame Selector */}
            <TimeFrameSelector
              selectedTimeFrame={selectedTimeFrame}
              onTimeFrameChange={setSelectedTimeFrame}
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Consumption Breakdown */}
              <motion.div
                key={`consumption-container-${selectedTimeFrame.hours}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
              >
                {aggregatedPowerData.powerConsumptionBreakdown && currentConsumption > 0 ? (
                  <PowerBreakdownChart
                    key={`consumption-${selectedTimeFrame.hours}`}
                    title={`Power Consumption - ${selectedTimeFrame.label}`}
                    data={processPowerData(aggregatedPowerData.powerConsumptionBreakdown, currentConsumption)}
                    icon={<ConsumptionIcon />}
                    total={currentConsumption}
                  />
                ) : (
                  <ZeroDataAnimation
                    key={`consumption-zero-${selectedTimeFrame.hours}`}
                    title={`Power Consumption - ${selectedTimeFrame.label}`}
                    icon={<ConsumptionIcon />}
                    timeFrame={selectedTimeFrame.label}
                  />
                )}
              </motion.div>
              
              {/* Production Breakdown */}
              <motion.div
                key={`production-container-${selectedTimeFrame.hours}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                {aggregatedPowerData.powerProductionBreakdown && currentProduction > 0 ? (
                  <PowerBreakdownChart
                    key={`production-${selectedTimeFrame.hours}`}
                    title={`Power Production - ${selectedTimeFrame.label}`}
                    data={processPowerData(aggregatedPowerData.powerProductionBreakdown, currentProduction)}
                    icon={<ProductionIcon />}
                    total={currentProduction}
                  />
                ) : (
                  <ZeroDataAnimation
                    key={`production-zero-${selectedTimeFrame.hours}`}
                    title={`Power Production - ${selectedTimeFrame.label}`}
                    icon={<ProductionIcon />}
                    timeFrame={selectedTimeFrame.label}
                  />
                )}
              </motion.div>
              
              {/* Import Breakdown - Always show either chart or zero animation */}
              <motion.div
                key={`import-container-${selectedTimeFrame.hours}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {aggregatedPowerData.powerImportBreakdown && currentImport > 0 ? (
                  <PowerBreakdownChart
                    key={`import-${selectedTimeFrame.hours}`}
                    title={`Power Imports - ${selectedTimeFrame.label}`}
                    data={processPowerData(aggregatedPowerData.powerImportBreakdown, currentImport)}
                    icon={<ImportIcon />}
                    total={currentImport}
                  />
                ) : (
                  <ZeroDataAnimation
                    key={`import-zero-${selectedTimeFrame.hours}`}
                    title={`Power Imports - ${selectedTimeFrame.label}`}
                    icon={<ImportIcon />}
                    timeFrame={selectedTimeFrame.label}
                  />
                )}
              </motion.div>
              
              {/* Export Breakdown - Always show either chart or zero animation */}
              <motion.div
                key={`export-container-${selectedTimeFrame.hours}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {aggregatedPowerData.powerExportBreakdown && currentExport > 0 ? (
                  <PowerBreakdownChart
                    key={`export-${selectedTimeFrame.hours}`}
                    title={`Power Exports - ${selectedTimeFrame.label}`}
                    data={processPowerData(aggregatedPowerData.powerExportBreakdown, currentExport)}
                    icon={<ExportIcon />}
                    total={currentExport}
                  />
                ) : (
                  <ZeroDataAnimation
                    key={`export-zero-${selectedTimeFrame.hours}`}
                    title={`Power Exports - ${selectedTimeFrame.label}`}
                    icon={<ExportIcon />}
                    timeFrame={selectedTimeFrame.label}
                  />
                )}
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Insights Section */}
        <motion.div
          className="mt-8 bg-white dark:bg-gray-800/30 backdrop-blur-md border border-gray-200 dark:border-gray-700/50 rounded-xl p-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Energy Insights & Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900 dark:text-gray-100">Energy Balance</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {powerBreakdownData ? (
                  currentProduction > currentConsumption ? 
                  `Portugal is exporting ${(currentProduction - currentConsumption).toFixed(0)} MW` :
                  `Portugal is importing ${(currentConsumption - currentProduction).toFixed(0)} MW`
                ) : 'Loading energy balance data...'}
              </p>
            </div>
          </div>
          
          {/* Additional Power Insights */}
          {powerBreakdownData && aggregatedPowerData && (
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3">Power Breakdown Summary</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {(aggregatedPowerData.renewablePercentage * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Renewable</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {(aggregatedPowerData.fossilFreePercentage * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Fossil Free</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {((currentExport / (currentProduction || 1)) * 100).toFixed(1)}%
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Export Ratio</div>
                </div>
                <div className="text-center p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="font-semibold text-gray-900 dark:text-gray-100">
                    {aggregatedPowerData.isEstimated ? 'Est.' : 'Real'}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">Data Type</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}