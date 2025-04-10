import streamlit as st
import pandas as pd
import altair as alt
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
            else:
                st.error("API data does not contain 'renewablePercentage'.")
        else:
            st.error("No renewable percentage history data available.")
    else:
        st.error("Error fetching renewable percentage data.")

    return df_rp_last24

if __name__ == "__main__":
    render_time_series_RP()
    # Uncomment the line below to run the function directly
    # render_time_series()
