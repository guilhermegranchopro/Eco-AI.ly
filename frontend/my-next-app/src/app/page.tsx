"use client"; // Add this at the top if not already present

import Image from "next/image";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimation, AnimationControls } from "framer-motion";
import { useInView } from "react-intersection-observer";

// SVG Icon Components (can be moved to a separate file later)
const PredictiveAnalyticsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l3.045-3.045m0 0A18.75 18.75 0 0121.5 12M6.795 10.455A18.75 18.75 0 002.5 12m4.295-1.545l2.016 2.016m-2.016-2.016L6.75 8.25m2.016 4.268L6.75 10.455m1.06 6.273l2.016-2.016m-2.016 2.016L6.75 16.75m2.016-4.268L6.75 14.732m9-3.232h.008v.008H15.75V11.5m0 2.25h.008v.008H15.75V13.75m0 2.25h.008v.008H15.75V16m0 2.25h.008v.008H15.75V18.25M12 11.5h.008v.008H12V11.5m0 2.25h.008v.008H12V13.75m0 2.25h.008v.008H12V16m0 2.25h.008v.008H12V18.25m-3.75-6.75h.008v.008H8.25V11.5m0 2.25h.008v.008H8.25V13.75m0 2.25h.008v.008H8.25V16m0 2.25h.008v.008H8.25V18.25M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
  </svg>
);

const DataVisualizationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
  </svg>
);

const AIPoweredInsightsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 3v1.5M4.5 8.25H3m18 0h-1.5M4.5 12H3m18 0h-1.5m-15 3.75H3m18 0h-1.5M8.25 21v-1.5M12 3v1.5M12 21v-1.5M12 8.25v7.5M15.75 3v1.5M15.75 21v-1.5M19.5 8.25H12M19.5 15.75H12" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 12m-3 0a3 3 0 106 0 3 3 0 10-6 0Z" />
  </svg>
);

const BackendTechIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
  </svg>
);

const FrontendTechIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mb-4 text-green-500">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5.16 12.75M9.75 3.104A2.25 2.25 0 0112 4.5h5.25a2.25 2.25 0 012.25 2.25v4.072a2.25 2.25 0 01-.659 1.591L14.84 12.75M9.75 3.104A2.25 2.25 0 007.5 4.5H2.25a2.25 2.25 0 00-2.25 2.25v4.072a2.25 2.25 0 00.659 1.591L5.16 12.75m0 0L2.25 15M5.16 12.75l2.595-2.595m0 0A2.25 2.25 0 019.75 8.25v0M14.84 12.75l2.595 2.595m0 0A2.25 2.25 0 0014.25 18v0M14.84 12.75L12 15.165m2.84-2.415L12 10.155M12 10.155L9.16 12.75" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 15.75H14.25" />
  </svg>
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

const cardHover = {
  scale: 1.05,
  boxShadow: "0px 15px 30px rgba(0, 200, 0, 0.2)",
  transition: { type: "spring", stiffness: 300 }
};

// Animated Number Component - REVISED and TYPED
const AnimatedNumber = ({ value }: { value: number }) => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  const [displayValue, setDisplayValue] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start({
        animatedValue: value, // Animate a custom prop
        transition: { duration: 2, ease: "easeOut" }
      });
    }
  }, [inView, value, controls]);

  return (
    <motion.span
      ref={ref}
      initial={{ animatedValue: 0 }} // Initial state of the custom prop
      animate={controls}
      onUpdate={(latest: { animatedValue?: number }) => { // Explicitly type latest
        if (typeof latest.animatedValue === 'number') {
          setDisplayValue(Math.round(latest.animatedValue));
        }
      }}
    >
      {displayValue.toLocaleString()}
    </motion.span>
  );
};


