import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Header/Logo Section */}
      <header className="w-full flex justify-center py-6 sm:py-8 bg-white dark:bg-gray-800 shadow-md">
        {/* 
          Please ensure your logo image is placed in:
          frontend/my-next-app/public/assets/images/logo.png
          The width and height below are placeholders; adjust them to your logo's aspect ratio.
        */}
        <Image 
          src="/assets/images/logo.png" 
          alt="Eco AI.ly Logo" 
          width={500} // Placeholder width
          height={100} // Placeholder height
          priority 
        />
      </header>

      <main className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col items-center mt-8 sm:mt-12">
        {/* Welcome Section */}
        <section className="text-center my-8 p-6 sm:p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 w-full">
          <h1 className="text-3xl sm:text-4xl font-bold text-green-700 dark:text-green-400 mb-4">
            🌱 Welcome to Eco AI.ly
          </h1>
          <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
            Your innovative platform at the intersection of <strong>Artificial Intelligence</strong> 🤖 and <strong>Sustainability</strong> 🌍. 
            We empower decision-makers with accurate, real-time predictions on environmental metrics, enabling a greener future for all.
          </p>
        </section>

        {/* Key Features Section */}
        <section className="my-8 sm:my-12 w-full">
          <h2 className="text-3xl sm:text-4xl font-semibold text-green-800 dark:text-green-300 mb-8 text-center">
            ✨ Our Key Features
          </h2>
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-3">📊 Predictive Analytics</h3>
              <ul className="list-none space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 📈 Real-time energy consumption forecasts</li>
                <li>• 🌡️ Environmental impact predictions</li>
                <li>• 📉 Trend analysis and pattern recognition</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-3">📱 Data Visualization</h3>
              <ul className="list-none space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 📊 Interactive dashboards</li>
                <li>• 📈 Dynamic charts and graphs</li>
                <li>• 🎯 Customizable data views</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800 hover:shadow-xl transition-shadow">
              <h3 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-3">🤖 AI-Powered Insights</h3>
              <ul className="list-none space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 🧠 Machine learning models</li>
                <li>• 🔍 Pattern recognition</li>
                <li>• 📋 Automated reporting</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Explore Our Platform Section */}
        <section className="my-8 sm:my-12 p-6 sm:p-8 rounded-xl shadow-lg bg-white dark:bg-gray-800 w-full text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold text-green-800 dark:text-green-300 mb-6">
            🌍 Explore Our Platform
          </h2>
          <div>
            <h3 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-3">🇵🇹 Portugal Data Dashboard</h3>
            <ul className="list-none inline-block text-left space-y-2 text-gray-600 dark:text-gray-300">
              <li>• 📊 Comprehensive energy consumption metrics</li>
              <li>• ⚡ Real-time data updates</li>
              <li>• 📈 Historical trend analysis</li>
              <li>• 🔄 Export and import statistics</li>
            </ul>
            {/* Link to the new dashboard page */}
            <a href="/dashboard/portugal" className="mt-6 inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold text-lg">View Dashboard</a>
          </div>
        </section>

        {/* Our Technology Stack Section */}
        <section className="my-8 sm:my-12 w-full">
          <h2 className="text-3xl sm:text-4xl font-semibold text-green-800 dark:text-green-300 mb-8 text-center">
            ⚙️ Our Technology Stack
          </h2>
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
              <h3 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-3">🔧 Backend Technologies</h3>
              <ul className="list-none space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 🐍 Python & TensorFlow for AI models</li>
                <li>• 🔄 Advanced data processing pipelines</li>
                <li>• ⚡ Real-time data integration</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl shadow-lg bg-white dark:bg-gray-800">
              <h3 className="text-2xl font-semibold text-green-700 dark:text-green-500 mb-3">🎨 Frontend Technologies</h3>
              <ul className="list-none space-y-2 text-gray-600 dark:text-gray-300">
                <li>• 💻 Next.js & React for a dynamic and performant frontend</li>
                <li>• 🎨 Tailwind CSS for modern and responsive styling</li>
                <li>• 📊 Interactive charts using libraries like Recharts or Chart.js</li>
                <li>• 📱 Fully responsive design for all devices</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="my-8 sm:my-12 text-center p-8 sm:p-10 rounded-xl shadow-xl bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-700 dark:to-emerald-700 text-white w-full">
          <h2 className="text-3xl sm:text-4xl font-semibold mb-4">🌟 Ready to Make a Difference?</h2>
          <p className="text-lg sm:text-xl">
            Join us in our mission to create a sustainable future through AI-powered insights. 🌱
          </p>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full text-center py-8 sm:py-10 mt-12 border-t border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © {new Date().getFullYear()} Eco AI.ly - Empowering Sustainable Decisions with AI 🌿
        </p>
      </footer>
    </div>
  );
}
