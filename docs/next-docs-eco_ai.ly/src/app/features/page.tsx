import Link from "next/link"
import { ArrowRight, BarChart3, Brain, Activity, TrendingUp, Zap, Eye, FileText, RefreshCw, Globe, Palette, Smartphone, Monitor, Moon, Sun, ExternalLink } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const streamlitFeatures = [
  {
    icon: Activity,
    title: "Carbon Intensity Analytics",
    description: "Live carbon intensity monitoring (gCO₂eq/kWh) with 24-hour AI forecasting achieving 90.9% accuracy",
    features: ["Real-time monitoring", "Historical trend analysis", "Energy arbitrage detection", "Automated PDF reporting"],
    color: "text-green-500"
  },
  {
    icon: TrendingUp,
    title: "Renewable Percentage Tracking",
    description: "Real-time renewable energy percentage monitoring with AI-powered 24-hour predictions using LSTM models",
    features: ["Live renewable tracking", "AI predictions", "Historical analysis", "Performance metrics"],
    color: "text-blue-500"
  },
  {
    icon: BarChart3,
    title: "Production vs Consumption Analysis", 
    description: "Real-time power grid production breakdown and consumption pattern analysis",
    features: ["Interactive pie charts", "Flexible time ranges", "Energy balance metrics", "Professional reporting"],
    color: "text-purple-500"
  },
  {
    icon: RefreshCw,
    title: "Import vs Export Tracking",
    description: "Cross-border energy flow visualization with real-time import/export breakdown by country",
    features: ["Energy flow visualization", "Country breakdowns", "Self-sufficiency metrics", "Time-based analysis"],
    color: "text-orange-500"
  }
]

const nextjsFeatures = [
  {
    icon: Palette,
    title: "Advanced UI Components",
    description: "Cutting-edge user interface with modern design patterns and interactive elements",
    features: ["Reactive particle systems", "Liquid energy flow visualizations", "Glass morphism design", "3D React Three Fiber components"],
    color: "text-indigo-500"
  },
  {
    icon: Monitor,
    title: "Portugal Energy Dashboard",
    description: "Beautiful real-time metrics dashboard with interactive visualizations",
    features: ["Real-time metrics cards", "Interactive Recharts", "AI prediction badges", "Auto-refresh (5-min intervals)"],
    color: "text-pink-500"
  },
  {
    icon: Moon,
    title: "Modern Technology Stack",
    description: "Built with the latest technologies for optimal performance and developer experience",
    features: ["Next.js 15.3.2 with Turbopack", "TypeScript for type safety", "Tailwind CSS 4.0 styling", "Advanced animations (GSAP, Lottie)"],
    color: "text-cyan-500"
  },
  {
    icon: Smartphone,
    title: "Responsive Design",
    description: "Fully responsive interface that works seamlessly across all devices and screen sizes",
    features: ["Mobile-first design", "Dark/Light theme support", "Touch-friendly interactions", "Progressive Web App ready"],
    color: "text-emerald-500"
  }
]

const aiFeatures = [
  {
    icon: Brain,
    title: "LSTM Neural Networks",
    description: "Deep learning models optimized for time series environmental data prediction",
    accuracy: "90.9%",
    features: ["6-class prediction system", "Sub-second response times", "Continuous learning", "Real-time inference"],
    color: "text-blue-600"
  },
  {
    icon: Activity,
    title: "Real-time Processing",
    description: "Live data processing pipeline with smart caching and validation",
    frequency: "5 minutes",
    features: ["ElectricityMaps integration", "Automated quality checks", "Smart caching strategies", "Redundant data sources"],
    color: "text-green-600"
  }
]

const platformComparison = [
  {
    platform: "Streamlit Dashboard",
    status: "Production Ready",
    audience: "Data analysts, researchers, environmental scientists",
    strengths: ["Real-time analytics", "AI predictions", "PDF reporting", "Easy deployment"],
    url: "https://ecoaily.streamlit.app/",
    icon: "📊"
  },
  {
    platform: "Next.js Web App", 
    status: "Enhanced UI",
    audience: "End users, businesses, general public",
    strengths: ["Modern UI/UX", "Interactive animations", "Mobile-friendly", "Fast performance"],
    url: "http://localhost:3000",
    icon: "⚛️"
  },
  {
    platform: "FastAPI Backend",
    status: "Operational",
    audience: "Developers, integrators, third-party applications",
    strengths: ["RESTful API", "Auto-scaling", "Documentation", "Low latency"],
    url: "http://localhost:8080",
    icon: "🚀"
  }
]

