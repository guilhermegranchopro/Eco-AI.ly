import os
import requests
from dotenv import load_dotenv

# Load environment variables from the .env file
load_dotenv()

def fetch_pie_chart_data(endpoint_url: str, params: dict = None) -> dict:
    """
    Fetches data for pie charts from the specified API endpoint using an API key from the .env file.
    """
    # Retrieve the API key from the environment variables
    api_key = os.getenv("PIE_CHART_API_KEY")
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    try:
        response = requests.get(endpoint_url, params=params, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching pie chart data: {e}")
        return {}

def fetch_model_input_data(endpoint_url: str, params: dict = None) -> dict:
    """
    Fetches input data for the AI models from the specified API endpoint using an API key from the .env file.
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
    # Example usage (replace with your actual API endpoints and parameters)
    pie_chart_api_url = "https://api.example.com/pie-chart-data"
    model_data_api_url = "https://api.example.com/model-input-data"
    
    pie_data = fetch_pie_chart_data(pie_chart_api_url, params={"country": "Portugal"})
    model_input = fetch_model_input_data(model_data_api_url, params={"country": "Portugal"})
    
    print("Pie Chart Data:", pie_data)
    print("Model Input Data:", model_input)
