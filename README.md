# Eco AI.ly 🌱

<div align="center">
  <img src="assets/images/logo.png" alt="Eco AI.ly Logo" width="800"/>
  
  [![Python Version](https://img.shields.io/badge/python-3.10%2B-blue)](https://www.python.org/downloads/)
  [![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)
  [![Streamlit](https://img.shields.io/badge/Streamlit-1.31.0-FF4B4B)](https://streamlit.io/)
  [![TensorFlow](https://img.shields.io/badge/TensorFlow-2.15.0-FF6F00)](https://www.tensorflow.org/)
  [![Code Style](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black)
  [![Documentation Status](https://img.shields.io/badge/docs-latest-brightgreen)](https://ecoai.ly/docs)
  [![Tests](https://img.shields.io/badge/tests-100%25-success)](https://github.com/eco-ai-ly/eco-ai-ly/actions)
  [![Coverage](https://img.shields.io/badge/coverage-95%25-brightgreen)](https://github.com/eco-ai-ly/eco-ai-ly/actions)
</div>

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

# Set up environment variables
cp .env.example .env
# Edit .env with your configuration

# Run the application
streamlit run app.py
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

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
eco-ai-ly/
├── assets/                    # Static assets and images
│   ├── images/               # Image assets
│   └── styles/               # CSS styles
├── backend/                   # Backend logic and processing
│   ├── carbon_intensity/      # Carbon intensity analysis
│   │   ├── models/           # Model definitions
│   │   ├── data/            # Data processing
│   │   └── utils/           # Utility functions
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
├── tests/                    # Test files
│   ├── unit/
│   ├── integration/
│   └── e2e/
├── docs/                     # Documentation
├── scripts/                  # Utility scripts
├── .env.example             # Example environment variables
├── requirements.txt          # Project dependencies
├── setup.py                 # Package setup
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
- Email: guilhermegranchopro@gmail.com
- Website: https://ecoaily.streamlit.app/
- GitHub: https://github.com/guilhermegranchopro

---

<div align="center">
  <sub>Built with ❤️ by the Eco AI.ly Team</sub>
  <br>
  <sub>© 2025 Eco AI.ly. All rights reserved.</sub>
</div>

## 🚀 Deployment

### Local Deployment
```bash
# Development
streamlit run app.py

# Production
gunicorn app:app
```

### Docker Deployment
```bash
# Build the image
docker build -t eco-ai-ly .

# Run the container
docker run -p 8501:8501 eco-ai-ly
```

### Cloud Deployment
- **AWS**: Use AWS Elastic Beanstalk or ECS
- **GCP**: Deploy to Google Cloud Run
- **Azure**: Use Azure App Service
- **Heroku**: Deploy using Heroku CLI

## 🔍 Troubleshooting

### Common Issues

1. **Database Connection Issues**
   - Check database credentials in `.env`
   - Verify database service is running
   - Check network connectivity

2. **Model Loading Errors**
   - Verify model files exist in correct location
   - Check TensorFlow version compatibility
   - Ensure sufficient RAM (4GB minimum)

3. **API Integration Issues**
   - Validate API keys in `.env`
   - Check API rate limits
   - Verify network connectivity

4. **Performance Issues**
   - Monitor system resources
   - Check for memory leaks
   - Optimize database queries

### Logging
- Logs are stored in `logs/` directory
- Set `LOG_LEVEL` in `.env` for desired verbosity
- Use `python -m logging` for custom logging

## 📧 Contact & Support

### Technical Support
- Email: guilhermegranchopro@gmail.com
- Documentation: https://ecoai.ly/docs
- GitHub Issues: https://github.com/guilhermegranchopro/issues

### Business Inquiries
- Email: guilhermegranchopro@gmail.com
- Website: https://ecoaily.streamlit.app/
- LinkedIn: https://linkedin.com/company/eco-ai-ly

### Community
- Discord: https://discord.gg/ecoai-ly
- Twitter: https://twitter.com/ecoai_ly
- Blog: https://ecoai.ly/blog

---

<div align="center">
  <sub>Built with ❤️ by the Eco AI.ly Team</sub>
  <br>
  <sub>© 2024 Eco AI.ly. All rights reserved.</sub>
</div>
