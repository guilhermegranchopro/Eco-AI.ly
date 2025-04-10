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

        # Render Section 4: Carbon Intensity Report
        create_carbon_intensity_report_download_button([1,2,3,4])

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