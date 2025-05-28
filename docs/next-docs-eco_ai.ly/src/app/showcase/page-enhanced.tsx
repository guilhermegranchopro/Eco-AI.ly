import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Play, Star, Activity, Zap, Brain, Monitor, Database, Code2, Github } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const showcaseItems = [
  {
    title: "Streamlit Dashboard Overview",
    description: "Production-ready analytics platform with comprehensive environmental monitoring and real-time data visualization",
    image: "/showcase/dashboard-overview.png",
    category: "Dashboard",
    features: ["Real-time monitoring", "Interactive charts", "Professional design", "Data export capabilities"],
    demoUrl: "https://ecoaily.streamlit.app/",
    tech: ["Python", "Streamlit", "Plotly", "Pandas"]
  },
  {
    title: "Carbon Intensity Analytics",
    description: "Advanced carbon intensity tracking with AI-powered predictions and historical trend analysis",
    image: "/showcase/carbon-intensity.png", 
    category: "AI Analytics",
    features: ["90.9% prediction accuracy", "24-hour forecasts", "Energy arbitrage detection", "Historical trends"],
    demoUrl: "https://ecoaily.streamlit.app/",
    tech: ["LSTM Neural Networks", "TensorFlow", "Time Series Analysis", "Machine Learning"]
  },
  {
    title: "Renewable Energy Monitoring",
    description: "Real-time renewable energy percentage tracking with intelligent forecasting capabilities",
    image: "/showcase/renewable-energy.png",
    category: "Sustainability",
    features: ["Live renewable tracking", "Trend analysis", "Performance metrics", "Environmental impact"],
    demoUrl: "https://ecoaily.streamlit.app/",
    tech: ["Real-time APIs", "Data Processing", "Environmental Metrics", "Sustainability Analytics"]
  },
  {
    title: "AI Prediction Engine",
    description: "State-of-the-art machine learning models providing accurate environmental forecasts",
    image: "/showcase/ai-predictions.png",
    category: "AI/ML",
    features: ["Deep learning models", "Sub-second response", "Continuous learning", "High accuracy"],
    demoUrl: "https://ecoaily.streamlit.app/",
    tech: ["LSTM Networks", "Deep Learning", "Neural Networks", "Predictive Analytics"]
  },
  {
    title: "Next.js Modern Interface",
    description: "Cutting-edge web application with advanced animations and responsive design",
    image: "/showcase/nextjs-dashboard.png",
    category: "Frontend",
    features: ["Modern UI/UX", "Responsive design", "Interactive animations", "Real-time updates"],
    demoUrl: "http://localhost:3000",
    tech: ["Next.js 15", "TypeScript", "Tailwind CSS", "React"]
  }
]

const stats = [
  { label: "AI Model Accuracy", value: "90.9%", description: "LSTM prediction accuracy", icon: Brain },
  { label: "Update Frequency", value: "5 min", description: "Real-time data refresh", icon: Activity },
  { label: "Platforms", value: "3", description: "Multi-platform architecture", icon: Monitor },
  { label: "Data Points", value: "24/7", description: "Continuous monitoring", icon: Database }
]

