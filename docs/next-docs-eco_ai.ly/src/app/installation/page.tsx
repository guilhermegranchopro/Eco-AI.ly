import Link from "next/link"
import { CheckCircle, AlertTriangle, Download, Terminal, Code, Database, Key, ExternalLink, Settings } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CodeBlock } from "@/components/code-block"

const prerequisites = [
  {
    name: "Python 3.10+",
    description: "Required for Streamlit dashboard and FastAPI backend",
    icon: Code,
    color: "text-blue-500",
    check: "python --version",
    install: "https://www.python.org/downloads/"
  },
  {
    name: "Node.js 18+", 
    description: "Required for Next.js modern web application",
    icon: Terminal,
    color: "text-green-500",
    check: "node --version",
    install: "https://nodejs.org/"
  },
  {
    name: "Git",
    description: "Version control system for cloning the repository",
    icon: Database,
    color: "text-purple-500", 
    check: "git --version",
    install: "https://git-scm.com/"
  },
  {
    name: "ElectricityMaps API Key",
    description: "Required for real-time energy data (free tier available)",
    icon: Key,
    color: "text-orange-500",
    check: null,
    install: "https://www.electricitymaps.com/api"
  }
]

const installations = [
  {
    title: "Streamlit Dashboard",
    description: "Production-ready analytics platform",
    time: "2-3 minutes",
    difficulty: "Easy",
    icon: "📊",
    color: "bg-green-100 text-green-700 border-green-300",
    steps: [
      {
        title: "Clone Repository",
        code: "git clone https://github.com/guilhermegranchopro/Eco-AI.ly.git\ncd Eco-AI.ly"
      },
      {
        title: "Navigate to Streamlit Directory",
        code: "cd frontend/streamlit"
      },
      {
        title: "Create Virtual Environment",
        code: "python -m venv .venv\n\n# Activate virtual environment\nsource .venv/bin/activate          # Unix/MacOS\n# .venv\\Scripts\\activate         # Windows PowerShell"
      },
      {
        title: "Install Dependencies",
        code: "pip install -r requirements.txt"
      },
      {
        title: "Launch Dashboard",
        code: "streamlit run Home.py"
      }
    ],
    access: "http://localhost:8501",
    demo: "https://ecoaily.streamlit.app/"
  },
  {
    title: "Next.js Modern Web App",
    description: "Enhanced UI with modern components",
    time: "3-4 minutes", 
    difficulty: "Easy",
    icon: "⚛️",
    color: "bg-blue-100 text-blue-700 border-blue-300",
    steps: [
      {
        title: "Navigate to Next.js Directory",
        code: "cd frontend/my-next-app"
      },
      {
        title: "Install Node.js Dependencies",
        code: "npm install\n# or using yarn: yarn install\n# or using pnpm: pnpm install"
      },
      {
        title: "Set up Environment Variables (Optional)",
        code: "cp .env.local.example .env.local  # if example exists\n# Edit .env.local with your configuration"
      },
      {
        title: "Start Development Server",
        code: "npm run dev\n# or: yarn dev / pnpm dev"
      },
      {
        title: "Build for Production (Optional)",
        code: "npm run build\nnpm start"
      }
    ],
    access: "http://localhost:3000",
    demo: null
  },
  {
    title: "FastAPI Backend Service",
    description: "AI prediction API with ML models",
    time: "5-7 minutes",
    difficulty: "Intermediate", 
    icon: "🚀",
    color: "bg-purple-100 text-purple-700 border-purple-300",
    steps: [
      {
        title: "Navigate to API Directory",
        code: "cd backend/api/CI_RP"
      },
      {
        title: "Create Virtual Environment",
        code: "python -m venv .venv\nsource .venv/bin/activate  # Unix/MacOS\n# .venv\\Scripts\\activate  # Windows"
      },
      {
        title: "Install Python Dependencies",
        code: "pip install -r requirements.txt"
      },
      {
        title: "Configure Environment Variables",
        code: "# Create .env file with your ElectricityMaps API key\necho \"ELECTRICITYMAP_API_KEY=your_api_key_here\" > .env"
      },
      {
        title: "Start API Server",
        code: "uvicorn app.main:app --reload --port 8080"
      }
    ],
    access: "http://localhost:8080",
    demo: null
  }
]

