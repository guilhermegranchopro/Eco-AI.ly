import streamlit as st
import pandas as pd
import altair as alt
import numpy as np
from datetime import datetime, timedelta, timezone
from backend.api import fetch_power_breakdown_history, fetch_carbon_intensity_history

def render_time_series_CI():
    st.markdown("---")
    st.subheader("Time Series Data")
    
    # Get the current time (UTC)
    now_dt = datetime.now(timezone.utc)
    
    # -----------------------------
    # Carbon Intensity Time Series
    # -----------------------------
    data_ci = fetch_carbon_intensity_history(zone="PT")
    if data_ci:
        historico_carbon = data_ci.get("history", [])
        if historico_carbon:
            df_ci = pd.DataFrame(historico_carbon)
            df_ci['datetime'] = pd.to_datetime(df_ci['datetime'])
            df_ci = df_ci.sort_values(by='datetime', ascending=True)
            if 'carbonIntensity' in df_ci.columns:
                # Select and rename columns
                df_ci = df_ci[['datetime', 'carbonIntensity']].copy()
                df_ci.rename(columns={'carbonIntensity': 'LCA'}, inplace=True)
                # Filter to the last 24 hours
                cutoff_ci = now_dt - timedelta(hours=24)
                df_ci_last24 = df_ci[df_ci['datetime'] >= cutoff_ci]
                if df_ci_last24.empty:
                    st.error("No carbon intensity data available for the last 24 hours.")
                else:
                    # Format time to include day/month and hour:minute
                    df_ci_last24['Time'] = df_ci_last24['datetime'].dt.strftime('%d/%m %H:%M')
                    # Create an interactive Altair line chart with zoom/pan selection
                    brush = alt.selection_interval(encodings=['x'])
                    base_chart = alt.Chart(df_ci_last24).mark_line(color='green').encode(
                        x=alt.X('Time:N', title='Time (Last 24 Hours)', axis=alt.Axis(labelAngle=-45)),
                        y=alt.Y('LCA:Q', title='Carbon Intensity (gCO₂/kWh)'),
                        tooltip=[alt.Tooltip('Time:N', title='Time'),
                                 alt.Tooltip('LCA:Q', title='Carbon Intensity (gCO₂/kWh)')]
                    ).properties(
                        title='Carbon Intensity Over the Last 24 Hours',
                        width=700,
                        height=400
                    ).add_selection(
                        brush
                    ).interactive()

                    # Overlay circle markers
                    points = base_chart.mark_circle(size=60, color='green').encode(
                        tooltip=[alt.Tooltip('Time:N', title='Time'),
                                 alt.Tooltip('LCA:Q', title='CI (gCO₂/kWh)')]
                    )
                    
                    chart_ci = alt.layer(base_chart, points).resolve_scale(x='shared')
                    st.altair_chart(chart_ci, use_container_width=True)
                    
                    # Render metrics panel below the chart
                    render_carbon_intensity_metrics(df_ci_last24)
            else:
                st.error("API data does not contain 'carbonIntensity'.")
        else:
            st.error("No carbon intensity history data available.")
    else:
        st.error("Error fetching carbon intensity data.")

    return df_ci_last24

def render_carbon_intensity_metrics(df):
    """
    Renders a panel of metrics about the carbon intensity data.
    
    Args:
        df (pandas.DataFrame): DataFrame containing carbon intensity data
    """
    st.subheader("Carbon Intensity Metrics")
    
    # Create columns for metrics layout
    col1, col2, col3 = st.columns(3)
    
    # Calculate metrics
    current_ci = df['LCA'].iloc[-1] if not df.empty else 0
    avg_ci = df['LCA'].mean() if not df.empty else 0
    min_ci = df['LCA'].min() if not df.empty else 0
    max_ci = df['LCA'].max() if not df.empty else 0
    std_ci = df['LCA'].std() if not df.empty else 0
    
    # Calculate time-based metrics
    if not df.empty:
        # Find the time with lowest carbon intensity
        min_time = df.loc[df['LCA'].idxmin(), 'Time']
        # Find the time with highest carbon intensity
        max_time = df.loc[df['LCA'].idxmax(), 'Time']
        # Calculate the trend (positive means increasing, negative means decreasing)
        trend = np.polyfit(range(len(df)), df['LCA'], 1)[0]
        trend_direction = "increasing" if trend > 0 else "decreasing"
        trend_strength = abs(trend)
    else:
        min_time = "N/A"
        max_time = "N/A"
        trend_direction = "N/A"
        trend_strength = 0
    
    # Display metrics in the first column
    with col1:
        st.metric("Current Carbon Intensity", f"{current_ci:.1f} gCO₂/kWh")
        st.metric("Average Carbon Intensity", f"{avg_ci:.1f} gCO₂/kWh")
        st.metric("Minimum Carbon Intensity", f"{min_ci:.1f} gCO₂/kWh")
    
    # Display metrics in the second column
    with col2:
        st.metric("Maximum Carbon Intensity", f"{max_ci:.1f} gCO₂/kWh")
        st.metric("Standard Deviation", f"{std_ci:.1f} gCO₂/kWh")
        st.metric("Lowest CI Time", min_time)
    
    # Display metrics in the third column
    with col3:
        st.metric("Highest CI Time", max_time)
        st.metric("Trend Direction", trend_direction)
        st.metric("Trend Strength", f"{trend_strength:.4f}")

if __name__ == "__main__":
    render_time_series_CI()
    # Uncomment the line below to run the function directly
    # render_time_series()
