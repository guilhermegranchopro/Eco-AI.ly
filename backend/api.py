import requests

def fetch_pie_chart_data(endpoint_url: str, params: dict = None) -> dict:
    """
    Fetches data for pie charts from the specified API endpoint.

    Args:
        endpoint_url (str): The API URL for pie chart data.
        params (dict, optional): Query parameters for the API call.

    Returns:
        dict: JSON data returned from the API, or an empty dict if an error occurs.
    """
    try:
        response = requests.get(endpoint_url, params=params, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching pie chart data: {e}")
        return {}

def fetch_model_input_data(endpoint_url: str, params: dict = None) -> dict:
    """
    Fetches input data for the AI models from the specified API endpoint.

    Args:
        endpoint_url (str): The API URL for model input data.
        params (dict, optional): Query parameters for the API call.

    Returns:
        dict: JSON data returned from the API, or an empty dict if an error occurs.
    """
    try:
        response = requests.get(endpoint_url, params=params, timeout=10)
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
# This code is for the backend API calls of the Eco AI.ly web application.