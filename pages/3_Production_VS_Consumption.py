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

def get_production_consumption_data():
    """
    Function to get production and consumption data
    """
    return render_pie_charts()

@st.cache_data(ttl=3600)  # Cache for 1 hour (static content)
def get_expansion_message_cached():
    """
    Cached function to get the expansion message
    """
    return get_expansion_message()

@st.cache_data(ttl=3600)  # Cache for 1 hour (static content)
def get_production_consumption_info_cached():
    """
    Cached function to get the production consumption info
    """
    return render_production_consumption_info()

def main():

    set_page_config_once()

    tab1, tab2, tab3 = st.tabs(["Portugal Overview", "Other Countries", "Info"])

    with tab1:
        set_page_config_once()
        # Set the title and header for the app
        st.title("Portugal Data Dashboard")
        st.header("Environmental Data and Predictions for Portugal")
        
        # Render Section 1: Pie Charts without caching
        production_data_dict, consumption_data_dict = get_production_consumption_data()

        # Render Section 6: Production Consumption Report
        create_production_consumption_report_download_button(production_data_dict, consumption_data_dict)

    with tab2:
        set_page_config_once()
        st.subheader("Other Countries")
        st.markdown(get_expansion_message_cached())


    with tab3:
        set_page_config_once()
        get_production_consumption_info_cached()

if __name__ == "__main__":
    main()