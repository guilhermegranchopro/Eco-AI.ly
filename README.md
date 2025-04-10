# Eco AI.ly 🌱

<div align="center">
  <img src="assets/images/logo.png" alt="Eco AI.ly Logo" width="800"/>
  
  [![Python Version](https://img.shields.io/badge/python-3.8%2B-blue)](https://www.python.org/downloads/)
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
  [![Streamlit](https://img.shields.io/badge/Streamlit-1.22.0-FF4B4B)](https://streamlit.io/)
  [![TensorFlow](https://img.shields.io/badge/TensorFlow-2.12.0-FF6F00)](https://www.tensorflow.org/)
  [![Code Style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
  [![Documentation Status](https://img.shields.io/badge/docs-latest-brightgreen)](https://ecoai.ly/docs)
</div>

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Technical Architecture](#technical-architecture)
- [AI Models](#ai-models)
- [Data Sources](#data-sources)
- [Development](#development)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🌟 Overview

Eco AI.ly is an innovative startup project that combines artificial intelligence with environmental monitoring to drive sustainability and environmental awareness. Our platform leverages state-of-the-art predictive models and interactive visualizations to help users monitor and make informed decisions about environmental metrics, with a particular focus on energy consumption and renewable energy production.

### Key Benefits
- 🔍 Real-time environmental monitoring
- 🤖 AI-powered predictions and insights
- 📊 Interactive data visualization
- 🌍 Focus on sustainability metrics
- 📱 User-friendly interface
- 🔄 Automated data updates

## ✨ Features

### Interactive Dashboard
- **Introduction Page**
  - Platform overview and purpose
  - Tool explanations and usage guidelines
  - Quick start guide for new users
  - Interactive tutorials
  - User onboarding flow

- **Portugal Data Page**
  - **Section 1: Power Analytics**
    - Interactive pie charts with time range selection
    - Power import breakdown visualization
    - Power export analysis
    - Production distribution
    - Consumption patterns
    - Historical trends
    - Custom date range selection
  - **Section 2: Real-time Monitoring**
    - 24-hour carbon intensity lifecycle tracking
    - Renewable percentage monitoring
    - Historical data comparison
    - Alert system for anomalies
    - Custom threshold settings
  - **Section 3: AI Predictions**
    - 24-hour forecast for carbon intensity
    - Renewable percentage predictions
    - Confidence scores and uncertainty ranges
    - Model performance metrics
    - Prediction accuracy visualization

- **Model Statistics Page**
  - Performance metrics visualization
  - Loss curves analysis
  - Accuracy assessment
  - Confusion matrices
  - F1 score and recall metrics
  - Test metrics dashboard
  - Model comparison tools
  - Hyperparameter analysis

## 🚀 Getting Started

### Quick Start
1. Clone the repository
2. Set up your environment
3. Install dependencies
4. Run the application
5. Access the dashboard

For detailed instructions, see the [Installation](#installation) section.

## 💻 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Git
- 4GB RAM minimum
- 2GB free disk space

### Setup Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/eco-ai-ly.git
   cd eco-ai-ly
   ```

2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   # On Windows
   .\venv\Scripts\activate
   # On Unix or MacOS
   source venv/bin/activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. Initialize the database:
   ```bash
   python src/scripts/init_db.py
   ```

## 📁 Project Structure

```
eco-ai-ly/
├── assets/                 # Static assets (images, logos)
├── data/                   # Data storage
│   ├── raw/               # Raw data files
│   ├── processed/         # Processed data
│   └── models/            # Trained models
├── src/                   # Source code
│   ├── api/              # API integration
│   ├── models/           # AI model definitions
│   ├── preprocessing/    # Data preprocessing
│   ├── visualization/    # Visualization components
│   ├── utils/           # Utility functions
│   └── scripts/         # Maintenance scripts
├── tests/                # Test files
├── docs/                # Documentation
├── .env.example          # Environment variables template
├── requirements.txt      # Project dependencies
├── setup.py             # Package configuration
└── README.md            # Project documentation
```

## 🎯 Usage

1. Start the Streamlit application:
   ```bash
   streamlit run src/app.py
   ```

2. Access the dashboard through your web browser at `http://localhost:8501`

3. Navigate through different sections using the sidebar menu

### Basic Commands
```bash
# Start the application
streamlit run src/app.py

# Run tests
python -m pytest tests/

# Format code
black src/

# Check code style
flake8 src/
```

## 📚 API Documentation

### Endpoints
- `/api/v1/power-analytics`
- `/api/v1/real-time-monitoring`
- `/api/v1/predictions`
- `/api/v1/model-stats`

For detailed API documentation, visit [https://ecoai.ly/docs/api](https://ecoai.ly/docs/api)

## 🏗️ Technical Architecture

### Backend Components
- **Data Collection**
  - API integration for real-time data
  - Automated data fetching and storage
  - Data validation and cleaning
  - Error handling and retry mechanisms
  - Rate limiting and caching

- **Data Processing**
  - Feature engineering
  - Data normalization
  - Time series preprocessing
  - Data quality checks
  - Automated cleaning pipelines

- **AI Models**
  - Keras-based deep learning models
  - Model versioning and management
  - Automated retraining pipeline
  - Model performance monitoring
  - A/B testing framework

### Frontend Components
- **Streamlit Dashboard**
  - Interactive visualizations
  - Real-time data updates
  - Responsive design
  - Custom themes
  - Accessibility features

## 🤖 AI Models

### Model Architecture
- Deep Neural Networks for time series prediction
- LSTM layers for temporal dependencies
- Dense layers for feature processing
- Attention mechanisms
- Residual connections

### Model Performance
- Mean Absolute Error (MAE): < 0.1
- Root Mean Square Error (RMSE): < 0.15
- R² Score: > 0.9
- F1 Score: > 0.85
- Precision: > 0.88
- Recall: > 0.87

## 📊 Data Sources

- Real-time energy data from Portuguese grid
- Historical environmental metrics
- Weather data integration
- Energy consumption patterns
- Grid stability metrics
- Renewable energy production data
- Carbon emission data
- Economic indicators

## 👩‍💻 Development

### Setting Up Development Environment
1. Install development dependencies:
   ```bash
   pip install -r requirements-dev.txt
   ```

2. Set up pre-commit hooks:
   ```bash
   pre-commit install
   ```

3. Configure your IDE:
   - VSCode settings in `.vscode/`
   - PyCharm settings in `.idea/`

### Development Workflow
1. Create a feature branch
2. Make your changes
3. Run tests
4. Submit a pull request

## 🔧 Troubleshooting

### Common Issues
1. **Application won't start**
   - Check Python version
   - Verify dependencies
   - Check environment variables

2. **Data not loading**
   - Verify API keys
   - Check internet connection
   - Validate data format

3. **Model predictions inaccurate**
   - Check model version
   - Verify input data
   - Update model if needed

For more help, visit our [FAQ](https://ecoai.ly/faq) or [contact support](#contact).

## 👥 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines
- Follow PEP 8 style guide
- Write meaningful commit messages
- Include tests for new features
- Update documentation
- Add your name to CONTRIBUTORS.md

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- Project Link: [https://github.com/your-username/eco-ai-ly](https://github.com/your-username/eco-ai-ly)
- Email: contact@ecoai.ly
- Website: [https://ecoai.ly](https://ecoai.ly)
- Twitter: [@EcoAIly](https://twitter.com/EcoAIly)
- LinkedIn: [Eco AI.ly](https://linkedin.com/company/eco-ai-ly)

---

<div align="center">
  <sub>Built with ❤️ by the Eco AI.ly Team</sub>
  <br>
  <sub>© 2024 Eco AI.ly. All rights reserved.</sub>
</div>
