"use client";
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform, useSpring, animate, SpringOptions } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTheme } from './theme-provider';

// SVG Icon Components (Enhanced with motion)
const PredictiveAnalyticsIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-green-500"
    whileHover={{ scale: 1.15, rotate: 5 }}
    animate={{ opacity: [0.8, 1, 0.8] }}
    transition={{ opacity: { duration: 2.5, repeat: Infinity, ease: "easeInOut" } }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l3.045-3.045m0 0A18.75 18.75 0 0121.5 12M6.795 10.455A18.75 18.75 0 002.5 12m4.295-1.545l2.016 2.016m-2.016-2.016L6.75 8.25m2.016 4.268L6.75 10.455m1.06 6.273l2.016-2.016m-2.016 2.016L6.75 16.75m2.016-4.268L6.75 14.732m9-3.232h.008v.008H15.75V11.5m0 2.25h.008v.008H15.75V13.75m0 2.25h.008v.008H15.75V16m0 2.25h.008v.008H15.75V18.25M12 11.5h.008v.008H12V11.5m0 2.25h.008v.008H12V13.75m0 2.25h.008v.008H12V16m0 2.25h.008v.008H12V18.25m-3.75-6.75h.008v.008H8.25V11.5m0 2.25h.008v.008H8.25V13.75m0 2.25h.008v.008H8.25V16m0 2.25h.008v.008H8.25V18.25M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </motion.svg>
);

