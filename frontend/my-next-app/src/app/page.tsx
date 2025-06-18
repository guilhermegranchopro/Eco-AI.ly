"use client";
import React, { useState, useEffect, useRef, ReactNode, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import CarbonIntensityCard from '@/app/components/cards/CarbonIntensityCard';


// ===============================
// OPTIMIZED REACTIVE PARTICLE SYSTEM
// ===============================
const ReactiveParticleSystem = React.memo(() => {
  const [isInteracting, setIsInteracting] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle hydration to prevent SSR/client mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate particles only after mounting to avoid hydration issues
  const particles = useMemo(() => {
    if (!mounted) return [];
    return Array.from({ length: 25 }, (_, i) => ({ // Reduced from 80 to 25
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2, // Slightly larger particles
      opacity: Math.random() * 0.4 + 0.3, // More visible
      duration: Math.random() * 20 + 15, // Slower animations
      delay: Math.random() * 10,
      hue: Math.random() * 360,
    }));
  }, [mounted]);

  // Pre-calculate deterministic movement values for particles to avoid hydration issues
  const particleMovements = useMemo(() => [0, 20, -15, 10, -8, 25, -12, 18, -6, 30, -20, 15, -10, 22, -18, 8, -25, 12, -5, 28, -16, 14, -9, 26, -13], []);

  // Throttled event handlers
  const handleInteractionStart = useCallback(() => setIsInteracting(true), []);
  const handleInteractionEnd = useCallback(() => setIsInteracting(false), []);

  useEffect(() => {
    if (!mounted) return;
    
    // Use passive listeners for better performance
    window.addEventListener('mousedown', handleInteractionStart, { passive: true });
    window.addEventListener('mouseup', handleInteractionEnd, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handleInteractionStart);
      window.removeEventListener('mouseup', handleInteractionEnd);
    };
  }, [handleInteractionStart, handleInteractionEnd, mounted]);

  // Don't render particles until mounted to prevent hydration issues
  if (!mounted) {
    return <div className="fixed inset-0 pointer-events-none z-10 overflow-hidden" />;
  }

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `hsl(${particle.hue}, 70%, 60%)`,
            filter: 'blur(1px)', // Reduced blur for better performance
            boxShadow: `0 0 ${particle.size * 1.5}px hsla(${particle.hue}, 70%, 60%, 0.4)`,
          }}
          animate={{
            y: [0, -100, 0], // Reduced movement range
            x: [0, particleMovements[particle.id] || 0, 0], // Use fixed values instead of Math.sin
            scale: isInteracting ? [1, 1.5, 1] : [1, 1.2, 1], // Reduced scale changes
            opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear", // Changed to linear for better performance
            delay: particle.delay,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
});

ReactiveParticleSystem.displayName = 'ReactiveParticleSystem';

// ===============================
// OPTIMIZED LIQUID ENERGY FLOWS
// ===============================
const LiquidEnergyFlows = React.memo(() => {
  // Pre-calculate deterministic movement values to avoid hydration issues
  const movementPatterns = [0, 15, -10, 8, -5, 12]; // Fixed values instead of Math.sin
  const energyOrbMovements = [0, 30, -20, 40]; // Fixed values for energy orbs
  
  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Reduced liquid energy streams */}
      {Array.from({ length: 6 }, (_, i) => ( // Reduced from 12 to 6
        <motion.div
          key={`liquid-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 15}%`,
            top: '-10%',
            width: '2px',
            height: '120%',
            background: `linear-gradient(180deg, 
              transparent 0%, 
              hsla(${120 + i * 60}, 70%, 60%, 0.6) 30%, 
              hsla(${180 + i * 60}, 80%, 70%, 0.4) 50%, 
              hsla(${240 + i * 60}, 70%, 60%, 0.6) 70%, 
              transparent 100%)`,
          }}
          animate={{
            scaleY: [1, 1.3, 0.9, 1.1, 1],
            opacity: [0.4, 0.7, 0.3, 0.6, 0.4],
            x: [0, movementPatterns[i] || 0, 0], // Use fixed values
          }}
          transition={{
            duration: 12 + i * 3, // Slower animations
            repeat: Infinity,
            ease: "linear",
            delay: i * 1,
          }}
        />
      ))}
      
      {/* Reduced energy orbs */}
      {Array.from({ length: 4 }, (_, i) => ( // Reduced from 8 to 4
        <motion.div
          key={`energy-orb-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${12 + i * 3}px`,
            height: `${12 + i * 3}px`,
            left: `${15 + i * 20}%`,
            background: `radial-gradient(circle, 
              hsla(${i * 90}, 80%, 70%, 0.8) 0%, 
              hsla(${i * 90 + 60}, 70%, 60%, 0.4) 50%, 
              transparent 100%)`,
            filter: 'blur(2px)',
            boxShadow: `0 0 ${15 + i * 3}px hsla(${i * 90}, 80%, 70%, 0.6)`,
          }}
          animate={{
            y: ['100vh', '-20vh'],
            x: [0, energyOrbMovements[i] || 0, 0], // Use fixed values
            scale: [0.8, 1.2, 0.8],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 20 + i * 5, // Much slower
            repeat: Infinity,
            ease: "linear",
            delay: i * 3,
          }}
        />
      ))}
    </div>
  );
});

