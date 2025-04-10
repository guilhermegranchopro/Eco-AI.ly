import streamlit as st
import plotly.express as px
import pandas as pd
from datetime import datetime, timedelta, timezone
from backend.api import fetch_power_breakdown_history

# -----------------------------
# Aggregation Functions
# -----------------------------
def aggregate_production(history, time_hours, now):
    """
    Aggregates 'powerProductionBreakdown' and 'powerProductionTotal'
    from records within [now - time_hours, now].
    """
    limite = now - timedelta(hours=time_hours)
    production_breakdown_total = {}
    production_total_sum = 0
    for registro in history:
        dt_str = registro.get("datetime")
        if not dt_str:
            continue
        dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
        if dt < limite or dt > now:
            continue
        prod_breakdown = registro.get("powerProductionBreakdown", {})
        for key, val in prod_breakdown.items():
            val = val if val is not None else 0
            production_breakdown_total[key] = production_breakdown_total.get(key, 0) + val
        val_total = registro.get("powerProductionTotal", 0)
        val_total = val_total if val_total is not None else 0
        production_total_sum += val_total
    return production_breakdown_total, production_total_sum, limite

def aggregate_consumption(history, time_hours, now):
    """
    Aggregates 'powerConsumptionBreakdown' and 'powerConsumptionTotal'
    from records within [now - time_hours, now].
    """
    limite = now - timedelta(hours=time_hours)
    consumption_breakdown_total = {}
    consumption_total_sum = 0
    for registro in history:
        dt_str = registro.get("datetime")
        if not dt_str:
            continue
        dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
        if dt < limite or dt > now:
            continue
        cons_breakdown = registro.get("powerConsumptionBreakdown", {})
        for key, val in cons_breakdown.items():
            val = val if val is not None else 0
            consumption_breakdown_total[key] = consumption_breakdown_total.get(key, 0) + val
        val_total = registro.get("powerConsumptionTotal", 0)
        val_total = val_total if val_total is not None else 0
        consumption_total_sum += val_total
    return consumption_breakdown_total, consumption_total_sum, limite

def format_label(label):
    """Formats the label: if fully uppercase, keeps it; otherwise, capitalizes the first letter."""
    return label if label.isupper() else label.capitalize()

# -----------------------------
# Helper Plotting Function using Plotly Express
# -----------------------------
def plot_breakdown_chart_interactive(breakdown_total, total_sum, limite, now_dt, chart_title, time_hours):
    """
    Creates and returns an interactive Plotly pie chart for a given breakdown.
    If no valid values are present (i.e. total_sum == 0), returns a placeholder chart
    with an aesthetic message.
    """
    labels = []
    values = []
    for key, val in breakdown_total.items():
        val = max(val, 0)
        if val != 0:
            labels.append(format_label(key))
            values.append(val)
    if not values or total_sum == 0:
        # Create a placeholder interactive chart
        placeholder_df = pd.DataFrame({'Category': ['No Data'], 'Value': [1]})
        title_str = f"No energy data available for this time frame\nLast {time_hours} h"
        fig = px.pie(placeholder_df, names='Category', values='Value', title=title_str)
        fig.update_traces(textinfo='none')
        fig.update_layout(annotations=[dict(text="No energy data available", x=0.5, y=0.5,
                                              font_size=16, showarrow=False)])
        return fig
    # Create DataFrame for Plotly
    df = pd.DataFrame({'Category': labels, 'Value': values})
    timeframe_str = f"{limite.strftime('%d/%m %H:%M')} - {now_dt.strftime('%d/%m %H:%M')} (UTC)"
    title_str = f"{timeframe_str}<br>Total {chart_title.split()[1]}: {total_sum} MWh"
    fig = px.pie(df, names='Category', values='Value', title=title_str)
    fig.update_layout(title=dict(x=0.5, y=0.95, font=dict(size=16), xanchor='center', yanchor='top'))
    fig.update_traces(textposition='inside', textinfo='percent+label',
                      hovertemplate='%{label}: %{value} MWh (%{percent})')
    fig.update_layout(margin=dict(l=20, r=20, t=80, b=20))
    return fig

# -----------------------------
# Main Render Function
# -----------------------------
def render_pie_charts():
    st.subheader("Power Data Breakdown")
    
    time_range = st.selectbox(
        "Select time range for Power Breakdown:",
        ["Last 24 Hours", "Last 12 Hours", "Last 6 Hours", "Last 3 Hours", "Last 1 Hour"],
        key="select_time_range_piecharts"
    )
    
    try:
        hours_str = time_range.split()[1]  # e.g., "1" from "Last 1 Hour"
        time_hours = int(hours_str)
    except Exception:
        time_hours = 1

    # Fetch API history data
    data = fetch_power_breakdown_history(zone="PT")
    historico = data.get("history", [])
    now_dt = datetime.now(timezone.utc)
    
    # Create two columns: left for Import and Production; right for Export and Consumption
    col1, col2 = st.columns(2)
    
    with col1:
        # Plot Power Production Breakdown
        st.write("**Power Production Breakdown**")
        prod_total, prod_sum, limite_prod = aggregate_production(historico, time_hours, now_dt)
        fig_prod = plot_breakdown_chart_interactive(prod_total, prod_sum, limite_prod, now_dt, "Power Production Breakdown", time_hours)
        st.plotly_chart(fig_prod, use_container_width=True)

        # Create a dictionary with the specified variables
        production_data_dict = {
            "prod_total": prod_total,
            "prod_sum": prod_sum,
            "limite_prod": limite_prod,
            "fig_prod": fig_prod,
            "time_hours": time_hours,
            "now_dt": now_dt
        }
    
    with col2:
        # Plot Power Consumption Breakdown
        st.write("**Power Consumption Breakdown**")
        cons_total, cons_sum, limite_cons = aggregate_consumption(historico, time_hours, now_dt)
        fig_cons = plot_breakdown_chart_interactive(cons_total, cons_sum, limite_cons, now_dt, "Power Consumption Breakdown", time_hours)
        st.plotly_chart(fig_cons, use_container_width=True)

        # Create a dictionary with the specified variables
        consumption_data_dict = {
            "cons_total": cons_total,
            "cons_sum": cons_sum,
            "limite_cons": limite_cons,
            "fig_cons": fig_cons,
            "time_hours": time_hours,
            "now_dt": now_dt
        }

    return production_data_dict, consumption_data_dict

if __name__ == "__main__":
    render_pie_charts()
    st.title("Power Data Breakdown Visualization")
    st.write("This section provides a detailed breakdown of power data, including import, production, export, and consumption.")
