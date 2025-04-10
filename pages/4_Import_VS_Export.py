import streamlit as st
from backend.import_export.import_export import render_pie_charts2
from backend.other_countries import get_expansion_message
from backend.import_export.import_export_info import render_import_export_info
from backend.import_export.import_export_report import create_import_export_report_download_button
# -----------------------------
# Helper Functions
# -----------------------------
def set_page_config_once():
    if "page_config_done" not in st.session_state:
        st.set_page_config(page_title="Eco AI.ly", page_icon="🌿", layout="wide")
        st.session_state["page_config_done"] = True

def main():

    set_page_config_once()

    tab1, tab2, tab3 = st.tabs(["Portugal Overview", "Other Countries", "Info"])

    with tab1:
        set_page_config_once()
        # Set the title and header for the app
        st.title("Portugal Data Dashboard")
        st.header("Environmental Data and Predictions for Portugal")

        # Render Section 5: Additional Pie Charts
        import_data_dict, export_data_dict = render_pie_charts2()

        # Render Section 6: Import Export Report
        create_import_export_report_download_button(import_data_dict, export_data_dict)

    with tab2:
        set_page_config_once()
        st.subheader("Other Countries")
        st.markdown(get_expansion_message())

    with tab3:
        set_page_config_once()
        render_import_export_info()


if __name__ == "__main__":
    main()