LiquidEnergyFlows.displayName = 'LiquidEnergyFlows';

// ===============================
// OPTIMIZED INTERACTIVE ENERGY WAVES
// ===============================
const InteractiveEnergyWaves = React.memo(() => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  // Throttle mouse move events for better performance
  const throttledMouseMove = useCallback((e: MouseEvent) => {
    setMousePosition({
      x: (e.clientX / window.innerWidth) * 100,
      y: (e.clientY / window.innerHeight) * 100,
    });
  }, []);

  useEffect(() => {
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    // Throttle the mouse move event manually
    let lastCallTime = 0;
    const throttledHandler = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastCallTime >= 50) { // 50ms throttle
        throttledMouseMove(e);
        lastCallTime = now;
      }
    };

    window.addEventListener('mousemove', throttledHandler, { passive: true });
    document.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      window.removeEventListener('mousemove', throttledHandler);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [throttledMouseMove]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      {/* Reduced reactive wave rings */}
      {Array.from({ length: 3 }, (_, i) => ( // Reduced from 5 to 3
        <motion.div
          key={`wave-${i}`}
          className="absolute border rounded-full"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            width: `${(i + 1) * 80}px`, // Smaller waves
            height: `${(i + 1) * 80}px`,
            marginLeft: `${-(i + 1) * 40}px`,
            marginTop: `${-(i + 1) * 40}px`,
            borderColor: `hsla(${180 + i * 60}, 70%, 60%, ${0.5 - i * 0.15})`,
            borderWidth: '1px',
            filter: `blur(${i + 1}px)`,
          }}
          animate={{
            scale: isHovering ? [1, 1.5, 1] : [1, 1.2, 1], // Reduced scale changes
            opacity: isHovering ? [0.6, 0.2, 0.6] : [0.3, 0.1, 0.3],
          }}
          transition={{
            duration: 6 + i * 2, // Slower animations
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Simplified energy pulse center */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          width: '16px',
          height: '16px',
          marginLeft: '-8px',
          marginTop: '-8px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)',
          filter: 'blur(2px)',
        }}
        animate={{
          scale: isHovering ? [1, 2, 1] : [1, 1.5, 1],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
});

InteractiveEnergyWaves.displayName = 'InteractiveEnergyWaves';

// ===============================
// OPTIMIZED FLOATING ORB COMPONENT
// ===============================
interface FloatingOrbProps {
  size?: number;
  color?: "cyan" | "purple" | "green" | "pink";
  delay?: number;
  x?: string;
  y?: string;
}

const FloatingOrb = React.memo<FloatingOrbProps>(({ size = 150, color = "cyan", delay = 0, x = "50%", y = "50%" }) => (
  <motion.div
    className={`absolute rounded-full opacity-15 pointer-events-none mix-blend-screen
      ${color === 'cyan' ? 'from-cyan-400' : 
        color === 'purple' ? 'from-purple-400' : 
        color === 'green' ? 'from-green-400' : 
        'from-pink-400'
      }`}
    style={{
      width: size,
      height: size,
      left: x,
      top: y,
      background: `radial-gradient(circle, var(--tw-gradient-from), transparent)`,
      filter: 'blur(20px)', // Reduced blur complexity
    }}
    animate={{
      scale: [1, 1.3, 0.9, 1.1, 1], // Simplified animation
      x: [0, 60, -30, 50, 0], // Reduced movement
      y: [0, -50, 80, -25, 0],
    }}
    transition={{
      duration: 30, // Slower animation
      repeat: Infinity,
      ease: "linear",
      delay,
    }}
  />
));

FloatingOrb.displayName = 'FloatingOrb';

// ===============================
// ENHANCED SVG ICONS WITH LIQUID ANIMATIONS
// ===============================
const PredictiveAnalyticsIcon = () => (
  <motion.div className="relative">
    <motion.svg
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-16 h-16 mb-4 text-transparent"
      whileHover={{ scale: 1.2, rotate: 5 }}
      animate={{ 
        filter: ["hue-rotate(0deg)", "hue-rotate(360deg)", "hue-rotate(0deg)"],
      }}
      transition={{ 
        filter: { duration: 8, repeat: Infinity, ease: "linear" },
        hover: { type: "spring", stiffness: 400 }
      }}
      style={{
        stroke: "url(#gradientPredictive)",
        filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))",
      }}
    >
      <defs>
        <linearGradient id="gradientPredictive" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      <motion.path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M3.75 13.5l3.045-3.045m0 0A18.75 18.75 0 0121.5 12M6.795 10.455A18.75 18.75 0 002.5 12m4.295-1.545l2.016 2.016m-2.016-2.016L6.75 8.25m2.016 4.268L6.75 10.455m1.06 6.273l2.016-2.016m-2.016 2.016L6.75 16.75m2.016-4.268L6.75 14.732m9-3.232h.008v.008H15.75V11.5m0 2.25h.008v.008H15.75V13.75m0 2.25h.008v.008H15.75V16m0 2.25h.008v.008H15.75V18.25M12 11.5h.008v.008H12V11.5m0 2.25h.008v.008H12V13.75m0 2.25h.008v.008H12V16m0 2.25h.008v.008H12V18.25m-3.75-6.75h.008v.008H8.25V11.5m0 2.25h.008v.008H8.25V13.75m0 2.25h.008v.008H8.25V16m0 2.25h.008v.008H8.25V18.25M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </motion.svg>
    <motion.div
      className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-cyan-400/20 filter blur-xl"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.6, 0.3],
      }}
      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const DataVisualizationIcon = () => (
  <motion.div className="relative">
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-16 h-16 mb-4"
      whileHover={{ scale: 1.2, y: -5 }}
      animate={{ 
        filter: ["hue-rotate(0deg)", "hue-rotate(360deg)", "hue-rotate(0deg)"],
      }}
      transition={{ 
        filter: { duration: 6, repeat: Infinity, ease: "linear" },
        hover: { type: "spring", stiffness: 400 }
      }}
      style={{
        stroke: "url(#gradientData)",
        filter: "drop-shadow(0 0 20px rgba(56, 189, 248, 0.5))",
      }}
    >
      <defs>
        <linearGradient id="gradientData" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <motion.path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
      />
    </motion.svg>
    <motion.div
      className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-purple-400/20 filter blur-xl"
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.2, 0.5, 0.2],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const AIPoweredInsightsIcon = () => (
  <motion.div className="relative">
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-16 h-16 mb-4"
      whileHover={{ scale: 1.2, rotate: 10 }}
      animate={{ 
        filter: ["hue-rotate(0deg)", "hue-rotate(360deg)", "hue-rotate(0deg)"],
      }}
      transition={{ 
        filter: { duration: 5, repeat: Infinity, ease: "linear" },
        hover: { type: "spring", stiffness: 400 }
      }}
      style={{
        stroke: "url(#gradientAI)",
        filter: "drop-shadow(0 0 25px rgba(168, 85, 247, 0.6))",
      }}
    >
      <defs>
        <linearGradient id="gradientAI" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <motion.path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M12 3v1.5M12 21v-1.5M12 8.25v7.5M15.75 3v1.5M15.75 21v-1.5M19.5 8.25H12M19.5 15.75H12"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 1 }}
      />
      <motion.circle
        cx="12"
        cy="12"
        r="3"
        fill="none"
        stroke="url(#gradientAI)"
        strokeWidth="2"
        initial={{ scale: 0 }}
        animate={{ 
          scale: [0, 1.2, 1],
          opacity: [0, 1, 0.8],
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut",
          delay: 1.5 
        }}
      />
    </motion.svg>
    <motion.div
      className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/30 to-pink-400/30 filter blur-xl"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.3, 0.7, 0.3],
        rotate: [0, -180, 0],
      }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const BackendTechIcon = () => (
  <motion.div className="relative">
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-16 h-16 mb-4"
      whileHover={{ scale: 1.2, x: -3 }}
      animate={{ 
        filter: ["hue-rotate(0deg)", "hue-rotate(360deg)", "hue-rotate(0deg)"],
      }}
      transition={{ 
        filter: { duration: 7, repeat: Infinity, ease: "linear" },
        hover: { type: "spring", stiffness: 400 }
      }}
      style={{
        stroke: "url(#gradientBackend)",
        filter: "drop-shadow(0 0 20px rgba(34, 197, 94, 0.5))",
      }}
    >
      <defs>
        <linearGradient id="gradientBackend" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="50%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
      <motion.path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut", delay: 1.5 }}
      />
    </motion.svg>
    <motion.div
      className="absolute inset-0 rounded-full bg-gradient-to-r from-green-400/20 to-blue-400/20 filter blur-xl"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.2, 0.6, 0.2],
      }}
      transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const FrontendTechIcon = () => (
  <motion.div className="relative">
    <motion.svg 
      xmlns="http://www.w3.org/2000/svg" 
      fill="none" 
      viewBox="0 0 24 24" 
      strokeWidth={1.5} 
      stroke="currentColor" 
      className="w-16 h-16 mb-4"
      whileHover={{ scale: 1.2, y: -3 }}
      animate={{ 
        filter: ["hue-rotate(0deg)", "hue-rotate(360deg)", "hue-rotate(0deg)"],
      }}
      transition={{ 
        filter: { duration: 9, repeat: Infinity, ease: "linear" },
        hover: { type: "spring", stiffness: 400 }
      }}
      style={{
        stroke: "url(#gradientFrontend)",
        filter: "drop-shadow(0 0 20px rgba(236, 72, 153, 0.5))",
      }}
    >
      <defs>
        <linearGradient id="gradientFrontend" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="50%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
      </defs>
      <motion.path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.16 12.75M9.75 3.104A2.25 2.25 0 0112 4.5h5.25a2.25 2.25 0 012.25 2.25v4.072a2.25 2.25 0 01-.659 1.591L14.84 12.75M9.75 3.104A2.25 2.25 0 007.5 4.5H2.25a2.25 2.25 0 00-2.25 2.25v4.072a2.25 2.25 0 00.659 1.591L5.16 12.75m0 0L2.25 15M5.16 12.75l2.595-2.595m0 0A2.25 2.25 0 019.75 8.25v0M14.84 12.75l2.595 2.595m0 0A2.25 2.25 0 0014.25 18v0M14.84 12.75L12 15.165m2.84-2.415L12 10.155M12 10.155L9.16 12.75"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, ease: "easeInOut", delay: 2 }}
      />
      <motion.path 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        d="M9.75 15.75H14.25"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeInOut", delay: 3 }}
      />
    </motion.svg>
    <motion.div
      className="absolute inset-0 rounded-full bg-gradient-to-r from-pink-400/20 to-cyan-400/20 filter blur-xl"
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.3, 0.5, 0.3],
        rotate: [0, 360, 0],
      }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const ArrowRightIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
  </svg>
);

const MenuIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
  </svg>
);

const CloseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const GitHubIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

// Animation Variants
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  initial: {},
  animate: { transition: { staggerChildren: 0.1 } },
};

// ===============================
// REVOLUTIONARY ANIMATED DIVIDER
// ===============================
const AnimatedDivider = () => {
  return (
    <div className="w-full max-w-6xl mx-auto my-20 md:my-32 px-4 relative">
      {/* Main divider line */}
      <motion.div className="h-px relative overflow-hidden bg-gradient-to-r from-transparent via-gray-600/50 to-transparent">
        {/* Flowing gradient lines */}
        <motion.div
          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          initial={{ x: "-101%" }}
          animate={{ x: "101%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 0,
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-purple-600 to-transparent"
          initial={{ x: "-101%" }}
          animate={{ x: "101%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 2,
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-green-500 to-transparent"
          initial={{ x: "-101%" }}
          animate={{ x: "101%" }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
            delay: 4,
          }}
        />
      </motion.div>
      
      {/* Floating orbs around the divider */}
      <motion.div
        className="absolute -top-2 left-1/4 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full filter blur-sm"
        animate={{
          y: [-8, 8, -8],
          opacity: [0.4, 0.8, 0.4],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -top-1 right-1/3 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full filter blur-sm"
        animate={{
          y: [-6, 6, -6],
          opacity: [0.3, 0.7, 0.3],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute -top-3 right-1/4 w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full filter blur-sm"
        animate={{
          y: [-4, 4, -4],
          opacity: [0.5, 0.9, 0.5],
          scale: [0.7, 1.3, 0.7],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      />
    </div>
  );
};

// ===============================
// REVOLUTIONARY INTERACTIVE CARD
// ===============================
const InteractiveCard = ({ children, className }: { children: ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Advanced transforms for 3D effects
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [15, -15]), { stiffness: 400, damping: 30 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-15, 15]), { stiffness: 400, damping: 30 });
  
  // Glare effect transforms
  const glareX = useTransform(mouseX, [0, 1], ['-200%', '200%']);
  const glareY = useTransform(mouseY, [0, 1], ['-200%', '200%']);
  const glareOpacity = useTransform(mouseX, [0, 0.5, 1], [0, 0.4, 0]);
  
  // Color shift based on mouse position
  const hue = useTransform(mouseX, [0, 1], [0, 360]);
  
  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width);
      mouseY.set((event.clientY - rect.top) / rect.height);
    }
  }, [mouseX, mouseY]);

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      ref={ref}
      className={`relative group cursor-pointer ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
        filter: useTransform(hue, (value) => `hue-rotate(${value * 0.1}deg)`),
      }}
      whileHover={{
        scale: 1.05,
        z: 50,
        boxShadow: "0px 25px 60px rgba(0, 255, 255, 0.3), 0px 15px 30px rgba(168, 85, 247, 0.3)",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Main card surface */}
      <div 
        className="relative p-8 rounded-3xl backdrop-blur-3xl bg-gradient-to-br from-white/5 via-white/2 to-white/5 border border-white/10 shadow-2xl overflow-hidden"
        style={{ transform: 'translateZ(40px)' }}
      >
        {/* Animated border gradient */}
        <motion.div
          className="absolute inset-0 rounded-3xl opacity-75"
          style={{
            background: 'linear-gradient(45deg, transparent, rgba(56,189,248,0.3), transparent, rgba(168,85,247,0.3), transparent)',
            backgroundSize: '400% 400%',
          }}
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
        
        {/* Glare effect */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.8) 0%, transparent 70%)',
            translateX: glareX,
            translateY: glareY,
            opacity: glareOpacity,
          }}
        />
        
        {/* Content */}
        <div className="relative z-10" style={{ transform: 'translateZ(20px)' }}>
          {children}
        </div>
        
        {/* Floating particles inside card */}
        {Array.from({ length: 3 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400/60 rounded-full"
            style={{
              left: `${20 + i * 30}%`,
              top: `${20 + i * 20}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 3 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  // Parallax effects based on scroll  
  const backgroundY = useTransform(scrollY, [0, 1000], [0, -100]);
  const heroY = useTransform(scrollY, [0, 1000], [0, -200]);

  const toggleMobileMenu = useCallback(() => setIsMobileMenuOpen(!isMobileMenuOpen), [isMobileMenuOpen]);

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    toggleMobileMenu();
  }, [toggleMobileMenu]);

  // Dynamic background variants for dark theme only
  const backgroundVariants = useMemo(() => ({
    initial: { 
      background: "radial-gradient(ellipse at top, #0f172a 0%, #020617 50%, #000000 100%)" 
    },
    animate: {
      background: [
        "radial-gradient(ellipse at top left, #0f172a 0%, #1e293b 25%, #020617 50%, #000000 100%)",
        "radial-gradient(ellipse at top right, #1e293b 0%, #0f172a 25%, #020617 50%, #000000 100%)",
        "radial-gradient(ellipse at bottom, #020617 0%, #0f172a 25%, #1e293b 50%, #000000 100%)",
      ],
    }
  }), []);

  const AnimatedSection = ({ children, className, id }: { children: ReactNode, className?: string, id?: string }) => {
    const controls = useAnimation();
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) { controls.start("animate"); }
    }, [controls, inView]);

    return (
      <motion.section 
        id={id} 
        ref={ref} 
        className={className} 
        variants={staggerContainer} 
        initial="initial" 
        animate={controls}
        style={{ y: useTransform(scrollY, [0, 1000], [0, -50]) }}
      >
        {children}
      </motion.section>
    );
  };
  
  return (
    <>

        {/* Revolutionary Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="fixed top-0 z-50 w-full flex justify-center py-2 sm:py-3"
          style={{
            backdropFilter: "blur(20px)",
            background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
            borderBottom: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <Link href="/" className="group">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }} 
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400 }}
                className="relative overflow-hidden rounded-2xl p-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm border border-white/20"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30"
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <div className="relative z-10">
                  <Image src="/assets/images/logo.png" alt="Gaia Logo" width={200} height={40} priority className="h-10 sm:h-12 w-auto"/>
                </div>
              </motion.div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              {[ 
                { href: "#features", label: "Features" }, 
                { href: "#platform", label: "Technology" },
              ].map(link => (
                <motion.div 
                  key={link.href} 
                  className="relative px-4 py-3 group" 
                  whileHover="hover" 
                  initial="initial"
                >
                  <Link 
                    href={link.href} 
                    className="relative z-10 text-gray-200 group-hover:text-white transition-colors duration-300 font-medium"
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                  >
                    {link.label}
                  </Link>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r"
                    variants={{ 
                      initial: { opacity: 0, scale: 0.8 }, 
                      hover: { opacity: 1, scale: 1 }    
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                  <motion.div 
                    className="absolute bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 origin-center rounded-full"
                    variants={{ 
                      initial: { scaleX: 0 }, 
                      hover: { scaleX: 1 }    
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </motion.div>
              ))} 
              
              <motion.div className="ml-6" whileHover={{ scale: 1.05 }}>
                <Link 
                  href="/dashboard/portugal" 
                  className="relative group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300"
                >
                  <span className="relative z-10">View Dashboard</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/50 to-purple-400/50 rounded-2xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
              
              <div className="ml-4 flex items-center space-x-3">
                <motion.a
                  href="https://github.com/guilhermegranchopro/Eco-AI.ly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-gradient-to-r from-gray-700/80 to-gray-800/80 backdrop-blur-sm border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GitHubIcon />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </div>
            </nav>
            
            <div className="md:hidden flex items-center space-x-4">
              <motion.a
                href="https://github.com/guilhermegranchopro/Eco-AI.ly"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-gradient-to-r from-gray-700/80 to-gray-800/80 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <GitHubIcon />
              </motion.a>
              <motion.button 
                onClick={toggleMobileMenu} 
                className="p-2 rounded-xl bg-gradient-to-r from-gray-700/80 to-gray-800/80 backdrop-blur-sm border border-white/20 text-gray-300"
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </motion.button>
            </div>
          </div>
        </motion.header>

      {/* Revolutionary Reactive Effects */}
      <ReactiveParticleSystem />
      <LiquidEnergyFlows />
      <InteractiveEnergyWaves />
      
      <motion.main
        className="relative flex flex-col items-center justify-center min-h-screen text-white overflow-visible antialiased"
        initial="initial"
        animate="animate"
        variants={backgroundVariants}
        style={{ y: backgroundY }}
        transition={{
          background: { 
            duration: 30,
            repeat: Infinity,
            ease: "linear",
          }
        }}
      >
        {/* Floating orbs */}
        <FloatingOrb size={300} color="cyan" delay={0} x="10%" y="20%" />
        <FloatingOrb size={250} color="purple" delay={5} x="85%" y="30%" />
        <FloatingOrb size={200} color="green" delay={10} x="70%" y="80%" />
        <FloatingOrb size={180} color="pink" delay={15} x="15%" y="70%" />

        {/* SVG Definitions for gradients */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <linearGradient id="gradPulse" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{stopColor: 'rgba(56,189,248,0.7)', stopOpacity: 1}} />
              <stop offset="100%" style={{stopColor: 'rgba(168,85,247,0.7)', stopOpacity: 1}} />
            </linearGradient>
          </defs>
        </svg>



      {/* Revolutionary Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-0 pt-20 p-6 z-40 min-h-screen rounded-b-3xl overflow-visible"
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.15) 100%)",
              backdropFilter: "blur(40px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 25px 80px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.2)"
            }}
            onClick={toggleMobileMenu} 
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 via-purple-400/5 to-green-400/5"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(6,182,212,0.05) 0%, rgba(168,85,247,0.05) 50%, rgba(34,197,94,0.05) 100%)",
                  "linear-gradient(45deg, rgba(168,85,247,0.05) 0%, rgba(34,197,94,0.05) 50%, rgba(6,182,212,0.05) 100%)",
                  "linear-gradient(45deg, rgba(34,197,94,0.05) 0%, rgba(6,182,212,0.05) 50%, rgba(168,85,247,0.05) 100%)",
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Optimized floating particles in mobile menu - reduced count */}
            {Array.from({ length: 2 }, (_, i) => ( // Reduced from 4 to 2
              <motion.div
                key={i}
                className={`absolute w-2 h-2 ${
                  i % 2 === 0 ? 'bg-cyan-400/30' : 'bg-purple-400/30'
                } rounded-full filter blur-sm`}
                style={{
                  left: `${30 + i * 40}%`,
                  top: `${35 + i * 20}%`,
                }}
                animate={{
                  y: [-10, 10, -10], // Reduced movement
                  opacity: [0.4, 0.7, 0.4],
                }}
                transition={{
                  duration: 6 + i * 2, // Slower animations
                  repeat: Infinity,
                  ease: "linear", // Changed to linear for better performance
                  delay: i * 1,
                }}
              />
            ))}
            
            <nav className="flex flex-col space-y-8 items-center text-xl relative z-10">
              {[
                { href: "#features", label: "Features" },
                { href: "#platform", label: "Technology" },
                { href: "#impact", label: "Our Impact" },
                { href: "/dashboard/portugal", label: "View Dashboard", isButton: true },
                { href: "https://github.com/guilhermegranchopro/Eco-AI.ly", label: "GitHub", isExternal: true },
              ].map((link, index) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className="w-full flex justify-center"
                >
                  <Link 
                    href={link.href} 
                    className={link.isButton 
                      ? "relative group w-full max-w-xs text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden"
                      : "relative group text-gray-200 hover:text-green-400 transition-all duration-300 font-medium px-6 py-3 rounded-xl backdrop-blur-sm hover:bg-white/10"} 
                    onClick={(e) => {
                      if (!link.isExternal) {
                        handleSmoothScroll(e, link.href);
                      }
                      toggleMobileMenu(); 
                    }}
                    {...(link.isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                  >
                    {link.isButton && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-400/30 to-purple-400/30 opacity-0 group-hover:opacity-100 rounded-2xl"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                    {!link.isButton && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-400 origin-center rounded-full scale-x-0 group-hover:scale-x-100"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

        <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center mt-8 sm:mt-12">
          {/* Revolutionary Hero Section */}
          <motion.div 
            className="relative text-center my-16 sm:my-24 p-12 sm:p-16 rounded-[3rem] w-full overflow-visible"
            style={{ 
              y: heroY,
              background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.1) 100%)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255,255,255,0.2)",
              boxShadow: "0 25px 60px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.2)"
            }}
            initial={{ opacity: 0, scale: 0.8, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          >
            {/* Animated background elements */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-400/10 to-green-400/10"
              animate={{
                background: [
                  "linear-gradient(45deg, rgba(6,182,212,0.1) 0%, rgba(168,85,247,0.1) 50%, rgba(34,197,94,0.1) 100%)",
                  "linear-gradient(45deg, rgba(168,85,247,0.1) 0%, rgba(34,197,94,0.1) 50%, rgba(6,182,212,0.1) 100%)",
                  "linear-gradient(45deg, rgba(34,197,94,0.1) 0%, rgba(6,182,212,0.1) 50%, rgba(168,85,247,0.1) 100%)",
                ],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            
            {/* Optimized floating geometric shapes - reduced count and complexity */}
            {Array.from({ length: 3 }, (_, i) => ( // Reduced from 6 to 3
              <motion.div
                key={i}
                className={`absolute w-4 h-4 ${
                  i % 3 === 0 ? 'bg-cyan-400/20' : i % 3 === 1 ? 'bg-purple-400/20' : 'bg-green-400/20'
                } ${i % 2 === 0 ? 'rounded-full' : 'rounded-lg'} filter blur-sm`}
                style={{
                  left: `${15 + i * 25}%`,
                  top: `${25 + i * 15}%`,
                }}
                animate={{
                  y: [-15, 15, -15], // Reduced movement
                  x: [-8, 8, -8], // Reduced movement
                  opacity: [0.4, 0.7, 0.4], // Simplified opacity changes
                }}
                transition={{
                  duration: 8 + i * 2, // Slower animations
                  repeat: Infinity,
                  ease: "linear", // Changed to linear for better performance
                  delay: i * 1,
                }}
              />
            ))}
            
            <motion.div 
              variants={fadeInUp} 
              className="relative z-10 overflow-visible"
            >

            <motion.h1 
              className="overflow-visible text-5xl sm:text-6xl lg:text-8xl font-black mb-8 relative z-10 leading-tight flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {/* wrap GAIA in a centered block */}
              <div className="relative flex flex-col items-center">
                <div className="flex items-center space-x-3">
                  <motion.span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500"
                    style={{ backgroundSize: '300% auto', filter: 'drop-shadow(0 0 30px rgba(34,197,94,0.3))' }}
                    animate={{ backgroundPosition: ['0% center','200% center','0% center'] }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    GAIA
                  </motion.span>
                  <Image
                    src="/assets/images/dog-wink.png"
                    alt="Winking dog"
                    width={95}
                    height={95}
                    className="rounded-full"
                    style={{ overflow: 'visible' }}
                    priority
                  />
                </div>

                {/* now centered under GAIA only */}
                <motion.span
                  className="block text-2xl sm:text-3xl lg:text-4xl mt-4 font-light text-gray-300 text-center"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  Your Green AI Assistant
                </motion.span>
              </div>
            </motion.h1>


              <motion.p 
                className="text-xl sm:text-2xl lg:text-3xl text-gray-300 mb-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500"
                  whileHover={{ scale: 1.05 }}
                >
                  Train AI models
                </motion.span> responsibly for a <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"
                  whileHover={{ scale: 1.05 }}
                >
                  Sustainable Planet
                </motion.span> 🌍
              </motion.p>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-400 max-w-4xl mx-auto mb-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Gaia helps you make the most informed sustainable decision when training AI models
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.6 }}
              >
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/dashboard/portugal" 
                    className="group relative inline-flex items-center justify-center bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl overflow-hidden transition-all duration-500"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center">
                      When to train
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 ml-3" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </span>
                  </Link>
                </motion.div>

                                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link 
                    href="/find-gpu" 
                    className="group relative inline-flex items-center justify-center bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 text-white px-10 py-5 rounded-2xl font-bold text-xl shadow-2xl overflow-hidden transition-all duration-500"
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative z-10 flex items-center">
                      Find best GPU
                      <motion.svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-6 w-6 ml-3" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                      </motion.svg>
                    </span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

        <AnimatedSection id="carbon-intensity" className="py-20">
        <div className="flex justify-center">
          <CarbonIntensityCard />
        </div>
      </AnimatedSection>


        <AnimatedDivider />

        {/* Key Features Section - Enhanced */}
        <AnimatedSection id="features" className="py-16 md:py-24">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-300 mb-12 sm:mb-16 text-center">
            ✨ Our Core Capabilities
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[ { icon: <PredictiveAnalyticsIcon />, title: "Predictive Analytics", items: ["Real-time energy forecasts", "Environmental impact predictions", "Trend analysis & pattern recognition"] },
              { icon: <DataVisualizationIcon />, title: "Data Visualization", items: ["Interactive dashboards", "Dynamic charts & graphs", "Customizable data views"] },
              { icon: <AIPoweredInsightsIcon />, title: "AI-Powered Insights", items: ["Advanced machine learning models", "Actionable pattern recognition", "Automated sustainability reporting"] }
            ].map((feature) => (
              <InteractiveCard 
                key={feature.title} 
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl shadow-md bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 hover:border-green-500/30" // Updated backgrounds and borders
              >
                <motion.div whileHover={{ /* Icon specific hover is now on icon component */ }}>
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold text-green-400 mb-4">{feature.title}</h3>
                <ul className="list-none space-y-2 text-gray-400 text-sm">
                  {feature.items.map(item => <li key={item}>• {item}</li>)}
                </ul>
              </InteractiveCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedDivider />

        {/* Explore Our Platform Section - Enhanced */}
        <AnimatedSection 
          id="platform" 
          className="py-16 md:py-24 px-6 sm:px-8 md:px-12 lg:px-16 bg-gray-900/50 backdrop-blur-sm border border-gray-700/30 rounded-3xl relative overflow-hidden" // Updated light background
        >
          {/* Decorative elements */}
          <motion.div className="absolute -top-10 -left-10 w-48 h-48 border-4 border-green-500/20 rounded-full opacity-30" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute -bottom-12 -right-12 w-60 h-60 border-8 border-green-500/10 rounded-xl opacity-20" animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} />

          {/* Centered content block */}
          <div className="relative z-10 text-center">
            <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-6 text-green-100">
              Dive Into Our Platform
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto text-green-200">
              Experience firsthand how Gaia transforms complex data into clear, actionable environmental intelligence. Our Portugal dashboard is just the beginning.
            </motion.p>

            <motion.div variants={fadeInUp}>
              <h3 className="text-2xl sm:text-3xl font-semibold mb-4 text-green-100">
                🇵🇹 Portugal Data Dashboard
              </h3>
              <ul className="list-disc list-inside inline-block text-left space-y-2 mb-10 text-green-200">
                <li>Comprehensive energy consumption metrics</li>
                <li>Real-time carbon intensity updates</li>
                <li>Historical trend analysis & AI predictions</li>
                <li>Actionable insights for energy arbitrage</li>
              </ul>

              {/* Centered and animated button */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="flex justify-center"
              >
                <Link
                  href="/dashboard/portugal"
                  className="group inline-flex items-center justify-center bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-green-600 hover:shadow-2xl transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-500"
                >
                  View Live Dashboard
                  <ArrowRightIcon/>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </AnimatedSection>

        <AnimatedDivider />

        {/* Technology Stack Section - Enhanced */}
        <AnimatedSection id="tech-stack" className="py-16 md:py-24">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-700 dark:text-green-300 mb-12 sm:mb-16 text-center">
            ⚙️ Built With Cutting-Edge Technology
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[ { icon: <BackendTechIcon />, title: "Robust Backend", items: ["Python & TensorFlow for AI", "FastAPI for efficient APIs", "Advanced data processing pipelines", "Real-time data integration"] },
              { icon: <FrontendTechIcon />, title: "Dynamic Frontend", items: ["Next.js, React & TypeScript", "Tailwind CSS for modern styling", "Framer Motion for animations", "Recharts for interactive charts"] }
            ].map((tech) => (
              <InteractiveCard 
                key={tech.title} 
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl shadow-md bg-white/90 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/50 hover:border-emerald-400/40 dark:hover:border-emerald-500/30" // Updated backgrounds and borders
              >
                 <motion.div whileHover={{ /* Icon specific hover is now on icon component */ }}>
                  {tech.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">{tech.title}</h3>
                <ul className="list-none space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  {tech.items.map(item => <li key={item}>• {item}</li>)}
                </ul>
              </InteractiveCard>
            ))}
          </div>
        </AnimatedSection>




        <AnimatedDivider />

        {/* Call to Action Section - Enhanced */}
        <AnimatedSection 
          id="cta" 
          className="py-16 md:py-24 px-6 sm:px-8 md:px-12 lg:px-16 bg-gradient-to-br from-purple-600/20 via-transparent to-cyan-600/20 dark:from-purple-700/30 dark:via-transparent dark:to-cyan-700/30 rounded-3xl relative overflow-hidden" // Added horizontal padding
        >
          <motion.div 
            className="absolute -top-20 -left-20 w-60 h-60 bg-green-500/15 dark:bg-green-400/10 rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.4, 0.9, 1.5, 1], opacity: [0.4, 0.7, 0.3, 0.8, 0.4], rotate: [0, -70, 80, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-500/15 dark:bg-emerald-400/10 rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.5, 0.8, 1.6, 1], opacity: [0.3, 0.6, 0.2, 0.7, 0.3], rotate: [0, 90, -60, 100, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 relative z-10 text-gray-700 dark:text-white">
            Ready to Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-500">Greener Future</span>?
          </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mb-2 text-center relative z-10"
            >
              Want to chat? Collaborate or pitch? Nerd out over AI or sustainability?
            </motion.p>

            <motion.p
              variants={fadeInUp}
              className="text-lg sm:text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mb-10 text-center relative z-10"
            >
              Our inbox is open and the planet is waiting
            </motion.p>
          <motion.div variants={fadeInUp} className="relative z-10">
            <Link href="/contact" className="group inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
              Contact Us
              <ArrowRightIcon />
            </Link>
          </motion.div>
        </AnimatedSection>
      </main>
      {/* Revolutionary Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="relative w-full py-12 text-center text-gray-300 dark:text-gray-200 border-t border-gray-200/60 dark:border-gray-700/50 mt-16 md:mt-24 rounded-t-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(15,23,42,0.95) 0%, rgba(30,41,59,0.9) 30%, rgba(15,23,42,0.95) 70%, rgba(0,0,0,0.98) 100%)",
          backdropFilter: "blur(20px)",
          borderTop: "1px solid rgba(34,197,94,0.3)",
        }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400/10 via-cyan-400/10 to-purple-400/10"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(34,197,94,0.1) 0%, rgba(6,182,212,0.1) 50%, rgba(168,85,247,0.1) 100%)",
              "linear-gradient(135deg, rgba(6,182,212,0.1) 0%, rgba(168,85,247,0.1) 50%, rgba(34,197,94,0.1) 100%)",
              "linear-gradient(135deg, rgba(168,85,247,0.1) 0%, rgba(34,197,94,0.1) 50%, rgba(6,182,212,0.1) 100%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Revolutionary energy grid overlay */}
        <motion.div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(34,197,94,0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(6,182,212,0.3) 0%, transparent 50%)`,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Optimized floating orbs in footer - reduced count and simplified */}
        <motion.div
          className="absolute top-4 left-10 w-12 h-12 bg-gradient-to-r from-green-400/30 to-emerald-400/30 rounded-full filter blur-2xl"
          animate={{
            y: [-6, 6, -6], // Reduced movement
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }} // Simplified easing
        />
        <motion.div
          className="absolute bottom-6 right-16 w-10 h-10 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full filter blur-2xl"
          animate={{
            y: [-5, 5, -5], // Reduced movement
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear", delay: 2 }} // Simplified easing
        />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-6"
          >
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-cyan-400 mb-2 drop-shadow-lg">
              GAIA
            </h3>
            <p className="text-lg font-medium text-gray-200"> Your Green AI Assistant</p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="flex justify-center space-x-8 mb-6"
          >
            {[
              { href: "https://github.com/guilhermegranchopro/Eco-AI.ly", icon: GitHubIcon, label: "GitHub" },
              { href: "#features", icon: () => <span className="text-2xl">🌿</span>, label: "Features" },
              { href: "#impact", icon: () => <span className="text-2xl">📊</span>, label: "Impact" },
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                className="group relative p-3 rounded-2xl bg-gradient-to-r from-gray-800/80 to-gray-700/80 dark:from-gray-700/80 dark:to-gray-600/80 backdrop-blur-sm border border-gray-600/30 hover:border-green-400/50 transition-all duration-300 text-gray-200"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + index * 0.1, duration: 0.5 }}
                {...(social.href.startsWith('http') && { target: "_blank", rel: "noopener noreferrer" })}
              >
                <social.icon />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-2xl opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.3 }}
            className="border-t border-gray-600/40 dark:border-gray-500/40 pt-6"
          >
            <p className="text-sm text-gray-300">&copy; {new Date().getFullYear()} GAIA. All rights reserved.</p>
            <motion.p 
              className="text-xs mt-2 text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500"
              animate={{
                backgroundPosition: ["0% center", "200% center", "0% center"],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "300% auto" }}
            >
              Powered by AI • Built for Sustainability • Designed for the Future
            </motion.p>
          </motion.div>
        </div>
      </motion.footer>
      </motion.main>
    </>
  );
}
