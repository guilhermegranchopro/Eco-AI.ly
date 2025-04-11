import streamlit as st
from backend.renewable_percentage.renewable_percentage_time_series import render_time_series_RP
from backend.renewable_percentage.renewable_percentage_ai import render_ai_predictions_RP
from backend.renewable_percentage.renewable_percentage_model_stats import rend_model_stats_RP
from backend.other_countries import get_expansion_message
from backend.renewable_percentage.renewable_percentage_info import render_renewable_percentage_info
from backend.renewable_percentage.renewable_percentage_report import create_renewable_percentage_report_download_button
from backend.renewable_percentage.renewable_percentage_arbitrage import render_arbitrage_opportunity_RP

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
    tab1, tab2, tab3, tab4 = st.tabs(["Portugal Overview", "Other Countries", "Model Stats", "Info"])

    with tab1:
        set_page_config_once()
        # Set the title and header for the app
        st.title("Portugal Data Dashboard")
        st.header("Environmental Data and Predictions for Portugal")

        # Render Section 4: Current Index
        value_displayed_now, relative_value_now, value_displayed_next, relative_value_next = render_ai_predictions_RP()

        # Render Section: Arbitrage Opportunity
        arbitrage_value = render_arbitrage_opportunity_RP(value_displayed_now, value_displayed_next)
        
        # Render Section 2: Time Series Data
        df_rp_last24 = render_time_series_RP()

        # Render Section 6: Renewable Percentage Report
        create_renewable_percentage_report_download_button([value_displayed_now, relative_value_now, value_displayed_next, relative_value_next], df_rp_last24)


    with tab2:
        set_page_config_once()
        st.subheader("Other Countries")
        st.markdown(get_expansion_message())

    with tab3:
        set_page_config_once()
        rend_model_stats_RP()

    with tab4:
        set_page_config_once()
        render_renewable_percentage_info()


if __name__ == "__main__":
    main()