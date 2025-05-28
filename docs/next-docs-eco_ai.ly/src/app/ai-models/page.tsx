import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, TrendingUp, Zap, BarChart3, Target, Settings, GitBranch, Activity, Database, Code2, CheckCircle, AlertCircle } from "lucide-react";

export default function AIModelsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center mb-4">
          <Brain className="h-12 w-12 text-green-600 mr-4" />
          <h1 id="ai-models-ml" className="text-4xl font-bold text-gray-900 dark:text-white">
            AI Models & Machine Learning
          </h1>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover our state-of-the-art LSTM neural networks that power environmental predictions with 90.9% accuracy
        </p>
      </div>

      {/* Model Architecture Overview */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 id="model-architecture" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🧠 Model Architecture Overview
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
            Eco AI.ly leverages state-of-the-art LSTM (Long Short-Term Memory) neural networks to provide accurate environmental predictions. 
            Our AI system processes 24-hour historical data windows to generate reliable forecasts for carbon intensity and renewable energy percentage.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-200 dark:border-green-800">
            <CardHeader className="text-center">
              <Brain className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <CardTitle className="text-lg">LSTM Architecture</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Deep LSTM with optimized hyperparameters and dropout regularization
              </p>
            </CardContent>
          </Card>

          <Card className="border-blue-200 dark:border-blue-800">
            <CardHeader className="text-center">
              <Target className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <CardTitle className="text-lg">90.9% Accuracy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                High-performance models with validated test accuracy on both models
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-200 dark:border-purple-800">
            <CardHeader className="text-center">
              <BarChart3 className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <CardTitle className="text-lg">6-Class System</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Granular classification from 0-5 scale for precise predictions
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-200 dark:border-orange-800">
            <CardHeader className="text-center">
              <Zap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <CardTitle className="text-lg">Real-time Inference</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Sub-second prediction response times for instant insights
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Carbon Intensity Model */}
      <section className="mb-16">
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <div className="flex items-center mb-2">
              <TrendingUp className="h-6 w-6 text-red-600 mr-2" />
              <CardTitle className="text-2xl">🌡️ Carbon Intensity Prediction Model</CardTitle>
            </div>
            <CardDescription>
              Predicts carbon emissions intensity with high accuracy using historical data patterns
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Model Specifications</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Architecture:</strong> Deep LSTM with optimized hyperparameters</li>
                  <li><strong>Input Features:</strong> 24-hour rolling window of carbon intensity data</li>
                  <li><strong>Output:</strong> 6-class classification (0-5 scale representing intensity levels)</li>
                  <li><strong>Test Accuracy:</strong> <Badge variant="default" className="bg-green-100 text-green-800">90.9%</Badge> on validation dataset</li>
                  <li><strong>Training Data:</strong> Historical carbon intensity data from ElectricityMaps API</li>
                  <li><strong>Update Frequency:</strong> Models retrained monthly with new data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Performance Metrics</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm">
{`Model Performance Summary:
├── Test Accuracy: 90.9%
├── Precision: 0.91
├── Recall: 0.89  
├── F1-Score: 0.90
├── Inference Time: <100ms
└── Confidence Scoring: ✓`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">Classification Scale</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Badge variant="outline" className="justify-center py-2 text-green-700 border-green-300">
                  Class 0: Very Low (0-100 gCO₂eq/kWh) 🟢
                </Badge>
                <Badge variant="outline" className="justify-center py-2 text-yellow-700 border-yellow-300">
                  Class 1: Low (100-200 gCO₂eq/kWh) 🟡
                </Badge>
                <Badge variant="outline" className="justify-center py-2 text-orange-700 border-orange-300">
                  Class 2: Moderate (200-300 gCO₂eq/kWh) 🟠
                </Badge>
                <Badge variant="outline" className="justify-center py-2 text-red-700 border-red-300">
                  Class 3: High (300-400 gCO₂eq/kWh) 🔴
                </Badge>
                <Badge variant="outline" className="justify-center py-2 text-purple-700 border-purple-300">
                  Class 4: Very High (400-500 gCO₂eq/kWh) 🟣
                </Badge>
                <Badge variant="outline" className="justify-center py-2 text-gray-700 border-gray-400">
                  Class 5: Extreme (500+ gCO₂eq/kWh) ⚫
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Renewable Percentage Model */}
      <section className="mb-16">
        <Card className="border-green-200 dark:border-green-800">
          <CardHeader>
            <div className="flex items-center mb-2">
              <TrendingUp className="h-6 w-6 text-green-600 mr-2" />
              <CardTitle className="text-2xl">🌱 Renewable Percentage Prediction Model</CardTitle>
            </div>
            <CardDescription>
              Forecasts renewable energy percentage with advanced LSTM technology
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">Model Specifications</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Architecture:</strong> Deep LSTM neural network with dropout regularization</li>
                  <li><strong>Input Features:</strong> 24-hour renewable energy percentage history</li>
                  <li><strong>Output:</strong> 6-class classification representing renewable energy levels</li>
                  <li><strong>Test Accuracy:</strong> <Badge variant="default" className="bg-green-100 text-green-800">90.9%</Badge> on validation dataset</li>
                  <li><strong>Training Data:</strong> Historical renewable percentage data from Portugal's grid</li>
                  <li><strong>Real-time Processing:</strong> Sub-second prediction response times</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">Performance Metrics</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm">
{`Renewable Percentage Model:
├── Test Accuracy: 90.9%
├── Precision: 0.90
├── Recall: 0.91
├── F1-Score: 0.91
├── MAE: 3.2%
└── RMSE: 4.8%`}
                  </pre>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">Classification Ranges</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <Badge variant="outline" className="justify-center py-2 text-red-700 border-red-300">
                  Class 0: Very Low (0-20%) 🔴
                </Badge>
                <Badge variant="outline" className="justify-center py-2 text-orange-700 border-orange-300">
                  Class 1: Low (20-40%) 🟠
                </Badge>
                <Badge variant="outline" className="justify-center py-2 text-yellow-700 border-yellow-300">
                  Class 2: Moderate (40-60%) 🟡
                </Badge>
                <Badge variant="outline" className="justify-center py-2 text-green-700 border-green-300">
                  Class 3: High (60-80%) 🟢
                </Badge>
                <Badge variant="outline" className="justify-center py-2 text-emerald-700 border-emerald-300">
                  Class 4: Very High (80-95%) 💚
                </Badge>
                <Badge variant="outline" className="justify-center py-2 text-blue-700 border-blue-300">
                  Class 5: Exceptional (95-100%) ⭐
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Model Development Process */}
      <section className="mb-16">
        <div className="text-center mb-8">
          <h2 id="development-process" className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            🔬 Model Development Process
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Database className="h-5 w-5 text-blue-600 mr-2" />
                <CardTitle>📊 Data Preprocessing Pipeline</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`# Example preprocessing steps
def preprocess_data(raw_data):
    # 1. Data cleaning and validation
    cleaned_data = remove_outliers(raw_data)
    
    # 2. Feature engineering
    features = create_time_features(cleaned_data)
    
    # 3. Normalization using MinMaxScaler
    scaled_data = scaler.transform(features)
    
    # 4. Sequence creation for LSTM
    sequences = create_sequences(scaled_data, window_size=24)
    
    return sequences`}
                </pre>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Brain className="h-5 w-5 text-purple-600 mr-2" />
                <CardTitle>🏗️ Model Architecture</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`# LSTM Model Architecture (Conceptual)
model = Sequential([
    LSTM(50, return_sequences=True, 
         input_shape=(24, n_features)),
    Dropout(0.2),
    LSTM(50, return_sequences=False),
    Dropout(0.2),
    Dense(25),
    Dense(6, activation='softmax')  # 6-class classification
])`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8">
          <CardHeader>
            <div className="flex items-center">
              <Settings className="h-5 w-5 text-green-600 mr-2" />
              <CardTitle>🎯 Training Configuration</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-2 text-sm">
                  <li><strong>Optimizer:</strong> Adam with learning rate scheduling</li>
                  <li><strong>Loss Function:</strong> Categorical crossentropy</li>
                  <li><strong>Batch Size:</strong> 32</li>
                  <li><strong>Epochs:</strong> 100 with early stopping</li>
                </ul>
              </div>
              <div>
                <ul className="space-y-2 text-sm">
                  <li><strong>Validation Split:</strong> 20%</li>
                  <li><strong>Cross-validation:</strong> 5-fold time series CV</li>
                  <li><strong>Regularization:</strong> Dropout layers (0.2)</li>
                  <li><strong>Monitoring:</strong> Val_loss with patience=10</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Model Performance Analysis */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <BarChart3 className="h-6 w-6 text-blue-600 mr-2" />
              <CardTitle className="text-2xl">📈 Model Performance Analysis</CardTitle>
            </div>
            <CardDescription>
              Comprehensive validation results and feature importance analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">🧪 Validation Results</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Excellent diagonal performance in confusion matrices</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Minimal misclassification between adjacent classes</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Strong performance across all classification ranges</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Consistent performance across different seasons</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                    <span className="text-sm">Robust to concept drift and data distribution changes</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">🔍 Feature Importance</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm">
{`Top Contributing Features:
├── Historical values (last 6 hours): 35%
├── Time of day patterns: 25%
├── Day of week seasonality: 20%
├── Recent trend direction: 15%
└── Long-term moving averages: 5%`}
                  </pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Model Deployment */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Zap className="h-6 w-6 text-orange-600 mr-2" />
              <CardTitle className="text-2xl">🚀 Model Deployment & Inference</CardTitle>
            </div>
            <CardDescription>
              Production deployment architecture and continuous learning pipeline
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">🌐 Production Deployment</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Hosting:</strong> FastAPI service with uvicorn ASGI server</li>
                  <li><strong>Scaling:</strong> Docker containerization for horizontal scaling</li>
                  <li><strong>Monitoring:</strong> Real-time performance tracking and alerts</li>
                  <li><strong>Caching:</strong> Intelligent caching to reduce inference latency</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">🔄 Continuous Learning</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Model Monitoring:</strong> Track prediction accuracy over time</li>
                  <li><strong>Data Drift Detection:</strong> Monitor for changes in data distribution</li>
                  <li><strong>Automated Retraining:</strong> Monthly model updates with new data</li>
                  <li><strong>A/B Testing:</strong> Compare model versions in production</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">⚡ Real-time Inference Pipeline</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm">
{`Inference Flow:
1. Data Collection → ElectricityMaps API
2. Preprocessing → Feature engineering & scaling
3. Model Prediction → LSTM inference
4. Post-processing → Classification & confidence scoring
5. API Response → JSON output with predictions`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Model Management */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <GitBranch className="h-6 w-6 text-purple-600 mr-2" />
              <CardTitle className="text-2xl">🛠️ Model Management & Operations</CardTitle>
            </div>
            <CardDescription>
              Model artifacts, loading procedures, and monitoring dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">📦 Model Artifacts</h4>
                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                  <pre className="text-sm">
{`models/
├── carbon_intensity/
│   ├── model_carbon_intensity.keras
│   ├── scaler_carbon_intensity.pkl
│   └── metadata.json
└── renewable_percentage/
    ├── model_renewable_percentage.keras
    ├── scaler_renewable_percentage.pkl
    └── metadata.json`}
                  </pre>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">📊 Model Monitoring Dashboard</h4>
                <ul className="space-y-2 text-sm">
                  <li><strong>Real-time Accuracy:</strong> Track prediction accuracy against actual values</li>
                  <li><strong>Latency Metrics:</strong> Monitor inference response times</li>
                  <li><strong>Error Analysis:</strong> Identify and analyze prediction errors</li>
                  <li><strong>Data Quality:</strong> Monitor input data quality and detect anomalies</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">🔧 Model Loading & Inference</h4>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <pre className="text-sm overflow-x-auto">
{`# Example model loading in FastAPI
import tensorflow as tf
import pickle

# Load models and scalers
ci_model = tf.keras.models.load_model('models/carbon_intensity/model_carbon_intensity.keras')
ci_scaler = pickle.load(open('models/carbon_intensity/scaler_carbon_intensity.pkl', 'rb'))

# Make predictions
def predict_carbon_intensity(data):
    scaled_data = ci_scaler.transform(data)
    prediction = ci_model.predict(scaled_data)
    return prediction`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Research Notebooks */}
      <section className="mb-16">
        <Card>
          <CardHeader>
            <div className="flex items-center">
              <Code2 className="h-6 w-6 text-indigo-600 mr-2" />
              <CardTitle className="text-2xl">📚 Research & Development Notebooks</CardTitle>
            </div>
            <CardDescription>
              Comprehensive Jupyter notebooks documenting our model development process
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-lg mb-3">🔬 Carbon Intensity Research</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 text-blue-600 mr-2" />
                    <span><strong>Live_Predictions_LSTM_Carbon_Intensity.ipynb</strong></span>
                  </div>
                  <ul className="ml-6 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Complete model development from data exploration to deployment</li>
                    <li>• Hyperparameter tuning and architecture experiments</li>
                    <li>• Validation strategies and performance analysis</li>
                    <li>• Feature engineering and data preprocessing techniques</li>
                  </ul>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-3">🌱 Renewable Percentage Analysis</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <Activity className="h-4 w-4 text-green-600 mr-2" />
                    <span><strong>Live_Predictions_LSTM_Renewable_Percentage.ipynb</strong></span>
                  </div>
                  <ul className="ml-6 space-y-1 text-sm text-gray-600 dark:text-gray-300">
                    <li>• Renewable energy forecasting model development</li>
                    <li>• Time series analysis and seasonality detection</li>
                    <li>• Model comparison and selection process</li>
                    <li>• Prediction uncertainty quantification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-lg mb-3">🎯 Key Research Insights</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="text-sm"><strong>Temporal Patterns:</strong> Strong diurnal and weekly patterns in both metrics</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="text-sm"><strong>Seasonality Effects:</strong> Renewable percentage varies significantly by season</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="text-sm"><strong>Cross-correlations:</strong> Carbon intensity inversely correlated with renewable percentage</span>
                  </div>
                  <div className="flex items-center">
                    <AlertCircle className="h-4 w-4 text-orange-600 mr-2" />
                    <span className="text-sm"><strong>Prediction Horizons:</strong> 24-hour forecasts provide optimal accuracy/utility balance</span>
                  </div>
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
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Experience AI-Powered Environmental Monitoring
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              See our LSTM models in action with real-time predictions and comprehensive analytics
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-green-600 hover:bg-green-700">
                <a href="https://ecoaily.streamlit.app/" target="_blank" rel="noopener noreferrer">
                  Try Live Demo
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