const envConfigs = [
  {
    file: "frontend/streamlit/.env",
    title: "Streamlit Configuration",
    variables: [
      { key: "ELECTRICITYMAP_API_KEY", description: "Your ElectricityMaps API key", required: false },
      { key: "BACKEND_API_URL", description: "Backend API endpoint", default: "http://localhost:8080" },
      { key: "DEBUG", description: "Debug mode", default: "False" },
      { key: "LOG_LEVEL", description: "Logging level", default: "INFO" }
    ]
  },
  {
    file: "frontend/my-next-app/.env.local", 
    title: "Next.js Configuration",
    variables: [
      { key: "NEXT_PUBLIC_API_URL", description: "API endpoint", default: "http://localhost:8080" },
      { key: "NEXT_PUBLIC_STREAMLIT_URL", description: "Streamlit URL", default: "http://localhost:8501" },
      { key: "NEXT_PUBLIC_APP_NAME", description: "Application name", default: "Eco AI.ly" },
      { key: "NODE_ENV", description: "Environment", default: "development" }
    ]
  },
  {
    file: "backend/api/CI_RP/.env",
    title: "FastAPI Configuration", 
    variables: [
      { key: "ELECTRICITYMAP_API_KEY", description: "ElectricityMaps API key", required: true },
      { key: "ELECTRICITYMAP_BASE_URL", description: "API base URL", default: "https://api.electricitymap.org/v3" },
      { key: "PORT", description: "Server port", default: "8080" },
      { key: "LOG_LEVEL", description: "Logging level", default: "INFO" }
    ]
  }
]

