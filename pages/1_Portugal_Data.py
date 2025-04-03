import streamlit as st
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from datetime import datetime, timedelta, timezone
from math import ceil
from backend.api import fetch_power_breakdown_history, fetch_carbon_intensity_history

# -----------------------------
# Helper Functions
# -----------------------------
def set_page_config_once():
    if "page_config_done" not in st.session_state:
        st.set_page_config(page_title="Eco AI.ly", page_icon="🌿", layout="wide")
        st.session_state["page_config_done"] = True

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

# -----------------------------
# Page Code
# -----------------------------
set_page_config_once()

def main():
    st.title("Portugal Data Dashboard")
    st.header("Environmental Data and Predictions for Portugal")
    
    # ------------------------------
    # Section 1: Pie Charts
    # ------------------------------
    st.subheader("Section 1: Power Data Breakdown")
    
    # Single dropdown controlling all pie charts
    time_range = st.selectbox(
        "Select time range for Power Breakdown:",
        ["Last 1 Hour", "Last 3 Hours", "Last 6 Hours", "Last 12 Hours", "Last 24 Hours"]
    )
    st.write("Displaying Power Breakdown for:", time_range)
    
    # Extract number of hours from dropdown selection
    try:
        hours_str = time_range.split()[1]  # e.g., "1" from "Last 1 Hour"
        time_hours = int(hours_str)
    except Exception:
        time_hours = 1

    # Fetch history data once for real-data charts
    data = fetch_power_breakdown_history(zone="PT")
    historico = data.get("history", [])
    now_dt = datetime.now(timezone.utc)
    
    # Create two columns: left for Import and Production; right for Export and Consumption
    col1, col2 = st.columns(2)
    
    # ----- Column 1: Real Data for Power Import and Production Breakdown -----
    with col1:
        # --- Power Import Breakdown (Real Data) ---
        st.write("**Power Import Breakdown**")
        imp_breakdown_total, imp_total_sum, limite_imp = aggregate_import(
            historico, time_hours, now_dt
        )
        if imp_total_sum <= 0:
            st.error("No import data available for the selected time range.")
        else:
            labels_imp = []
            valores_imp = []
            for key, val in imp_breakdown_total.items():
                val = max(val, 0)
                if val != 0:
                    labels_imp.append(format_label(key))
                    valores_imp.append(val)
            if valores_imp:
                fig_import, ax_import = plt.subplots()
                soma_total_imp = sum(valores_imp)
                wedges_imp, _ = ax_import.pie(valores_imp, startangle=90)
                items_imp = list(zip(labels_imp, valores_imp, wedges_imp))
                items_sorted_imp = sorted(items_imp, key=lambda x: x[1], reverse=True)
                labels_sorted_imp = [f"{lab} ({(val/soma_total_imp*100):.2f}%)" for lab, val, _ in items_sorted_imp]
                wedges_sorted_imp = [w for _, _, w in items_sorted_imp]
                timeframe_imp_str = f"{limite_imp.strftime('%d/%m/%Y %H:%M')} - {now_dt.strftime('%d/%m/%Y %H:%M')} (UTC)"
                ax_import.set_title(
                    f"{timeframe_imp_str}\nPower Import Breakdown\nLast {time_hours} h\nPortugal\nTotal Import: {imp_total_sum}"
                )
                ax_import.legend(wedges_sorted_imp, labels_sorted_imp, loc="upper right", bbox_to_anchor=(1.3, 1))
                st.pyplot(fig_import, use_container_width=True)
            else:
                st.error("No valid import breakdown data for this time range.")
        
        # --- Power Production Breakdown (Real Data) ---
        st.write("**Power Production Breakdown**")
        prod_breakdown_total, prod_total_sum, limite_prod = aggregate_production(
            historico, time_hours, now_dt
        )
        if prod_total_sum <= 0:
            st.error("No production data available for the selected time range.")
        else:
            labels_prod = []
            valores_prod = []
            for key, val in prod_breakdown_total.items():
                val = max(val, 0)
                if val != 0:
                    labels_prod.append(format_label(key))
                    valores_prod.append(val)
            if valores_prod:
                fig_prod, ax_prod = plt.subplots()
                soma_total_prod = sum(valores_prod)
                wedges_prod, _ = ax_prod.pie(valores_prod, startangle=90)
                items_prod = list(zip(labels_prod, valores_prod, wedges_prod))
                items_sorted_prod = sorted(items_prod, key=lambda x: x[1], reverse=True)
                labels_sorted_prod = [f"{lab} ({(val/soma_total_prod*100):.2f}%)" for lab, val, _ in items_sorted_prod]
                wedges_sorted_prod = [w for _, _, w in items_sorted_prod]
                timeframe_prod_str = f"{limite_prod.strftime('%d/%m/%Y %H:%M')} - {now_dt.strftime('%d/%m/%Y %H:%M')} (UTC)"
                ax_prod.set_title(
                    f"{timeframe_prod_str}\nPower Production Breakdown\nLast {time_hours} h\nPortugal\nTotal Production: {prod_total_sum}"
                )
                ax_prod.legend(wedges_sorted_prod, labels_sorted_prod, loc="upper right", bbox_to_anchor=(1.3, 1))
                st.pyplot(fig_prod, use_container_width=True)
            else:
                st.error("No valid production breakdown data for this time range.")
    
    # ----- Column 2: Real Data for Power Export and Consumption Breakdown -----
    with col2:
        # --- Power Export Breakdown (Real Data) ---
        st.write("**Power Export Breakdown**")
        export_breakdown_total, export_total_sum, limite_export = aggregate_export(
            historico, time_hours, now_dt
        )
        if export_total_sum <= 0:
            st.error("No export data available for the selected time range.")
        else:
            labels_export = []
            valores_export = []
            for key, val in export_breakdown_total.items():
                val = max(val, 0)
                if val != 0:
                    labels_export.append(format_label(key))
                    valores_export.append(val)
            if valores_export:
                fig_export, ax_export = plt.subplots()
                soma_total_export = sum(valores_export)
                wedges_export, _ = ax_export.pie(valores_export, startangle=90)
                items_export = list(zip(labels_export, valores_export, wedges_export))
                items_sorted_export = sorted(items_export, key=lambda x: x[1], reverse=True)
                labels_sorted_export = [f"{lab} ({(val/soma_total_export*100):.2f}%)" for lab, val, _ in items_sorted_export]
                wedges_sorted_export = [w for _, _, w in items_sorted_export]
                timeframe_export_str = f"{limite_export.strftime('%d/%m/%Y %H:%M')} - {now_dt.strftime('%d/%m/%Y %H:%M')} (UTC)"
                ax_export.set_title(
                    f"{timeframe_export_str}\nPower Export Breakdown\nLast {time_hours} h\nPortugal\nTotal Export: {export_total_sum}"
                )
                ax_export.legend(wedges_sorted_export, labels_sorted_export, loc="upper right", bbox_to_anchor=(1.3, 1))
                st.pyplot(fig_export, use_container_width=True)
            else:
                st.error("No valid export breakdown data for this time range.")
        
        # --- Power Consumption Breakdown (Real Data) ---
        st.write("**Power Consumption Breakdown**")
        consumption_breakdown_total, consumption_total_sum, limite_cons = aggregate_consumption(
            historico, time_hours, now_dt
        )
        if consumption_total_sum <= 0:
            st.error("No consumption data available for the selected time range.")
        else:
            labels_cons = []
            valores_cons = []
            for key, val in consumption_breakdown_total.items():
                val = max(val, 0)
                if val != 0:
                    labels_cons.append(format_label(key))
                    valores_cons.append(val)
            if valores_cons:
                fig_cons, ax_cons = plt.subplots()
                soma_total_cons = sum(valores_cons)
                wedges_cons, _ = ax_cons.pie(valores_cons, startangle=90)
                items_cons = list(zip(labels_cons, valores_cons, wedges_cons))
                items_sorted_cons = sorted(items_cons, key=lambda x: x[1], reverse=True)
                labels_sorted_cons = [f"{lab} ({(val/soma_total_cons*100):.2f}%)" for lab, val, _ in items_sorted_cons]
                wedges_sorted_cons = [w for _, _, w in items_sorted_cons]
                timeframe_cons_str = f"{limite_cons.strftime('%d/%m/%Y %H:%M')} - {now_dt.strftime('%d/%m/%Y %H:%M')} (UTC)"
                ax_cons.set_title(
                    f"{timeframe_cons_str}\nPower Consumption Breakdown\nLast {time_hours} h\nPortugal\nTotal Consumption: {consumption_total_sum}"
                )
                ax_cons.legend(wedges_sorted_cons, labels_sorted_cons, loc="upper right", bbox_to_anchor=(1.3, 1))
                st.pyplot(fig_cons, use_container_width=True)
            else:
                st.error("No valid consumption breakdown data for this time range.")
    
    # ------------------------------
    # Section 2: Time Series Data
    # ------------------------------
    st.markdown("---")
    st.subheader("Section 2: Time Series Data")

    # Fetch history data once for real-data charts
    data = fetch_carbon_intensity_history(zone="PT")
    historico_carbon = data.get("history", [])

    st.write("**Carbon Intensity Lifecycle (Last 24 Hours)**")
    # Use the same API data to extract the 'renewablePercentage' column for the last 24 hours
    if historico_carbon:
        df = pd.DataFrame(historico_carbon)
        df['datetime'] = pd.to_datetime(df['datetime'])
        df = df.sort_values(by='datetime', ascending=True)
        # Select only the relevant columns
        if 'carbonIntensity' in df.columns:
            df = df[['datetime', 'carbonIntensity']]
            df.rename(columns={'carbonIntensity': 'LCA'}, inplace=True)
            # Filter to the last 24 hours
            cutoff = now_dt - timedelta(hours=24)
            df_last24 = df[df['datetime'] >= cutoff]
            if df_last24.empty:
                st.error("No Carbon Intensity data available for the last 24 hours.")
            else:
                # Format datetime for display
                df_last24['Time'] = df_last24['datetime'].dt.strftime('%H:%M')
                df_last24 = df_last24.set_index('Time')
                st.line_chart(df_last24['LCA'])
        else:
            st.error("API data does not contain 'carbonIntensity'.")
    else:
        st.error("No API history data available.")
    
    st.write("**Renewable Percentage (Last 24 Hours) - Real Data**")
    # Use the same API data to extract the 'renewablePercentage' column for the last 24 hours
    if historico:
        df = pd.DataFrame(historico)
        df['datetime'] = pd.to_datetime(df['datetime'])
        df = df.sort_values(by='datetime', ascending=True)
        # Select only the relevant columns
        if 'renewablePercentage' in df.columns:
            df = df[['datetime', 'renewablePercentage']]
            df.rename(columns={'renewablePercentage': 'RP'}, inplace=True)
            # Filter to the last 24 hours
            cutoff = now_dt - timedelta(hours=24)
            df_last24 = df[df['datetime'] >= cutoff]
            if df_last24.empty:
                st.error("No renewable percentage data available for the last 24 hours.")
            else:
                # Format datetime for display
                df_last24['Time'] = df_last24['datetime'].dt.strftime('%H:%M')
                df_last24 = df_last24.set_index('Time')
                st.line_chart(df_last24['RP'])
        else:
            st.error("API data does not contain 'renewablePercentage'.")
    else:
        st.error("No API history data available.")
    
    # ------------------------------
    # Section 3: AI Predictions
    # ------------------------------
    st.markdown("---")
    st.subheader("Section 3: AI Model Predictions")
    prediction_carbon = np.random.randint(0, 6)
    prediction_renewable = np.random.randint(0, 6)
    col_pred1, col_pred2 = st.columns(2)
    with col_pred1:
        st.metric("Carbon Intensity Prediction (Next 24 Hours)", prediction_carbon)
    with col_pred2:
        st.metric("Renewable Percentage Prediction (Next 24 Hours)", prediction_renewable)

if __name__ == "__main__":
    main()
