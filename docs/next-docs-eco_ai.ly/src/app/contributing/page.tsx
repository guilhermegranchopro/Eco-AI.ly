import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  GitFork, 
  Code2, 
  Users, 
  Bug, 
  Lightbulb, 
  FileText, 
  TestTube, 
  Palette, 
  Database,
  CheckCircle,
  ExternalLink,
  ArrowRight,
  Coffee,
  Star,
  Shield
} from "lucide-react";

export default function ContributingPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Heart className="h-12 w-12 text-red-600 mr-4" />
          <h1 id="contributing-guide" className="text-4xl font-bold text-gray-900 dark:text-white">
            Contributing Guide
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Help us build the future of environmental monitoring through AI. Every contribution makes a difference! 🌱
        </p>
      </div>

      {/* Ways to Contribute */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 id="ways-to-contribute" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🎯 Ways to Contribute
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            There are many ways to contribute to Eco AI.ly, from code to documentation to community support
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-blue-200 dark:border-blue-800 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Code2 className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">🔧 Code Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• Bug fixes and performance improvements</li>
                <li>• New features and enhancements</li>
                <li>• Test coverage improvements</li>
                <li>• Code optimization and refactoring</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-200 dark:border-green-800 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Database className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">📊 Data Science</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• Model performance improvements</li>
                <li>• New prediction algorithms</li>
                <li>• Feature engineering enhancements</li>
                <li>• Data analysis and insights</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Palette className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">🎨 Design Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• UI/UX improvements</li>
                <li>• Data visualization enhancements</li>
                <li>• Branding and graphic design</li>
                <li>• User experience optimization</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800 hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-lg">📚 Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-sm space-y-2">
                <li>• README improvements</li>
                <li>• API documentation</li>
                <li>• Tutorial creation</li>
                <li>• Code commenting</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Getting Started */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <GitFork className="h-6 w-6 text-green-600 mr-2" />
              <CardTitle className="text-2xl">🚀 Getting Started</CardTitle>
            </div>
            <CardDescription>
              Follow these steps to set up your development environment and start contributing
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">1. Fork & Clone</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`# Fork the repository on GitHub
# Then clone your fork
git clone https://github.com/YOUR_USERNAME/Eco-AI.ly.git
cd Eco-AI.ly

# Add upstream remote
git remote add upstream https://github.com/guilhermegranchopro/Eco-AI.ly.git`}
                  </pre>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">2. Set Up Environment</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# For Next.js development
cd frontend/my-next-app
npm install`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">3. Create Feature Branch</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`# Create and switch to a new branch
git checkout -b feature/your-feature-name

# Or for bug fixes
git checkout -b fix/issue-description

# Keep your branch updated
git fetch upstream
git rebase upstream/main`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Development Guidelines */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <CardTitle className="text-2xl">📋 Development Guidelines</CardTitle>
            </div>
            <CardDescription>
              Code standards and best practices for contributing to Eco AI.ly
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">🐍 Python Code Style</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span><strong>PEP 8</strong> compliance with line length of 88 characters</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span><strong>Type hints</strong> required for all function signatures</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span><strong>Docstrings</strong> for all public functions and classes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span><strong>Black</strong> formatting with <strong>isort</strong> for imports</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">⚛️ TypeScript Code Style</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span><strong>ESLint</strong> configuration with Next.js recommended rules</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span><strong>Prettier</strong> for consistent formatting</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span><strong>Strict TypeScript</strong> configuration enabled</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span><strong>Component naming:</strong> PascalCase for React components</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">📝 Example Python Function</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`def predict_carbon_intensity(
    historical_data: List[float], 
    model_path: str
) -> Dict[str, Union[float, int]]:
    """
    Predict carbon intensity using trained LSTM model.
    
    Args:
        historical_data: List of 24 hourly carbon intensity values
        model_path: Path to the trained model file
        
    Returns:
        Dictionary containing prediction class and confidence score
        
    Raises:
        ModelLoadError: If model file cannot be loaded
        ValidationError: If historical_data is invalid
    """
    # Implementation here...
    pass`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Testing Framework */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <TestTube className="h-6 w-6 text-purple-600 mr-2" />
              <CardTitle className="text-2xl">🧪 Testing Framework</CardTitle>
            </div>
            <CardDescription>
              Comprehensive testing guidelines and requirements
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">🔬 Running Tests</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm overflow-x-auto">
{`# Run all Python tests
python -m pytest tests/ -v

# Run tests with coverage
python -m pytest --cov=backend tests/

# Run specific test modules
python -m pytest tests/test_api.py -v

# Run Next.js tests
cd frontend/my-next-app
npm test

# Run end-to-end tests
npm run test:e2e`}
                  </pre>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">📊 Test Coverage Requirements</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Backend API:</strong> >85% code coverage required</div>
                  <div><strong>Frontend Components:</strong> >80% coverage for critical paths</div>
                  <div><strong>Model Functions:</strong> >90% coverage for ML pipelines</div>
                  <div><strong>Integration Tests:</strong> Full workflow testing</div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">🧪 Test Structure</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">
{`tests/
├── unit/                   # Unit tests for individual functions
│   ├── test_models.py      # ML model testing
│   ├── test_api.py         # API endpoint testing
│   └── test_utils.py       # Utility function testing
├── integration/            # Integration tests
│   ├── test_workflows.py
│   └── test_api_integration.py
├── fixtures/               # Test data and fixtures
└── conftest.py             # Pytest configuration`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Pull Request Process */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <GitFork className="h-6 w-6 text-green-600 mr-2" />
              <CardTitle className="text-2xl">📤 Pull Request Process</CardTitle>
            </div>
            <CardDescription>
              Step-by-step guide for submitting high-quality pull requests
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">📋 Before Submitting</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Code follows project style guidelines</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>All tests pass locally</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>New features include appropriate tests</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Documentation updated for significant changes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Commit messages follow convention</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>PR description clearly explains changes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span>Breaking changes are clearly noted</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">🔄 Commit Convention</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm">
{`# Format: type(scope): description

feat(api): add renewable percentage endpoint
fix(ui): resolve mobile navigation bug
docs(readme): update installation guide
test(models): add carbon intensity tests
refactor(utils): optimize data processing
style(frontend): improve button styling

# Breaking changes
feat(api)!: change response format

# With body and footer
feat(predictions): add confidence scoring

Implements confidence scoring for LSTM
model predictions to improve reliability.

Closes #123`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">📝 PR Template</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`## Description
Brief description of changes

## Type of Change
- [ ] Bug fix (non-breaking change)
- [ ] New feature (non-breaking change)
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tests pass locally
- [ ] New tests added for features
- [ ] Manual testing completed

## Screenshots (if applicable)
Add screenshots for UI changes

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No merge conflicts`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Issue Reporting */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Bug className="h-6 w-6 text-red-600 mr-2" />
              <CardTitle className="text-2xl">🐛 Reporting Issues</CardTitle>
            </div>
            <CardDescription>
              How to report bugs, request features, and get help from the community
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-red-200 dark:border-red-800">
                <CardHeader className="text-center">
                  <Bug className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">🐛 Bug Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Clear, descriptive title</div>
                    <div>• Steps to reproduce</div>
                    <div>• Expected vs actual behavior</div>
                    <div>• Environment details</div>
                    <div>• Screenshots if applicable</div>
                    <div>• Error logs and stack traces</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-200 dark:border-blue-800">
                <CardHeader className="text-center">
                  <Lightbulb className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">💡 Feature Requests</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Problem description</div>
                    <div>• Proposed solution</div>
                    <div>• Use cases and benefits</div>
                    <div>• Alternative approaches</div>
                    <div>• Implementation complexity</div>
                    <div>• Priority and urgency</div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-200 dark:border-green-800">
                <CardHeader className="text-center">
                  <Users className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <CardTitle className="text-lg">❓ Getting Help</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div>• Check existing issues first</div>
                    <div>• Use GitHub Discussions</div>
                    <div>• Provide context and code</div>
                    <div>• Be respectful and patient</div>
                    <div>• Help others when possible</div>
                    <div>• Follow community guidelines</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Community Guidelines */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Heart className="h-6 w-6 text-pink-600 mr-2" />
              <CardTitle className="text-2xl">💖 Community Guidelines</CardTitle>
            </div>
            <CardDescription>
              Creating a welcoming and inclusive environment for all contributors
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">🤝 Core Values</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-pink-600 mr-2" />
                    <span><strong>Be Respectful:</strong> Treat all community members with respect and kindness</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-pink-600 mr-2" />
                    <span><strong>Stay On-Topic:</strong> Keep discussions relevant to environmental monitoring and AI</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-pink-600 mr-2" />
                    <span><strong>Help Others:</strong> Share knowledge and assist fellow developers</span>
                  </div>
                  <div className="flex items-center">
                    <Heart className="h-4 w-4 text-pink-600 mr-2" />
                    <span><strong>Be Constructive:</strong> Provide constructive feedback and suggestions</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">🌱 Recognition</h4>
                <div className="space-y-2 text-sm">
                  <div><strong>Contributors:</strong> Listed in README and documentation</div>
                  <div><strong>Bug Hunters:</strong> Special recognition for critical bug reports</div>
                  <div><strong>Feature Champions:</strong> Credit for major feature contributions</div>
                  <div><strong>Documentation Heroes:</strong> Recognition for documentation improvements</div>
                  <div><strong>Community Stars:</strong> Highlighted for exceptional community support</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Project Architecture */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Code2 className="h-6 w-6 text-indigo-600 mr-2" />
              <CardTitle className="text-2xl">🏗️ Project Architecture</CardTitle>
            </div>
            <CardDescription>
              Understanding the codebase structure and component relationships
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="font-semibold text-lg mb-3">📁 Component Overview</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">
{`Architecture Components:
├── Frontend Layer
│   ├── Streamlit Dashboard (Production Analytics)
│   └── Next.js Web App (Modern UI/UX)
├── Backend Layer  
│   ├── FastAPI Service (AI Predictions)
│   └── Data Pipeline (ETL Processing)
├── AI/ML Layer
│   ├── LSTM Models (Carbon Intensity & Renewable %)
│   └── Training Pipeline (Model Development)
└── Infrastructure Layer
    ├── Docker Containers
    └── CI/CD Pipeline`}
                </pre>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">🔌 API Design Principles</h4>
                <div className="space-y-2 text-sm">
                  <div>• <strong>RESTful Design:</strong> Standard HTTP methods and status codes</div>
                  <div>• <strong>Versioning:</strong> API versioning with `/v1/` prefix</div>
                  <div>• <strong>Documentation:</strong> Auto-generated OpenAPI/Swagger docs</div>
                  <div>• <strong>Error Handling:</strong> Consistent error response format</div>
                  <div>• <strong>Rate Limiting:</strong> API rate limiting and authentication</div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">🧠 ML Pipeline</h4>
                <div className="space-y-2 text-sm">
                  <div>• <strong>Data Collection:</strong> ElectricityMaps API integration</div>
                  <div>• <strong>Preprocessing:</strong> Feature engineering and scaling</div>
                  <div>• <strong>Model Training:</strong> LSTM neural networks</div>
                  <div>• <strong>Validation:</strong> Time series cross-validation</div>
                  <div>• <strong>Deployment:</strong> Real-time inference pipeline</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Call to Action */}
      <section className="text-center">
        <Card className="border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
          <CardContent className="pt-8">
            <div className="flex items-center justify-center mb-4">
              <Coffee className="h-8 w-8 text-brown-600 mr-2" />
              <Star className="h-8 w-8 text-yellow-500 mr-2" />
              <Heart className="h-8 w-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Make a Difference? 🌍
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join our community of developers working to solve environmental challenges through artificial intelligence
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a href="https://github.com/guilhermegranchopro/Eco-AI.ly/fork" target="_blank" rel="noopener noreferrer">
                  <GitFork className="h-4 w-4 mr-2" />
                  Fork Repository
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/guilhermegranchopro/Eco-AI.ly/issues" target="_blank" rel="noopener noreferrer">
                  <Bug className="h-4 w-4 mr-2" />
                  Report Issues
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href="https://github.com/guilhermegranchopro/Eco-AI.ly/discussions" target="_blank" rel="noopener noreferrer">
                  <Users className="h-4 w-4 mr-2" />
                  Join Discussions
                </a>
              </Button>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <strong>"Technology is best when it brings people together for a better tomorrow."</strong>
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                Built with 💚 by the Eco AI.ly community
              </p>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