export default function InstallationPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <Badge className="mb-4 bg-purple-100 text-purple-700 border-purple-300">
          <Settings className="w-4 h-4 mr-1" />
          Installation Guide
        </Badge>
        <h1 id="installation" className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Detailed Installation Guide
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Complete step-by-step instructions to set up Eco AI.ly on your local environment with all platforms and configurations.
        </p>
      </div>

      {/* Prerequisites */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle id="prerequisites" className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
            System Requirements & Prerequisites
          </CardTitle>
          <CardDescription>
            Ensure you have these tools installed before proceeding with the installation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {prerequisites.map((req, index) => {
              const Icon = req.icon
              return (
                <div key={index} className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <Icon className={`w-6 h-6 ${req.color} mt-1`} />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 dark:text-white">{req.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{req.description}</p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      {req.check && (
                        <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                          {req.check}
                        </code>
                      )}
                      <Button asChild variant="outline" size="sm">
                        <Link href={req.install} target="_blank" rel="noopener noreferrer">
                          <Download className="w-3 h-3 mr-1" />
                          Install
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="mt-6 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <div className="flex items-start space-x-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  <strong>ElectricityMaps API Key:</strong> The FastAPI backend requires an API key for real-time energy data. 
                  The free tier provides 1000 requests/month which is sufficient for testing and development.
                </p>
                <Button asChild variant="link" className="p-0 h-auto text-yellow-700 dark:text-yellow-300">
                  <Link href="https://www.electricitymaps.com/api" target="_blank">
                    Get your free API key here <ExternalLink className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Steps */}
      <div className="space-y-12 mb-12">
        {installations.map((installation, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{installation.icon}</span>
                  <div>
                    <CardTitle className="text-xl">{installation.title}</CardTitle>
                    <CardDescription>{installation.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="outline" className={installation.color}>
                    {installation.difficulty}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    ~{installation.time}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {installation.steps.map((step, stepIndex) => (
                  <div key={stepIndex}>
                    <h4 className="flex items-center text-sm font-medium text-gray-900 dark:text-white mb-3">
                      <span className="w-6 h-6 bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                        {stepIndex + 1}
                      </span>
                      {step.title}
                    </h4>
                    <CodeBlock language="bash">{step.code}</CodeBlock>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-green-800 dark:text-green-200">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Access at: <code className="ml-1 bg-green-200 dark:bg-green-800 px-2 py-1 rounded text-xs">{installation.access}</code>
                  </div>
                  <div className="flex space-x-2">
                    {installation.demo && (
                      <Button asChild variant="outline" size="sm">
                        <Link href={installation.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="w-3 h-3 mr-1" />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                    <Button asChild size="sm">
                      <Link href={installation.access} target="_blank" rel="noopener noreferrer">
                        Launch
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Environment Configuration */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle id="environment-config">🔧 Environment Configuration</CardTitle>
          <CardDescription>
            Optional environment variables for customizing your Eco AI.ly installation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            {envConfigs.map((config, index) => (
              <div key={index}>
                <h3 className="font-medium text-gray-900 dark:text-white mb-4">{config.title}</h3>
                <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
                  <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    File: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-xs">{config.file}</code>
                  </div>
                  <div className="space-y-3">
                    {config.variables.map((variable, varIndex) => (
                      <div key={varIndex} className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <code className="text-sm font-medium">{variable.key}</code>
                            {variable.required && (
                              <Badge variant="destructive" className="text-xs">Required</Badge>
                            )}
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {variable.description}
                          </p>
                        </div>
                        {variable.default && (
                          <code className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded ml-4">
                            {variable.default}
                          </code>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Docker Setup */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle id="docker-deployment">🐳 Docker Deployment (Optional)</CardTitle>
          <CardDescription>
            Containerized deployment for production environments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <CodeBlock 
              filename="Backend API Docker Setup"
              language="bash"
            >
{`# Navigate to API directory
cd backend/api/CI_RP

# Build Docker image
docker build -t eco-ai-ly-api .

# Run container with environment file
docker run --env-file .env -p 8080:8080 eco-ai-ly-api

# Alternative: Docker Compose (if available)
docker-compose up -d`}
            </CodeBlock>
          </div>
        </CardContent>
      </Card>

      {/* Troubleshooting */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle id="troubleshooting">🔧 Troubleshooting</CardTitle>
          <CardDescription>
            Common issues and their solutions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-medium text-yellow-800 dark:text-yellow-200 mb-2">API Key Issues</h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300">
                If you&apos;re getting API errors, ensure your ElectricityMaps API key is correctly set in the .env file and you haven&apos;t exceeded the rate limits.
              </p>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-800 dark:text-blue-200 mb-2">Port Conflicts</h4>
              <p className="text-sm text-blue-700 dark:text-blue-300">
                If ports 3000, 8080, or 8501 are already in use, you can specify different ports using command line arguments or environment variables.
              </p>
            </div>
            
            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-800 dark:text-green-200 mb-2">Dependencies</h4>
              <p className="text-sm text-green-700 dark:text-green-300">
                If you encounter dependency issues, try creating a fresh virtual environment and installing requirements again.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle id="next-steps">🎯 Next Steps</CardTitle>
          <CardDescription>
            After successful installation, explore these resources
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/features">
                <div className="text-left">
                  <div className="font-medium">Explore Features</div>
                  <div className="text-sm text-gray-500 mt-1">Learn about platform capabilities and AI models</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/api-reference">
                <div className="text-left">
                  <div className="font-medium">API Documentation</div>
                  <div className="text-sm text-gray-500 mt-1">Integration guide and endpoint reference</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/ai-models">
                <div className="text-left">
                  <div className="font-medium">AI & ML Models</div>
                  <div className="text-sm text-gray-500 mt-1">Deep dive into LSTM networks and predictions</div>
                </div>
              </Link>
            </Button>
            
            <Button asChild variant="outline" className="h-auto p-4 justify-start">
              <Link href="/contributing">
                <div className="text-left">
                  <div className="font-medium">Contributing Guide</div>
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