function FeatureCard({ feature }: { feature: any }) {
  const Icon = feature.icon
  return (
    <Card className="h-full hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-4`}>
          <Icon className={`w-6 h-6 ${feature.color}`} />
        </div>
        <CardTitle className="text-xl">{feature.title}</CardTitle>
        <CardDescription>{feature.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {feature.features.map((item: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
              {item}
            </li>
          ))}
        </ul>
        {feature.accuracy && (
          <div className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <div className="text-sm font-medium text-green-800 dark:text-green-200">
              Accuracy: {feature.accuracy}
            </div>
          </div>
        )}
        {feature.frequency && (
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Update Frequency: Every {feature.frequency}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function FeaturesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-16">
        <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-300">
          <BarChart3 className="w-4 h-4 mr-1" />
          Platform Features
        </Badge>
        <h1 id="comprehensive-monitoring" className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Comprehensive Environmental Monitoring
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Explore the powerful features that make Eco AI.ly the leading platform for AI-driven environmental monitoring and sustainability insights.
        </p>
      </div>

      {/* Streamlit Features */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 id="streamlit-features" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            📊 Streamlit Dashboard Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Production-ready analytics platform with comprehensive environmental monitoring
          </p>
          <Button asChild variant="outline">
            <Link href="https://ecoaily.streamlit.app/" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4 mr-2" />
              Try Live Demo
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {streamlitFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </section>

      {/* Next.js Features */}
      <section className="mb-20 bg-gray-50 dark:bg-gray-900 -mx-4 px-4 py-16 rounded-3xl">
        <div className="text-center mb-12">
          <h2 id="nextjs-features" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            ⚛️ Next.js Modern Web App
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Cutting-edge user experience with modern design and advanced animations
          </p>
          <Button asChild variant="outline">
            <Link href="http://localhost:3000" target="_blank" rel="noopener noreferrer">
              <Monitor className="w-4 h-4 mr-2" />
              View Interface
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {nextjsFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </section>

      {/* AI & ML Features */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 id="ai-ml-features" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🤖 AI & Machine Learning
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
            Advanced neural networks and real-time data processing for accurate predictions
          </p>
          <Button asChild variant="outline">
            <Link href="/ai-ml">
              <Brain className="w-4 h-4 mr-2" />
              Learn More About AI Models
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {aiFeatures.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </div>
      </section>

      {/* Platform Comparison */}
      <section className="mb-20">
        <div className="text-center mb-12">
          <h2 id="platform-comparison" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🌐 Multi-Platform Architecture
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Three complementary interfaces designed for different use cases and audiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {platformComparison.map((platform, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-2xl">{platform.icon}</span>
                  <Badge variant="secondary">{platform.status}</Badge>
                </div>
                <CardTitle className="text-xl">{platform.platform}</CardTitle>
                <CardDescription className="font-medium text-gray-700 dark:text-gray-300">
                  {platform.audience}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Key Strengths:</h4>
                  <ul className="space-y-2">
                    {platform.strengths.map((strength, strengthIndex) => (
                      <li key={strengthIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-3"></div>
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>
                <Button asChild className="w-full">
                  <Link href={platform.url} target={platform.url.startsWith("http") ? "_blank" : undefined}>
                    Access Platform
                    <ExternalLink className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Key Benefits Summary */}
      <section className="mb-16">
        <Card className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/10 dark:to-blue-900/10 border-green-200 dark:border-green-800">
          <CardHeader>
            <CardTitle className="text-2xl text-center">
              🌟 Why Choose Eco AI.ly?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Eye className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Real-time Monitoring</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Live environmental data with automatic updates</p>
              </div>
              <div className="text-center">
                <Brain className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-medium mb-1">AI-Powered Insights</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Machine learning predictions with 90.9% accuracy</p>
              </div>
              <div className="text-center">
                <Globe className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Multi-Platform Access</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Web, mobile-responsive interfaces</p>
              </div>
              <div className="text-center">
                <FileText className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <h3 className="font-medium mb-1">Professional Reporting</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Automated PDF generation with analytics</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Ready to Explore?
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
          Start monitoring environmental data with AI-powered insights today
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/quick-start">
              <Zap className="w-5 h-5 mr-2" />
              Get Started Now
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/api">
              API Documentation
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
