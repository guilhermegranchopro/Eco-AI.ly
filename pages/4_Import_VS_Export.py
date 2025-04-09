import streamlit as st
from backend.import_export.import_export import render_pie_charts2

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

        # Render Section 5: Additional Pie Charts
        render_pie_charts2()

    with tab2:
        set_page_config_once()
        st.subheader("Info")
        st.write("This is the info page.")

    with tab3:
        set_page_config_once()
        st.subheader("Other Countries")
        st.write("This is the other countries page.")

if __name__ == "__main__":
    main()