"use client";
import React, { useState, useEffect, useRef, ReactNode, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform, useSpring, animate, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from './theme-provider';

// ===============================
// REVOLUTIONARY REACTIVE PARTICLE SYSTEM
// ===============================
const ReactiveParticleSystem = () => {
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseDown = () => setIsInteracting(true);
    const handleMouseUp = () => setIsInteracting(false);

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const particles = useMemo(() => 
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      duration: Math.random() * 15 + 8,
      delay: Math.random() * 8,
      hue: Math.random() * 360,
    }))
  , []);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-10 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full filter blur-sm"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            background: `hsl(${particle.hue}, 70%, 60%)`,
            boxShadow: `0 0 ${particle.size * 2}px hsla(${particle.hue}, 70%, 60%, 0.5)`,
          }}
          animate={{
            y: [0, -150, 0],
            x: [0, Math.sin(particle.id) * 80, 0],
            scale: isInteracting ? [1, 2, 1] : [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 0.2, particle.opacity],
            rotate: [0, 360, 0],
            filter: [
              `hue-rotate(0deg) brightness(1)`,
              `hue-rotate(180deg) brightness(1.5)`,
              `hue-rotate(360deg) brightness(1)`
            ],
          }}
          transition={{
            duration: isInteracting ? particle.duration * 0.5 : particle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  );
};

