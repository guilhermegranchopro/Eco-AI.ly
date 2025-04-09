import streamlit as st
from backend.carbon_intensity.carbon_intensity_time_series import render_time_series_CI
from backend.carbon_intensity.carbon_intensity_ai import render_ai_predictions_CI
from backend.carbon_intensity.carbon_intensity_model_stats import rend_model_stats_CI
from backend.other_countries import get_expansion_message
from backend.carbon_intensity.carbon_intensity_info import render_carbon_intensity_info
from backend.carbon_intensity.carbon_intensity_report import create_carbon_intensity_report_download_button
# -----------------------------
# Helper Functions
# -----------------------------
def set_page_config_once():
    if "page_config_done" not in st.session_state:
        st.set_page_config(page_title="Eco AI.ly", page_icon="🌿", layout="wide")
        st.session_state["page_config_done"] = True

def main():

    set_page_config_once()

    # Top navigation tabs
    tab1, tab2, tab3, tab4 = st.tabs(["Portugal Overview", "Model Stats", "Info", "Other Countries"])

    with tab1:
        set_page_config_once()
        # Set the title and header for the app
        st.title("Portugal Data Dashboard")
        st.header("Environmental Data and Predictions for Portugal")

        # Render Section 3: AI Model Predictions
        render_ai_predictions_CI()
        
        # Render Section 2: Time Series Data
        render_time_series_CI()
        # Create dummy data for testing the report download button
        import pandas as pd
        import numpy as np
        import matplotlib.pyplot as plt
        from datetime import datetime, timedelta
        
        # Generate dummy time series data for carbon intensity
        end_date = datetime.now()
        start_date = end_date - timedelta(days=7)
        date_range = pd.date_range(start=start_date, end=end_date, freq='h')
        
        # Create synthetic carbon intensity values with daily patterns
        carbon_values = 200 + 50 * np.sin(np.linspace(0, 14*np.pi, len(date_range))) + np.random.normal(0, 20, len(date_range))
        data = pd.DataFrame(carbon_values, index=date_range, columns=['carbon_intensity'])
        
        # Create dummy charts for the report
        charts = {}
        
        # Time series chart
        fig1, ax1 = plt.subplots(figsize=(10, 6))
        ax1.plot(data.index, data['carbon_intensity'])
        ax1.set_title('Carbon Intensity Time Series')
        ax1.set_xlabel('Date')
        ax1.set_ylabel('Carbon Intensity (gCO2eq/kWh)')
        ax1.grid(True)
        charts['time_series'] = fig1
        
        # Distribution chart
        fig2, ax2 = plt.subplots(figsize=(10, 6))
        ax2.hist(data['carbon_intensity'], bins=20, alpha=0.7)
        ax2.set_title('Carbon Intensity Distribution')
        ax2.set_xlabel('Carbon Intensity (gCO2eq/kWh)')
        ax2.set_ylabel('Frequency')
        ax2.grid(True)
        charts['distribution'] = fig2
        
        # Set report title
        title = "Carbon Intensity Portugal Overview"
        # Render Section 4: Carbon Intensity Report
        create_carbon_intensity_report_download_button(data, charts, title)

    with tab2:
        set_page_config_once()
        rend_model_stats_CI()

    with tab3:
        set_page_config_once()
        render_carbon_intensity_info()

    with tab4:
        set_page_config_once()
        st.subheader("Other Countries")
        st.markdown(get_expansion_message())



if __name__ == "__main__":
    main()