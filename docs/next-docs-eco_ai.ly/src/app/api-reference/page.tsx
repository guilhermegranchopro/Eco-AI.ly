import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Server, 
  Database, 
  Key, 
  Activity, 
  BookOpen, 
  Terminal, 
  Globe, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react";

export default function APIReferencePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Server className="h-12 w-12 text-blue-600 mr-4" />
          <h1 id="api-reference" className="text-4xl font-bold text-gray-900 dark:text-white">
            API Reference
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Complete documentation for the Eco AI.ly FastAPI backend service with real-time environmental predictions
        </p>
      </div>

      {/* Quick Overview */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="text-center">
              <Server className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">FastAPI Backend</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                High-performance API with automatic documentation and validation
              </p>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="text-center">
              <Zap className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Real-time Data</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Live environmental data with AI-powered predictions
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader className="text-center">
              <BookOpen className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Auto Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Swagger UI and ReDoc with interactive testing
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Secure & Reliable</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                Environment-based config with proper error handling
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Base URL and Authentication */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Globe className="h-6 w-6 text-blue-600 mr-2" />
              <CardTitle className="text-2xl">🌐 Base URL & Configuration</CardTitle>
            </div>
            <CardDescription>
              API endpoint information and authentication requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">📡 Base URL</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <code className="text-sm">
                    http://localhost:8080
                  </code>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
                  Default local development URL. Replace with your deployment URL in production.
                </p>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">🔑 Authentication</h4>
                <div className="space-y-2">
                  <Badge variant="outline" className="mr-2">No Authentication Required</Badge>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Public API endpoints for demonstration purposes. 
                    Production deployments may require API keys.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* API Endpoints */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 id="api-endpoints" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            📡 API Endpoints
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            RESTful endpoints for environmental data and AI predictions
          </p>
        </div>

        <div className="space-y-8">
          {/* Carbon Intensity Endpoint */}
          <Card className="border-red-200 dark:border-red-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-6 w-6 text-red-600 mr-2" />
                  <CardTitle className="text-xl">Carbon Intensity Predictions</CardTitle>
                </div>
                <Badge className="bg-green-100 text-green-800 font-mono">GET</Badge>
              </div>
              <CardDescription>
                Get current and predicted carbon intensity with AI-powered 24-hour forecasts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Endpoint</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <code className="text-sm">GET /api/carbon-intensity</code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example Response</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`{
  "current_value": 245.8,
  "predicted_class": 3,
  "confidence": 0.89,
  "prediction_time": "2025-01-22T10:30:00Z",
  "units": "gCO₂eq/kWh",
  "trend": "increasing",
  "recommendation": "Consider delaying energy-intensive activities"
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Response Fields</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <div><strong>current_value:</strong> Current carbon intensity (float)</div>
                    <div><strong>predicted_class:</strong> AI prediction class 0-5 (integer)</div>
                    <div><strong>confidence:</strong> Model confidence score 0-1 (float)</div>
                    <div><strong>prediction_time:</strong> Prediction timestamp (ISO 8601)</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>units:</strong> Measurement units (string)</div>
                    <div><strong>trend:</strong> Direction trend (string)</div>
                    <div><strong>recommendation:</strong> Usage advice (string)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Renewable Percentage Endpoint */}
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Activity className="h-6 w-6 text-green-600 mr-2" />
                  <CardTitle className="text-xl">Renewable Percentage Forecasts</CardTitle>
                </div>
                <Badge className="bg-green-100 text-green-800 font-mono">GET</Badge>
              </div>
              <CardDescription>
                Get renewable energy percentage predictions with advanced LSTM models
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Endpoint</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <code className="text-sm">GET /api/renewable-percentage</code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example Response</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`{
  "current_percentage": 67.2,
  "predicted_class": 4,
  "confidence": 0.91,
  "prediction_time": "2025-01-22T10:30:00Z",
  "trend": "increasing",
  "renewable_sources": ["wind", "solar", "hydro"],
  "optimization_tip": "Excellent time for energy consumption"
}`}
                  </pre>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Response Fields</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm">
                    <div><strong>current_percentage:</strong> Current renewable % (float)</div>
                    <div><strong>predicted_class:</strong> AI prediction class 0-5 (integer)</div>
                    <div><strong>confidence:</strong> Model confidence score 0-1 (float)</div>
                    <div><strong>prediction_time:</strong> Prediction timestamp (ISO 8601)</div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div><strong>trend:</strong> Direction trend (string)</div>
                    <div><strong>renewable_sources:</strong> Active sources (array)</div>
                    <div><strong>optimization_tip:</strong> Usage advice (string)</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Health Check Endpoint */}
          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-blue-600 mr-2" />
                  <CardTitle className="text-xl">Health Check</CardTitle>
                </div>
                <Badge className="bg-green-100 text-green-800 font-mono">GET</Badge>
              </div>
              <CardDescription>
                Check API service health and status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Endpoint</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                  <code className="text-sm">GET /health</code>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-2">Example Response</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`{
  "status": "healthy",
  "timestamp": "2025-01-22T10:30:00Z",
  "version": "1.0.0",
  "models_loaded": true,
  "api_connection": "active"
}`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 id="usage-examples" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🔧 Usage Examples
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Code examples for integrating with the Eco AI.ly API
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Code className="h-5 w-5 text-blue-600 mr-2" />
                <CardTitle>Python Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`import requests

# Get carbon intensity prediction
response = requests.get(
    'http://localhost:8080/api/carbon-intensity'
)
data = response.json()

print(f"Current CI: {data['current_value']} gCO₂eq/kWh")
print(f"Predicted Class: {data['predicted_class']}")
print(f"Confidence: {data['confidence']:.2f}")

# Get renewable percentage data
renewable_response = requests.get(
    'http://localhost:8080/api/renewable-percentage'
)
renewable_data = renewable_response.json()

print(f"Renewable %: {renewable_data['current_percentage']}%")
print(f"Trend: {renewable_data['trend']}")
print(f"Tip: {renewable_data['optimization_tip']}")
`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Code className="h-5 w-5 text-yellow-600 mr-2" />
                <CardTitle>JavaScript/Node.js Integration</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`// Fetch carbon intensity data
fetch('http://localhost:8080/api/carbon-intensity')
  .then(response => response.json())
  .then(data => {
    console.log(\`Current CI: \${data.current_value} gCO₂eq/kWh\`);
    console.log(\`Predicted Class: \${data.predicted_class}\`);
    console.log(\`Confidence: \${data.confidence.toFixed(2)}\`);
  })
  .catch(error => console.error('Error:', error));

// Fetch renewable percentage data
fetch('http://localhost:8080/api/renewable-percentage')
  .then(response => response.json())
  .then(data => {
    console.log(\`Renewable %: \${data.current_percentage}%\`);
    console.log(\`Trend: \${data.trend}\`);
    console.log(\`Tip: \${data.optimization_tip}\`);
  })
  .catch(error => console.error('Error:', error));
`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center">
              <Terminal className="h-5 w-5 text-green-600 mr-2" />
              <CardTitle>cURL Commands</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <pre className="text-sm overflow-x-auto">
{`# Test carbon intensity endpoint
curl -X GET "http://localhost:8080/api/carbon-intensity" \\
     -H "accept: application/json"

# Test renewable percentage endpoint  
curl -X GET "http://localhost:8080/api/renewable-percentage" \\
     -H "accept: application/json"

# Check API health
curl -X GET "http://localhost:8080/health" \\
     -H "accept: application/json"

# Test with verbose output
curl -v -X GET "http://localhost:8080/api/carbon-intensity"`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Interactive Documentation */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <BookOpen className="h-6 w-6 text-purple-600 mr-2" />
              <CardTitle className="text-2xl">📚 Interactive API Documentation</CardTitle>
            </div>
            <CardDescription>
              Explore and test the API with auto-generated documentation
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">🔧 Swagger UI</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Interactive API documentation with built-in testing interface
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-3">
                  <code className="text-sm">http://localhost:8080/docs</code>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Try endpoints directly in the browser</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>View request/response schemas</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Generate code snippets</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">📖 ReDoc Documentation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                  Alternative documentation interface with detailed schema information
                </p>
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg mb-3">
                  <code className="text-sm">http://localhost:8080/redoc</code>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Comprehensive API reference</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Detailed model descriptions</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Searchable documentation</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">🔗 OpenAPI Specification</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                OpenAPI 3.0 specification for API integration and client generation
              </p>
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                <code className="text-sm">http://localhost:8080/openapi.json</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Error Handling */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-red-600 mr-2" />
              <CardTitle className="text-2xl">🚨 Error Handling</CardTitle>
            </div>
            <CardDescription>
              Standard HTTP status codes and error response format
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">HTTP Status Codes</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">200</Badge>
                    <span>OK - Successful request</span>
                  </div>
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-orange-50 text-orange-700 border-orange-300">400</Badge>
                    <span>Bad Request - Invalid parameters</span>
                  </div>
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">404</Badge>
                    <span>Not Found - Endpoint not found</span>
                  </div>
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">500</Badge>
                    <span>Internal Server Error - Server issue</span>
                  </div>
                  <div className="flex justify-between">
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">503</Badge>
                    <span>Service Unavailable - API temporarily down</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Error Response Format</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm">
{`{
  "error": {
    "code": 500,
    "message": "Internal server error",
    "details": "Model loading failed",
    "timestamp": "2025-01-22T10:30:00Z",
    "request_id": "abc123"
  }
}`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Rate Limiting and Performance */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Zap className="h-6 w-6 text-yellow-600 mr-2" />
              <CardTitle className="text-2xl">⚡ Performance & Limits</CardTitle>
            </div>
            <CardDescription>
              API performance characteristics and usage limits
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Performance Metrics</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Response Time:</strong> < 100ms average</div>
                  <div><strong>Model Inference:</strong> < 50ms</div>
                  <div><strong>Data Freshness:</strong> Updated every 5 minutes</div>
                  <div><strong>Uptime:</strong> 99.9% availability target</div>
                  <div><strong>Concurrent Requests:</strong> Up to 100 simultaneous</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Usage Limits</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Rate Limit:</strong> No limits in demo mode</div>
                  <div><strong>Request Size:</strong> Standard HTTP limits</div>
                  <div><strong>Response Size:</strong> < 1KB typical</div>
                  <div><strong>Timeout:</strong> 30 seconds</div>
                  <div><strong>API Key:</strong> Not required for demo</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Card className="border-blue-200 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-green-50 dark:from-blue-900/20 dark:to-green-900/20">
          <CardContent className="pt-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Integrate with Eco AI.ly API?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Start building with our environmental AI API and access real-time predictions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <a href="http://localhost:8080/docs" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Try Interactive Docs
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/guilhermegranchopro/Eco-AI.ly" target="_blank" rel="noopener noreferrer">
                  View Source Code
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