export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  // Generic component for sections to reduce repetition
  const AnimatedSection = ({ children, className, id }: { children: ReactNode, className?: string, id?: string }) => {
    const controls: AnimationControls = useAnimation(); // Explicitly type controls
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
      if (inView) {
        controls.start("animate");
      }
    }, [controls, inView]);

    return (
      <motion.section
        id={id}
        ref={ref}
        className={className}
        variants={staggerContainer}
        initial="initial"
        animate={controls}
      >
        {children}
      </motion.section>
    );
  };


  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-black dark:to-green-900 text-gray-800 dark:text-gray-100 font-[family-name:var(--font-geist-sans)] transition-colors duration-300 overflow-x-hidden">
      {/* Sticky Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 w-full flex justify-center py-4 sm:py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-2xl transition-all duration-300"
      >
        <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Image 
                src="/assets/images/logo.png" 
                alt="Eco AI.ly Logo" 
                width={200} 
                height={40} 
                priority 
                className="h-10 sm:h-12 w-auto"
              />
            </motion.div>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {[
              { href: "#features", label: "Features" },
              { href: "#platform", label: "Platform" },
              { href: "#tech", label: "Technology" },
              { href: "#impact", label: "Our Impact" },
            ].map(link => (
              <motion.div key={link.href} whileHover={{ scale: 1.1 }}>
                <Link href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium">
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link href="/dashboard/portugal" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-5 py-2.5 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-xl">
                View Dashboard
              </Link>
            </motion.div>
          </nav>
          <div className="md:hidden">
            <motion.button 
              onClick={toggleMobileMenu} 
              className="text-gray-600 dark:text-gray-300 focus:outline-none z-50"
              whileTap={{ scale: 0.9 }}
            >
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
            className="md:hidden fixed inset-x-0 top-0 pt-20 p-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-lg shadow-xl z-40 min-h-screen"
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
                    ? "w-full text-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg" 
                    : "text-gray-700 dark:text-gray-200 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 font-medium"}
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
          <motion.div 
            className="absolute top-0 left-0 w-32 h-32 bg-green-300/30 dark:bg-green-700/30 rounded-full filter blur-2xl opacity-50"
            animate={{ x: [0, 100, 0], y: [0, 50, 0], scale: [1, 1.2, 1]}}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-300/30 dark:bg-emerald-700/30 rounded-full filter blur-2xl opacity-50"
            animate={{ x: [0, -100, 0], y: [0, -50, 0], scale: [1, 1.3, 1] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 5 }}
          />
          
          <motion.h1 variants={fadeInUp} className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6 relative z-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 dark:from-green-400 dark:via-emerald-400 dark:to-teal-500">
              Eco AI.ly
            </span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-4 relative z-10">
            Harnessing <strong className="text-green-600 dark:text-green-400">Artificial Intelligence</strong> for a <strong className="text-emerald-600 dark:text-emerald-400">Sustainable Planet</strong> 🌍.
          </motion.p>
          <motion.p variants={fadeInUp} className="text-md sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto relative z-10">
            We provide cutting-edge predictive analytics and actionable insights to empower decision-makers in building a greener, more resilient future. Explore real-time environmental metrics and AI-driven forecasts.
          </motion.p>
          <motion.div variants={fadeInUp} className="mt-10 relative z-10">
            <Link href="/dashboard/portugal" className="group inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-800">
              Explore Portugal Dashboard
              <ArrowRightIcon />
            </Link>
          </motion.div>
        </AnimatedSection>

        {/* Key Features Section - Enhanced */}
        <AnimatedSection id="features" className="my-16 sm:my-20 w-full scroll-mt-24">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-800 dark:text-green-300 mb-12 sm:mb-16 text-center">
            ✨ Our Core Capabilities
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <PredictiveAnalyticsIcon />, title: "Predictive Analytics", items: ["Real-time energy forecasts", "Environmental impact predictions", "Trend analysis & pattern recognition"] },
              { icon: <DataVisualizationIcon />, title: "Data Visualization", items: ["Interactive dashboards", "Dynamic charts & graphs", "Customizable data views"] },
              { icon: <AIPoweredInsightsIcon />, title: "AI-Powered Insights", items: ["Advanced machine learning models", "Actionable pattern recognition", "Automated sustainability reporting"] }
            ].map((feature) => (
              <motion.div 
                key={feature.title} 
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-green-500/50"
                whileHover={cardHover}
              >
                <motion.div whileHover={{ rotate: [0, 10, -10, 0], transition: { duration: 0.5, repeat: Infinity } }}>
                  {feature.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">{feature.title}</h3>
                <ul className="list-none space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  {feature.items.map(item => <li key={item}>• {item}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Explore Our Platform Section - Enhanced */}
        <AnimatedSection id="platform" className="my-16 sm:my-20 p-8 sm:p-12 rounded-3xl shadow-xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 dark:from-green-700 dark:via-emerald-700 dark:to-teal-800 w-full text-center text-white scroll-mt-24 relative overflow-hidden">
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
              <Link href="/dashboard/portugal" className="group inline-flex items-center justify-center bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-100 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-green-200 dark:focus:ring-green-500">
                View Live Dashboard
                <ArrowRightIcon />
              </Link>
            </div>
          </motion.div>
        </AnimatedSection>

        {/* Our Technology Stack Section - Enhanced */}
        <AnimatedSection id="tech" className="my-16 sm:my-20 w-full scroll-mt-24">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-800 dark:text-green-300 mb-12 sm:mb-16 text-center">
            ⚙️ Built With Cutting-Edge Technology
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: <BackendTechIcon />, title: "Robust Backend", items: ["Python & TensorFlow for AI", "FastAPI for efficient APIs", "Advanced data processing pipelines", "Real-time data integration"] },
              { icon: <FrontendTechIcon />, title: "Dynamic Frontend", items: ["Next.js, React & TypeScript", "Tailwind CSS for modern styling", "Framer Motion for animations", "Recharts for interactive charts"] }
            ].map((tech) => (
              <motion.div 
                key={tech.title} 
                variants={fadeInUp}
                className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl shadow-lg bg-white dark:bg-gray-800/70 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 border border-transparent hover:border-emerald-500/50"
                whileHover={cardHover}
              >
                 <motion.div whileHover={{ scale: [1, 1.2, 1], transition: { duration: 1, repeat: Infinity } }}>
                  {tech.icon}
                </motion.div>
                <h3 className="text-2xl font-semibold text-green-700 dark:text-green-400 mb-4">{tech.title}</h3>
                <ul className="list-none space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                  {tech.items.map(item => <li key={item}>• {item}</li>)}
                </ul>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Our Impact in Numbers Section - NEW */}
        <AnimatedSection id="impact" className="my-16 sm:my-20 w-full scroll-mt-24">
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl font-bold text-green-800 dark:text-green-300 mb-12 sm:mb-16 text-center">
            📈 Our Impact in Numbers
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { label: "Tons of CO2 Offset Annually", value: 15000, displaySuffix: "+" },
              { label: "Renewable Energy Projects Optimized", value: 300, displaySuffix: "+" },
              { label: "Data Points Processed Daily", value: 10, displaySuffix: "M+" }
            ].map(stat => (
              <motion.div 
                key={stat.label}
                variants={fadeInUp}
                className="p-6 sm:p-8 rounded-2xl shadow-xl bg-white dark:bg-gray-800/70 backdrop-blur-sm text-center transform transition-all duration-300 hover:scale-105 border border-transparent hover:border-green-400/50"
              >
                <div className="text-4xl sm:text-5xl font-bold text-green-600 dark:text-green-400 mb-3">
                  <AnimatedNumber value={stat.value} />{stat.displaySuffix}
                </div>
                <p className="text-md sm:text-lg text-gray-700 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </AnimatedSection>

        {/* Call to Action Section - Enhanced */}
        <AnimatedSection className="my-16 sm:my-20 text-center p-10 sm:p-16 rounded-3xl shadow-2xl bg-gray-800 dark:bg-black text-white w-full relative overflow-hidden">
            <motion.div 
              className="absolute -top-20 -left-20 w-60 h-60 bg-green-500/20 rounded-full filter blur-3xl"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-20 -right-20 w-72 h-72 bg-emerald-500/20 rounded-full filter blur-3xl"
              animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            />
          <motion.h2 variants={fadeInUp} className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 relative z-10">
            Ready to Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500">Greener Future</span>?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-lg sm:text-xl text-gray-300 dark:text-gray-400 max-w-2xl mx-auto mb-10 relative z-10">
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

      {/* Footer - Enhanced */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="w-full text-center py-10 sm:py-12 mt-12 border-t border-gray-200/50 dark:border-gray-700/50 bg-gray-100/70 dark:bg-gray-800/70 backdrop-blur-sm transition-colors duration-300"
      >
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image 
              src="/assets/images/logo.png" 
              alt="Eco AI.ly Logo" 
              width={160} 
              height={32} 
              className="h-8 w-auto"
            />
          </Link>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {[
              { href: "#features", label: "Features" },
              { href: "#platform", label: "Platform" },
              { href: "#tech", label: "Technology" },
              { href: "#impact", label: "Impact" },
              { href: "/dashboard/portugal", label: "Dashboard" },
              // { href: "/privacy", label: "Privacy Policy" }, // Example link
              // { href: "/terms", label: "Terms of Service" }, // Example link
            ].map(link => (
              <Link key={link.href} href={link.href} className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors duration-200 text-sm">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Eco AI.ly. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </div>
  );
}
