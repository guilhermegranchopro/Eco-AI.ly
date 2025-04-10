# Eco AI.ly 🌱

<div align="center">
  <img src="assets/images/logo.png" alt="Eco AI.ly Logo" width="800"/>
</div>

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Technical Architecture](#technical-architecture)
- [AI Models](#ai-models)
- [Data Sources](#data-sources)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🌟 Overview

Eco AI.ly is an innovative startup project that combines artificial intelligence with environmental monitoring to drive sustainability and environmental awareness. Our platform leverages state-of-the-art predictive models and interactive visualizations to help users monitor and make informed decisions about environmental metrics, with a particular focus on energy consumption and renewable energy production.

## ✨ Features

### Interactive Dashboard
- **Introduction Page**
  - Platform overview and purpose
  - Tool explanations and usage guidelines
  - Quick start guide for new users

- **Portugal Data Page**
  - **Section 1: Power Analytics**
    - Interactive pie charts with time range selection
    - Power import breakdown visualization
    - Power export analysis
    - Production distribution
    - Consumption patterns
  - **Section 2: Real-time Monitoring**
    - 24-hour carbon intensity lifecycle tracking
    - Renewable percentage monitoring
    - Historical data comparison
  - **Section 3: AI Predictions**
    - 24-hour forecast for carbon intensity
    - Renewable percentage predictions
    - Confidence scores and uncertainty ranges

- **Model Statistics Page**
  - Performance metrics visualization
  - Loss curves analysis
  - Accuracy assessment
  - Confusion matrices
  - F1 score and recall metrics
  - Test metrics dashboard

## 🚀 Installation

### Prerequisites
- Python 3.8 or higher
- pip (Python package installer)
- Git

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
│   └── visualization/    # Visualization components
├── tests/                # Test files
├── .env.example          # Environment variables template
├── requirements.txt      # Project dependencies
└── README.md            # Project documentation
```

## 💻 Usage

1. Start the Streamlit application:
   ```bash
   streamlit run src/app.py
   ```

2. Access the dashboard through your web browser at `http://localhost:8501`

3. Navigate through different sections using the sidebar menu

## 🏗️ Technical Architecture

### Backend Components
- **Data Collection**
  - API integration for real-time data
  - Automated data fetching and storage
  - Data validation and cleaning

- **Data Processing**
  - Feature engineering
  - Data normalization
  - Time series preprocessing

- **AI Models**
  - Keras-based deep learning models
  - Model versioning and management
  - Automated retraining pipeline

### Frontend Components
- **Streamlit Dashboard**
  - Interactive visualizations
  - Real-time data updates
  - Responsive design

## 🤖 AI Models

### Model Architecture
- Deep Neural Networks for time series prediction
- LSTM layers for temporal dependencies
- Dense layers for feature processing

### Model Performance
- Mean Absolute Error (MAE): < 0.1
- Root Mean Square Error (RMSE): < 0.15
- R² Score: > 0.9

## 📊 Data Sources

- Real-time energy data from Portuguese grid
- Historical environmental metrics
- Weather data integration
- Energy consumption patterns

## 👥 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

- Project Link: [https://github.com/your-username/eco-ai-ly](https://github.com/your-username/eco-ai-ly)
- Email: contact@ecoai.ly
- Website: [https://ecoai.ly](https://ecoai.ly)

---

<div align="center">
  <sub>Built with ❤️ by the Eco AI.ly Team</sub>
</div>
