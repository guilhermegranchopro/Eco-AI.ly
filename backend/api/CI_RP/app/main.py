### app/main.py
from fastapi import FastAPI, HTTPException
from app.utils import get_power_breakdown, get_carbon_intensity

app = FastAPI(title="Energy Forecast API")


@app.get("/api/power-breakdown")
async def power_breakdown():
    try:
        return get_power_breakdown()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/carbon-intensity")
async def carbon_intensity():
    try:
        return get_carbon_intensity()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
