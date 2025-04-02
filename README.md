# Eco AI.ly

Eco AI.ly is a startup project dedicated to leveraging advanced AI models to drive sustainability and environmental awareness. Our platform harnesses state-of-the-art predictive models and interactive visualizations to help users monitor and make informed decisions about environmental metrics.

## Overview

Eco AI.ly provides an interactive multipage dashboard built with Streamlit that features:
- **Introduction:** A page to explain the platform's purpose and tools.
- **Portugal Data:** A page displaying:
  - **Section 1:** Four interactive pie charts (with a dropdown for time range selection on the Power Import Breakdown) showing power import, export, production, and consumption breakdown.
  - **Section 2:** Two line graphs displaying the last 24 hours of carbon intensity lifecycle and renewable percentage data.
  - **Section 3:** AI model predictions (scaled 0 to 5) for carbon intensity and renewable percentage for the next 24 hours.
- **Model Stats:** A page showcasing backend model performance metrics including loss curves, accuracy curves, confusion matrices, F1 recall matrices, and test metrics.

In the backend, the platform integrates:
- API calls to fetch live data for visualizations and AI model inputs.
- Data preparation modules to clean and scale incoming data.
- AI model inference using pre-trained Keras models (stored as `.keras` files) and corresponding scalers (stored as `.pkl` files).

## Directory Structure