// ===============================
// ADVANCED LIQUID ENERGY FLOWS
// ===============================
const LiquidEnergyFlows = () => {
  useEffect(() => {
    const handleScroll = () => {
      // Scroll handling can be added here if needed for future enhancements
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-5 overflow-hidden">
      {/* Liquid energy streams */}
      {Array.from({ length: 12 }, (_, i) => (
        <motion.div
          key={`liquid-${i}`}
          className="absolute"
          style={{
            left: `${5 + i * 8}%`,
            top: '-10%',
            width: '2px',
            height: '120%',
            background: `linear-gradient(180deg, 
              transparent 0%, 
              hsla(${120 + i * 30}, 70%, 60%, 0.8) 20%, 
              hsla(${180 + i * 30}, 80%, 70%, 0.6) 50%, 
              hsla(${240 + i * 30}, 70%, 60%, 0.8) 80%, 
              transparent 100%)`,
            filter: 'blur(1px)',
          }}
          animate={{
            scaleY: [1, 1.5, 0.8, 1.2, 1],
            opacity: [0.3, 0.8, 0.4, 0.9, 0.3],
            x: [0, Math.sin(i) * 20, 0],
            filter: [
              'blur(1px) hue-rotate(0deg)',
              'blur(2px) hue-rotate(90deg)',
              'blur(1px) hue-rotate(180deg)',
              'blur(2px) hue-rotate(270deg)',
              'blur(1px) hue-rotate(360deg)',
            ],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
      
      {/* Flowing energy orbs */}
      {Array.from({ length: 8 }, (_, i) => (
        <motion.div
          key={`energy-orb-${i}`}
          className="absolute rounded-full filter blur-md"
          style={{
            width: `${8 + i * 2}px`,
            height: `${8 + i * 2}px`,
            left: `${10 + i * 12}%`,
            background: `radial-gradient(circle, 
              hsla(${i * 45}, 80%, 70%, 0.9) 0%, 
              hsla(${i * 45 + 60}, 70%, 60%, 0.6) 50%, 
              transparent 100%)`,
            boxShadow: `0 0 ${20 + i * 5}px hsla(${i * 45}, 80%, 70%, 0.8)`,
          }}
          animate={{
            y: ['100vh', '-20vh'],
            x: [0, Math.sin(i * 2) * 100, 0],
            scale: [0.5, 1.5, 0.8, 1.2, 0.5],
            opacity: [0, 1, 0.8, 1, 0],
            rotate: [0, 360 + i * 45, 720],
          }}
          transition={{
            duration: 12 + i * 3,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.5,
          }}
        />
      ))}
      
      {/* Energy connection lines */}
      <svg className="absolute inset-0 w-full h-full">
        {Array.from({ length: 6 }, (_, i) => (
          <motion.path
            key={`energy-line-${i}`}
            d={`M${10 + i * 15},${20 + i * 10} Q${50 + i * 20},${100 + i * 30} ${90 - i * 10},${80 + i * 15}`}
            fill="none"
            stroke={`hsl(${i * 60}, 70%, 60%)`}
            strokeWidth="2"
            style={{ filter: 'drop-shadow(0 0 5px currentColor)' }}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.8, 0],
              stroke: [
                `hsl(${i * 60}, 70%, 60%)`,
                `hsl(${i * 60 + 120}, 80%, 70%)`,
                `hsl(${i * 60 + 240}, 70%, 60%)`,
              ]
            }}
            transition={{
              duration: 6 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.8,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

// ===============================
// INTERACTIVE ENERGY WAVES
// ===============================
const InteractiveEnergyWaves = () => {
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Reactive wave rings */}
      {Array.from({ length: 5 }, (_, i) => (
        <motion.div
          key={`wave-${i}`}
          className="absolute border rounded-full"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            width: `${(i + 1) * 100}px`,
            height: `${(i + 1) * 100}px`,
            marginLeft: `${-(i + 1) * 50}px`,
            marginTop: `${-(i + 1) * 50}px`,
            borderColor: `hsla(${180 + i * 30}, 70%, 60%, ${0.6 - i * 0.1})`,
            borderWidth: '2px',
            filter: `blur(${i}px)`,
          }}
          animate={{
            scale: isHovering ? [1, 2, 1] : [1, 1.5, 1],
            opacity: isHovering ? [0.8, 0.3, 0.8] : [0.4, 0.1, 0.4],
            rotate: [0, 360, 0],
          }}
          transition={{
            duration: 4 + i,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
      
      {/* Energy pulse center */}
      <motion.div
        className="absolute rounded-full"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
          width: '20px',
          height: '20px',
          marginLeft: '-10px',
          marginTop: '-10px',
          background: 'radial-gradient(circle, rgba(6,182,212,0.8) 0%, transparent 70%)',
          filter: 'blur(5px)',
        }}
        animate={{
          scale: isHovering ? [1, 3, 1] : [1, 2, 1],
          opacity: [0.8, 0.4, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// ===============================
// FLOATING ORB COMPONENT
// ===============================
const FloatingOrb = ({ size = 200, color = "cyan", delay = 0, x = "50%", y = "50%" }) => (
  <motion.div
    className={`absolute rounded-full filter blur-3xl opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen
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
    }}
    animate={{
      scale: [1, 1.5, 0.8, 1.2, 1],
      x: [0, 100, -50, 80, 0],
      y: [0, -80, 120, -40, 0],
      rotate: [0, 180, -90, 270, 0],
    }}
    transition={{
      duration: 25,
      repeat: Infinity,
      ease: "easeInOut",
      delay,
    }}
  />
);

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
      <motion.div className="h-px relative overflow-hidden bg-gradient-to-r from-transparent via-gray-300/50 dark:via-gray-600/50 to-transparent">
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

// Placeholder Icon Components (add these or import your actual icons)
const SunIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-15.66l-.707.707M4.34 19.66l-.707.707m15.66 0l-.707-.707M4.34 4.34l-.707-.707m0 15.66l.707-.707M19.66 4.34l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z" />
  </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="24" height="24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
  </svg>
);

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
        className="relative p-8 rounded-3xl backdrop-blur-3xl bg-gradient-to-br from-white/10 via-white/5 to-white/10 dark:from-white/5 dark:via-white/2 dark:to-white/5 border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden"
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

// Animated Number Component - REVISED and TYPED
const AnimatedNumber = ({ value }: { value: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (inView) {
      const animationControls = animate(0, value, {
        duration: 2,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.round(latest));
        }
      });
      return () => animationControls.stop(); // Cleanup animation
    }
  }, [inView, value]); // Effect dependencies

  return (
    <span ref={ref}> {/* Ref for useInView */}
      {displayValue.toLocaleString()}
    </span>
  );
};

// Theme Toggle Button Component - CORRECTED
const ThemeToggleButton = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Avoid hydration mismatch by not rendering on the server or until mounted.
  if (!mounted) {
    // Render a placeholder or null during server-side rendering and initial client-side mount
    return <div className="p-2 rounded-lg w-[40px] h-[40px]" aria-label="Loading theme toggle" />; // Adjust size to match button
  }

  return (
    <motion.button
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="p-2 rounded-lg bg-slate-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md border border-gray-300/50 dark:border-gray-600/50 flex items-center justify-center"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle theme"
      type="button"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MoonIcon className="w-5 h-5 text-yellow-400" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <SunIcon className="w-5 h-5 text-orange-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { scrollY } = useScroll();

  // Handle hydration
  useEffect(() => setMounted(true), []);

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

  // Dynamic background variants
  const backgroundVariants = useMemo(() => mounted && theme === 'dark' ? {
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
  } : {
    initial: { 
      background: "radial-gradient(ellipse at top, #f8fafc 0%, #e2e8f0 50%, #cbd5e1 100%)" 
    },
    animate: {
      background: [
        "radial-gradient(ellipse at top left, #f1f5f9 0%, #e2e8f0 25%, #cbd5e1 50%, #94a3b8 100%)",
        "radial-gradient(ellipse at top right, #e2e8f0 0%, #f1f5f9 25%, #cbd5e1 50%, #94a3b8 100%)",
        "radial-gradient(ellipse at bottom, #cbd5e1 0%, #e2e8f0 25%, #f1f5f9 50%, #94a3b8 100%)",
      ],
    }
  }, [mounted, theme]);

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
      {/* Revolutionary Reactive Effects */}
      <ReactiveParticleSystem />
      <LiquidEnergyFlows />
      <InteractiveEnergyWaves />
      
      <motion.main
        className="relative flex flex-col items-center justify-center min-h-screen text-gray-700 dark:text-white overflow-x-hidden antialiased"
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

        {/* Revolutionary Header */}
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          className="fixed top-0 z-50 w-full flex justify-center py-4 sm:py-6"
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
                  <Image src="/assets/images/logo.png" alt="Eco AI.ly Logo" width={200} height={40} priority className="h-10 sm:h-12 w-auto"/>
                </div>
              </motion.div>
            </Link>
            
            <nav className="hidden md:flex items-center space-x-1">
              {[ 
                { href: "#features", label: "Features" }, 
                { href: "#platform", label: "Technology" }, 
                { href: "#impact", label: "Our Impact" },
              ].map(link => (
                <motion.div 
                  key={link.href} 
                  className="relative px-4 py-3 group" 
                  whileHover="hover" 
                  initial="initial"
                >
                  <Link 
                    href={link.href} 
                    className="relative z-10 text-gray-700 dark:text-gray-200 group-hover:text-white transition-colors duration-300 font-medium"
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                  >
                    {link.label}
                  </Link>
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-green-500/80 to-emerald-500/80 rounded-xl backdrop-blur-sm"
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
                  className="relative group bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl backdrop-blur-sm border border-white/20"
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
                  className="p-3 rounded-2xl bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm border border-white/20 hover:border-cyan-400/50 transition-all duration-300 group"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <GitHubIcon />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-purple-400/20 rounded-2xl opacity-0 group-hover:opacity-100"
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
                <ThemeToggleButton />
              </div>
            </nav>
            
            <div className="md:hidden flex items-center space-x-4">
              <motion.a
                href="https://github.com/guilhermegranchopro/Eco-AI.ly"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <GitHubIcon />
              </motion.a>
              <ThemeToggleButton />
              <motion.button 
                onClick={toggleMobileMenu} 
                className="p-2 rounded-xl bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm border border-white/20 text-gray-600 dark:text-gray-300"
                whileTap={{ scale: 0.9 }}
              >
                {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
              </motion.button>
            </div>
          </div>
        </motion.header>

      {/* Revolutionary Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="md:hidden fixed inset-x-0 top-0 pt-20 p-6 z-40 min-h-screen rounded-b-3xl overflow-hidden"
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
            
            {/* Floating particles in mobile menu */}
            {Array.from({ length: 4 }, (_, i) => (
              <motion.div
                key={i}
                className={`absolute w-2 h-2 ${
                  i % 2 === 0 ? 'bg-cyan-400/30' : 'bg-purple-400/30'
                } rounded-full filter blur-sm`}
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${30 + i * 15}%`,
                }}
                animate={{
                  y: [-15, 15, -15],
                  x: [-8, 8, -8],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 4 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
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
                      : "relative group text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-all duration-300 font-medium px-6 py-3 rounded-xl backdrop-blur-sm hover:bg-white/20 dark:hover:bg-white/10"} 
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
            className="relative text-center my-16 sm:my-24 p-12 sm:p-16 rounded-[3rem] w-full overflow-hidden"
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
            
            {/* Floating geometric shapes */}
            {Array.from({ length: 6 }, (_, i) => (
              <motion.div
                key={i}
                className={`absolute w-${4 + i} h-${4 + i} ${
                  i % 3 === 0 ? 'bg-cyan-400/20' : i % 3 === 1 ? 'bg-purple-400/20' : 'bg-green-400/20'
                } ${i % 2 === 0 ? 'rounded-full' : 'rounded-lg'} filter blur-sm`}
                style={{
                  left: `${10 + i * 15}%`,
                  top: `${20 + i * 10}%`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  rotate: [0, 180, 360],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
            
            <motion.div 
              variants={fadeInUp} 
              className="relative z-10"
            >
              <motion.h1 
                className="text-5xl sm:text-6xl lg:text-8xl font-black mb-8 relative z-10 leading-tight"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <motion.span
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-cyan-400 to-purple-500"
                  style={{ 
                    backgroundSize: "300% auto",
                    filter: "drop-shadow(0 0 30px rgba(34,197,94,0.3))"
                  }}
                  animate={{ 
                    backgroundPosition: ["0% center", "200% center", "0% center"],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  Eco AI.ly
                </motion.span>
                <motion.span
                  className="block text-2xl sm:text-3xl lg:text-4xl mt-4 font-light text-gray-600 dark:text-gray-300"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                >
                  The Future of Environmental Intelligence
                </motion.span>
              </motion.h1>
              
              <motion.p 
                className="text-xl sm:text-2xl lg:text-3xl text-gray-600 dark:text-gray-300 mb-6 max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
              >
                Harnessing <motion.strong 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500"
                  whileHover={{ scale: 1.05 }}
                >
                  Artificial Intelligence
                </motion.strong> for a <motion.strong 
                  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500"
                  whileHover={{ scale: 1.05 }}
                >
                  Sustainable Planet
                </motion.strong> 🌍
              </motion.p>
              
              <motion.p 
                className="text-lg sm:text-xl text-gray-500 dark:text-gray-400 max-w-4xl mx-auto mb-12 leading-relaxed"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.4 }}
              >
                Revolutionizing environmental decision-making with cutting-edge predictive analytics, real-time insights, and AI-driven forecasts. 
                Join us in building a greener, more resilient future.
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
                      Explore Portugal Dashboard
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
                    href="#features" 
                    className="group relative inline-flex items-center justify-center bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-10 py-5 rounded-2xl font-bold text-xl backdrop-blur-sm hover:border-cyan-400 transition-all duration-500"
                    onClick={(e) => handleSmoothScroll(e, "#features")}
                  >
                    <span className="relative z-10">Learn More</span>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

        <AnimatedDivider />

        {/* Key Features Section - Enhanced */}
        <AnimatedSection id="features" className="py-16 md:py-24">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-700 dark:text-green-300 mb-12 sm:mb-16 text-center">
            ✨ Our Core Capabilities
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[ { icon: <PredictiveAnalyticsIcon />, title: "Predictive Analytics", items: ["Real-time energy forecasts", "Environmental impact predictions", "Trend analysis & pattern recognition"] },
              { icon: <DataVisualizationIcon />, title: "Data Visualization", items: ["Interactive dashboards", "Dynamic charts & graphs", "Customizable data views"] },
              { icon: <AIPoweredInsightsIcon />, title: "AI-Powered Insights", items: ["Advanced machine learning models", "Actionable pattern recognition", "Automated sustainability reporting"] }
            ].map((feature) => (
              <InteractiveCard 
                key={feature.title} 
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl shadow-md bg-white/90 dark:bg-gray-800/70 backdrop-blur-sm border border-gray-200/60 dark:border-gray-700/50 hover:border-green-400/40 dark:hover:border-green-500/30" // Updated backgrounds and borders
              >
                <motion.div whileHover={{ /* Icon specific hover is now on icon component */ }}>
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">{feature.title}</h3>
                <ul className="list-none space-y-2 text-gray-600 dark:text-gray-400 text-sm">
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
          className="py-16 md:py-24 px-6 sm:px-8 md:px-12 lg:px-16 bg-slate-100/80 dark:bg-gray-900/50 backdrop-blur-sm border border-gray-200/40 dark:border-gray-700/30 rounded-3xl relative overflow-hidden" // Updated light background
        >
          {/* Decorative elements */}
          <motion.div className="absolute -top-10 -left-10 w-48 h-48 border-4 border-gray-700/20 dark:border-white/20 rounded-full opacity-30" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute -bottom-12 -right-12 w-60 h-60 border-8 border-gray-600/10 dark:border-white/10 rounded-xl opacity-20" animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} />

          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-6 relative z-10 text-gray-700 dark:text-white">
            Dive Into Our Platform
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto relative z-10 text-gray-500 dark:text-gray-300">
            Experience firsthand how Eco AI.ly transforms complex data into clear, actionable environmental intelligence. Our Portugal dashboard is just the beginning.
          </motion.p>
          <motion.div variants={fadeInUp} className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3 text-gray-700 dark:text-white">🇵🇹 Portugal Data Dashboard</h3>
            <ul className="list-disc list-inside inline-block text-left space-y-2 mb-8 text-green-700 dark:text-green-200">
              <li>Comprehensive energy consumption metrics</li>
              <li>Real-time carbon intensity updates</li>
              <li>Historical trend analysis & AI predictions</li>
              <li>Actionable insights for energy arbitrage</li>
            </ul>
            <div>
              <Link href="/dashboard/portugal" className="group inline-flex items-center justify-center bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-500"> {/* Ensure rounded-xl */}
                View Live Dashboard
                <ArrowRightIcon />
              </Link>
            </div>
          </motion.div>
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

        {/* Our Impact in Numbers Section - NEW */}
        <AnimatedSection id="impact" className="py-16 md:py-24">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-700 dark:text-green-300 mb-12 sm:mb-16 text-center">
            📈 Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ { label: "Tons of CO2 Offset Annually", value: 15000, displaySuffix: "+" },
              { label: "Renewable Energy Projects Optimized", value: 300, displaySuffix: "+" },
              { label: "Data Points Processed Daily", value: 10, displaySuffix: "M+" }
            ].map(stat => (
              <motion.div // Wrap InteractiveCard with motion.div to apply variants
                key={stat.label}
                variants={fadeInUp} // Apply variants to the motion.div wrapper
              >
                <InteractiveCard
                  className="p-6 sm:p-8 rounded-2xl shadow-md bg-white/90 dark:bg-gray-800/70 backdrop-blur-sm text-center border border-gray-200/60 dark:border-gray-700/50 hover:border-green-400/40 dark:hover:border-green-400/30" // Updated backgrounds and borders
                >
                  <div className="text-4xl sm:text-5xl font-bold text-green-600 dark:text-green-400 mb-3">
                    <AnimatedNumber value={stat.value} />{stat.displaySuffix}
                  </div>
                  <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">{stat.label}</p>
                </InteractiveCard>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedDivider />

        {/* Dashboard Section - NEW */}
        <AnimatedSection id="dashboard" className="py-16 md:py-24">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-700 dark:text-green-300 mb-8 text-center">
            🇵🇹 Live Portugal Energy Dashboard
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 text-center">
            Explore real-time carbon intensity and renewable energy data for Portugal. See AI predictions and insights powered by our advanced analytics.
          </motion.p>
          <motion.div variants={fadeInUp} className="text-center">
            <Link 
              href="/dashboard/portugal" 
              className="group inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-5 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"
            >
              <div className="flex items-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
                </svg>
                <span>View Portugal Dashboard</span>
                <ArrowRightIcon />
              </div>
            </Link>
          </motion.div>
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
          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-500 dark:text-gray-300 max-w-2xl mx-auto mb-10 relative z-10">
            Join us in leveraging AI for sustainability. Explore our solutions or get in touch to discuss how Eco AI.ly can help your organization achieve its environmental goals.
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
        className="relative w-full py-12 text-center text-gray-600 dark:text-gray-300 border-t border-gray-200/60 dark:border-gray-700/50 mt-16 md:mt-24 rounded-t-3xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.4) 50%, rgba(255,255,255,0.8) 100%)",
          backdropFilter: "blur(20px)",
        }}
      >
        {/* Animated background elements */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-400/5 via-cyan-400/5 to-purple-400/5"
          animate={{
            background: [
              "linear-gradient(135deg, rgba(34,197,94,0.05) 0%, rgba(6,182,212,0.05) 50%, rgba(168,85,247,0.05) 100%)",
              "linear-gradient(135deg, rgba(6,182,212,0.05) 0%, rgba(168,85,247,0.05) 50%, rgba(34,197,94,0.05) 100%)",
              "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, rgba(34,197,94,0.05) 50%, rgba(6,182,212,0.05) 100%)",
            ],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Floating orbs in footer */}
        <motion.div
          className="absolute top-4 left-10 w-16 h-16 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full filter blur-2xl"
          animate={{
            y: [-8, 8, -8],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-8 right-16 w-12 h-12 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full filter blur-2xl"
          animate={{
            y: [-6, 6, -6],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mb-6"
          >
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-2">
              Eco AI.ly
            </h3>
            <p className="text-lg font-medium">Innovating for a Greener Future 🌱</p>
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
                className="group relative p-3 rounded-2xl bg-gradient-to-r from-gray-100/80 to-gray-200/80 dark:from-gray-700/80 dark:to-gray-800/80 backdrop-blur-sm border border-white/30 hover:border-green-400/50 transition-all duration-300"
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
            className="border-t border-gray-300/30 dark:border-gray-600/30 pt-6"
          >
            <p className="text-sm">&copy; {new Date().getFullYear()} Eco AI.ly. All rights reserved.</p>
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
