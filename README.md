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

Eco AI.ly is an innovative startup project that combines artificial intelligence with environmental monitoring to drive sustainability and environmental awareness. Our platform leverages state-of-the-art predictive models and interactive visualizations to help users monitor and make informed decisions about environmental metrics, with a particular focus on energy consumption, renewable energy production, carbon intensity, and cross-border energy exchange.

### Key Benefits
- 🔍 Real-time environmental monitoring
- 🤖 AI-powered predictions and insights
- 📊 Interactive data visualization
- 🌍 Focus on sustainability metrics
- 📱 User-friendly interface
- 🔄 Automated data updates
- 📈 Energy arbitrage opportunities
- 📑 Automated PDF reporting

## ✨ Features

### Interactive Dashboard
- **Carbon Intensity Analytics**
  - Real-time carbon intensity monitoring
  - 24-hour forecasting with AI model
  - Historical trend analysis
  - Arbitrage opportunity detection
  - Automated PDF reporting
  - Model performance statistics
  - Interactive time series visualization

- **Renewable Percentage Tracking**
  - Real-time renewable energy percentage
  - AI-powered 24-hour predictions
  - Historical data analysis
  - Energy usage optimization suggestions
  - Automated PDF reporting
  - Model performance metrics
  - Interactive data visualization

- **Production vs Consumption**
  - Real-time power production breakdown
  - Consumption pattern analysis
  - Interactive pie charts
  - Time range selection
  - Detailed metrics panel
  - PDF report generation
  - Historical data comparison

- **Import vs Export**
  - Cross-border energy flow analysis
  - Real-time import/export breakdown
  - Interactive visualizations
  - Detailed metrics dashboard
  - PDF report generation
  - Time-based analysis
  - Energy balance tracking

### AI Models
- **Carbon Intensity Prediction**
  - LSTM-based architecture
  - 90.9% test accuracy
  - 6-class classification
  - Confusion matrix visualization
  - Loss and accuracy plots
  - Real-time inference
  - Model performance tracking

- **Renewable Percentage Prediction**
  - LSTM neural network
  - 90.9% test accuracy
  - 6-class classification
  - Performance visualization
  - Continuous monitoring
  - Real-time predictions
  - Model statistics dashboard

### Reporting System
- **Automated PDF Generation**
  - ECO AI.ly authentication
  - Detailed metrics
  - Interactive charts
  - Time series analysis
  - Custom date ranges
  - Professional formatting
  - Data validation stamps

### Data Visualization
- **Interactive Charts**
  - Real-time updates
  - Time range selection
  - Zoom and pan capabilities
  - Tooltip information
  - Metric breakdowns
  - Historical comparisons
  - Custom date filtering

## 🚀 Getting Started

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Git
- 4GB RAM minimum
- 2GB free disk space

### Quick Start
1. Clone the repository
2. Set up your environment
3. Install dependencies
4. Run the application
5. Access the dashboard

## 💻 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/eco-ai-ly.git
cd eco-ai-ly

# Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Unix/MacOS
.\venv\Scripts\activate   # Windows

# Install dependencies
pip install -r requirements.txt

# Run the application
streamlit run app.py
```

## 📁 Project Structure

```
eco-ai-ly/
├── assets/                    # Static assets and images
├── backend/                   # Backend logic and processing
│   ├── carbon_intensity/      # Carbon intensity analysis
│   ├── renewable_percentage/  # Renewable energy tracking
│   ├── production_consumption/# Production vs consumption
│   ├── import_export/        # Import/export analysis
│   └── api/                  # API integrations
├── pages/                    # Streamlit pages
│   ├── 1_Carbon_Intensity.py
│   ├── 2_Renewable_Percentage.py
│   ├── 3_Production_VS_Consumption.py
│   └── 4_Import_VS_Export.py
├── models/                   # AI model files
│   ├── carbon_intensity/
│   └── renewable_percentage/
├── requirements.txt          # Project dependencies
└── README.md                # Project documentation
```

## 🎯 Usage

1. Start the application:
```bash
streamlit run app.py
```

2. Navigate to `http://localhost:8501` in your web browser
3. Use the sidebar to access different features:
   - Carbon Intensity Analysis
   - Renewable Percentage Tracking
   - Production vs Consumption
   - Import vs Export

## 🤖 AI Models

### Carbon Intensity Model
- Architecture: LSTM Neural Network
- Input: 24-hour historical data
- Output: 6-class classification
- Test Accuracy: 90.9%
- Features: Real-time inference, uncertainty estimation

### Renewable Percentage Model
- Architecture: LSTM Neural Network
- Input: 24-hour historical data
- Output: 6-class classification
- Test Accuracy: 90.9%
- Features: Real-time predictions, confidence scoring

## 📊 Data Sources
- Real-time power grid data
- Historical energy production
- Cross-border energy exchange
- Carbon intensity measurements
- Renewable energy generation

## 🛠️ Development

### Running Tests
```bash
python -m pytest tests/
```

### Code Formatting
```bash
black .
```

### Linting
```bash
flake8 .
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions and support, please contact:
- Email: support@ecoai.ly
- Website: https://ecoai.ly
- GitHub: https://github.com/eco-ai-ly

---

<div align="center">
  <sub>Built with ❤️ by the Eco AI.ly Team</sub>
  <br>
  <sub>© 2024 Eco AI.ly. All rights reserved.</sub>
</div>
