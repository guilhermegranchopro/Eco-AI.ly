import streamlit as st
import plotly.express as px
import pandas as pd
from datetime import datetime, timedelta, timezone
from backend.api import fetch_power_breakdown_history


# -----------------------------
# Aggregation Functions
# -----------------------------
@st.cache_data(ttl=300)  # Cache for 5 minutes
def aggregate_import(history, time_hours, now):
    """
    Aggregates 'powerImportBreakdown' and 'powerImportTotal'
    from records within [now - time_hours, now].
    """
    limite = now - timedelta(hours=time_hours)
    import_breakdown_total = {}
    import_total_sum = 0
    for registro in history:
        dt_str = registro.get("datetime")
        if not dt_str:
            continue
        dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
        if dt < limite or dt > now:
            continue
        imp_breakdown = registro.get("powerImportBreakdown", {})
        for key, val in imp_breakdown.items():
            val = val if val is not None else 0
            import_breakdown_total[key] = import_breakdown_total.get(key, 0) + val
        val_total = registro.get("powerImportTotal", 0)
        val_total = val_total if val_total is not None else 0
        import_total_sum += val_total
    return import_breakdown_total, import_total_sum, limite


@st.cache_data(ttl=300)  # Cache for 5 minutes
def aggregate_export(history, time_hours, now):
    """
    Aggregates 'powerExportBreakdown' and 'powerExportTotal'
    from records within [now - time_hours, now].
    """
    limite = now - timedelta(hours=time_hours)
    export_breakdown_total = {}
    export_total_sum = 0
    for registro in history:
        dt_str = registro.get("datetime")
        if not dt_str:
            continue
        dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
        if dt < limite or dt > now:
            continue
        exp_breakdown = registro.get("powerExportBreakdown", {})
        for key, val in exp_breakdown.items():
            val = val if val is not None else 0
            export_breakdown_total[key] = export_breakdown_total.get(key, 0) + val
        val_total = registro.get("powerExportTotal", 0)
        val_total = val_total if val_total is not None else 0
        export_total_sum += val_total
    return export_breakdown_total, export_total_sum, limite


def format_label(label):
    """Formats the label: if fully uppercase, keeps it; otherwise, capitalizes the first letter.
    Also translates "ES" to "Spain"."""
    if label == "ES":
        return "Spain"
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
def render_metrics_panel(import_data_dict, export_data_dict):
    """
    Renders a detailed metrics panel below the pie charts with various statistics
    about power import and export data.
    """
    st.subheader("Detailed Power Metrics")

    # Extract data from dictionaries
    imp_total = import_data_dict["imp_total"]
    imp_sum = import_data_dict["imp_sum"]
    limite_imp = import_data_dict["limite_imp"]
    time_hours = import_data_dict["time_hours"]
    now_dt = import_data_dict["now_dt"]

    export_total = export_data_dict["export_total"]
    export_sum = export_data_dict["export_sum"]
    limite_export = export_data_dict["limite_export"]

    # Calculate time period
    timeframe_str = (
        f"{limite_imp.strftime('%d/%m %H:%M')} - {now_dt.strftime('%d/%m %H:%M')} (UTC)"
    )

    # Create metrics container
    with st.container():
        st.markdown(f"**Time Period:** {timeframe_str} ({time_hours} hours)")

        # Create three columns for metrics
        col1, col2, col3 = st.columns(3)

        with col1:
            st.markdown("### Import Metrics")
            st.metric("Total Import", f"{imp_sum:.2f} MWh")

            # Calculate average hourly import
            avg_hourly_import = imp_sum / time_hours if time_hours > 0 else 0
            st.metric("Average Hourly Import", f"{avg_hourly_import:.2f} MWh/h")

            # Calculate percentage of each source
            if imp_sum > 0:
                st.markdown("#### Import by Source")
                for source, value in imp_total.items():
                    percentage = (value / imp_sum) * 100
                    st.metric(
                        format_label(source), f"{value:.2f} MWh", f"{percentage:.1f}%"
                    )

        with col2:
            st.markdown("### Export Metrics")
            st.metric("Total Export", f"{export_sum:.2f} MWh")

            # Calculate average hourly export
            avg_hourly_export = export_sum / time_hours if time_hours > 0 else 0
            st.metric("Average Hourly Export", f"{avg_hourly_export:.2f} MWh/h")

            # Calculate percentage of each source
            if export_sum > 0:
                st.markdown("#### Export by Source")
                for source, value in export_total.items():
                    percentage = (value / export_sum) * 100
                    st.metric(
                        format_label(source), f"{value:.2f} MWh", f"{percentage:.1f}%"
                    )

        with col3:
            st.markdown("### Balance Metrics")

            # Calculate net import/export
            net_balance = imp_sum - export_sum
            st.metric(
                "Net Import/Export",
                f"{net_balance:.2f} MWh",
                "Import" if net_balance > 0 else "Export",
            )

            # Calculate import/export ratio
            import_export_ratio = (
                imp_sum / export_sum if export_sum > 0 else float("inf")
            )
            st.metric("Import/Export Ratio", f"{import_export_ratio:.2f}")

            # Calculate total energy flow
            total_energy_flow = imp_sum + export_sum
            st.metric("Total Energy Flow", f"{total_energy_flow:.2f} MWh")

            # Calculate energy efficiency (if applicable)
            if total_energy_flow > 0:
                efficiency = min(imp_sum, export_sum) / total_energy_flow
                st.metric("Energy Efficiency", f"{efficiency:.2%}")

            # Calculate dominant source
            if imp_total:
                dominant_import = max(imp_total.items(), key=lambda x: x[1])[0]
                st.metric("Dominant Import Source", format_label(dominant_import))

            if export_total:
                dominant_export = max(export_total.items(), key=lambda x: x[1])[0]
                st.metric("Dominant Export Source", format_label(dominant_export))


