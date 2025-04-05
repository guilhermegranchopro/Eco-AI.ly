import streamlit as st
import pandas as pd
from datetime import datetime, timedelta, timezone
from backend.api import fetch_power_breakdown_history, fetch_carbon_intensity_history
import altair as alt

def render_time_series():
    st.markdown("---")
    st.subheader("Section 2: Time Series Data")
    
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
                # Keep only the relevant columns and rename
                df_ci = df_ci[['datetime', 'carbonIntensity']].copy()
                df_ci.rename(columns={'carbonIntensity': 'LCA'}, inplace=True)
                # Filter for the last 24 hours
                cutoff_ci = now_dt - timedelta(hours=24)
                df_ci_last24 = df_ci[df_ci['datetime'] >= cutoff_ci]
                if df_ci_last24.empty:
                    st.error("No carbon intensity data available for the last 24 hours.")
                else:
                    # Format the time to include day and month (e.g., 24/04 14:30)
                    df_ci_last24['Time'] = df_ci_last24['datetime'].dt.strftime('%d/%m %H:%M')
                    df_ci_last24 = df_ci_last24.set_index('Time')
                    # Create a custom line chart using Altair
                    chart = alt.Chart(df_ci_last24.reset_index()).mark_line().encode(
                        x=alt.X('Time', title='Time (Last 24 Hours)'),
                        y=alt.Y('LCA', title='Carbon Intensity (gCO2/kWh)'),
                        tooltip=['Time', 'LCA']
                    ).properties(
                        title='Carbon Intensity Over the Last 24 Hours',
                        width=700,
                        height=400
                    ).interactive()  # Enable zoom and pan

                    # Render the chart in Streamlit
                    st.altair_chart(chart, use_container_width=True)
            else:
                st.error("API data does not contain 'carbonIntensity'.")
        else:
            st.error("No carbon intensity history data available.")
    else:
        st.error("Error fetching carbon intensity data.")
    
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
                    # Format the time to include day and month (e.g., 24/04 14:30)
                    df_rp_last24['Time'] = df_rp_last24['datetime'].dt.strftime('%d/%m %H:%M')
                    df_rp_last24 = df_rp_last24.set_index('Time')
                    # Create a custom line chart using Altair
                    chart = alt.Chart(df_rp_last24.reset_index()).mark_line().encode(
                        x=alt.X('Time', title='Time (Last 24 Hours)'),
                        y=alt.Y('RP', title='Renewable Percentage (%)'),
                        tooltip=['Time', 'RP']
                    ).properties(
                        title='Renewable Percentage Over the Last 24 Hours',
                        width=700,
                        height=400
                    ).interactive()  # Enable zoom and pan

                    # Render the chart in Streamlit
                    st.altair_chart(chart, use_container_width=True)
            else:
                st.error("API data does not contain 'renewablePercentage'.")
        else:
            st.error("No renewable percentage history data available.")
    else:
        st.error("Error fetching renewable percentage data.")

if __name__ == "__main__":
    render_time_series()
    # Uncomment the following line to run the function directly for testing purposes
    # render_time_series()