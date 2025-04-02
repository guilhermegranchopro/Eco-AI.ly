import pandas as pd
import numpy as np

def prepare_model_input_data(raw_data: dict) -> pd.DataFrame:
    """
    Converts raw JSON data from the API into a cleaned Pandas DataFrame 
    suitable for scaling and model predictions.
    
    Args:
        raw_data (dict): Raw data from the API, expected to have a key "data" with a list of records.
    
    Returns:
        pd.DataFrame: Cleaned DataFrame ready for further processing.
    """
    try:
        # Assuming the raw data has a key "data" with a list of records.
        df = pd.DataFrame(raw_data.get("data", []))
        # Data cleaning: drop rows with any null values.
        df = df.dropna()
        # Optionally, add more cleaning or type conversion if necessary.
        return df
    except Exception as e:
        print(f"Error in preparing model input data: {e}")
        return pd.DataFrame()

def scale_model_input_data(df: pd.DataFrame, scaler) -> np.ndarray:
    """
    Scales the DataFrame using the provided scaler object.
    
    Args:
        df (pd.DataFrame): DataFrame with model input features.
        scaler: Pre-fitted scaler object (loaded from a .pkl file).
    
    Returns:
        np.ndarray: Scaled data array suitable for model predictions.
    """
    try:
        # Scale the DataFrame using the scaler's transform method.
        scaled_data = scaler.transform(df)
        return scaled_data
    except Exception as e:
        print(f"Error scaling model input data: {e}")
        return np.array([])

if __name__ == "__main__":
    # Example usage for testing the functions
    example_raw_data = {
        "data": [
            {"feature1": 1.0, "feature2": 2.0},
            {"feature1": 3.0, "feature2": 4.0},
            {"feature1": 5.0, "feature2": 6.0},
        ]
    }
    
    # Prepare data from the raw API response.
    df = prepare_model_input_data(example_raw_data)
    print("Prepared Data:")
    print(df)
    
    # For demonstration, create a dummy scaler using StandardScaler.
    from sklearn.preprocessing import StandardScaler
    scaler = StandardScaler().fit(df)
    
    # Scale the prepared DataFrame.
    scaled_array = scale_model_input_data(df, scaler)
    print("Scaled Data:")
    print(scaled_array)
# This code is for the backend data preparation of the Eco AI.ly web application.