const categories = ["All", "Dashboard", "AI Analytics", "Sustainability", "AI/ML", "Frontend"]

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/10 to-blue-600/10 dark:from-green-400/5 dark:to-blue-400/5" />
        <div className="relative max-w-7xl mx-auto px-4 py-16 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <Badge className="mb-4 sm:mb-6 bg-green-100 text-green-700 border-green-300 text-base sm:text-lg px-4 sm:px-6 py-2">
              <Activity className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Live Platform Showcase
            </Badge>
            <h1 id="platform-showcase" className="text-4xl sm:text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white mb-6 sm:mb-8">
              Eco AI.ly <span className="text-green-600">Showcase</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
              Explore our comprehensive environmental monitoring platform through real screenshots, 
              live demos, and interactive examples showcasing AI-powered sustainability insights.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index} className="text-center border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Icon className="w-8 h-8 text-green-600 mx-auto mb-4" />
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                      {stat.value}
                    </div>
                    <div className="font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {stat.label}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {stat.description}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Showcase Gallery */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 id="platform-gallery" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              🚀 Platform Gallery
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Real screenshots from our live production platform showcasing environmental monitoring capabilities
            </p>
          </div>

          <div className="grid gap-8 lg:gap-12">
            {showcaseItems.map((item, index) => (
              <Card key={index} className="overflow-hidden border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-2xl transition-all duration-300">
                <div className="grid lg:grid-cols-2 gap-0">
                  {/* Image Section */}
                  <div className="relative">
                    <Image
                      src={item.image}
                      alt={`${item.title} - ${item.description}`}
                      width={600}
                      height={400}
                      className="w-full h-64 lg:h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-300">
                        {item.category}
                      </Badge>
                    </div>
                  </div>
                  
                  {/* Content Section */}
                  <div className="p-6 lg:p-8 flex flex-col justify-between">
                    <div>
                      <CardHeader className="p-0 mb-6">
                        <div className="flex items-center justify-between mb-2">
                          <CardTitle className="text-xl sm:text-2xl">{item.title}</CardTitle>
                          <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                        </div>
                        <CardDescription className="text-base sm:text-lg">
                          {item.description}
                        </CardDescription>
                      </CardHeader>
                      
                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Key Features:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {item.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technology Stack */}
                      <div className="mb-6">
                        <h4 className="font-medium mb-3">Technologies:</h4>
                        <div className="flex flex-wrap gap-2">
                          {item.tech.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button asChild className="flex-1">
                        <Link href={item.demoUrl} target={item.demoUrl.startsWith("http") ? "_blank" : undefined} rel={item.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}>
                          <Play className="w-4 h-4 mr-2" />
                          {item.demoUrl.startsWith("http") ? "Try Live Demo" : "View Documentation"}
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="sm:w-auto">
                        <Link href={item.demoUrl} target={item.demoUrl.startsWith("http") ? "_blank" : undefined} rel={item.demoUrl.startsWith("http") ? "noopener noreferrer" : undefined}>
                          <ExternalLink className="w-4 h-4" />
                          <span className="sr-only">Open {item.title} in new tab</span>
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Architecture */}
      <section className="py-16 sm:py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 id="technology-architecture" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              💻 Technology Architecture
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge technologies for maximum performance, scalability, and reliability
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">AI & Machine Learning</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>• TensorFlow & LSTM Networks</div>
                  <div>• Scikit-learn & NumPy</div>
                  <div>• Real-time Inference</div>
                  <div>• 90.9% Prediction Accuracy</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Backend Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>• FastAPI & Python</div>
                  <div>• Docker Containerization</div>
                  <div>• Google Cloud Run</div>
                  <div>• RESTful API Design</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Monitor className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Frontend Platforms</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>• Next.js & React</div>
                  <div>• Streamlit Analytics</div>
                  <div>• TypeScript & Tailwind</div>
                  <div>• Responsive Design</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-lg sm:text-xl">Data & Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <div>• ElectricityMaps API</div>
                  <div>• Real-time Data Processing</div>
                  <div>• Interactive Visualizations</div>
                  <div>• Automated Reporting</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Open Source & Community */}
      <section className="py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 id="open-source" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
            🌍 Open Source & Community
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12">
            Eco AI.ly is open source and welcomes contributions from the community. 
            Join us in building the future of environmental monitoring.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-12">
            <Button asChild size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              <Link href="https://github.com/guilhermegranchopro/Eco-AI.ly" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                View on GitHub
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              <Link href="/contributing">
                <Code2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Contributing Guide
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Start Monitoring?
          </h2>
          <p className="text-lg sm:text-xl text-green-100 mb-8 sm:mb-12">
            Experience AI-powered environmental monitoring with real-time insights and predictions
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center">
            <Button asChild size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              <Link href="/quick-start">
                <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Get Started Now
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              <Link href="https://ecoaily.streamlit.app/" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Try Live Demo
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-600 text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4">
              <Link href="/features">
                <Star className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                <span className="hidden sm:inline">Explore Features</span>
                <span className="sm:hidden">Features</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
