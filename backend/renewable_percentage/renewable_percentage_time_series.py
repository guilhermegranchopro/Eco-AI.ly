import streamlit as st
import pandas as pd
import altair as alt
import numpy as np
from datetime import datetime, timedelta, timezone
from backend.api import fetch_power_breakdown_history


@st.cache_data(ttl=300)  # Cache for 5 minutes
def fetch_renewable_percentage_data():
    """Cache the renewable percentage data fetching and processing"""
    now_dt = datetime.now(timezone.utc)
    data_rp = fetch_power_breakdown_history(zone="PT")

    if not data_rp or not data_rp.get("history"):
        return None, None

    historico_rp = data_rp.get("history", [])
    if not historico_rp:
        return None, None

    df_rp = pd.DataFrame(historico_rp)
    df_rp["datetime"] = pd.to_datetime(df_rp["datetime"])
    df_rp = df_rp.sort_values(by="datetime", ascending=True)

    if "renewablePercentage" not in df_rp.columns:
        return None, None

    # Select and rename columns
    df_rp = df_rp[["datetime", "renewablePercentage"]].copy()
    df_rp.rename(columns={"renewablePercentage": "RP"}, inplace=True)

    # Filter to the last 24 hours
    cutoff_rp = now_dt - timedelta(hours=24)
    df_rp_last24 = df_rp[df_rp["datetime"] >= cutoff_rp]

    # Format time to include d
    df_rp_last24["Time"] = df_rp_last24["datetime"].dt.strftime("%d/%m %H:%M")

    return df_rp, df_rp_last24


@st.cache_data
def create_renewable_percentage_chart(df_rp_last24):
    """Cache the chart creation"""
    if df_rp_last24.empty:
        return None

    # Create an interactive Altair line chart with zoom/pan selection
    brush_rp = alt.selection_interval(encodings=["x"])
    base_chart_rp = (
        alt.Chart(df_rp_last24)
        .mark_line(color="blue")
        .encode(
            x=alt.X(
                "Time:N", title="Time (Last 24 Hours)", axis=alt.Axis(labelAngle=-45)
            ),
            y=alt.Y("RP:Q", title="Renewable Percentage (%)"),
            tooltip=[
                alt.Tooltip("Time:N", title="Time"),
                alt.Tooltip("RP:Q", title="Renewable Percentage (%)"),
            ],
        )
        .properties(
            title="Renewable Percentage Over the Last 24 Hours", width=700, height=400
        )
        .add_selection(brush_rp)
        .interactive()
    )

    points_rp = base_chart_rp.mark_circle(size=60, color="blue").encode(
        tooltip=[
            alt.Tooltip("Time:N", title="Time"),
            alt.Tooltip("RP:Q", title="RP (%)"),
        ]
    )

    return alt.layer(base_chart_rp, points_rp).resolve_scale(x="shared")


@st.cache_data
def calculate_renewable_percentage_metrics(df):
    """Cache the metrics calculations"""
    if df.empty:
        return {
            "current_rp": 0,
            "avg_rp": 0,
            "min_rp": 0,
            "max_rp": 0,
            "std_rp": 0,
            "min_time": "N/A",
            "max_time": "N/A",
            "trend_direction": "N/A",
            "trend_strength": 0,
        }

    current_rp = df["RP"].iloc[-1]
    avg_rp = df["RP"].mean()
    min_rp = df["RP"].min()
    max_rp = df["RP"].max()
    std_rp = df["RP"].std()

    # Find the time with lowest/highest renewable percentage
    min_time = df.loc[df["RP"].idxmin(), "Time"]
    max_time = df.loc[df["RP"].idxmax(), "Time"]

    # Calculate the trend
    trend = np.polyfit(range(len(df)), df["RP"], 1)[0]
    trend_direction = "increasing" if trend > 0 else "decreasing"
    trend_strength = abs(trend)

    return {
        "current_rp": current_rp,
        "avg_rp": avg_rp,
        "min_rp": min_rp,
        "max_rp": max_rp,
        "std_rp": std_rp,
        "min_time": min_time,
        "max_time": max_time,
        "trend_direction": trend_direction,
        "trend_strength": trend_strength,
    }


def render_time_series_RP():
    st.markdown("---")
    st.subheader("Time Series Data")

    # Fetch and process data using cached function
    df_rp, df_rp_last24 = fetch_renewable_percentage_data()

    if df_rp_last24 is None or df_rp_last24.empty:
        st.error("No renewable percentage data available for the last 24 hours.")
        return None

    # Create and display the chart using cached function
    chart_rp = create_renewable_percentage_chart(df_rp_last24)
    if chart_rp:
        st.altair_chart(chart_rp, use_container_width=True)

    # Calculate and display metrics using cached function
    metrics = calculate_renewable_percentage_metrics(df_rp_last24)

    # Display metrics in columns
    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric("Current Renewable %", f"{metrics['current_rp']:.1f}%")
        st.metric("Average Renewable %", f"{metrics['avg_rp']:.1f}%")
        st.metric("Minimum Renewable %", f"{metrics['min_rp']:.1f}%")

    with col2:
        st.metric("Maximum Renewable %", f"{metrics['max_rp']:.1f}%")
        st.metric("Standard Deviation", f"{metrics['std_rp']:.1f}%")
        st.metric("Lowest RP Time", metrics["min_time"])

    with col3:
        st.metric("Highest RP Time", metrics["max_time"])
        st.metric("Trend Direction", metrics["trend_direction"])
        st.metric("Trend Strength", f"{metrics['trend_strength']:.4f}")

    return df_rp_last24


if __name__ == "__main__":
    render_time_series_RP()
