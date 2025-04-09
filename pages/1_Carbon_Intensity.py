import streamlit as st
from backend.carbon_intensity_time_series import render_time_series_CI
from backend.carbon_intensity_ai import render_ai_predictions_CI

# -----------------------------
# Helper Functions
# -----------------------------
def set_page_config_once():
    if "page_config_done" not in st.session_state:
        st.set_page_config(page_title="Eco AI.ly", page_icon="🌿", layout="wide")
        st.session_state["page_config_done"] = True

def main():

    set_page_config_once()
    # Set the title and header for the app
    st.title("Portugal Data Dashboard")
    st.header("Environmental Data and Predictions for Portugal")

    # Render Section 3: AI Model Predictions
    render_ai_predictions_CI()
    
    # Render Section 2: Time Series Data
    render_time_series_CI() 

if __name__ == "__main__":
    main()