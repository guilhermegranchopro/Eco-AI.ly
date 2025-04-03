import os
import requests
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

def fetch_carbon_intensity_history(zone: str = "PT") -> dict:
    """
    Fetches the power breakdown history data for the specified zone (default: Portugal)
    from the ElectricityMap API.

    Args:
        zone (str): The zone/country code (default is "PT" for Portugal).

    Returns:
        dict: The JSON response from the API, or an empty dict in case of an error.
    """
    endpoint = f'https://api.electricitymap.org/v3/carbon-intensity/history?zone={zone}'
    # Retrieve the API key from the environment variables
    api_key = os.getenv("ELECTRICITYMAP_API_KEY")
    headers = {
        "auth-token": api_key
    }
    
    try:
        response = requests.get(endpoint, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching power breakdown history: {e}")
        return {}

def fetch_power_breakdown_history(zone: str = "PT") -> dict:
    """
    Fetches the power breakdown history data for the specified zone (default: Portugal)
    from the ElectricityMap API.

    Args:
        zone (str): The zone/country code (default is "PT" for Portugal).

    Returns:
        dict: The JSON response from the API, or an empty dict in case of an error.
    """
    endpoint = f"https://api.electricitymap.org/v3/power-breakdown/history?zone={zone}"
    # Retrieve the API key from the environment variables
    api_key = os.getenv("ELECTRICITYMAP_API_KEY")
    headers = {
        "auth-token": api_key
    }
    
    try:
        response = requests.get(endpoint, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching power breakdown history: {e}")
        return {}

def fetch_model_input_data(endpoint_url: str, params: dict = None) -> dict:
    """
    Fetches input data for the AI models from the specified API endpoint.
    This function assumes that you require an API key provided under MODEL_INPUT_API_KEY.
    
    Args:
        endpoint_url (str): The API URL for model input data.
        params (dict, optional): Query parameters for the API call.
    
    Returns:
        dict: JSON data returned from the API, or an empty dict if an error occurs.
    """
    api_key = os.getenv("MODEL_INPUT_API_KEY")
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    try:
        response = requests.get(endpoint_url, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching model input data: {e}")
        return {}

if __name__ == "__main__":
    # Example usage for testing purposes:
    
    # Fetch power breakdown history for Portugal
    power_data = fetch_power_breakdown_history("PT")
    print("Power Breakdown Data:", power_data)
    
    # Example for model input data (replace with your actual endpoint)
    model_input_api_url = "https://api.example.com/model-input-data"
    model_input = fetch_model_input_data(model_input_api_url, params={"country": "PT"})
    print("Model Input Data:", model_input)
