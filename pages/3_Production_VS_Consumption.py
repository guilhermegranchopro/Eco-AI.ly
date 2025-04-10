import streamlit as st
from backend.production_consumption.production_consumption import render_pie_charts
from backend.other_countries import get_expansion_message
from backend.production_consumption.production_consumption_info import render_production_consumption_info
from backend.production_consumption.production_consumption_report import create_production_consumption_report_download_button


# -----------------------------
# Helper Functions
# -----------------------------
def set_page_config_once():
    if "page_config_done" not in st.session_state:
        st.set_page_config(page_title="Eco AI.ly", page_icon="🌿", layout="wide")
        st.session_state["page_config_done"] = True

def main():

    set_page_config_once()

    tab1, tab2, tab3 = st.tabs(["Portugal Overview", "Info", "Other Countries"])

    with tab1:
        set_page_config_once()
        # Set the title and header for the app
        st.title("Portugal Data Dashboard")
        st.header("Environmental Data and Predictions for Portugal")
        
        # Render Section 1: Pie Charts
        render_pie_charts()

        # Render Section 6: Production Consumption Report
        create_production_consumption_report_download_button([2, 3, 4])

    with tab2:
        set_page_config_once()
        render_production_consumption_info()

    with tab3:
        set_page_config_once()
        st.subheader("Other Countries")
        st.markdown(get_expansion_message())

if __name__ == "__main__":
    main()