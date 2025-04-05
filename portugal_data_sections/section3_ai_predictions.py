import streamlit as st
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
from datetime import datetime, timedelta, timezone
from backend.api import fetch_power_breakdown_history, fetch_carbon_intensity_history

def render_ai_predictions():
    """
    Renders the AI Model Predictions section using real predictions.
    It fetches the last 24 hours of carbon intensity and renewable percentage data,
    applies the corresponding scaler transformations, and uses pre-trained LSTM models
    to predict the next 24-hour class.
    """
    st.markdown("---")
    st.subheader("Section 3: AI Model Predictions")
    
    # ----- Carbon Intensity Prediction -----
    data_ci = fetch_carbon_intensity_history(zone="PT")
    historico_carbon = data_ci.get("history", [])
    if not historico_carbon:
        st.error("No carbon intensity data available.")
        return
    df_ci = pd.DataFrame(historico_carbon)
    df_ci['datetime'] = pd.to_datetime(df_ci['datetime'])
    df_ci = df_ci.sort_values(by='datetime', ascending=True)
    # Select the relevant column and limit to the last 24 records
    df_ci = df_ci[['datetime', 'carbonIntensity']].tail(24).reset_index(drop=True)
    # Rename to match feature names used during training
    df_ci.rename(columns={'carbonIntensity': 'Carbon Intensity gCO₂eq/kWh (LCA)'}, inplace=True)
    
    # Load the scaler (ensure the file path is correct)
    scaler_carbon = joblib.load('backend/models/scaler_carbon_intensity.pkl')
    # Transform using the exact feature name expected by the scaler
    df_ci['Carbon Intensity gCO₂eq/kWh (LCA)_scaled'] = scaler_carbon.transform(
        df_ci[['Carbon Intensity gCO₂eq/kWh (LCA)']]
    )
    
    # Reshape data for the LSTM (assumes model expects shape [1, 24, 1])
    X_ci = df_ci['Carbon Intensity gCO₂eq/kWh (LCA)_scaled'].values.reshape(1, 24, 1)
    
    # Load the pre-trained model and predict
    model_carbon = tf.keras.models.load_model('backend/models/model_carbon_intensity.keras')
    prediction_ci = model_carbon.predict(X_ci)
    prediction_class_carbon = int(np.argmax(prediction_ci, axis=1)[0])
    
    # ----- Renewable Percentage Prediction -----
    data_rp = fetch_power_breakdown_history(zone="PT")
    historico_rp = data_rp.get("history", [])
    if not historico_rp:
        st.error("No renewable percentage data available.")
        return
    df_rp = pd.DataFrame(historico_rp)
    df_rp['datetime'] = pd.to_datetime(df_rp['datetime'])
    df_rp = df_rp.sort_values(by='datetime', ascending=True)
    # Select and limit to the last 24 records
    df_rp = df_rp[['datetime', 'renewablePercentage']].tail(24).reset_index(drop=True)
    # Rename column (assuming the scaler was fitted with "Renewable Percentage")
    df_rp.rename(columns={'renewablePercentage': 'Renewable Percentage'}, inplace=True)
    
    scaler_rp = joblib.load('backend/models/scaler_renewable_percentage.pkl')
    df_rp['Renewable Percentage_scaled'] = scaler_rp.transform(df_rp[['Renewable Percentage']])
    
    X_rp = df_rp['Renewable Percentage_scaled'].values.reshape(1, 24, 1)
    
    model_rp = tf.keras.models.load_model('backend/models/model_renewable_percentage.keras')
    prediction_rp = model_rp.predict(X_rp)
    prediction_class_renewable = int(np.argmax(prediction_rp, axis=1)[0])
    
    # Display predictions
    col_pred1, col_pred2 = st.columns(2)
    with col_pred1:
        st.metric("Carbon Intensity Prediction (Next 24 Hours)", prediction_class_carbon)
    with col_pred2:
        st.metric("Renewable Percentage Prediction (Next 24 Hours)", prediction_class_renewable)

if __name__ == "__main__":
    render_ai_predictions()
    # Uncomment the line below to run the function directly
    # main()

