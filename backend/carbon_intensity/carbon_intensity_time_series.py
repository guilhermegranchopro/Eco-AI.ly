import streamlit as st
import pandas as pd
import altair as alt
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
            else:
                st.error("API data does not contain 'carbonIntensity'.")
        else:
            st.error("No carbon intensity history data available.")
    else:
        st.error("Error fetching carbon intensity data.")

if __name__ == "__main__":
    render_time_series_CI()
    # Uncomment the line below to run the function directly
    # render_time_series()
