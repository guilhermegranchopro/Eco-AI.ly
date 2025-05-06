### app/utils.py
import os
import requests
import pandas as pd
import numpy as np
import joblib
import tensorflow as tf
from datetime import datetime

# Load secrets from env
API_KEY = os.getenv("ELECTRICITYMAP_API_KEY")
BASE_URL = os.getenv("ELECTRICITYMAP_BASE_URL", "https://api.electricitymap.org/v3")
REGION = os.getenv("ELECTRICITYMAP_REGION", "PT")

# Paths to your saved models & scalers (mount these into container)
SCALER_RP_PATH = os.getenv("SCALER_RP_PATH", "./models/renewable_percentage/scaler_carbon_intensity.pkl")
SCALER_CI_PATH = os.getenv("SCALER_CI_PATH", "./models/carbon_intensity/scaler_carbon_intensity.pkl")
LABELLER_RP_PATH = os.getenv("LABELLER_RP_PATH", "./models/renewable_percentage/labelling_scaler_RP.pkl")
LABELLER_CI_PATH = os.getenv("LABELLER_CI_PATH", "./models/carbon_intensity/labelling_scaler_CI.pkl")
MODEL_RP_PATH = os.getenv("MODEL_RP_PATH", "./models/renewable_percentage/model_renewable_percentage.keras")
MODEL_CI_PATH = os.getenv("MODEL_CI_PATH", "./models/carbon_intensity/model_carbon_intensity.keras")

# Load scalers and models once
_scaler_rp = joblib.load(SCALER_RP_PATH)
_scaler_ci = joblib.load(SCALER_CI_PATH)
_model_rp = tf.keras.models.load_model(MODEL_RP_PATH)
_model_ci = tf.keras.models.load_model(MODEL_CI_PATH)


def _fetch_history(endpoint: str, field: str) -> pd.DataFrame:
    url = f"{BASE_URL}/{endpoint}?zone={REGION}"
    headers = {"auth-token": API_KEY}
    resp = requests.get(url, headers=headers)
    resp.raise_for_status()
    data = resp.json()["history"]
    df = pd.DataFrame(data)
    df["datetime"] = pd.to_datetime(df["datetime"])
    df = df.sort_values("datetime").tail(24)
    df = df[["datetime", field]].rename(columns={field: "value"})
    return df


def get_power_breakdown() -> dict:
    # Fetch raw
    df = _fetch_history("power-breakdown/history", "renewablePercentage")
    raw = df.to_dict(orient="records")
    # Normalize
    values = df["value"].values.reshape(-1, 1)
    scaled = _scaler_rp.transform(values).flatten()
    # Predict class
    inp = scaled.reshape(1, 24, 1)
    preds = _model_rp.predict(inp)
    cls = int(np.argmax(preds, axis=1)[0])
    return {"history": raw, "prediction_class": cls, "scaled_history": scaled.tolist()}


def get_carbon_intensity() -> dict:
    df = _fetch_history("carbon-intensity/history", "carbonIntensity")
    raw = df.to_dict(orient="records")
    values = df["value"].values.reshape(-1, 1)
    scaled = _scaler_ci.transform(values).flatten()
    inp = scaled.reshape(1, 24, 1)
    preds = _model_ci.predict(inp)
    cls = int(np.argmax(preds, axis=1)[0])
    return {"history": raw, "prediction_class": cls, "scaled_history": scaled.tolist()}
