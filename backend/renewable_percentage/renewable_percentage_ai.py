import streamlit as st
import streamlit.components.v1 as components
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
from backend.api import fetch_power_breakdown_history

def get_bg_color_RP(value):
    """
    Returns a hex color string interpolated between red (#FF0000) and green (#00FF00).
    0 -> red, 5 -> green.
    """
    # Clamp value between 0 and 5
    value = max(0, min(5, value))
    fraction = value / 5.0
    red = int(255 * (1 - fraction))
    green = int(255 * fraction)
    blue = 0
    return f"#{red:02X}{green:02X}{blue:02X}"

def colored_metric(label, value, bg_color):
    """
    Renders a custom metric with a colored background using st.components.v1.html.
    Adds a fixed transparency level to the background color.
    """
    # Set transparency level (alpha) to 0.6 (60% opacity)
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

def render_ai_predictions_RP():
    """
    Renders the AI Model Predictions section using real predictions.
    It fetches the last 24 hours of renewable percentage data,
    applies the corresponding scaler transformations, and uses pre-trained LSTM models
    to predict the next 24-hour class (on a scale from 0 to 5). The result is displayed
    with a background color that interpolates from red (0) to green (5).
    """
    st.markdown("---")
    st.subheader("Renewable Percentage AI Model")

    # ----- Renewable Percentage Prediction -----
    data_rp = fetch_power_breakdown_history(zone="PT")
    if not data_rp or not data_rp.get("history"):
        st.error("No renewable percentage data available.")
        return
    
    historico_rp = data_rp["history"]
    df_rp = pd.DataFrame(historico_rp)
    df_rp['datetime'] = pd.to_datetime(df_rp['datetime'])
    df_rp = df_rp.sort_values(by='datetime', ascending=True)
    if 'renewablePercentage' not in df_rp.columns:
        st.error("API data does not contain 'renewablePercentage'.")
        return

    df_rp = df_rp[['datetime', 'renewablePercentage']].tail(24).reset_index(drop=True)
    df_rp.rename(columns={'renewablePercentage': 'Renewable Percentage'}, inplace=True)

    try:
        # Load the labelling scaler and transform the data
        labelling_scaler_rp = joblib.load('backend/renewable_percentage/models/labelling_scaler_RP.pkl')
        
        # Ensure data is 1D for the labelling scaler
        renewable_percentage_values = df_rp['Renewable Percentage'].values
        labelling_rp = labelling_scaler_rp.transform(renewable_percentage_values.reshape(-1, 1))
        labelling_rp = np.round(labelling_rp)
        mode_labelling_RP = pd.Series(labelling_rp.flatten()).mode()[0]
        mode_labelling_RP = int(mode_labelling_RP)
        
        # Load the main scaler and transform the data
        scaler_rp = joblib.load('backend/renewable_percentage/models/scaler_renewable_percentage.pkl')
        df_rp['scaled'] = scaler_rp.transform(renewable_percentage_values.reshape(-1, 1))
        
        # Reshape for LSTM model (samples, time steps, features)
        X_rp = df_rp['scaled'].values.reshape(1, 24, 1)
        
        # Load and use the model
        model_rp = tf.keras.models.load_model('backend/renewable_percentage/models/model_renewable_percentage.keras')
        prediction_rp = model_rp.predict(X_rp)
        prediction_class_renewable = int(np.argmax(prediction_rp, axis=1)[0])
    
        # Map predictions to background colors
        bg_color_carbon = get_bg_color_RP(mode_labelling_RP)
        bg_color_renewable = get_bg_color_RP(prediction_class_renewable)
        
        # Create three columns:
        # left: current value, center: arrow, right: prediction.
        col_current, col_arrow, col_prediction = st.columns([1, 0.3, 1])
        with col_current:
            colored_metric("Current 24 hours", mode_labelling_RP, bg_color_carbon)
        with col_arrow:
            # Determine arrow based on comparison
            if prediction_class_renewable > mode_labelling_RP:
                arrow = "↑"
                arrow_color = "#28a745"  # green
            elif prediction_class_renewable < mode_labelling_RP:
                arrow = "↓"
                arrow_color = "#dc3545"  # red
            else:
                arrow = "→"
                arrow_color = "#6c757d"  # gray
            st.markdown(
                f"<h1 style='text-align: center; color: {arrow_color}; margin-top: 5px; font-size: 70px; line-height: 50px;'>{arrow}</h1>",
                unsafe_allow_html=True
            )
        with col_prediction:
            colored_metric("Next 24 hours", prediction_class_renewable, bg_color_renewable)
    except FileNotFoundError as e:
        st.error(f"Model file not found: {e}")
    except Exception as e:
        st.error(f"Error loading or using models: {e}")
        st.error(f"Error details: {str(e)}")

if __name__ == "__main__":
    render_ai_predictions_RP()
    st.title("AI Model Predictions")
    st.write("This section provides predictions for carbon intensity and renewable percentage for the next 24 hours.")