const DataVisualizationIcon = () => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-green-500"
    whileHover={{ scale: 1.15, y: -5 }}
    animate={{ scale: [1, 1.03, 1] }}
    transition={{ scale: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </motion.svg>
);

const AIPoweredInsightsIcon = () => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-green-500"
    whileHover={{ scale: 1.15, filter: "brightness(1.2)" }}
    animate={{ rotate: [0, 3, -3, 0] }}
    transition={{ rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M12 3v1.5M12 21v-1.5M12 8.25v7.5M15.75 3v1.5M15.75 21v-1.5M19.5 8.25H12M19.5 15.75H12" />
    <motion.path 
      strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0Z" 
      animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
      transition={{ default: { duration: 2, repeat: Infinity, ease: "easeInOut" }}}
    />
  </motion.svg>
);

const BackendTechIcon = () => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-green-500"
    whileHover={{ scale: 1.15, x: -3 }}
    animate={{ opacity: [0.85, 1, 0.85] }}
    transition={{ opacity: { duration: 2.8, repeat: Infinity, ease: "easeInOut" } }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </motion.svg>
);

const FrontendTechIcon = () => (
  <motion.svg 
    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-green-500"
    whileHover={{ scale: 1.15, y: -3 }}
    animate={{ filter: ["brightness(1)", "brightness(1.1)", "brightness(1)"] }}
    transition={{ filter: { duration: 3.2, repeat: Infinity, ease: "easeInOut" } }}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.16 12.75M9.75 3.104A2.25 2.25 0 0112 4.5h5.25a2.25 2.25 0 012.25 2.25v4.072a2.25 2.25 0 01-.659 1.591L14.84 12.75M9.75 3.104A2.25 2.25 0 007.5 4.5H2.25a2.25 2.25 0 00-2.25 2.25v4.072a2.25 2.25 0 00.659 1.591L5.16 12.75m0 0L2.25 15M5.16 12.75l2.595-2.595m0 0A2.25 2.25 0 019.75 8.25v0M14.84 12.75l2.595 2.595m0 0A2.25 2.25 0 0014.25 18v0M14.84 12.75L12 15.165m2.84-2.415L12 10.155M12 10.155L9.16 12.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 15.75H14.25" />
  </motion.svg>
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

// NEW COMPONENT: AnimatedDivider
const AnimatedDivider = () => {
  return (
    <div className="w-full max-w-3xl mx-auto my-16 md:my-24 px-4">
      <motion.div className="h-px relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
          initial={{ x: "-101%" }}
          animate={{ x: "101%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 0.2,
          }}
        />
        <motion.div
          className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-transparent via-purple-600 to-transparent"
          initial={{ x: "-101%" }}
          animate={{ x: "101%" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
            delay: 1.7, // Offset start time for second gradient line
          }}
        />
      </motion.div>
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

// NEW InteractiveCard Component
const InteractiveCard = ({ children, className }: { children: ReactNode, className?: string }) => { // Removed variants prop
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glareX = useTransform(mouseX, [0, 1], ['100%', '-100%']);
  const glareY = useTransform(mouseY, [0, 1], ['100%', '-100%']);

  const springCardOptions: SpringOptions = { stiffness: 300, damping: 20 };
  const rotateX = useSpring(useTransform(mouseY, [0, 1], [10, -10]), springCardOptions);
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-10, 10]), springCardOptions);
  
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      mouseX.set((event.clientX - rect.left) / rect.width);
      mouseY.set((event.clientY - rect.top) / rect.height);
    }
  };

  const handleMouseLeave = () => {
    mouseX.set(0.5); // Reset to center
    mouseY.set(0.5); // Reset to center
  };

  return (
    <motion.div
      ref={ref}
      className={`relative p-6 md:p-8 rounded-xl shadow-md overflow-hidden bg-white/80 dark:bg-gray-800/30 backdrop-blur-md border border-gray-200/60 dark:border-gray-700/50 ${className}`}
      style={{
        transformStyle: 'preserve-3d',
        rotateX,
        rotateY,
      }}
      whileHover={{
        scale: 1.03,
        boxShadow: "0px 15px 35px rgba(0, 255, 255, 0.2), 0px 5px 15px rgba(168, 85, 247, 0.2)", // Enhanced hover shadow
        borderColor: "rgba(56, 189, 248, 0.7)", // Cyan border on hover
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
    >
      <div style={{ transform: 'translateZ(40px)' }} className="relative z-10"> {/* Content lifted */}
        {children}
      </div>
      {/* Glare effect - ensure this is styled correctly */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none z-20"
        style={{
          background: 'radial-gradient(circle at center, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0) 60%)',
          translateX: glareX,
          translateY: glareY,
          opacity: useTransform(mouseX, [0, 0.5, 1], [0, 0.6, 0]), // More subtle glare
        }}
      />
      {/* New Animated Border Element (Optional - can be complex to layer with existing effects) */}
      <motion.div 
        className="absolute inset-0 rounded-xl border-2 border-transparent pointer-events-none z-0"
        // Removed variants and related transition for border color animation as it was complex and potentially conflicting
        // If border animation is desired, it should be re-implemented carefully
        // For now, focusing on consistent rounded corners and hover effects.
        // Example: initial={{ borderColor: "rgba(100, 116, 139, 0.2)" }}
        // whileHover={{ borderColor: ["rgba(0, 220, 255, 0.5)", "rgba(192, 132, 252, 0.5)", "rgba(0, 220, 255, 0.5)"] }}
        // transition={{ borderColor: { duration: 2, repeat: Infinity, ease: "linear" } }}
      />
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
  const { theme } = useTheme(); // Get current theme
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => setMounted(true), []);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
    // For external links or non-hash links, the default Link behavior will proceed.
  };

  // Theme-aware background variants
  const backgroundVariants = mounted && theme === 'dark' ? {
    initial: { background: "linear-gradient(135deg, #0A0F1A 0%, #101626 50%, #0A0F1A 100%)" },
    animate: {
      background: [
        "linear-gradient(135deg, #0A0F1A 0%, #101626 25%, #1A2035 50%, #101626 75%, #0A0F1A 100%)",
        "linear-gradient(135deg, #0A0F1A 0%, #1A2035 25%, #101626 50%, #1A2035 75%, #0A0F1A 100%)",
        "linear-gradient(135deg, #0A0F1A 0%, #101626 25%, #1A2035 50%, #101626 75%, #0A0F1A 100%)",
      ],
    }
  } : {
    initial: { 
      background: "linear-gradient(135deg, rgb(248 250 252) 0%, rgb(241 245 249) 50%, rgb(248 250 252) 100%)" 
    },
    animate: {
      background: [
        "linear-gradient(135deg, rgb(248 250 252) 0%, rgb(241 245 249) 25%, rgb(236 242 249) 50%, rgb(241 245 249) 75%, rgb(248 250 252) 100%)",
        "linear-gradient(135deg, rgb(236 242 249) 0%, rgb(241 245 249) 25%, rgb(248 250 252) 50%, rgb(241 245 249) 75%, rgb(236 242 249) 100%)",
        "linear-gradient(135deg, rgb(248 250 252) 0%, rgb(241 245 249) 25%, rgb(236 242 249) 50%, rgb(241 245 249) 75%, rgb(248 250 252) 100%)",
      ],
    }
  };

  // Type for AnimationControls if used directly (it was in AnimatedSection)
  const AnimatedSection = ({ children, className, id }: { children: ReactNode, className?: string, id?: string }) => {
    const controls = useAnimation(); // Keep AnimationControls type consistent if useAnimation is used
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) { controls.start("animate"); }
    }, [controls, inView]);

    return (
      <motion.section id={id} ref={ref} className={className} variants={staggerContainer} initial="initial" animate={controls}>
        {children}
      </motion.section>
    );
  };
  
  return (
    <motion.main
      className="flex flex-col items-center justify-center min-h-screen text-gray-700 dark:text-white overflow-x-hidden antialiased bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 dark:bg-[#0A0F1A]" // Updated light theme gradient
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
      transition={{
        background: { // Target the background property specifically for transition
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }
      }}
    >
      {/* Add the SVG defs for path animation gradient if used */}
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <linearGradient id="gradPulse" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: 'rgba(56,189,248,0.7)', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: 'rgba(168,85,247,0.7)', stopOpacity: 1}} />
          </linearGradient>
        </defs>
      </svg>

      <motion.header // <<< FIXED: Was <header>, changed to <motion.header>
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="sticky top-0 z-50 w-full flex justify-center py-4 sm:py-6 bg-white/90 dark:bg-gray-900/80 backdrop-blur-xl shadow-lg border-b border-gray-200/50 dark:border-gray-700/50 transition-all duration-300 rounded-b-2xl" // Updated light background and added border
      >
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }} 
              transition={{ type: "spring", stiffness:300 }}
              className="overflow-hidden rounded-lg" // Added rounded-lg for logo container
            >
              <Image src="/assets/images/logo.png" alt="Eco AI.ly Logo" width={200} height={40} priority className="h-10 sm:h-12 w-auto"/>
            </motion.div>
          </Link>
          <nav className="hidden md:flex items-center space-x-1">
            {[ { href: "#features", label: "Features" }, { href: "#platform", label: "Technology" }, { href: "#impact", label: "Our Impact" },
            ].map(link => (
              // FIXED: Added whileHover and initial to this parent motion.div to drive underline animation
              <motion.div 
                key={link.href} 
                className="relative px-3 py-2 group" 
                whileHover="hover" 
                initial="initial"
              >
                <Link 
                  href={link.href} 
                  className="text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200 font-medium rounded-md"
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                > {/* Added rounded-md to link text container if needed */}
                  {link.label}
                </Link>
                <motion.div 
                  className="absolute bottom-1 left-0 right-0 h-0.5 bg-green-500 dark:bg-green-400 origin-center rounded-full" // Added rounded-full to underline
                  // initial={{ scaleX: 0 }} // This is now handled by the parent's 'initial' variant state
                  variants={{ 
                    initial: { scaleX: 0 }, // Variant for initial state
                    hover: { scaleX: 1 }    // Variant for hover state
                  }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </motion.div>
            ))} 
            <motion.div className="ml-4" whileHover={{ scale: 1.05 }}>
              <Link href="/dashboard/portugal" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-xl"> {/* Ensure this is rounded-xl or similar */}
                View Dashboard
              </Link>
            </motion.div>
            <div className="ml-4 flex items-center space-x-3">
              <motion.a
                href="https://github.com/guilhermegranchopro/Eco-AI.ly"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md border border-gray-300/50 dark:border-gray-600/50 flex items-center justify-center"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label="View GitHub repository"
              >
                <GitHubIcon />
              </motion.a>
              <ThemeToggleButton />
            </div>
          </nav>
          <div className="md:hidden flex items-center space-x-4"> {/* Added flex and space for mobile menu button and theme toggle */}
            <motion.a
              href="https://github.com/guilhermegranchopro/Eco-AI.ly"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-slate-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-slate-300 dark:hover:bg-gray-600 transition-colors duration-200 shadow-md border border-gray-300/50 dark:border-gray-600/50 flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              aria-label="View GitHub repository"
            >
              <GitHubIcon />
            </motion.a>
            <ThemeToggleButton />
            <motion.button onClick={toggleMobileMenu} className="text-gray-600 dark:text-gray-300 focus:outline-none z-50" whileTap={{ scale: 0.9 }}>
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden fixed inset-x-0 top-0 pt-20 p-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl border-b border-gray-200/50 dark:border-gray-700/50 z-40 min-h-screen rounded-b-2xl" // Added border
            onClick={toggleMobileMenu} 
          >
            <nav className="flex flex-col space-y-6 items-center text-xl">
              {[
                { href: "#features", label: "Features" },
                { href: "#platform", label: "Technology" },
                { href: "#impact", label: "Our Impact" },
                { href: "/dashboard/portugal", label: "View Dashboard", isButton: true },
                { href: "https://github.com/guilhermegranchopro/Eco-AI.ly", label: "GitHub", isExternal: true },
              ].map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={link.isButton 
                    ? "w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg" // Ensure this is rounded-xl or similar
                    : "text-gray-600 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium rounded-lg"} // Updated mobile nav text colors
                  onClick={(e) => {
                    if (!link.isExternal) {
                      handleSmoothScroll(e, link.href);
                    }
                    // For mobile menu, we also want to close it after clicking a link
                    // No need to check for href.startsWith("#") here for toggleMobileMenu, 
                    // as handleSmoothScroll already prevents default for hash links.
                    // We always want to close the mobile menu after a link is clicked.
                    toggleMobileMenu(); 
                  }}
                  {...(link.isExternal && { target: "_blank", rel: "noopener noreferrer" })}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col items-center mt-8 sm:mt-12">
        {/* Welcome Section - Enhanced */}
        <AnimatedSection className="text-center my-12 sm:my-16 p-8 sm:p-12 rounded-3xl shadow-lg bg-white/80 dark:bg-gray-800 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 w-full transform transition-all duration-500 hover:scale-[1.01] overflow-hidden relative">
          {/* Subtle animated background elements */}
          {/*
          {heroShapesData.map(shape => { // Use heroShapesData here
            const animProps = shape.animation || {}; // Default to empty object if animation is undefined
            const transProps = shape.transition || {}; // Default to empty object if transition is undefined

            return shape.isPath ? (
              <motion.svg
                key={shape.id}
                className={shape.className}
                viewBox="0 0 16 16" // Assuming a 16x16 viewbox for the example path
                initial={{ opacity: 0 }}
                animate={{ ...animProps, opacity: animProps.opacity ?? [0.3, 0.7, 0.3] }} // Ensure opacity is part of animation
                transition={{ ...transProps, opacity: { duration: (transProps.duration || 0.6) / 2, repeat: Infinity, ease: "easeInOut" } }} // Default duration for calculation
              >
                <motion.path
                  d={shape.d || ""} // Default to empty string if d is undefined
                  fill={shape.fill || "none"} // Use fill from data or none
                  stroke={shape.stroke || "none"} // Use stroke from data or none
                  strokeWidth={shape.strokeWidth || 0} // Use strokeWidth from data or 0
                  animate={{ pathLength: animProps.pathLength }} // Framer Motion handles undefined pathLength by not animating it
                  transition={{ duration: transProps.duration || 2, repeat: Infinity, ease: "linear" }} // Default duration
                />
              </motion.svg>
            ) : (
              <motion.div
                key={shape.id}
                className={shape.className} // Ensure rounded-full, rounded-3xl etc. are here
                animate={animProps}
                transition={transProps}
              />
            );
          })}
          */}
          <motion.div 
            variants={fadeInUp} 
            className="relative z-10"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 relative z-10">
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-500"
                style={{ backgroundSize: "300% auto" }}
                animate={{ backgroundPosition: ["0% center", "150% center", "0% center"] }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              >
                Eco AI.ly
              </motion.span>
            </h1>
            <motion.p variants={fadeInUp} className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-4 relative z-10">
              Harnessing <strong className="text-green-600 dark:text-green-400">Artificial Intelligence</strong> for a <strong className="text-emerald-600 dark:text-emerald-400">Sustainable Planet</strong> 🌍.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-md sm:text-lg text-gray-500 dark:text-gray-400 max-w-3xl mx-auto relative z-10">
              We provide cutting-edge predictive analytics and actionable insights to empower decision-makers in building a greener, more resilient future. Explore real-time environmental metrics and AI-driven forecasts.
            </motion.p>
            <motion.div variants={fadeInUp} className="mt-10 relative z-10">
              <Link href="/dashboard/portugal" className="group inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"> {/* Ensure rounded-xl */}
                Explore Portugal Dashboard
                <ArrowRightIcon />
              </Link>
            </motion.div>
          </motion.div>
        </AnimatedSection>

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
            <Link href="/contact" className="group inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800"> {/* Ensure rounded-xl */}
              Contact Us
              <ArrowRightIcon />
            </Link>
          </motion.div>
        </AnimatedSection>
      </main>

      {/* Footer - Enhanced */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full py-8 text-center text-gray-500 dark:text-gray-400 border-t border-gray-200/60 dark:border-gray-700/50 mt-16 md:mt-24 rounded-t-2xl bg-white/60 dark:bg-gray-900/50 backdrop-blur-sm" // Updated light theme background
      >
        <p>&copy; {new Date().getFullYear()} Eco AI.ly. All rights reserved.</p>
        <p className="text-xs">Innovating for a Greener Future.</p>
        {/* Add social links or other footer content here, potentially with looping hover animations */}
      </motion.footer>
    </motion.main>
  );
};

// Ensure all other components (AnimatedSection, specific SVG icons, etc.) are correctly defined or imported.
// Review z-index values across components to ensure correct layering, especially with the CursorFollower.
