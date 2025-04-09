import streamlit as st
import streamlit.components.v1 as components
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
from backend.api import fetch_carbon_intensity_history

def get_bg_color_CI(value):
    """
    Returns a hex color string interpolated between green (#00FF00) and red (#FF0000).
    0 -> green, 5 -> red.
    """
    # Clamp value between 0 and 5
    value = max(0, min(5, value))
    fraction = value / 5.0
    red = int(255 * fraction)
    green = int(255 * (1 - fraction))
    blue = 0
    return f"#{red:02X}{green:02X}{blue:02X}"

def colored_metric(label, value, bg_color):
    """
    Renders a custom metric with a colored background using st.components.v1.html.
    Adds a fixed transparency level to the background color.
    """
    # Set transparency level (alpha) to 0.8 (80% opacity)
    transparency = 0.6

    # Convert hex color to RGBA with transparency
    if bg_color.startswith("#") and len(bg_color) == 7:  # Ensure it's a valid hex color
        red = int(bg_color[1:3], 16)
        green = int(bg_color[3:5], 16)
        blue = int(bg_color[5:7], 16)
        bg_color = f"rgba({red}, {green}, {blue}, {transparency})"

    html = f"""
    <div style="
         background-color: {bg_color} !important;
         border-radius: 10px;
         padding: 16px;
         width: 95%;
         text-align: center;
         color: #FFFFFF;
         font-family: Arial, sans-serif;
         margin-bottom: 1rem;
         ">
         <div style="font-size: 16px; font-weight: 600;">{label}</div>
         <div style="font-size: 36px; font-weight: 700; margin-top: 4px;">{value}</div>
    </div>
    """
    components.html(html, height=150)

def render_ai_predictions():
    """
    Renders the AI Model Predictions section using real predictions.
    It fetches the last 24 hours of carbon intensity and renewable percentage data,
    applies the corresponding scaler transformations, and uses pre-trained LSTM models
    to predict the next 24-hour class (on a scale from 0 to 5). The result is displayed
    with a background color that interpolates from red (0) to green (5).
    """
    st.markdown("---")
    st.subheader("Carbon Intensity AI Model")
    
    # ----- Carbon Intensity Prediction -----
    data_ci = fetch_carbon_intensity_history(zone="PT")
    if not data_ci or not data_ci.get("history"):
        st.error("No carbon intensity data available.")
        return
    
    historico_carbon = data_ci["history"]
    df_ci = pd.DataFrame(historico_carbon)
    df_ci['datetime'] = pd.to_datetime(df_ci['datetime'])
    df_ci = df_ci.sort_values(by='datetime', ascending=True)
    if 'carbonIntensity' not in df_ci.columns:
        st.error("API data does not contain 'carbonIntensity'.")
        return

    # Take the last 24 hours of data
    df_ci = df_ci[['datetime', 'carbonIntensity']].tail(24).reset_index(drop=True)
    df_ci.rename(columns={'carbonIntensity': 'Carbon Intensity gCO₂eq/kWh (LCA)'}, inplace=True)

    try:
        # Load the labelling scaler and transform the data
        labelling_scaler_carbon = joblib.load('backend/models/labelling_scaler_CI.pkl')
        
        # Ensure data is 1D for the labelling scaler
        carbon_intensity_values = df_ci['Carbon Intensity gCO₂eq/kWh (LCA)'].values
        df_labelling = labelling_scaler_carbon.transform(carbon_intensity_values.reshape(-1, 1))
        df_labelling = np.round(df_labelling)
        mode_labelling_CI = pd.Series(df_labelling.flatten()).mode()[0]
        mode_labelling_CI = int(mode_labelling_CI)
        
        # Load the main scaler and transform the data
        scaler_carbon = joblib.load('backend/models/scaler_carbon_intensity.pkl')
        df_ci['scaled'] = scaler_carbon.transform(carbon_intensity_values.reshape(-1, 1))
        
        # Reshape for LSTM model (samples, time steps, features)
        X_ci = df_ci['scaled'].values.reshape(1, 24, 1)
        
        # Load and use the model
        model_carbon = tf.keras.models.load_model('backend/models/model_carbon_intensity.keras')
        prediction_ci = model_carbon.predict(X_ci)
        prediction_class_carbon = int(np.argmax(prediction_ci, axis=1)[0])
        
        # Map predictions to background colors
        bg_color_carbon = get_bg_color_CI(prediction_class_carbon)
        bg_color_renewable = get_bg_color_CI(mode_labelling_CI)
        
        col_pred1, col_pred2 = st.columns(2)
        with col_pred1:
            colored_metric("Current 24 hours", mode_labelling_CI, bg_color_renewable)
        with col_pred2:
            colored_metric("Next 24 Hours", prediction_class_carbon, bg_color_carbon)
    except FileNotFoundError as e:
        st.error(f"Model file not found: {e}")
    except Exception as e:
        st.error(f"Error loading or using models: {e}")
        st.error(f"Error details: {str(e)}")

if __name__ == "__main__":
    render_ai_predictions()
    st.title("AI Model Predictions")
    st.write("This section provides predictions for carbon intensity and renewable percentage for the next 24 hours.")
