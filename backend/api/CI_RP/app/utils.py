### app/utils.py
import os
import requests
import pandas as pd
import numpy as np
import joblib
import tensorflow as tf

# Load secrets from env
API_KEY = os.getenv("ELECTRICITYMAP_API_KEY")
BASE_URL = os.getenv("ELECTRICITYMAP_BASE_URL", "https://api.electricitymap.org/v3")
REGION = os.getenv("ELECTRICITYMAP_REGION", "PT")

# Paths to your saved models & scalers (mount these into container)
RP_PATH = "../models/renewable_percentage"
CI_PATH = "../models/carbon_intensity"
SCALER_RP_PATH = os.getenv(RP_PATH, "scaler_renewable_percentage.pkl")
SCALER_CI_PATH = os.getenv(CI_PATH, "scaler_carbon_intensity.pkl")
MODEL_RP_PATH = os.getenv(RP_PATH, "model_renewable_percentage.keras")
MODEL_CI_PATH = os.getenv(CI_PATH, "model_carbon_intensity.keras")

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
