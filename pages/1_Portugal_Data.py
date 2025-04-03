import streamlit as st
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

def set_page_config_once():
    if "page_config_done" not in st.session_state:
        st.set_page_config(page_title="Eco AI.ly", page_icon="🌿", layout="wide")
        st.session_state["page_config_done"] = True

set_page_config_once()

def main():
    st.title("Portugal Data Dashboard")
    st.header("Environmental Data and Predictions for Portugal")

    # ------------------------------
    # Section 1: Pie Charts
    # ------------------------------
    st.subheader("Section 1: Power Data Breakdown")
    
    # Dropdown for selecting time range for one of the charts (e.g., Power Import Breakdown)
    time_range = st.selectbox(
        "Select time range for Power Import Breakdown:",
        ["Last 1 Hour", "Last 3 Hours", "Last 6 Hours", "Last 12 Hours", "Last 24 Hours"]
    )
    st.write("Displaying Power Import Breakdown for:", time_range)
    
    # Display 4 pie charts in a two-column layout
    col1, col2 = st.columns(2)
    with col1:
        st.write("**Power Import Breakdown**")
        fig_import, ax_import = plt.subplots()
        ax_import.pie([30, 70], labels=["Renewable", "Non-renewable"], autopct='%1.1f%%')
        st.pyplot(fig_import)
    with col2:
        st.write("**Power Export Breakdown**")
        fig_export, ax_export = plt.subplots()
        ax_export.pie([40, 60], labels=["Exported", "Not Exported"], autopct='%1.1f%%')
        st.pyplot(fig_export)
    
    col3, col4 = st.columns(2)
    with col3:
        st.write("**Power Production Breakdown**")
        fig_prod, ax_prod = plt.subplots()
        ax_prod.pie([50, 50], labels=["Solar", "Wind"], autopct='%1.1f%%')
        st.pyplot(fig_prod)
    with col4:
        st.write("**Power Consumption Breakdown**")
        fig_cons, ax_cons = plt.subplots()
        ax_cons.pie([20, 80], labels=["Industrial", "Residential"], autopct='%1.1f%%')
        st.pyplot(fig_cons)
    
    st.markdown("---")
    
    # ------------------------------
    # Section 2: Line Graphs
    # ------------------------------
    st.subheader("Section 2: Time Series Data")
    
    st.write("**Carbon Intensity Lifecycle (Last 24 Hours)**")
    # Create dummy data for carbon intensity over the last 24 hours
    hours = list(range(24))
    carbon_values = np.random.randint(50, 150, size=24)
    df_carbon = pd.DataFrame({"Hour": hours, "Carbon Intensity": carbon_values})
    st.line_chart(df_carbon.set_index("Hour"))
    
    st.write("**Renewable Percentage (Last 24 Hours)**")
    # Create dummy data for renewable percentage over the last 24 hours
    renewable_values = np.random.randint(20, 80, size=24)
    df_renewable = pd.DataFrame({"Hour": hours, "Renewable Percentage": renewable_values})
    st.line_chart(df_renewable.set_index("Hour"))
    
    st.markdown("---")
    
    # ------------------------------
    # Section 3: AI Predictions
    # ------------------------------
    st.subheader("Section 3: AI Model Predictions")
    
    # For demonstration, we'll generate random predictions on a scale of 0 to 5.
    # In production, these values should be obtained by calling your backend model inference functions.
    prediction_carbon = np.random.randint(0, 6)
    prediction_renewable = np.random.randint(0, 6)
    
    col_pred1, col_pred2 = st.columns(2)
    with col_pred1:
        st.metric("Carbon Intensity Prediction (Next 24 Hours)", prediction_carbon)
    with col_pred2:
        st.metric("Renewable Percentage Prediction (Next 24 Hours)", prediction_renewable)

if __name__ == "__main__":
    main()
# This code is for the Portugal Data page of the Eco AI.ly web application.