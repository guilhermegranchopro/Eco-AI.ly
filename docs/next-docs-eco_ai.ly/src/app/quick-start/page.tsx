import Link from "next/link"
import { ArrowRight, Play, Terminal, CheckCircle, ExternalLink, Zap, Code, Database } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/CodeBlock"

const platforms = [
  {
    title: "Streamlit Dashboard",
    description: "Production-ready analytics platform with real-time monitoring",
    status: "Live",
    time: "2 minutes",
    icon: "📊",
    color: "bg-green-100 text-green-700 border-green-300",
    steps: [
      "Clone the repository",
      "Navigate to frontend/streamlit",
      "Install Python dependencies", 
      "Run streamlit run Home.py"
    ],
    url: "http://localhost:8501",
    demo: "https://ecoaily.streamlit.app/"
  },
  {
    title: "Next.js Web App",
    description: "Modern UI with advanced animations and components",
    status: "Enhanced",
    time: "3 minutes",
    icon: "⚛️",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    steps: [
      "Navigate to frontend/my-next-app",
      "Install Node.js dependencies",
      "Configure environment variables",
      "Run npm run dev"
    ],
    url: "http://localhost:3000",
    demo: null
  },
  {
    title: "FastAPI Backend",
    description: "AI prediction service with machine learning models",
    status: "Operational", 
    time: "5 minutes",
    icon: "🚀",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    steps: [
      "Navigate to backend/api/CI_RP",
      "Create virtual environment",
      "Install dependencies",
      "Configure API keys and run"
    ],
    url: "http://localhost:8080",
    demo: null
  }
]

const codeBlocks = {
  streamlit: `# Clone and setup Streamlit dashboard
git clone https://github.com/guilhermegranchopro/Eco-AI.ly.git
cd Eco-AI.ly/frontend/streamlit
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
streamlit run Home.py`,

  nextjs: `# Setup modern Next.js dashboard  
cd frontend/my-next-app
npm install
npm run dev`,

  fastapi: `# Setup AI prediction API service
cd backend/api/CI_RP
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
# Create .env file with ELECTRICITYMAP_API_KEY=your_key
uvicorn app.main:app --reload --port 8080`
}

export default function QuickStartPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-green-100 text-green-700 border-green-300">
          <Zap className="w-4 h-4 mr-1" />
          Quick Start Guide
        </Badge>
        <h1 id="get-started" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Get Started in Minutes
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Choose your preferred platform and follow the step-by-step guide to start monitoring environmental data with AI.
        </p>
      </div>

      {/* Prerequisites */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle id="prerequisites" className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            Prerequisites
          </CardTitle>
          <CardDescription>
            Make sure you have these installed before starting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <Code className="w-5 h-5 text-blue-500" />
              <div>
                <div className="font-medium">Python 3.10+</div>
                <div className="text-sm text-gray-500">For Streamlit & FastAPI</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Terminal className="w-5 h-5 text-green-500" />
              <div>
                <div className="font-medium">Node.js 18+</div>
                <div className="text-sm text-gray-500">For Next.js frontend</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Database className="w-5 h-5 text-purple-500" />
              <div>
                <div className="font-medium">Git</div>
                <div className="text-sm text-gray-500">Version control</div>
              </div>
            </div>
          </div>
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>API Key Required:</strong> You&apos;ll need an ElectricityMaps API key for the FastAPI backend. 
              <Link href="https://www.electricitymaps.com/api" className="underline ml-1" target="_blank">
                Get your free API key here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Platform Cards */}
      <div className="space-y-8 mb-12">
        {platforms.map((platform, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{platform.icon}</span>
                  <div>
                    <CardTitle className="text-xl">{platform.title}</CardTitle>
                    <CardDescription>{platform.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={platform.color}>
                    {platform.status}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    ~{platform.time}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Steps */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Setup Steps:</h4>
                <ol className="space-y-2">
                  {platform.steps.map((step, stepIndex) => (
                    <li key={stepIndex} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <span className="w-6 h-6 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                        {stepIndex + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="mb-6">
                <h4 className="font-medium mb-3">Commands:</h4>
                <CodeBlock language="bash">
                  {platform.title.includes("Streamlit") ? codeBlocks.streamlit :
                    platform.title.includes("Next.js") ? codeBlocks.nextjs :
                    codeBlocks.fastapi}
                </CodeBlock>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="flex-1">
                  <Link href={platform.url} target="_blank" rel="noopener noreferrer">
                    <Play className="w-4 h-4 mr-2" />
                    Access Platform
                  </Link>
                </Button>
                {platform.demo && (
                  <Button asChild variant="outline">
                    <Link href={platform.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </Link>
                  </Button>
                )}
                <Button asChild variant="ghost">
                  <Link href="/installation">
                    Detailed Setup
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* One-Command Setup */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle id="one-command-setup">⚡ One-Command Setup (Recommended)</CardTitle>
          <CardDescription>
            Get the Streamlit dashboard running with a single command
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CodeBlock language="bash">{codeBlocks.streamlit}</CodeBlock>
          <div className="mt-4 flex items-center text-sm text-gray-600 dark:text-gray-300">
            <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
            Access at <Link href="http://localhost:8501" className="mx-1 underline">http://localhost:8501</Link> after setup
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle id="next-steps">🎯 Next Steps</CardTitle>
          <CardDescription>
            After setting up your platform, explore these resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/features">
                <div className="text-left">
                  <div className="font-medium">Explore Features</div>
                  <div className="text-sm text-gray-500 mt-1">Learn about AI models, dashboards, and analytics</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/api">
                <div className="text-left">
                  <div className="font-medium">API Reference</div>
                  <div className="text-sm text-gray-500 mt-1">Integration guide and endpoint documentation</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/ai-ml">
                <div className="text-left">
                  <div className="font-medium">AI & ML Models</div>
                  <div className="text-sm text-gray-500 mt-1">Deep dive into LSTM networks and predictions</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/contributing">
                <div className="text-left">
                  <div className="font-medium">Contributing</div>
                  <div className="text-sm text-gray-500 mt-1">Help improve Eco AI.ly for everyone</div>
                </div>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
