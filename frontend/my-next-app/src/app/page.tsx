"use client";
import React, { useState, useEffect, useRef, useMemo, ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform, useSpring, animate, SpringOptions } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

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
      className={`relative p-6 md:p-8 rounded-xl shadow-xl overflow-hidden bg-gray-800/30 backdrop-blur-md border border-gray-700/50 ${className}`}
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


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

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
  
  const heroShapesData = useMemo(() => [ // Renamed to heroShapesData to avoid conflict if heroShapes is used in JSX later
    // ... your existing shapes ...
    { id: 'shape-new-1', className: "absolute top-1/4 left-1/5 w-20 h-20 bg-teal-500/20 rounded-full filter blur-lg", animation: { x: [0, 15, -10, 0], y: [0, -25, 20, 0], scale: [1, 1.2, 0.8, 1], rotate: [0, 70, -60, 0] }, transition: { duration: 22, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" as const } },
    { id: 'shape-new-2', className: "absolute bottom-1/3 right-1/4 w-28 h-12 border-2 border-fuchsia-500/30 rounded-3xl transform -skew-x-12", animation: { skewX: [-12, 12, -12], x: [0, -20, 20, 0], opacity: [0.5, 0.8, 0.5] }, transition: { duration: 18, repeat: Infinity, ease: "linear", repeatType: "mirror" as const } },
    { id: 'shape-new-3', className: "absolute bottom-1/2 right-1/2 w-16 h-16 opacity-30", animation: { pathLength: [0, 1, 0], rotate: [0, 360] }, transition: { duration: 15, repeat: Infinity, ease: "linear" }, isPath: true, d: "M8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0ZM8 12.8C5.34903 12.8 3.2 10.651 3.2 8C3.2 5.34903 5.34903 3.2 8 3.2C10.651 3.2 12.8 5.34903 12.8 8C12.8 10.651 10.651 12.8 8 12.8Z", fill:"url(#gradPulse)" }
  ], []);


  return (
    <motion.main
      className="flex flex-col items-center justify-center min-h-screen text-white overflow-x-hidden antialiased bg-[#0A0F1A]" // Base dark color
      initial="initial"
      animate="animate"
      variants={{
        initial: { background: "linear-gradient(135deg, #0A0F1A 0%, #101626 50%, #0A0F1A 100%)" },
        animate: {
          background: [
            "linear-gradient(135deg, #0A0F1A 0%, #101626 25%, #1A2035 50%, #101626 75%, #0A0F1A 100%)",
            "linear-gradient(135deg, #0A0F1A 0%, #1A2035 25%, #101626 50%, #1A2035 75%, #0A0F1A 100%)",
            "linear-gradient(135deg, #0A0F1A 0%, #101626 25%, #1A2035 50%, #101626 75%, #0A0F1A 100%)",
          ],
        }
      }}
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
        className="sticky top-0 z-50 w-full flex justify-center py-4 sm:py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl transition-all duration-300 rounded-b-2xl" // Added rounded-b-2xl
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
            {[ { href: "#features", label: "Features" }, { href: "#platform", label: "Platform" }, { href: "#tech", label: "Technology" }, { href: "#impact", label: "Our Impact" },
            ].map(link => (
              // FIXED: Added whileHover and initial to this parent motion.div to drive underline animation
              <motion.div 
                key={link.href} 
                className="relative px-3 py-2 group" 
                whileHover="hover" 
                initial="initial"
              >
                <Link href={link.href} className="text-gray-600 dark:text-gray-300 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors duration-200 font-medium rounded-md"> {/* Added rounded-md to link text container if needed */}
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
          </nav>
          <div className="md:hidden">
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
            className="md:hidden fixed inset-x-0 top-0 pt-20 p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-xl z-40 min-h-screen rounded-b-2xl" // Added rounded-b-2xl to mobile menu
            onClick={toggleMobileMenu} 
          >
            <nav className="flex flex-col space-y-6 items-center text-xl">
              {[
                { href: "#features", label: "Features" },
                { href: "#platform", label: "Platform" },
                { href: "#tech", label: "Technology" },
                { href: "#impact", label: "Our Impact" },
                { href: "/dashboard/portugal", label: "View Dashboard", isButton: true },
              ].map(link => (
                <Link 
                  key={link.href} 
                  href={link.href} 
                  className={link.isButton 
                    ? "w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg" // Ensure this is rounded-xl or similar
                    : "text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium rounded-lg"} // Added rounded-lg to mobile nav links
                  onClick={(e) => { e.stopPropagation(); toggleMobileMenu(); }} // Prevent closing when clicking link, then close
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
        <AnimatedSection className="text-center my-12 sm:my-16 p-8 sm:p-12 rounded-3xl shadow-2xl bg-white dark:bg-gray-800 w-full transform transition-all duration-500 hover:scale-[1.01] overflow-hidden relative">
          {/* Subtle animated background elements */}
          {heroShapesData.map(shape => ( // Use heroShapesData here
            shape.isPath ? (
              <motion.svg 
                key={shape.id} 
                className={shape.className} 
                viewBox="0 0 16 16" // Assuming a 16x16 viewbox for the example path
                initial={{ opacity: 0 }}
                animate={{ ...shape.animation, opacity: shape.animation.opacity ? shape.animation.opacity : [0.3, 0.7, 0.3] }} // Ensure opacity is part of animation
                transition={{ ...shape.transition, opacity: { duration: shape.transition.duration / 2, repeat: Infinity, ease: "easeInOut" } }}
              >
                <motion.path 
                  d={shape.d} 
                  fill={shape.fill || "none"} // Use fill from data or none
                  stroke={shape.stroke || "none"} // Use stroke from data or none
                  strokeWidth={shape.strokeWidth || 0} // Use strokeWidth from data or 0
                  animate={{ pathLength: shape.animation.pathLength }}
                  transition={{ duration: shape.transition.duration, repeat: Infinity, ease: "linear" }}
                />
              </motion.svg>
            ) : (
              <motion.div
                key={shape.id}
                className={shape.className} // Ensure rounded-full, rounded-3xl etc. are here
                animate={shape.animation}
                transition={shape.transition}
              />
            )
          ))}
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
            <motion.p variants={fadeInUp} className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-4 relative z-10">
              Harnessing <strong className="text-green-600 dark:text-green-400">Artificial Intelligence</strong> for a <strong className="text-emerald-600 dark:text-emerald-400">Sustainable Planet</strong> 🌍.
            </motion.p>
            <motion.p variants={fadeInUp} className="text-md sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto relative z-10">
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
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-800 dark:text-green-300 mb-12 sm:mb-16 text-center">
            ✨ Our Core Capabilities
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[ { icon: <PredictiveAnalyticsIcon />, title: "Predictive Analytics", items: ["Real-time energy forecasts", "Environmental impact predictions", "Trend analysis & pattern recognition"] },
              { icon: <DataVisualizationIcon />, title: "Data Visualization", items: ["Interactive dashboards", "Dynamic charts & graphs", "Customizable data views"] },
              { icon: <AIPoweredInsightsIcon />, title: "AI-Powered Insights", items: ["Advanced machine learning models", "Actionable pattern recognition", "Automated sustainability reporting"] }
            ].map((feature) => (
              <InteractiveCard 
                key={feature.title} 
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800/70 backdrop-blur-sm border border-transparent hover:border-green-500/30" // Ensure rounded-2xl
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
        <AnimatedSection id="platform" className="py-16 md:py-24 bg-gray-900/30">
          {/* Decorative elements */}
          <motion.div className="absolute -top-10 -left-10 w-48 h-48 border-4 border-white/20 rounded-full opacity-30" animate={{ rotate: 360 }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
          <motion.div className="absolute -bottom-12 -right-12 w-60 h-60 border-8 border-white/10 rounded-xl opacity-20" animate={{ rotate: -360 }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} />

          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold mb-6 relative z-10">
            Dive Into Our Platform
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto relative z-10">
            Experience firsthand how Eco AI.ly transforms complex data into clear, actionable environmental intelligence. Our Portugal dashboard is just the beginning.
          </motion.p>
          <motion.div variants={fadeInUp} className="relative z-10">
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3">🇵🇹 Portugal Data Dashboard</h3>
            <ul className="list-disc list-inside inline-block text-left space-y-2 mb-8 text-green-100 dark:text-green-200">
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
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-800 dark:text-green-300 mb-12 sm:mb-16 text-center">
            ⚙️ Built With Cutting-Edge Technology
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[ { icon: <BackendTechIcon />, title: "Robust Backend", items: ["Python & TensorFlow for AI", "FastAPI for efficient APIs", "Advanced data processing pipelines", "Real-time data integration"] },
              { icon: <FrontendTechIcon />, title: "Dynamic Frontend", items: ["Next.js, React & TypeScript", "Tailwind CSS for modern styling", "Framer Motion for animations", "Recharts for interactive charts"] }
            ].map((tech) => (
              <InteractiveCard 
                key={tech.title} 
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800/70 backdrop-blur-sm border border-transparent hover:border-emerald-500/30" // Ensure rounded-2xl
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
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-800 dark:text-green-300 mb-12 sm:mb-16 text-center">
            📈 Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[ { label: "Tons of CO2 Offset Annually", value: 15000, displaySuffix: "+" },
              { label: "Renewable Energy Projects Optimized", value: 300, displaySuffix: "+" },
              { label: "Data Points Processed Daily", value: 10, displaySuffix: "M+" }
            ].map(stat => (
              <InteractiveCard 
                key={stat.label}
                variants={fadeInUp}
                className="p-6 sm:p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800/70 backdrop-blur-sm text-center border border-transparent hover:border-green-400/30" // Ensure rounded-2xl
              >
                <div className="text-4xl sm:text-5xl font-bold text-green-600 dark:text-green-400 mb-3">
                  <AnimatedNumber value={stat.value} />{stat.displaySuffix}
                </div>
                <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">{stat.label}</p>
              </InteractiveCard>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedDivider />

        {/* Call to Action Section - Enhanced */}
        <AnimatedSection id="cta" className="py-16 md:py-24 bg-gradient-to-br from-purple-600/20 via-transparent to-cyan-600/20">
          <motion.div 
            className="absolute -top-20 -left-20 w-60 h-60 bg-green-500/15 rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.4, 0.9, 1.5, 1], opacity: [0.4, 0.7, 0.3, 0.8, 0.4], rotate: [0, -70, 80, -50, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div 
            className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-500/15 rounded-full filter blur-3xl"
            animate={{ scale: [1, 1.5, 0.8, 1.6, 1], opacity: [0.3, 0.6, 0.2, 0.7, 0.3], rotate: [0, 90, -60, 100, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          />
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 relative z-10">
            Ready to Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500">Greener Future</span>?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 max-w-2xl mx-auto mb-10 relative z-10">
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
        className="w-full py-8 text-center text-gray-400 border-t border-gray-700/50 mt-16 md:mt-24 rounded-t-2xl" // Added rounded-t-2xl
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
