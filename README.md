# Eco AI.ly 🌱

<div align="center">
  <img src="branding/eco_ai.ly/Captura de ecrã 2025-01-22 105858.png" alt="Eco AI.ly Logo" width="800"/>
</div>

[![Python Version](https://img.shields.io/badge/python-3.10%2B-blue)](https://www.python.org/downloads/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
[![Streamlit](https://img.shields.io/badge/Streamlit-1.16.0-FF4B4B)](https://streamlit.io/)
[![TensorFlow](https://img.shields.io/badge/TensorFlow-2.16.1-FF6F00)](https://www.tensorflow.org/)
[![Code Style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
[![Documentation Status](https://img.shields.io/badge/docs-latest-brightgreen)](https://ecoai.ly/docs)
[![Tests](https://img.shields.io/badge/tests-100%25-success)](https://github.com/eco-ai-ly/eco-ai-ly/actions)
[![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](https://github.com/eco-ai-ly/eco-ai-ly/actions)
[![Deploy Status](https://img.shields.io/badge/deploy-live-success)](https://ecoaily.streamlit.app/)
[![Ruff](https://img.shields.io/badge/Ruff-0.11.5-blue)](https://github.com/astral-sh/ruff)

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

- Python 3.10 or higher
- pip (Python package installer)
- Git
- 4GB RAM minimum
- 2GB free disk space

### Quick Start

1. Clone the repository.
2. Navigate to the Streamlit frontend directory.
3. Set up your Python virtual environment.
4. Install dependencies.
5. Configure environment variables.
6. Run the Streamlit application.
7. Access the dashboard in your browser.

## 💻 Installation

```bash
# Clone the repository
git clone https://github.com/eco-ai-ly/eco-ai-ly.git
cd eco-ai-ly

# Navigate to the Streamlit frontend directory
cd frontend/streamlit

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # Unix/MacOS
# For Windows:
# .\.venv\Scripts\activate

# Install dependencies (ensure requirements.txt is in frontend/streamlit)
pip install -r requirements.txt

# Set up environment variables (in frontend/streamlit directory)
# Copy .env.example to .env if .env.example exists in frontend/streamlit
# cp .env.example .env 
# Edit .env with your configuration

# Run the application (from frontend/streamlit directory)
streamlit run Home.py
```

## 🔧 Environment Variables

Create a `.env` file in the `frontend/streamlit/` directory with the following variables (if applicable, based on your `.env.example`):

```env
# API Keys
OPENAI_API_KEY=your_openai_api_key
WEATHER_API_KEY=your_weather_api_key

# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecoai
DB_USER=user
DB_PASSWORD=password

# Application Settings
DEBUG=False
LOG_LEVEL=INFO
```

## 📁 Project Structure

```
Eco-AI.ly/
├── LICENSE
├── README.md
├── backend/                 # Main backend services and APIs
│   ├── api/
│   │   └── CI_RP/
│   └── mvp/
│       ├── carbon_intensity/
│       ├── power_breakdown/
│       └── renewable_percentage/
├── branding/                # Branding assets
│   ├── carbon_sensei/
│   └── eco_ai.ly/           # Logos and images
├── frontend/                # Frontend applications
│   ├── next/                # Next.js frontend (if applicable)
│   │   └── main.py          # Example file
│   │   └── ...
│   └── streamlit/           # Streamlit dashboard application
│       ├── Home.py          # Main Streamlit application entry point
│       ├── README.md        # Streamlit specific README
│       ├── assets/          # Static assets for Streamlit (images, styles)
│       ├── backend/         # Helper modules for Streamlit frontend
│       ├── pages/           # Individual Streamlit pages
│       ├── requirements.txt # Python dependencies for Streamlit app
│       ├── pyproject.toml   # Project configuration for Streamlit app (if used)
│       └── ...              # Other Streamlit app files (.env.example, etc.)
└── .devcontainer/           # Development container configuration (if used)
```

## 🎯 Usage

1. Ensure you are in the `frontend/streamlit` directory.
2. Start the application:

   ```bash
   streamlit run Home.py
   ```

3. Navigate to `http://localhost:8501` in your web browser.
4. Use the sidebar to access different features:
   - Carbon Intensity Analysis
   - Renewable Percentage Tracking
   - Production vs Consumption
   - Import vs Export

## 🤖 AI Models

Details about the AI models used in the Streamlit application.

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

The Streamlit application utilizes data from:

- Real-time power grid data
- Historical energy production
- Cross-border energy exchange
- Carbon intensity measurements
- Renewable energy generation

## 🛠️ Development

(Assuming these commands are run from the project root or relevant subdirectories)

### Running Tests

```bash
python -m pytest tests/ 
# (Adjust path to tests if they exist elsewhere, e.g., frontend/streamlit/tests/)
```

### Code Formatting and Linting

Using Ruff (typically run from the project root or `frontend/streamlit`):

```bash
ruff format .
ruff check .
```

Using Black (if preferred, typically run from the project root or `frontend/streamlit`):

```bash
black .
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

For questions and support, please contact:

- Email: [guilhermegranchopro@gmail.com](mailto:guilhermegranchopro@gmail.com)
- Website: [https://ecoaily.streamlit.app/](https://ecoaily.streamlit.app/)
- GitHub Project: [https://github.com/eco-ai-ly/eco-ai-ly](https://github.com/eco-ai-ly/eco-ai-ly)
- Personal GitHub: [https://github.com/guilhermegranchopro](https://github.com/guilhermegranchopro)


---

<div align="center">
  <sub>Built with ❤️ by the Eco AI.ly Team</sub>
  <br/>
  <sub>© 2025 Eco AI.ly. All rights reserved.</sub>
</div>
