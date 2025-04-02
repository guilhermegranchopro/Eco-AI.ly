import os
import pickle
import numpy as np
from tensorflow.keras.models import load_model

def load_models_and_scalers():
    """
    Loads the AI models and corresponding scalers for carbon intensity and renewable percentage.

    Returns:
        dict: A dictionary containing the loaded models and scalers with keys:
              'carbon_model', 'renewable_model', 'carbon_scaler', 'renewable_scaler'
    """
    base_path = os.path.join(os.path.dirname(__file__), "models")
    
    # Load Keras models
    carbon_model_path = os.path.join(base_path, "model_carbon_intensity.keras")
    renewable_model_path = os.path.join(base_path, "model_renewable_percentage.keras")
    
    carbon_model = load_model(carbon_model_path)
    renewable_model = load_model(renewable_model_path)
    
    # Load scalers using pickle
    carbon_scaler_path = os.path.join(base_path, "scaler_carbon_intensity.pkl")
    renewable_scaler_path = os.path.join(base_path, "scaler_renewable_percentage.pkl")
    
    with open(carbon_scaler_path, "rb") as f:
        carbon_scaler = pickle.load(f)
    
    with open(renewable_scaler_path, "rb") as f:
        renewable_scaler = pickle.load(f)
    
    return {
        "carbon_model": carbon_model,
        "renewable_model": renewable_model,
        "carbon_scaler": carbon_scaler,
        "renewable_scaler": renewable_scaler,
    }

def predict_carbon_intensity(model, scaler, input_data: np.ndarray):
    """
    Uses the provided carbon intensity model and scaler to predict the carbon intensity
    for the next 24 hours on a scale from 0 to 5.

    Args:
        model: Loaded Keras model for carbon intensity prediction.
        scaler: Pre-fitted scaler object for carbon intensity data.
        input_data (np.ndarray): Raw input data to be scaled and predicted.

    Returns:
        int: Predicted value on a scale from 0 to 5.
    """
    try:
        # Scale the input data using the scaler
        scaled_input = scaler.transform(input_data)
        # Run prediction using the model
        predictions = model.predict(scaled_input)
        # For demonstration, assume model returns a single value per sample; compute the average prediction
        avg_prediction = np.mean(predictions)
        # Convert the average prediction to an integer on a scale from 0 to 5
        prediction_scaled = int(np.clip(round(avg_prediction), 0, 5))
        return prediction_scaled
    except Exception as e:
        print(f"Error predicting carbon intensity: {e}")
        return None

def predict_renewable_percentage(model, scaler, input_data: np.ndarray):
    """
    Uses the provided renewable percentage model and scaler to predict the renewable percentage
    for the next 24 hours on a scale from 0 to 5.

    Args:
        model: Loaded Keras model for renewable percentage prediction.
        scaler: Pre-fitted scaler object for renewable percentage data.
        input_data (np.ndarray): Raw input data to be scaled and predicted.

    Returns:
        int: Predicted value on a scale from 0 to 5.
    """
    try:
        # Scale the input data using the scaler
        scaled_input = scaler.transform(input_data)
        # Run prediction using the model
        predictions = model.predict(scaled_input)
        # For demonstration, assume model returns a single value per sample; compute the average prediction
        avg_prediction = np.mean(predictions)
        # Convert the average prediction to an integer on a scale from 0 to 5
        prediction_scaled = int(np.clip(round(avg_prediction), 0, 5))
        return prediction_scaled
    except Exception as e:
        print(f"Error predicting renewable percentage: {e}")
        return None

if __name__ == "__main__":
    # Demonstration of loading models and running predictions with dummy data
    models = load_models_and_scalers()
    
    # Create dummy input data. Adjust the shape to match what your model expects.
    # For example, assume the model expects 3 features per sample.
    dummy_input = np.random.rand(5, 3)
    print("Dummy Input Data:")
    print(dummy_input)
    
    carbon_pred = predict_carbon_intensity(models["carbon_model"], models["carbon_scaler"], dummy_input)
    renewable_pred = predict_renewable_percentage(models["renewable_model"], models["renewable_scaler"], dummy_input)
    
    print("Carbon Intensity Prediction (0-5 scale):", carbon_pred)
    print("Renewable Percentage Prediction (0-5 scale):", renewable_pred)
#     st.run()