# MVP Demo Notebooks for Eco-AI.ly Backend

This directory contains Jupyter/Google Colab notebooks used for testing and demonstrating the core functionalities of the Eco-AI.ly backend components. These notebooks showcase live data fetching, data processing, model predictions, and visualizations for energy data in Portugal (PT).

---

## Notebooks Overview

The following notebooks are included:

1.  **`renewable_percentage/Live_Predictions_LSTM_Renewable_Percentage.ipynb`**:
    *   Fetches the last 24 hours of renewable energy percentage data from the Electricity Maps API.
    *   Pre-processes the data (normalization using a pre-trained `MinMaxScaler`).
    *   Loads a pre-trained LSTM model (`LSTM_RP_Model.keras`).
    *   Predicts the renewable percentage class (0-5) for the next 24 hours.
    *   Visualizes the historical and normalized data.
    *   Calculates and displays the mode of the labelled renewable percentage.

2.  **`carbon_intensity/Live_Predictions_LSTM_Carbon_Intensity.ipynb`**:
    *   Fetches the last 24 hours of carbon intensity data (gCO₂eq/kWh) from the Electricity Maps API.
    *   Pre-processes the data (normalization using a pre-trained `MinMaxScaler`).
    *   Loads a pre-trained LSTM model (`LSTM_LCA_Model.keras`).
    *   Predicts the carbon intensity class (0-5) for the next 24 hours.
    *   Visualizes the historical and normalized data.
    *   Calculates and displays the mode of the labelled carbon intensity.

3.  **`power_breakdown/Power_Production_Breakdown.ipynb`**:
    *   Fetches historical power production breakdown data from the Electricity Maps API.
    *   Aggregates production data (total and by source) for various timeframes (1, 3, 6, 12, 24 hours).
    *   Generates pie charts visualizing the power production breakdown for each timeframe, showing the percentage contribution of each source.

4.  **`power_breakdown/Power_Import_Breakdown.ipynb`**:
    *   Fetches historical power import breakdown data from the Electricity Maps API.
    *   Aggregates import data (total and by source country) for various timeframes (1, 3, 6, 12, 24 hours).
    *   Generates pie charts visualizing the power import breakdown for each timeframe, showing the percentage contribution from each import source.

5.  **`power_breakdown/Power_Export_Breakdown.ipynb`**:
    *   Fetches historical power export breakdown data from the Electricity Maps API.
    *   Aggregates export data (total and by destination country) for various timeframes (1, 3, 6, 12, 24 hours).
    *   Generates pie charts visualizing the power export breakdown for each timeframe, showing the percentage contribution to each export destination.

6.  **`power_breakdown/Power_Consumption_Breakdown.ipynb`**:
    *   Fetches historical power consumption breakdown data from the Electricity Maps API.
    *   Aggregates consumption data (total and by sector, if available) for various timeframes (1, 3, 6, 12, 24 hours).
    *   Generates pie charts visualizing the power consumption breakdown for each timeframe.

---

## Common Setup and Key Functionalities

*   **Google Colab Environment**: Most notebooks are designed to run in Google Colab, utilizing its environment and GPU capabilities for model predictions.
*   **Google Drive Integration**:
    *   Notebooks require mounting Google Drive (`drive.mount("/content/drive")`) to access:
        *   Pre-trained machine learning models (e.g., `.keras` files).
        *   Pre-fitted scalers (e.g., `MinMaxScaler` saved as `.pkl` files).
        *   API authentication keys stored in text files.
*   **API Authentication**:
    *   A common utility function `autentification_keys(caminho_secret_keys)` is used to read API base URLs and secret keys from files stored in Google Drive. This ensures that sensitive credentials are not hardcoded into the notebooks.
*   **Electricity Maps API**:
    *   All notebooks interact with the Electricity Maps API (`https://api.electricitymap.org/v3`) to fetch live and historical energy data for Portugal (`REGION = "PT"`).
    *   Endpoints used include:
        *   `/carbon-intensity/history`
        *   `/power-breakdown/history`
*   **Data Handling with Pandas**: Data fetched from the API is processed and manipulated using the `pandas` library.
*   **Visualization with Matplotlib**: `matplotlib.pyplot` is used to generate plots and charts for data visualization (e.g., time series plots, pie charts).
*   **Machine Learning with TensorFlow/Keras and Scikit-learn**:
    *   LSTM models for predictions are built and loaded using `tensorflow.keras`.
    *   Data normalization and scaling are performed using `sklearn.preprocessing.MinMaxScaler`, with scalers pre-fitted on the original training data and loaded via `joblib`.

---

## Running the Notebooks

1.  **Upload to Google Drive**:
    *   Ensure the notebook files (`.ipynb`) are uploaded to your Google Drive.
    *   Place the required model files (e.g., `LSTM_RP_Model.keras`, `LSTM_LCA_Model.keras`), scaler files (e.g., `minmax_scaler_RP.pkl`, `minmax_scaler_CI.pkl`, `labelling_scaler_RP.pkl`, `labelling_scaler_CI.pkl`), and API key files (e.g., `PT_Key_Secret_Power_Breakdown.txt`) in the correct paths within your Google Drive as referenced in the notebooks (typically under a `Modelos` or `Código/Power_Breakdown` directory).
2.  **Open in Google Colab**: Open each notebook in Google Colaboratory.
3.  **Execute Cells**: Run the cells sequentially. You will be prompted to authenticate and grant Google Drive access when the `drive.mount` cell is executed.

---

**Note**: The paths to models, scalers, and API keys in the notebooks are hardcoded to specific locations in Google Drive (e.g., `"/content/drive/My Drive/Modelos/"`). You may need to adjust these paths if your Drive folder structure is different.
