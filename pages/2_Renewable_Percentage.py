import streamlit as st
from backend.renewable_percentage_time_series import render_time_series_RP
from backend.renewable_percentage_ai import render_ai_predictions_RP
from backend.renewable_percentage_model_stats import rend_model_stats_RP

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
    tab1, tab2 = st.tabs(["Overview", "Model Stats"])

    with tab1:
        # Set the title and header for the app
        st.title("Portugal Data Dashboard")
        st.header("Environmental Data and Predictions for Portugal")

        # Render Section 4: Current Index
        render_ai_predictions_RP()
        
        # Render Section 2: Time Series Data
        render_time_series_RP()

    with tab2:
        rend_model_stats_RP()

if __name__ == "__main__":
    main()