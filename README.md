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

Eco AI.ly is an innovative startup project that combines artificial intelligence with environmental monitoring to drive sustainability and environmental awareness. Our platform leverages state-of-the-art predictive models, data analytics pipelines (initially developed in Jupyter Notebooks within the `backend/mvp/` directory, focusing on areas like live LSTM predictions for renewable percentage and power breakdown analysis), and interactive visualizations to help users monitor and make informed decisions about environmental metrics. Key areas include energy consumption, renewable energy production, carbon intensity, and cross-border energy exchange. The project also features a dedicated backend API service for delivering these predictions.

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

### Interactive Dashboard (Streamlit Frontend)

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

### Backend API Service (FastAPI)

- **Live Data & Predictions**: Fetches live historical data (past 24 hours) from ElectricityMaps for Portugal (PT).
- **Endpoints**:
  - `/api/renewable-percentage`: Forecasts the renewable energy percentage, returning a normalized and classified value (0–5).
  - `/api/carbon-intensity`: Forecasts carbon intensity (in gCO₂eq/kWh), returning a normalized and classified value (0–5).
- **Technology**: Built with FastAPI, integrating pre-trained LSTM models for predictions.
- **Documentation**: Interactive API documentation (Swagger UI) is available at the `/docs` endpoint when the API service is running.
- **Deployment**: Designed for containerization using Docker and deployment to cloud platforms like Google Cloud Run. For more details, see the `backend/api/CI_RP/README.md`.

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
2. **For the Streamlit Frontend:**
   a.  Navigate to the `frontend/streamlit` directory.
   b.  Set up your Python virtual environment.
   c.  Install dependencies from `frontend/streamlit/requirements.txt`.
   d.  Configure environment variables (see `frontend/streamlit/.env.example` or create a `.env` file).
   e.  Run the Streamlit application using `streamlit run Home.py`.
3. **For the Backend API Service:**
   a.  Navigate to the `backend/api/CI_RP` directory.
   b.  Follow the detailed setup and run instructions in `backend/api/CI_RP/README.md`. This typically involves:
       i.  Setting up a Python virtual environment.
       ii. Installing dependencies from `backend/api/CI_RP/requirements.txt`.
       iii.Configuring environment variables (e.g., `ELECTRICITYMAP_API_KEY` in a `.env` file).
       iv. Running the service using Uvicorn (e.g., `uvicorn app.main:app --reload`) or via Docker.
4. Access the Streamlit dashboard in your browser (default: `http://localhost:8501`).
5. Access the API documentation (Swagger UI) for the backend service (default: `http://localhost:8000/docs`, if the API is running on port 8000).

## 💻 Installation

This project comprises two main components: the Streamlit frontend and the FastAPI backend.

### Streamlit Frontend

```bash
# Clone the repository (if not already done)
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
# Create a .env file if needed, based on .env.example or specific requirements.
# Example: cp .env.example .env (if an example file exists)
# Edit .env with your configuration (e.g., API keys, database settings)

# Run the application (from frontend/streamlit directory)
streamlit run Home.py
```

### FastAPI Backend API

For detailed installation and operational instructions for the backend API service, please consult the dedicated README file: `backend/api/CI_RP/README.md`.

The general steps include:

1. Navigating to the `backend/api/CI_RP` directory.
2. Creating and activating a Python virtual environment.
3. Installing Python dependencies listed in `backend/api/CI_RP/requirements.txt`.
4. Setting up necessary environment variables (e.g., API keys) in a `.env` file within the `backend/api/CI_RP` directory, based on `backend/api/CI_RP/.env.example`.
5. Running the FastAPI application using an ASGI server like Uvicorn, or by building and running the provided Docker container.

## 🔧 Environment Variables

### Streamlit Frontend (`frontend/streamlit/.env`)

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

### Backend API (`backend/api/CI_RP/.env`)

Refer to `backend/api/CI_RP/README.md` and its associated `.env.example` for the specific environment variables required by the API service. Key variables typically include:

```env
# ElectricityMaps API key
ELECTRICITYMAP_API_KEY=your_electricitymaps_api_key

# Optional overrides for ElectricityMaps API (defaults are usually provided)
# ELECTRICITYMAP_BASE_URL=https://api.electricitymap.org/v3
# ELECTRICITYMAP_REGION=PT

# Paths to machine learning models and scalers (defaults are usually provided)
# SCALER_RP_PATH=models/renewable_percentage/scaler_renewable_percentage.pkl
# MODEL_RP_PATH=models/renewable_percentage/model_renewable_percentage.keras
# SCALER_CI_PATH=models/carbon_intensity/scaler_carbon_intensity.pkl
# MODEL_CI_PATH=models/carbon_intensity/model_carbon_intensity.keras
```

## 📁 Project Structure

