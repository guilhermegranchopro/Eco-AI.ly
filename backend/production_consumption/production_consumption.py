import streamlit as st
import plotly.express as px
import pandas as pd
from datetime import datetime, timedelta, timezone
from backend.api import fetch_power_breakdown_history


# -----------------------------
# Aggregation Functions
# -----------------------------
@st.cache_data(ttl=300)  # Cache for 5 minutes
def fetch_and_process_data(time_hours):
    """
    Fetches and processes the power breakdown history data with caching.
    Returns the processed data and current datetime.
    """
    data = fetch_power_breakdown_history(zone="PT")
    historico = data.get("history", [])
    now_dt = datetime.now(timezone.utc)
    return historico, now_dt


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
            production_breakdown_total[key] = (
                production_breakdown_total.get(key, 0) + val
            )
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
            consumption_breakdown_total[key] = (
                consumption_breakdown_total.get(key, 0) + val
            )
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
@st.cache_data(ttl=300)  # Cache for 5 minutes
def plot_breakdown_chart_interactive(
    breakdown_total, total_sum, limite, now_dt, chart_title, time_hours
):
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
        placeholder_df = pd.DataFrame({"Category": ["No Data"], "Value": [1]})
        title_str = f"No energy data available for this time frame\nLast {time_hours} h"
        fig = px.pie(placeholder_df, names="Category", values="Value", title=title_str)
        fig.update_traces(textinfo="none")
        fig.update_layout(
            annotations=[
                dict(
                    text="No energy data available",
                    x=0.5,
                    y=0.5,
                    font_size=16,
                    showarrow=False,
                )
            ]
        )
        return fig
    # Create DataFrame for Plotly
    df = pd.DataFrame({"Category": labels, "Value": values})
    timeframe_str = (
        f"{limite.strftime('%d/%m %H:%M')} - {now_dt.strftime('%d/%m %H:%M')} (UTC)"
    )
    title_str = f"{timeframe_str}<br>Total {chart_title.split()[1]}: {total_sum} MWh"
    fig = px.pie(df, names="Category", values="Value", title=title_str)
    fig.update_layout(
        title=dict(x=0.5, y=0.95, font=dict(size=16), xanchor="center", yanchor="top")
    )
    fig.update_traces(
        textposition="inside",
        textinfo="percent+label",
        hovertemplate="%{label}: %{value} MWh (%{percent})",
    )
    fig.update_layout(margin=dict(l=20, r=20, t=80, b=20))
    return fig


# -----------------------------
# Metrics Panel Function
# -----------------------------
@st.cache_data(ttl=300)  # Cache for 5 minutes
def render_metrics_panel(production_data_dict, consumption_data_dict):
    """
    Renders a panel with detailed metrics about power production and consumption.
    This panel appears below the pie charts and provides additional insights.
    """
    st.subheader("Power Metrics Dashboard")

    # Extract data from dictionaries
    prod_total = production_data_dict.get("prod_total", {})
    prod_sum = production_data_dict.get("prod_sum", 0)
    limite_prod = production_data_dict.get("limite_prod")
    time_hours = production_data_dict.get("time_hours", 1)
    now_dt = production_data_dict.get("now_dt")

    cons_total = consumption_data_dict.get("cons_total", {})
    cons_sum = consumption_data_dict.get("cons_sum", 0)
    limite_cons = consumption_data_dict.get("limite_cons")

    # Calculate additional metrics
    # 1. Production efficiency (if we have fossil fuels and renewables)
    fossil_fuels = sum(
        val
        for key, val in prod_total.items()
        if "coal" in key.lower() or "gas" in key.lower() or "oil" in key.lower()
    )
    renewables = sum(
        val
        for key, val in prod_total.items()
        if "hydro" in key.lower()
        or "solar" in key.lower()
        or "wind" in key.lower()
        or "biomass" in key.lower()
    )
    total_production = sum(prod_total.values())

    renewable_percentage = (
        (renewables / total_production * 100) if total_production > 0 else 0
    )

    # 2. Consumption per capita (estimated)
    # Assuming Portugal's population is approximately 10.3 million
    population = 10300000
    consumption_per_capita = (cons_sum / population) if population > 0 else 0

    # 3. Net energy balance
    net_energy_balance = prod_sum - cons_sum

    # 4. Energy self-sufficiency
    energy_sufficiency = (prod_sum / cons_sum * 100) if cons_sum > 0 else 0

    # 5. Largest production source
    largest_production_source = (
        max(prod_total.items(), key=lambda x: x[1])[0] if prod_total else "None"
    )
    largest_production_value = (
        prod_total.get(largest_production_source, 0)
        if largest_production_source != "None"
        else 0
    )

    # 6. Largest consumption source
    largest_consumption_source = (
        max(cons_total.items(), key=lambda x: x[1])[0] if cons_total else "None"
    )
    largest_consumption_value = (
        cons_total.get(largest_consumption_source, 0)
        if largest_consumption_source != "None"
        else 0
    )

    # 7. Average hourly production and consumption
    avg_hourly_production = prod_sum / time_hours if time_hours > 0 else 0
    avg_hourly_consumption = cons_sum / time_hours if time_hours > 0 else 0

    # 8. Peak production and consumption times (if we had time series data)
    # This would require additional processing of the history data

    # Display metrics in a grid layout
    st.write(
        f"**Time Period:** {limite_prod.strftime('%d/%m/%Y %H:%M')} - {now_dt.strftime('%d/%m/%Y %H:%M')} (UTC)"
    )

    # Create three columns for metrics
    col1, col2, col3 = st.columns(3)

    with col1:
        st.metric(
            "Total Production",
            f"{prod_sum:.2f} MWh",
            f"{avg_hourly_production:.2f} MWh/hour",
        )
        st.metric("Renewable Energy %", f"{renewable_percentage:.1f}%")
        st.metric(
            "Largest Production Source",
            format_label(largest_production_source),
            f"{largest_production_value:.2f} MWh",
        )

    with col2:
        st.metric(
            "Total Consumption",
            f"{cons_sum:.2f} MWh",
            f"{avg_hourly_consumption:.2f} MWh/hour",
        )
        st.metric("Consumption per Capita", f"{consumption_per_capita:.4f} MWh/person")
        st.metric(
            "Largest Consumption Source",
            format_label(largest_consumption_source),
            f"{largest_consumption_value:.2f} MWh",
        )

    with col3:
        st.metric(
            "Net Energy Balance",
            f"{net_energy_balance:.2f} MWh",
            "Surplus" if net_energy_balance > 0 else "Deficit",
        )
        st.metric("Energy Self-Sufficiency", f"{energy_sufficiency:.1f}%")

    # Additional detailed breakdown
    st.subheader("Detailed Breakdown")

    # Create two columns for detailed breakdowns
    col1, col2 = st.columns(2)

    with col1:
        st.write("**Production Sources**")
        if prod_total:
            # Create a DataFrame for the production breakdown
            prod_df = pd.DataFrame(
                {
                    "Source": [format_label(key) for key in prod_total.keys()],
                    "Value (MWh)": [val for val in prod_total.values()],
                    "Percentage": [
                        val / total_production * 100 if total_production > 0 else 0
                        for val in prod_total.values()
                    ],
                }
            )
            prod_df = prod_df.sort_values("Value (MWh)", ascending=False)
            st.dataframe(prod_df, use_container_width=True)
        else:
            st.write("No production data available")

    with col2:
        st.write("**Consumption Sources**")
        if cons_total:
            # Create a DataFrame for the consumption breakdown
            cons_df = pd.DataFrame(
                {
                    "Source": [format_label(key) for key in cons_total.keys()],
                    "Value (MWh)": [val for val in cons_total.values()],
                    "Percentage": [
                        val / cons_sum * 100 if cons_sum > 0 else 0
                        for val in cons_total.values()
                    ],
                }
            )
            cons_df = cons_df.sort_values("Value (MWh)", ascending=False)
            st.dataframe(cons_df, use_container_width=True)
        else:
            st.write("No consumption data available")

    # Add a note about data interpretation
    st.info("""
    **Note:** These metrics are calculated based on the selected time range. 
    The renewable energy percentage is an estimate based on the categorization of energy sources.
    Consumption per capita is calculated using an estimated population of 10.3 million for Portugal.
    """)


