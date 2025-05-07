import streamlit as st
import numpy as np
import pandas as pd
import joblib
import tensorflow as tf
import os
from backend.api import fetch_carbon_intensity_history
from backend.carbon_intensity.carbon_intensity_utils import (
    get_bg_color_CI,
    colored_metric,
    when_to_consume_energy_CI,
)


@st.cache_resource
def load_model_and_scalers():
    """Cache the model and scalers to avoid reloading them on every prediction"""
    try:
        # compute the folder that Home.py lives in
        HERE = os.path.dirname(__file__)  

        # point at assets/images/logo.png inside the same folder
        logo_path = os.path.join(HERE, "models", "model_carbon_intensity.keras")
        
        # Load model with custom_objects to handle any custom components
        model = tf.keras.models.load_model(
            logo_path,
            compile=False,
        )
        # Recompile the model with default settings
        model.compile(
            optimizer="adam", loss="categorical_crossentropy", metrics=["accuracy"]
        )

        # Load scalers
        labelling_scaler = joblib.load(
            "backend/carbon_intensity/models/labelling_scaler_CI.pkl"
        )
        main_scaler = joblib.load(
            "backend/carbon_intensity/models/scaler_carbon_intensity.pkl"
        )

        return model, labelling_scaler, main_scaler
    except Exception as e:
        st.error(f"Error loading model or scalers: {str(e)}")
        return None, None, None


@st.cache_data(ttl=300)  # Cache for 5 minutes
def fetch_and_process_data():
    """Cache the data fetching and processing"""
    data_ci = fetch_carbon_intensity_history(zone="PT")
    if not data_ci or not data_ci.get("history"):
        return None

    historico_carbon = data_ci["history"]
    df_ci = pd.DataFrame(historico_carbon)
    df_ci["datetime"] = pd.to_datetime(df_ci["datetime"])
    df_ci = df_ci.sort_values(by="datetime", ascending=True)

    if "carbonIntensity" not in df_ci.columns:
        return None

    # Take the last 24 hours of data
    df_ci = df_ci[["datetime", "carbonIntensity"]].tail(24).reset_index(drop=True)
    df_ci.rename(
        columns={"carbonIntensity": "Carbon Intensity gCO₂eq/kWh (LCA)"}, inplace=True
    )

    return df_ci


def render_ai_predictions_CI():
    """
    Renders the AI Model Predictions section using real predictions.
    It fetches the last 24 hours of carbon intensity data,
    applies the corresponding scaler transformations, and uses a pre-trained LSTM model
    to predict the next 24-hour class (on a scale from 0 to 5). The result is displayed
    with a background color that interpolates from green (0) to red (5).
    """
    st.markdown("---")
    st.subheader("Carbon Intensity AI Model")

    # Load cached model and scalers
    model_carbon, labelling_scaler_carbon, scaler_carbon = load_model_and_scalers()
    if None in (model_carbon, labelling_scaler_carbon, scaler_carbon):
        return None, None, None, None

    # Fetch and process cached data
    df_ci = fetch_and_process_data()
    if df_ci is None:
        st.error("No carbon intensity data available.")
        return None, None, None, None

    # Ensure data is 1D for the labelling scaler
    carbon_intensity_values = df_ci["Carbon Intensity gCO₂eq/kWh (LCA)"].values
    df_labelling = labelling_scaler_carbon.transform(
        carbon_intensity_values.reshape(-1, 1)
    )
    df_labelling = np.round(df_labelling)
    mode_labelling_CI = pd.Series(df_labelling.flatten()).mode()[0]
    mode_labelling_CI = int(mode_labelling_CI)

    # Transform data for prediction
    df_ci["scaled"] = scaler_carbon.transform(carbon_intensity_values.reshape(-1, 1))
    X_ci = df_ci["scaled"].values.reshape(1, 24, 1)

    # Make prediction
    try:
        prediction_ci = model_carbon.predict(X_ci, verbose=0)
        prediction_class_carbon = int(np.argmax(prediction_ci, axis=1)[0])
    except Exception as e:
        st.error(f"Error making prediction: {str(e)}")
        return None, None, None, None

    # Map predictions to background colors
    bg_color_carbon = get_bg_color_CI(prediction_class_carbon)
    bg_color_current = get_bg_color_CI(mode_labelling_CI)

    # Create three columns: current value, arrow, prediction
    col_current, col_arrow, col_prediction = st.columns([1, 0.4, 1])
    with col_current:
        value_displayed_now, relative_value_now = colored_metric(
            "Last 24 hours (gCO₂eq/kWh)", mode_labelling_CI, bg_color_current
        )
    with col_arrow:
        # Determine arrow direction based on the values
        if prediction_class_carbon > mode_labelling_CI:
            arrow = "↑"
            arrow_color = "#dc3545"  # green
        elif prediction_class_carbon < mode_labelling_CI:
            arrow = "↓"
            arrow_color = "#28a745"  # red
        else:
            arrow = "→"
            arrow_color = "#6c757d"  # gray
        st.markdown(
            f"<h1 style='text-align: center; color: {arrow_color}; margin-top: 5px; font-size: 70px; line-height: 50px;'>{arrow}</h1>",
            unsafe_allow_html=True,
        )
    with col_prediction:
        value_displayed_next, relative_value_next = colored_metric(
            "Next 24 Hours (gCO₂eq/kWh)", prediction_class_carbon, bg_color_carbon
        )

    st_to_use, timming_message = when_to_consume_energy_CI(
        prediction_class_carbon, mode_labelling_CI
    )
    if st_to_use == "success":
        st.success(timming_message)
    elif st_to_use == "warning":
        st.warning(timming_message)
    elif st_to_use == "error":
        st.error(timming_message)

    return (
        value_displayed_now,
        relative_value_now,
        value_displayed_next,
        relative_value_next,
    )


if __name__ == "__main__":
    render_ai_predictions_CI()
    st.title("AI Model Predictions")
    st.write(
        "This section provides predictions for carbon intensity and renewable percentage for the next 24 hours."
    )
