import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ExternalLink, Play, Star, Activity, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const platforms = [
  {
    title: "Streamlit Dashboard",
    description: "Production-ready analytics platform with comprehensive environmental monitoring",
    image: "/showcase/dashboard-overview.png",
    url: "https://ecoaily.streamlit.app/",
    status: "🟢 Live",
    features: ["Real-time monitoring", "AI predictions", "PDF reporting", "Interactive charts"],
    altText: "Streamlit dashboard interface showing carbon intensity monitoring with real-time data visualization, AI predictions, and interactive charts for environmental analytics"
  },
  {
    title: "Next.js Web App",
    description: "Modern UI with advanced animations and cutting-edge design components",
    image: "/showcase/nextjs-dashboard.png",
    url: "http://localhost:3000",
    status: "🟡 Development",
    features: ["Modern UI/UX", "Responsive design", "Theme support", "Interactive animations"],
    altText: "Next.js web application showing modern UI design with environmental data visualizations, dark/light theme support, and responsive components"
  }
]

const stats = [
  { label: "AI Model Accuracy", value: "90.9%", description: "LSTM prediction accuracy" },
  { label: "Update Frequency", value: "5 min", description: "Real-time data refresh" },
  { label: "Supported Countries", value: "1+", description: "Starting with Portugal" },
  { label: "Data Points", value: "24/7", description: "Continuous monitoring" }
]

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
              Eco AI.ly <span className="text-green-600">Platform</span>
            </h1>
            <p className="text-lg sm:text-xl lg:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8 sm:mb-12 px-4">
              Experience our comprehensive environmental monitoring platform through multiple interfaces, 
              each designed for different user needs and use cases.
            </p>
            
            {/* Hero Image */}
            <div className="relative mb-16">
              <div className="relative max-w-6xl mx-auto">
                <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-3xl blur-3xl opacity-20 transform scale-105" />
                <Image
                  src="/showcase/carbon-intensity.png"
                  alt="Eco AI.ly environmental monitoring dashboard showing real-time carbon intensity data, AI predictions, and comprehensive analytics interface"
                  width={1200}
                  height={675}
                  className="relative rounded-3xl shadow-2xl border border-white/20 w-full h-auto"
                  priority
                />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
                <CardContent className="pt-6">
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
            ))}
          </div>
        </div>
      </section>

      {/* Platform Showcase */}
      <section className="py-16 sm:py-24 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 id="live-platforms" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              🚀 Live Platforms
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our multi-platform architecture designed for different audiences and use cases
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {platforms.map((platform, index) => (
              <Card key={index} className="overflow-hidden border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative">
                  <Image
                    src={platform.image}
                    alt={platform.altText}
                    width={600}
                    height={400}
                    className="w-full h-48 sm:h-64 object-cover"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white/90 text-gray-700 border-gray-300">
                      {platform.status}
                    </Badge>
                  </div>
                </div>
                
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl sm:text-2xl">{platform.title}</CardTitle>
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-500" />
                  </div>
                  <CardDescription className="text-base sm:text-lg">
                    {platform.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Key Features:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {platform.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-2 flex-shrink-0" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button asChild className="flex-1">
                      <Link href={platform.url} target="_blank" rel="noopener noreferrer">
                        <Play className="w-4 h-4 mr-2" />
                        Try Live Demo
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="sm:w-auto">
                      <Link href={platform.url} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="w-4 h-4" />
                        <span className="sr-only">Open {platform.title} in new tab</span>
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 id="technology-stack" className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">
              💻 Technology Stack
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Built with cutting-edge technologies for maximum performance and scalability
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <Card className="border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">AI</span>
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

            <Card className="border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">🚀</span>
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

            <Card className="border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">⚛️</span>
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

            <Card className="border-white/20 backdrop-blur-sm bg-white/70 dark:bg-gray-900/70">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">📊</span>
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

      {/* Call to Action */}
      <section className="py-16 sm:py-24 bg-gradient-to-r from-green-600 to-blue-600 dark:from-green-500 dark:to-blue-500">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Explore Eco AI.ly?
          </h2>
          <p className="text-lg sm:text-xl text-green-100 mb-8 sm:mb-12">
            Start monitoring environmental data with AI-powered insights today
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