# -----------------------------
# Main Render Function
# -----------------------------
def render_pie_charts():
    st.subheader("Power Data Breakdown")

    # Move the selectbox outside of any cached function
    time_range = st.selectbox(
        "Select time range for Power Breakdown:",
        [
            "Last 24 Hours",
            "Last 12 Hours",
            "Last 6 Hours",
            "Last 3 Hours",
            "Last 1 Hour",
        ],
        key="select_time_range_piecharts",
    )

    try:
        hours_str = time_range.split()[1]  # e.g., "1" from "Last 1 Hour"
        time_hours = int(hours_str)
    except Exception:
        time_hours = 1

    # Fetch API history data with caching
    historico, now_dt = fetch_and_process_data(time_hours)

    # Create two columns: left for Import and Production; right for Export and Consumption
    col1, col2 = st.columns(2)

    with col1:
        # Plot Power Production Breakdown
        st.write("**Power Production Breakdown**")
        prod_total, prod_sum, limite_prod = aggregate_production(
            historico, time_hours, now_dt
        )
        fig_prod = plot_breakdown_chart_interactive(
            prod_total,
            prod_sum,
            limite_prod,
            now_dt,
            "Power Production Breakdown",
            time_hours,
        )
        st.plotly_chart(fig_prod, use_container_width=True)

        # Create a dictionary with the specified variables
        production_data_dict = {
            "prod_total": prod_total,
            "prod_sum": prod_sum,
            "limite_prod": limite_prod,
            "fig_prod": fig_prod,
            "time_hours": time_hours,
            "now_dt": now_dt,
        }

    with col2:
        # Plot Power Consumption Breakdown
        st.write("**Power Consumption Breakdown**")
        cons_total, cons_sum, limite_cons = aggregate_consumption(
            historico, time_hours, now_dt
        )
        fig_cons = plot_breakdown_chart_interactive(
            cons_total,
            cons_sum,
            limite_cons,
            now_dt,
            "Power Consumption Breakdown",
            time_hours,
        )
        st.plotly_chart(fig_cons, use_container_width=True)

        # Create a dictionary with the specified variables
        consumption_data_dict = {
            "cons_total": cons_total,
            "cons_sum": cons_sum,
            "limite_cons": limite_cons,
            "fig_cons": fig_cons,
            "time_hours": time_hours,
            "now_dt": now_dt,
        }

    # Render the metrics panel below the pie charts
    render_metrics_panel(production_data_dict, consumption_data_dict)

    return production_data_dict, consumption_data_dict


if __name__ == "__main__":
    render_pie_charts()
    st.title("Power Data Breakdown Visualization")
    st.write(
        "This section provides a detailed breakdown of power data, including import, production, export, and consumption."
    )
