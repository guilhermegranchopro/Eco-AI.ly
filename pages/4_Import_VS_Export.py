import streamlit as st
from backend.section5_pie_charts2 import render_pie_charts2

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

    # Render Section 5: Additional Pie Charts
    render_pie_charts2()

if __name__ == "__main__":
    main()