```
Eco-AI.ly/
├── LICENSE
├── README.md                # This file - Main project documentation
├── backend/                 # Backend services, models, and data processing
│   ├── api/                 # API services
│   │   └── CI_RP/           # FastAPI for Carbon Intensity & Renewable Percentage
│   │       ├── app/         # FastAPI application source code
│   │       │   ├── main.py  # FastAPI endpoints definition
│   │       │   ├── utils.py # Utility functions (data fetching, preprocessing, model loading)
│   │       │   └── models/  # Directory for pre-trained ML models and scalers
│   │       │       ├── renewable_percentage/
│   │       │       │   ├── model_renewable_percentage.keras
│   │       │       │   └── scaler_renewable_percentage.pkl
│   │       │       └── carbon_intensity/
│   │       │           ├── model_carbon_intensity.keras
│   │       │           └── scaler_carbon_intensity.pkl
│   │       ├── Dockerfile   # Docker configuration for the API service
│   │       ├── README.md    # Detailed README for the API service
│   │       ├── requirements.txt # Python dependencies for the API
│   │       └── .env.example # Example environment variables for the API
│   └── mvp/                 # Minimum Viable Product: Jupyter notebooks, initial models, data exploration
│       ├── carbon_intensity/  # Notebooks related to carbon intensity analysis/modeling
│       │   └── ...          # (e.g., Live_Predictions_LSTM_Carbon_Intensity.ipynb)
│       ├── power_breakdown/ # Notebooks for power import/export analysis
│       │   ├── Power_Export_Breakdown.ipynb
│       │   └── Power_Import_Breakdown.ipynb
│       └── renewable_percentage/ # Notebooks for renewable percentage analysis/modeling
│           └── Live_Predictions_LSTM_Renewable_Percentage.ipynb
├── branding/                # Branding assets (logos, color palettes, images)
│   ├── carbon_sensei/       # Assets for Carbon Sensei sub-brand (if applicable)
│   └── eco_ai.ly/           # Main Eco AI.ly logos and visual assets
├── frontend/                # Frontend applications
│   ├── next/                # Next.js frontend (placeholder or future development)
│   │   └── main.py          # Example file
│   │   └── ...
│   └── streamlit/           # Streamlit dashboard application
│       ├── Home.py          # Main Streamlit application entry point
│       ├── README.md        # Streamlit application-specific README
│       ├── assets/          # Static assets for Streamlit (images, custom styles)
│       ├── backend/         # Helper modules and backend logic specific to Streamlit
│       ├── pages/           # Individual pages/modules of the Streamlit dashboard
│       ├── requirements.txt # Python dependencies for the Streamlit application
│       ├── pyproject.toml   # Project configuration for Streamlit (e.g., for linters/formatters)
│       └── .env.example     # Example environment variables for the Streamlit app
├── .devcontainer/           # Development container configuration (e.g., for VS Code Remote - Containers)
├── .gitignore               # Specifies intentionally untracked files that Git should ignore
├── requirements.txt         # Root level Python dependencies (if any, typically for dev tools)
├── pyproject.toml           # Root level project configuration (e.g., for Ruff, Black)
└── uv.lock                  # Dependency lock file (if using uv package manager at root)
```

## 🎯 Usage

### Streamlit Frontend

1. Ensure you are in the `frontend/streamlit` directory.
2. Activate your virtual environment.
3. Start the application:

   ```bash
   streamlit run Home.py
   ```

4. Navigate to `http://localhost:8501` (or the address shown in your terminal) in your web browser.
5. Use the sidebar to navigate through the different analysis dashboards:
   - Carbon Intensity Analysis
   - Renewable Percentage Tracking
   - Production vs Consumption
   - Import vs Export

### FastAPI Backend API

- The API service is designed to be run continuously (e.g., using Uvicorn or Docker).
- Endpoints are accessed via standard HTTP requests (GET, POST, etc.) from client applications or tools like `curl` or Postman.
- The primary endpoints are:
  - `GET /api/renewable-percentage`
  - `GET /api/carbon-intensity`
- Interactive API documentation (Swagger UI) is available at the `/docs` path of the running API (e.g., `http://localhost:8000/docs`). This interface allows you to explore and test the API endpoints directly from your browser.
- For detailed information on API usage, request/response formats, and specific parameters, please refer to the `backend/api/CI_RP/README.md` and the live Swagger documentation.

## 🤖 AI Models

Details about the AI models used in the Streamlit application and the backend API.

### Carbon Intensity Model (used in API and potentially by Streamlit via API)

- Architecture: LSTM Neural Network
- Input: 24-hour historical data
- Output: 6-class classification
- Test Accuracy: 90.9%
- Features: Real-time inference, uncertainty estimation

### Renewable Percentage Model (used in API and potentially by Streamlit via API)

- Architecture: LSTM Neural Network
- Input: 24-hour historical data
- Output: 6-class classification
- Test Accuracy: 90.9%
- Features: Real-time predictions, confidence scoring

### MVP Notebooks (`backend/mvp/`)

The Jupyter notebooks located in the `backend/mvp/` directory were instrumental in the initial phases of the project for:

- **Data Exploration and Preprocessing**: Understanding the structure and characteristics of energy data.
- **Model Prototyping**: Experimenting with different machine learning models, including LSTMs for time series forecasting (e.g., `Live_Predictions_LSTM_Renewable_Percentage.ipynb`).
- **Feature Engineering**: Identifying and creating relevant features for the predictive models.
- **Proof-of-Concept Analysis**: Validating the feasibility of predicting carbon intensity and renewable energy percentages, and analyzing power breakdown data (e.g., `Power_Import_Breakdown.ipynb`, `Power_Export_Breakdown.ipynb`).

These notebooks provide valuable insights into the data science workflow and the foundational steps that led to the development of the operational models used in the FastAPI service.

## 🛠️ Development

Development practices apply across the project, whether working on the Streamlit frontend, the FastAPI backend, or the MVP notebooks.

(Commands are typically run from the project root, or specific subdirectories like `frontend/streamlit` or `backend/api/CI_RP` as appropriate)

### Running Tests

```bash
# Example: Running pytest from the project root (if tests are structured there)
python -m pytest tests/ 

# Or, if tests are specific to a component, navigate to its directory:
# cd frontend/streamlit
# python -m pytest tests/ 
# (Adjust paths and commands based on your actual test setup)
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
