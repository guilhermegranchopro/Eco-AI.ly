from fastapi import FastAPI, HTTPException
from app.utils import get_renewable_percentage, get_carbon_intensity
import uvicorn

app = FastAPI(title="Energy Forecast API")


@app.get(
    "/api/renewable-percentage",
    summary="🔋 Renewable Percentage Forecast",
    description="Fetches last 24h Renewable Percentage data, normalizes it, and returns history, scaled inputs, and a 0–5 prediction class.",
    tags=["Renewable Percentage"],
)
async def renewable_percentage():
    try:
        return get_renewable_percentage()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get(
    "/api/carbon-intensity",
    summary="🌍 Carbon Intensity Forecast",
    description="Fetches last 24h Carbon Intensity data, normalizes it, and returns history, scaled inputs, and a 0–5 prediction class.",
    tags=["Carbon Intensity"],
)
async def carbon_intensity():
    try:
        return get_carbon_intensity()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=8080, reload=True)
