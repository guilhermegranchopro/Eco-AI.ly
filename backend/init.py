"""
Backend package for Eco AI.ly.

This package includes modules for:
- Fetching data from external APIs
- Preparing and scaling input data
- Loading AI models and running model inference

Functions from submodules are imported here for convenient access.
"""

from .api import fetch_pie_chart_data, fetch_model_input_data
from .data_preparation import prepare_model_input_data, scale_model_input_data
from .model_inference import (
    load_models_and_scalers,
    predict_carbon_intensity,
    predict_renewable_percentage
)
