import streamlit as st
import pandas as pd
import altair as alt
import numpy as np
from datetime import datetime, timedelta, timezone
from backend.api import fetch_carbon_intensity_history


@st.cache_data(ttl=300)  # Cache for 5 minutes
def fetch_carbon_intensity_data():
    """Cache the carbon intensity data fetching and processing"""
    now_dt = datetime.now(timezone.utc)
    data_ci = fetch_carbon_intensity_history(zone="PT")

    if not data_ci or not data_ci.get("history"):
        return None, None

    historico_carbon = data_ci.get("history", [])
    if not historico_carbon:
        return None, None

    df_ci = pd.DataFrame(historico_carbon)
    df_ci["datetime"] = pd.to_datetime(df_ci["datetime"])
    df_ci = df_ci.sort_values(by="datetime", ascending=True)

    if "carbonIntensity" not in df_ci.columns:
        return None, None

    # Select and rename columns
    df_ci = df_ci[["datetime", "carbonIntensity"]].copy()
    df_ci.rename(columns={"carbonIntensity": "LCA"}, inplace=True)

    # Filter to the last 24 hours
    cutoff_ci = now_dt - timedelta(hours=24)
    df_ci_last24 = df_ci[df_ci["datetime"] >= cutoff_ci]

    # Format time to include day/month and hour:minute
    df_ci_last24["Time"] = df_ci_last24["datetime"].dt.strftime("%d/%m %H:%M")

    return df_ci, df_ci_last24


@st.cache_data
def create_carbon_intensity_chart(df_ci_last24):
    """Cache the chart creation"""
    if df_ci_last24.empty:
        return None

    # Create an interactive Altair line chart with zoom/pan selection
    brush = alt.selection_interval(encodings=["x"])
    base_chart = (
        alt.Chart(df_ci_last24)
        .mark_line(color="green")
        .encode(
            x=alt.X(
                "Time:N", title="Time (Last 24 Hours)", axis=alt.Axis(labelAngle=-45)
            ),
            y=alt.Y("LCA:Q", title="Carbon Intensity (gCO₂/kWh)"),
            tooltip=[
                alt.Tooltip("Time:N", title="Time"),
                alt.Tooltip("LCA:Q", title="Carbon Intensity (gCO₂/kWh)"),
            ],
        )
        .properties(
            title="Carbon Intensity Over the Last 24 Hours", width=700, height=400
        )
        .add_selection(brush)
        .interactive()
    )

    # Overlay circle markers
    points = base_chart.mark_circle(size=60, color="green").encode(
        tooltip=[
            alt.Tooltip("Time:N", title="Time"),
            alt.Tooltip("LCA:Q", title="CI (gCO₂/kWh)"),
        ]
    )

    return alt.layer(base_chart, points).resolve_scale(x="shared")


@st.cache_data
def calculate_carbon_intensity_metrics(df):
    """Cache the metrics calculations"""
    if df.empty:
        return {
            "current_ci": 0,
            "avg_ci": 0,
            "min_ci": 0,
            "max_ci": 0,
            "std_ci": 0,
            "min_time": "N/A",
            "max_time": "N/A",
            "trend_direction": "N/A",
            "trend_strength": 0,
        }

    current_ci = df["LCA"].iloc[-1]
    avg_ci = df["LCA"].mean()
    min_ci = df["LCA"].min()
    max_ci = df["LCA"].max()
    std_ci = df["LCA"].std()

    # Find the time with lowest/highest carbon intensity
    min_time = df.loc[df["LCA"].idxmin(), "Time"]
    max_time = df.loc[df["LCA"].idxmax(), "Time"]

    # Calculate the trend
    trend = np.polyfit(range(len(df)), df["LCA"], 1)[0]
    trend_direction = "increasing" if trend > 0 else "decreasing"
    trend_strength = abs(trend)

    return {
        "current_ci": current_ci,
        "avg_ci": avg_ci,
        "min_ci": min_ci,
        "max_ci": max_ci,
        "std_ci": std_ci,
        "min_time": min_time,
        "max_time": max_time,
        "trend_direction": trend_direction,
        "trend_strength": trend_strength,
    }


def render_time_series_CI():
    st.markdown("---")
    st.subheader("Time Series Data")

    # Fetch and process data
    df_ci, df_ci_last24 = fetch_carbon_intensity_data()

    if df_ci_last24 is None or df_ci_last24.empty:
        st.error("No carbon intensity data available for the last 24 hours.")
        return None

    # Create and display the chart
    chart_ci = create_carbon_intensity_chart(df_ci_last24)
    if chart_ci:
        st.altair_chart(chart_ci, use_container_width=True)

    # Calculate and display metrics
    metrics = calculate_carbon_intensity_metrics(df_ci_last24)

    # Display metrics in columns
    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric("Current Carbon Intensity", f"{metrics['current_ci']:.1f} gCO₂/kWh")
        st.metric("Average Carbon Intensity", f"{metrics['avg_ci']:.1f} gCO₂/kWh")
        st.metric("Minimum Carbon Intensity", f"{metrics['min_ci']:.1f} gCO₂/kWh")

    with col2:
        st.metric("Maximum Carbon Intensity", f"{metrics['max_ci']:.1f} gCO₂/kWh")
        st.metric("Standard Deviation", f"{metrics['std_ci']:.1f} gCO₂/kWh")
        st.metric("Lowest CI Time", metrics["min_time"])

    with col3:
        st.metric("Highest CI Time", metrics["max_time"])
        st.metric("Trend Direction", metrics["trend_direction"])
        st.metric("Trend Strength", f"{metrics['trend_strength']:.4f}")

    return df_ci_last24


if __name__ == "__main__":
    render_time_series_CI()
