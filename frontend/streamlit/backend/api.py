import os
import requests
from dotenv import load_dotenv
import streamlit as st

# Load environment variables from the .env file
load_dotenv()


@st.cache_data(ttl=300)  # Cache for 5 minutes
def fetch_carbon_intensity_history(zone: str = "PT") -> dict:
    """
    Fetches the power breakdown history data for the specified zone (default: Portugal)
    from the ElectricityMap API.

    Args:
        zone (str): The zone/country code (default is "PT" for Portugal).

    Returns:
        dict: The JSON response from the API, or an empty dict in case of an error.
    """
    endpoint = f"https://api.electricitymap.org/v3/carbon-intensity/history?zone={zone}"
    # Retrieve the API key from the environment variables
    api_key = os.getenv("ELECTRICITYMAP_API_KEY")
    headers = {"auth-token": api_key}

    try:
        response = requests.get(endpoint, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching power breakdown history: {e}")
        return {}


@st.cache_data(ttl=300)  # Cache for 5 minutes
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
    headers = {"auth-token": api_key}

    try:
        response = requests.get(endpoint, headers=headers, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"Error fetching power breakdown history: {e}")
        return {}


if __name__ == "__main__":
    # Example usage for testing purposes:

    # Fetch power breakdown history for Portugal
    power_data = fetch_power_breakdown_history("PT")
    print("Power Breakdown Data:", power_data)