# -----------------------------
# Data Fetching Function
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


# -----------------------------
# Main Render Function
# -----------------------------
def render_pie_charts2():
    st.subheader("Power Data Breakdown")

    time_range = st.selectbox(
        "Select time range for Power Breakdown:",
        [
            "Last 24 Hours",
            "Last 12 Hours",
            "Last 6 Hours",
            "Last 3 Hours",
            "Last 1 Hour",
        ],
        key="select_time_range_piecharts2",
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
        # Plot Power Import Breakdown
        st.write("**Power Import Breakdown**")
        imp_total, imp_sum, limite_imp = aggregate_import(historico, time_hours, now_dt)
        fig_imp = plot_breakdown_chart_interactive(
            imp_total, imp_sum, limite_imp, now_dt, "Power Import Breakdown", time_hours
        )
        st.plotly_chart(fig_imp, use_container_width=True)

        # Create a dictionary with the specified variables
        import_data_dict = {
            "imp_total": imp_total,
            "imp_sum": imp_sum,
            "limite_imp": limite_imp,
            "fig_imp": fig_imp,
            "time_hours": time_hours,
            "now_dt": now_dt,
        }

    with col2:
        # Plot Power Export Breakdown
        st.write("**Power Export Breakdown**")
        export_total, export_sum, limite_export = aggregate_export(
            historico, time_hours, now_dt
        )
        fig_export = plot_breakdown_chart_interactive(
            export_total,
            export_sum,
            limite_export,
            now_dt,
            "Power Export Breakdown",
            time_hours,
        )
        st.plotly_chart(fig_export, use_container_width=True)

        # Create a dictionary with the specified variables
        export_data_dict = {
            "export_total": export_total,
            "export_sum": export_sum,
            "limite_export": limite_export,
            "fig_export": fig_export,
            "time_hours": time_hours,
            "now_dt": now_dt,
        }

    # Render the metrics panel below the pie charts
    render_metrics_panel(import_data_dict, export_data_dict)

    return import_data_dict, export_data_dict


if __name__ == "__main__":
    render_pie_charts2()
    st.title("Power Data Breakdown Visualization")
    st.write(
        "This section provides a detailed breakdown of power data, including import, production, export, and consumption."
    )
