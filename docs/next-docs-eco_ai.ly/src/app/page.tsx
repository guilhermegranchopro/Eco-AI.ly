import Link from "next/link"
import { ArrowRight, Zap, Brain, BarChart3, Globe, Github, ExternalLink, CheckCircle, Leaf, TrendingUp, Activity, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Live tracking of carbon intensity, renewable energy production, and power grid analytics",
    color: "text-green-500"
  },
  {
    icon: Brain,
    title: "AI-Powered Predictions", 
    description: "Advanced LSTM neural networks providing 24-hour forecasts with 90.9% accuracy",
    color: "text-blue-500"
  },
  {
    icon: BarChart3,
    title: "Interactive Dashboards",
    description: "Multiple frontend interfaces (Streamlit & Next.js) for different user needs",
    color: "text-purple-500"
  },
  {
    icon: TrendingUp,
    title: "Energy Arbitrage",
    description: "Opportunity detection for optimal energy decisions and cost savings",
    color: "text-orange-500"
  },
  {
    icon: Globe,
    title: "Multi-Platform Access",
    description: "Web, mobile-responsive interfaces with dark/light theme support",
    color: "text-indigo-500"
  },
  {
    icon: Shield,
    title: "Professional Reporting",
    description: "Automated PDF generation with comprehensive analytics and insights",
    color: "text-red-500"
  }
]

const techStack = [
  { name: "Python", badge: "3.10+" },
  { name: "FastAPI", badge: "Latest" },
  { name: "Next.js", badge: "15.3.2" },
  { name: "TensorFlow", badge: "2.18.0" },
  { name: "Streamlit", badge: "1.16.0" },
  { name: "TypeScript", badge: "5.0" },
]

const platforms = [
  {
    name: "Streamlit Dashboard",
    description: "Production-ready analytics platform",
    status: "Live",
    url: "https://ecoaily.streamlit.app/",
    features: ["Real-time data", "AI predictions", "PDF reports", "Interactive charts"]
  },
  {
    name: "Next.js Web App", 
    description: "Modern UI with advanced features",
    status: "Enhanced",
    url: "http://localhost:3000",
    features: ["Glass morphism", "Particle systems", "3D components", "Framer Motion"]
  },
  {
    name: "FastAPI Backend",
    description: "Lightweight ML prediction service", 
    status: "Operational",
    url: "http://localhost:8080",
    features: ["RESTful API", "Real-time inference", "Auto-scaling", "Documentation"]
  }
]

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="text-center">
            {/* Logo and Badges */}
            <div className="flex justify-center items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center">
                <Leaf className="w-7 h-7 text-white" />
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Eco AI.ly
              </h1>
            </div>
            
            <div className="flex justify-center space-x-2 mb-8">
              <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                🌱 Environmental AI
              </Badge>
              <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-300">
                🚀 90.9% Accuracy
              </Badge>
              <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                ⚡ Real-time
              </Badge>
            </div>

            <h2 className="text-2xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Environmental Monitoring Through
              <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> Artificial Intelligence</span>
            </h2>
            
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-3xl mx-auto leading-relaxed">
              Revolutionizing sustainability monitoring with cutting-edge machine learning models, 
              real-time data analytics, and intuitive user interfaces that deliver actionable environmental insights.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button asChild size="lg" className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                <Link href="/quick-start">
                  Get Started
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg">
                <Link href="https://ecoaily.streamlit.app/" target="_blank" rel="noopener noreferrer">
                  Live Demo
                  <ExternalLink className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button asChild variant="ghost" size="lg">
                <Link href="https://github.com/guilhermegranchopro/Eco-AI.ly" target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 w-5 h-5" />
                  View on GitHub
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Comprehensive environmental monitoring with AI-powered insights and real-time analytics
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <Card key={index} className="hover:shadow-lg transition-shadow border-0 bg-gray-50 dark:bg-gray-800">
                  <CardHeader>
                    <div className={`w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-4`}>
                      <Icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Platforms Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Multi-Platform Architecture
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Three complementary interfaces designed for different use cases and user preferences
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {platforms.map((platform, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <CardTitle className="text-xl">{platform.name}</CardTitle>
                    <Badge 
                      variant={platform.status === "Live" ? "default" : "secondary"}
                      className={platform.status === "Live" ? "bg-green-100 text-green-700" : ""}
                    >
                      {platform.status}
                    </Badge>
                  </div>
                  <CardDescription>{platform.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-6">
                    {platform.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full" variant="outline">
                    <Link href={platform.url} target={platform.url.startsWith("http") ? "_blank" : undefined}>
                      Access Platform
                      <ExternalLink className="ml-2 w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Modern Technology Stack
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge technologies for performance, scalability, and developer experience
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {techStack.map((tech, index) => (
              <div key={index} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-800 rounded-full px-4 py-2">
                <span className="font-medium text-gray-900 dark:text-white">{tech.name}</span>
                <Badge variant="secondary" className="text-xs">{tech.badge}</Badge>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg" variant="outline">
              <Link href="/installation">
                <Zap className="mr-2 w-5 h-5" />
                Installation Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Start Monitoring?
          </h2>
          <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto">
            Join the environmental AI revolution. Get started with real-time carbon intensity monitoring 
            and AI-powered sustainability insights in minutes.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100">
              <Link href="/quick-start">
                Quick Start Guide
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600">
              <Link href="/api">
                API Documentation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
