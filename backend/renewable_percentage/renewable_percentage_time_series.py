import streamlit as st
import pandas as pd
import altair as alt
import numpy as np
from datetime import datetime, timedelta, timezone
from backend.api import fetch_power_breakdown_history, fetch_carbon_intensity_history

def render_time_series_RP():
    st.markdown("---")
    st.subheader("Time Series Data")
    
    # Get the current time (UTC)
    now_dt = datetime.now(timezone.utc)
    
    # ------------------------------------
    # Renewable Percentage Time Series
    # ------------------------------------
    data_rp = fetch_power_breakdown_history(zone="PT")
    if data_rp:
        historico_rp = data_rp.get("history", [])
        if historico_rp:
            df_rp = pd.DataFrame(historico_rp)
            df_rp['datetime'] = pd.to_datetime(df_rp['datetime'])
            df_rp = df_rp.sort_values(by='datetime', ascending=True)
            if 'renewablePercentage' in df_rp.columns:
                df_rp = df_rp[['datetime', 'renewablePercentage']].copy()
                df_rp.rename(columns={'renewablePercentage': 'RP'}, inplace=True)
                cutoff_rp = now_dt - timedelta(hours=24)
                df_rp_last24 = df_rp[df_rp['datetime'] >= cutoff_rp]
                if df_rp_last24.empty:
                    st.error("No renewable percentage data available for the last 24 hours.")
                else:
                    df_rp_last24['Time'] = df_rp_last24['datetime'].dt.strftime('%d/%m %H:%M')
                    brush_rp = alt.selection_interval(encodings=['x'])
                    base_chart_rp = alt.Chart(df_rp_last24).mark_line(color='blue').encode(
                        x=alt.X('Time:N', title='Time (Last 24 Hours)', axis=alt.Axis(labelAngle=-45)),
                        y=alt.Y('RP:Q', title='Renewable Percentage (%)'),
                        tooltip=[alt.Tooltip('Time:N', title='Time'),
                                 alt.Tooltip('RP:Q', title='Renewable Percentage (%)')]
                    ).properties(
                        title='Renewable Percentage Over the Last 24 Hours',
                        width=700,
                        height=400
                    ).add_selection(
                        brush_rp
                    ).interactive()
                    
                    points_rp = base_chart_rp.mark_circle(size=60, color='blue').encode(
                        tooltip=[alt.Tooltip('Time:N', title='Time'),
                                 alt.Tooltip('RP:Q', title='RP (%)')]
                    )
                    
                    chart_rp = alt.layer(base_chart_rp, points_rp).resolve_scale(x='shared')
                    st.altair_chart(chart_rp, use_container_width=True)
                    
                    # Call the metrics panel function after the chart
                    render_metrics_panel_RP(df_rp_last24)
            else:
                st.error("API data does not contain 'renewablePercentage'.")
        else:
            st.error("No renewable percentage history data available.")
    else:
        st.error("Error fetching renewable percentage data.")

    return df_rp_last24

def render_metrics_panel_RP(df):
    """
    Renders a panel of metrics about the renewable percentage data.
    
    Args:
        df (pandas.DataFrame): DataFrame containing renewable percentage data
    """
    st.subheader("Renewable Percentage Metrics")
    
    if df is None or df.empty:
        st.warning("No data available for metrics calculation.")
        return
    
    # Calculate metrics
    current_rp = df['RP'].iloc[-1] if not df.empty else None
    avg_rp = df['RP'].mean()
    max_rp = df['RP'].max()
    min_rp = df['RP'].min()
    std_rp = df['RP'].std()
    
    # Calculate time-based metrics
    df['hour'] = df['datetime'].dt.hour
    hourly_avg = df.groupby('hour')['RP'].mean().reset_index()
    peak_hour = hourly_avg.loc[hourly_avg['RP'].idxmax(), 'hour'] if not hourly_avg.empty else None
    lowest_hour = hourly_avg.loc[hourly_avg['RP'].idxmin(), 'hour'] if not hourly_avg.empty else None
    
    # Calculate trend (positive or negative)
    if len(df) > 1:
        first_value = df['RP'].iloc[0]
        last_value = df['RP'].iloc[-1]
        trend = last_value - first_value
        trend_direction = "increasing" if trend > 0 else "decreasing" if trend < 0 else "stable"
    else:
        trend = 0
        trend_direction = "stable"
    
    # Calculate percentage of time above 50%
    above_50_percent = (df['RP'] > 50).mean() * 100
    
    # Create columns for metrics display
    col1, col2, col3 = st.columns(3)
    
    with col1:
        st.metric("Current Renewable %", f"{current_rp:.1f}%" if current_rp is not None else "N/A")
        st.metric("Average Renewable %", f"{avg_rp:.1f}%")
        st.metric("Maximum Renewable %", f"{max_rp:.1f}%")
    
    with col2:
        st.metric("Minimum Renewable %", f"{min_rp:.1f}%")
        st.metric("Standard Deviation", f"{std_rp:.1f}%")
        st.metric("Trend Direction", trend_direction.capitalize())
    
    with col3:
        st.metric("Peak Hour", f"{peak_hour:02d}:00" if peak_hour is not None else "N/A")
        st.metric("Lowest Hour", f"{lowest_hour:02d}:00" if lowest_hour is not None else "N/A")
        st.metric("Time Above 50%", f"{above_50_percent:.1f}%")

if __name__ == "__main__":
    render_time_series_RP()
    # Uncomment the line below to run the function directly
    # render_time_series()
