import streamlit as st
import matplotlib.pyplot as plt
from datetime import datetime, timedelta, timezone
from backend.api import fetch_power_breakdown_history

# Aggregation functions
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
            if val is None:
                val = 0
            import_breakdown_total[key] = import_breakdown_total.get(key, 0) + val
        val_total = registro.get("powerImportTotal", 0)
        if val_total is None:
            val_total = 0
        import_total_sum += val_total
    return import_breakdown_total, import_total_sum, limite

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
            if val is None:
                val = 0
            production_breakdown_total[key] = production_breakdown_total.get(key, 0) + val
        val_total = registro.get("powerProductionTotal", 0)
        if val_total is None:
            val_total = 0
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
            if val is None:
                val = 0
            consumption_breakdown_total[key] = consumption_breakdown_total.get(key, 0) + val
        val_total = registro.get("powerConsumptionTotal", 0)
        if val_total is None:
            val_total = 0
        consumption_total_sum += val_total
    return consumption_breakdown_total, consumption_total_sum, limite

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
            if val is None:
                val = 0
            export_breakdown_total[key] = export_breakdown_total.get(key, 0) + val
        val_total = registro.get("powerExportTotal", 0)
        if val_total is None:
            val_total = 0
        export_total_sum += val_total
    return export_breakdown_total, export_total_sum, limite

def format_label(label):
    """Formats the label: if fully uppercase, keeps it; otherwise, capitalizes the first letter."""
    return label if label.isupper() else label.capitalize()

def plot_breakdown_chart(breakdown_total, total_sum, limite, now_dt, chart_title, time_hours):
    """
    Creates and returns a pie chart figure for a given breakdown.
    """
    labels = []
    values = []
    for key, val in breakdown_total.items():
        val = max(val, 0)
        if val != 0:
            labels.append(format_label(key))
            values.append(val)
    if not values:
        return None
    fig, ax = plt.subplots()
    total_value = sum(values)
    wedges, _ = ax.pie(values, startangle=90)
    items = list(zip(labels, values, wedges))
    items_sorted = sorted(items, key=lambda x: x[1], reverse=True)
    labels_sorted = [f"{lab} ({(val/total_value*100):.2f}%)" for lab, val, _ in items_sorted]
    wedges_sorted = [w for _, _, w in items_sorted]
    timeframe_str = f"{limite.strftime('%d/%m/%Y %H:%M')} - {now_dt.strftime('%d/%m/%Y %H:%M')} (UTC)"
    ax.set_title(f"{timeframe_str}\n{chart_title}\nLast {time_hours} h\nPortugal\nTotal {chart_title.split()[1]}: {total_sum}")
    ax.legend(wedges_sorted, labels_sorted, loc="upper right", bbox_to_anchor=(1.3, 1))
    return fig

def render_pie_charts():
    st.subheader("Section 1: Power Data Breakdown")
    
    # Single dropdown controlling all pie charts
    time_range = st.selectbox(
        "Select time range for Power Breakdown:",
        ["Last 24 Hours", "Last 12 Hours", "Last 6 Hours", "Last 3 Hours", "Last 1 Hour"]
    )
    st.write("Displaying Power Breakdown for:", time_range)
    
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
        # Plot Power Import Breakdown
        st.write("**Power Import Breakdown**")
        imp_total, imp_sum, limite_imp = aggregate_import(historico, time_hours, now_dt)
        fig_imp = plot_breakdown_chart(imp_total, imp_sum, limite_imp, now_dt, "Power Import Breakdown", time_hours)
        if fig_imp:
            st.pyplot(fig_imp, use_container_width=True)
        else:
            st.error("No valid import breakdown data for this time range.")
        
        # Plot Power Production Breakdown
        st.write("**Power Production Breakdown**")
        prod_total, prod_sum, limite_prod = aggregate_production(historico, time_hours, now_dt)
        fig_prod = plot_breakdown_chart(prod_total, prod_sum, limite_prod, now_dt, "Power Production Breakdown", time_hours)
        if fig_prod:
            st.pyplot(fig_prod, use_container_width=True)
        else:
            st.error("No valid production breakdown data for this time range.")
    
    with col2:
        # Plot Power Export Breakdown
        st.write("**Power Export Breakdown**")
        export_total, export_sum, limite_export = aggregate_export(historico, time_hours, now_dt)
        fig_export = plot_breakdown_chart(export_total, export_sum, limite_export, now_dt, "Power Export Breakdown", time_hours)
        if fig_export:
            st.pyplot(fig_export, use_container_width=True)
        else:
            st.error("No valid export breakdown data for this time range.")
        
        # Plot Power Consumption Breakdown
        st.write("**Power Consumption Breakdown**")
        cons_total, cons_sum, limite_cons = aggregate_consumption(historico, time_hours, now_dt)
        fig_cons = plot_breakdown_chart(cons_total, cons_sum, limite_cons, now_dt, "Power Consumption Breakdown", time_hours)
        if fig_cons:
            st.pyplot(fig_cons, use_container_width=True)
        else:
            st.error("No valid consumption breakdown data for this time range.")

