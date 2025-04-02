import streamlit as st
import importlib

# Set up the page configuration
st.set_page_config(
    page_title="Eco AI.ly",
    page_icon="🌿",
    layout="wide",
)

# Sidebar navigation to select pages
st.sidebar.title("Navigation")
page = st.sidebar.radio("Select a page:", ("Introduction", "Portugal Data", "Model Stats"))

def load_page(page_name):
    # Map page names to their corresponding module paths.
    # Make sure the module names are valid identifiers.
    page_modules = {
        "Introduction": "pages.introduction",        # previously 1_Introduction.py
        "Portugal Data": "pages.portugal_data",        # previously 2_Portugal_Data.py
        "Model Stats": "pages.model_stats"             # previously 3_Model_Stats.py
    }
    module_name = page_modules.get(page_name)
    if module_name is None:
        st.error("Selected page not found!")
        return

    # Dynamically import and run the main function of the selected page module.
    module = importlib.import_module(module_name)
    module.main()

# Load the selected page
load_page(page)
