import streamlit as st
from portugal_data_sections.section2_time_series import render_time_series
from portugal_data_sections.section3_ai_predictions import render_ai_predictions

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
    
    # Render Section 2: Time Series Data
    render_time_series()
    
    # Render Section 3: AI Model Predictions
    render_ai_predictions()

if __name__ == "__main__":
    main()