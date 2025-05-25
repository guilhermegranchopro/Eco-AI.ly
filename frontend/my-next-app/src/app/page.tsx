import Image from "next/image";
import Link from "next/link"; // Import Link

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


export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-100 via-green-50 to-emerald-100 dark:from-gray-900 dark:via-gray-800 dark:to-green-900 text-gray-800 dark:text-gray-100 font-[family-name:var(--font-geist-sans)] transition-colors duration-300">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 w-full flex justify-center py-4 sm:py-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md shadow-lg transition-all duration-300">
        <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <Link href="/" className="hover:opacity-80 transition-opacity">
            <Image 
              src="/assets/images/logo.png" 
              alt="Eco AI.ly Logo" 
              width={200} // Adjusted width
              height={40} // Adjusted height to maintain aspect ratio (assuming 5:1)
              priority 
              className="h-10 sm:h-12 w-auto" // Responsive height
            />
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="#features" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Features</Link>
            <Link href="#platform" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Platform</Link>
            <Link href="#tech" className="text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors">Technology</Link>
            <Link href="/dashboard/portugal" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors shadow-md hover:shadow-lg">
              View Dashboard
            </Link>
          </nav>
          <div className="md:hidden">
            {/* Mobile Menu Button - can be implemented later */}
            <button className="text-gray-600 dark:text-gray-300 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <main className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center mt-8 sm:mt-12">
        {/* Welcome Section - Enhanced */}
        <section className="text-center my-12 sm:my-16 p-8 sm:p-12 rounded-2xl shadow-2xl bg-white dark:bg-gray-800 w-full transform transition-all duration-500 hover:scale-[1.02]">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-6">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600 dark:from-green-400 dark:to-emerald-500">
              Eco AI.ly
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-gray-700 dark:text-gray-300 mb-4">
            Harnessing <strong className="text-green-600 dark:text-green-400">Artificial Intelligence</strong> for a <strong className="text-emerald-600 dark:text-emerald-400">Sustainable Planet</strong> 🌍.
          </p>
          <p className="text-md sm:text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            We provide cutting-edge predictive analytics and actionable insights to empower decision-makers in building a greener, more resilient future. Explore real-time environmental metrics and AI-driven forecasts.
          </p>
          <div className="mt-10">
            <Link href="/dashboard/portugal" className="group inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              Explore Portugal Dashboard
              <ArrowRightIcon />
            </Link>
          </div>
        </section>

        {/* Key Features Section - Enhanced */}
        <section id="features" className="my-12 sm:my-16 w-full scroll-mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 dark:text-green-300 mb-10 sm:mb-12 text-center">
            ✨ Our Core Capabilities
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <PredictiveAnalyticsIcon />, title: "Predictive Analytics", items: ["Real-time energy forecasts", "Environmental impact predictions", "Trend analysis & pattern recognition"] },
              { icon: <DataVisualizationIcon />, title: "Data Visualization", items: ["Interactive dashboards", "Dynamic charts & graphs", "Customizable data views"] },
              { icon: <AIPoweredInsightsIcon />, title: "AI-Powered Insights", items: ["Advanced machine learning models", "Actionable pattern recognition", "Automated sustainability reporting"] }
            ].map((feature, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 sm:p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {feature.icon}
                <h3 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-4">{feature.title}</h3>
                <ul className="list-none space-y-2 text-gray-600 dark:text-gray-400">
                  {feature.items.map(item => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Explore Our Platform Section - Enhanced */}
        <section id="platform" className="my-12 sm:my-16 p-8 sm:p-12 rounded-2xl shadow-xl bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 dark:from-green-700 dark:via-emerald-700 dark:to-teal-800 w-full text-center text-white scroll-mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Dive Into Our Platform
          </h2>
          <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto">
            Experience firsthand how Eco AI.ly transforms complex data into clear, actionable environmental intelligence. Our Portugal dashboard is just the beginning.
          </p>
          <div>
            <h3 className="text-2xl sm:text-3xl font-semibold mb-3">🇵🇹 Portugal Data Dashboard</h3>
            <ul className="list-disc list-inside inline-block text-left space-y-2 mb-8 text-green-100 dark:text-green-200">
              <li>Comprehensive energy consumption metrics</li>
              <li>Real-time carbon intensity updates</li>
              <li>Historical trend analysis & AI predictions</li>
              <li>Actionable insights for energy arbitrage</li>
            </ul>
            <div>
              <Link href="/dashboard/portugal" className="group inline-flex items-center justify-center bg-white text-green-600 px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-gray-100 hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                View Live Dashboard
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </section>

        {/* Our Technology Stack Section - Enhanced */}
        <section id="tech" className="my-12 sm:my-16 w-full scroll-mt-20">
          <h2 className="text-3xl sm:text-4xl font-bold text-green-800 dark:text-green-300 mb-10 sm:mb-12 text-center">
            ⚙️ Built With Cutting-Edge Technology
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { icon: <BackendTechIcon />, title: "Robust Backend", items: ["Python & TensorFlow for AI", "FastAPI for efficient APIs", "Advanced data processing pipelines", "Real-time data integration"] },
              { icon: <FrontendTechIcon />, title: "Dynamic Frontend", items: ["Next.js & React for performance", "Tailwind CSS for modern styling", "Recharts for interactive charts", "Fully responsive for all devices"] }
            ].map((tech, index) => (
              <div key={index} className="flex flex-col items-center text-center p-6 sm:p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                {tech.icon}
                <h3 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-4">{tech.title}</h3>
                <ul className="list-none space-y-2 text-gray-600 dark:text-gray-400">
                  {tech.items.map(item => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action Section - Enhanced */}
        <section className="my-12 sm:my-16 text-center p-10 sm:p-16 rounded-2xl shadow-xl bg-gray-800 dark:bg-gray-900 text-white w-full">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
            Ready to Build a <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">Greener Future</span>?
          </h2>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto text-gray-300 dark:text-gray-400">
            Join Eco AI.ly in leveraging the power of artificial intelligence to drive sustainable change. Let's innovate together for a healthier planet.
          </p>
          <Link href="mailto:contact@ecoaily.com" className="group inline-flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
            Contact Us
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </Link>
        </section>
      </main>

      {/* Footer - Enhanced */}
      <footer className="w-full text-center py-10 sm:py-12 mt-12 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800/50 transition-colors duration-300">
        <div className="mb-4">
          <Link href="/" className="hover:opacity-80 transition-opacity">
              <Image 
                src="/assets/images/logo.png" 
                alt="Eco AI.ly Logo" 
                width={160} 
                height={32} 
                className="h-8 w-auto mx-auto"
              />
            </Link>
        </div>
        <div className="flex justify-center space-x-6 mb-6">
          <Link href="#features" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Features</Link>
          <Link href="/dashboard/portugal" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Dashboard</Link>
          <Link href="mailto:privacy@ecoaily.com" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Privacy Policy</Link>
          <Link href="mailto:terms@ecoaily.com" className="text-gray-500 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors">Terms of Service</Link>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Eco AI.ly - Pioneering AI for a Sustainable Tomorrow 🌿
        </p>
      </footer>
    </div>
  );
}
