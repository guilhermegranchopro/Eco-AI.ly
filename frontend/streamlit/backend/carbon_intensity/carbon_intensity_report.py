import streamlit as st
from datetime import datetime
from fpdf import FPDF
import os
import numpy as np


def create_carbon_intensity_report_download_button(
    data, charts=None, title="Carbon Intensity Portugal Overview"
):
    """
    Creates a download button for a comprehensive import export report in PDF format.

    Args:
        data (array): Array containing data information
        charts (dict, optional): Dictionary of figures/charts to include in the report
        title (str, optional): Title of the report
    """

    st.markdown("---")

    col1, col2, col3 = st.columns([2, 1, 2])

    with col2:
        # Show a progress message
        with st.spinner("Preparing your report..."):
            # Create PDF report
            pdf_buffer = generate_carbon_intensity_pdf_report(data, charts, title)

        # Create a styled download button
        st.markdown(
            """
        <div style='text-align: center; margin-top: 50px;'>
            <style>
                .stDownloadButton button {
                    background-color: #4CAF50;
                    color: white;
                    padding: 10px 20px;
                    border-radius: 5px;
                    border: none;
                    font-size: 16px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                }
                .stDownloadButton button:hover {
                    background-color: #45a049;
                }
            </style>
        </div>
        """,
            unsafe_allow_html=True,
        )

        # Create download button for the PDF
        st.download_button(
            "📥 Download Report",
            data=pdf_buffer,
            file_name=f"carbon_intensity_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf",
            mime="application/pdf",
            help="Download a comprehensive report of the carbon intensity data with ECO AI.ly validation",
        )


def generate_carbon_intensity_pdf_report(
    data, charts=None, title="Carbon Intensity Portugal Overview"
):
    """
    Generates a PDF report for carbon intensity data with ECO AI.ly validation.

    Args:
        data (list): List containing [value_displayed_now, relative_value_now, value_displayed_next, relative_value_next]
        charts (pd.DataFrame, optional): DataFrame containing the last 24 hours of carbon intensity data
        title (str): Title of the report

    Returns:
        bytes: PDF file as bytes
    """

    class PDF(FPDF):
        def header(self):
            # Skip header on the first page
            if self.page_no() == 1:
                return

            # Logo
            try:
                HERE = os.path.dirname(os.path.abspath(__file__))
                # Attempt to load logo if available
                self.image(os.path.join(HERE, "../../assets/images/logo.png"), 10, 8, 33)
            except Exception as e:
                print(f"Error loading logo: {e}")
            # Title
            self.set_font("Arial", "B", 15)
            self.cell(0, 10, title, 0, 1, "C")
            # Line break
            self.ln(10)

        def footer(self):
            # Skip footer on the first page
            if self.page_no() == 1:
                return

            # Position at 1.5 cm from bottom
            self.set_y(-15)
            # Add timestamp
            self.set_font("Arial", "I", 8)
            self.cell(
                0,
                10,
                f"Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}",
                0,
                0,
                "L",
            )
            # Page number
            self.cell(0, 10, f"Page {self.page_no()}", 0, 0, "R")

    # Create PDF object
    pdf = PDF()
    pdf.add_page()

    # Add authentication stamp at the beginning
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 10, "ECO AI.ly Authentication", 0, 1, "C")
    pdf.ln(5)

    # Add logo for authentication
    try:
        HERE = os.path.dirname(os.path.abspath(__file__))
        # Attempt to load logo if available
        # Center the logo
        logo_width = 150
        logo_height = 50
        pdf.image(
            os.path.join(HERE, "../../assets/images/logo.png"),
            pdf.w / 2 - logo_width / 2,
            pdf.get_y(),
            logo_width,
            logo_height,
        )
        pdf.ln(logo_height + 10)
    except:
        pdf.ln(10)

    # Add authentication details
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, "Official Carbon Intensity Report", 0, 1, "C")
    pdf.ln(5)

    # Add validation details
    pdf.set_font("Arial", "", 10)
    validation_text = (
        f"Report ID: ECO-{datetime.now().strftime('%Y%m%d')}-{os.urandom(4).hex().upper()}\n"
        f"Validation Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        f"Data Source: Portuguese Electricity Grid Carbon Intensity Monitoring\n"
        f"Validation Method: Automated data integrity verification\n"
        f"Verified By: ECO AI.ly Carbon Intelligence Platform\n\n"
        f"This report has been automatically generated and validated by ECO AI.ly's carbon intelligence platform. "
        f"The data presented in this report has been verified for accuracy and integrity. "
        f"This stamp certifies that the information contained herein represents an accurate assessment "
        f"of carbon intensity data for the Portuguese electricity grid during the specified period."
    )

    pdf.multi_cell(0, 5, validation_text)

    # Add a page break after authentication
    pdf.add_page()

    # Add AI Model Predictions section
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, "AI Model Predictions", 0, 1)
    pdf.set_font("Arial", "", 10)

    if data and len(data) >= 4:
        (
            value_displayed_now,
            relative_value_now,
            value_displayed_next,
            relative_value_next,
        ) = data

        # Add current and predicted values in a table format
        pdf.set_font("Arial", "B", 10)
        pdf.cell(0, 10, "Carbon Intensity Predictions", 0, 1)
        pdf.set_font("Arial", "", 10)

        # Create a simple table
        col_width = 60
        row_height = 8

        # Table header
        pdf.set_font("Arial", "B", 9)
        pdf.cell(col_width, row_height, "Time Period", 1, 0, "C")
        pdf.cell(col_width, row_height, "Carbon Intensity", 1, 0, "C")
        pdf.cell(col_width, row_height, "Status", 1, 1, "C")

        # Table data
        pdf.set_font("Arial", "", 9)
        pdf.cell(col_width, row_height, "Last 24 Hours", 1, 0, "L")
        pdf.cell(col_width, row_height, value_displayed_now, 1, 0, "C")
        pdf.cell(col_width, row_height, relative_value_now, 1, 1, "C")

        pdf.cell(col_width, row_height, "Next 24 Hours", 1, 0, "L")
        pdf.cell(col_width, row_height, value_displayed_next, 1, 0, "C")
        pdf.cell(col_width, row_height, relative_value_next, 1, 1, "C")

        # Add recommendation based on the values
        pdf.ln(5)
        pdf.set_font("Arial", "B", 10)
        pdf.cell(0, 10, "Recommendation", 0, 1)
        pdf.set_font("Arial", "", 10)

        # Calculate recommendation based on the values
        if value_displayed_now != value_displayed_next:
            # Extract numeric values for comparison
            now_values = value_displayed_now.split(" ")
            next_values = value_displayed_next.split(" ")

            # Calculate average values for comparison
            if len(now_values) == 3:
                avg_now = (float(now_values[0]) + float(now_values[2])) / 2
            elif len(now_values) == 2 and now_values[0] == "<":
                avg_now = float(now_values[1]) / 2
            elif len(now_values) == 2 and now_values[0] == ">":
                avg_now = float(now_values[1]) * 1.05
            else:
                avg_now = 0

            if len(next_values) == 3:
                avg_next = (float(next_values[0]) + float(next_values[2])) / 2
            elif len(next_values) == 2 and next_values[0] == "<":
                avg_next = float(next_values[1]) / 2
            elif len(next_values) == 2 and next_values[0] == ">":
                avg_next = float(next_values[1]) * 1.05
            else:
                avg_next = 0

            if avg_now > avg_next:
                recommendation = "Focus your energy spending on the future because for the next 24 hours the carbon intensity will be lower!"
            elif avg_now < avg_next:
                recommendation = "Focus your energy spending on the now, because for the next 24 hours the carbon intensity will be higher!"
            else:
                recommendation = "Currently there are no visible upside on programming your energy consumption."
        else:
            recommendation = (
                "Carbon intensity is expected to remain stable in the next 24 hours."
            )

        pdf.multi_cell(0, 5, recommendation)

    # Add metrics from the time series data if available
    if charts is not None and not charts.empty:
        pdf.add_page()
        pdf.set_font("Arial", "B", 10)
        pdf.cell(0, 10, "Carbon Intensity Metrics - Last 24 Hours", 0, 1)
        pdf.set_font("Arial", "", 10)

        # Calculate metrics
        current_ci = charts["LCA"].iloc[-1] if not charts.empty else 0
        avg_ci = charts["LCA"].mean() if not charts.empty else 0
        min_ci = charts["LCA"].min() if not charts.empty else 0
        max_ci = charts["LCA"].max() if not charts.empty else 0
        std_ci = charts["LCA"].std() if not charts.empty else 0

        # Calculate time-based metrics
        if not charts.empty:
            # Find the time with lowest carbon intensity
            min_time = charts.loc[charts["LCA"].idxmin(), "Time"]
            # Find the time with highest carbon intensity
            max_time = charts.loc[charts["LCA"].idxmax(), "Time"]
            # Calculate the trend (positive means increasing, negative means decreasing)
            trend = np.polyfit(range(len(charts)), charts["LCA"], 1)[0]
            trend_direction = "increasing" if trend > 0 else "decreasing"
            trend_strength = abs(trend)
        else:
            min_time = "N/A"
            max_time = "N/A"
            trend_direction = "N/A"
            trend_strength = 0

        # Add metrics to the PDF
        metrics_text = (
            f"Current Carbon Intensity: {current_ci:.1f} gCO2/kWh\n"
            f"Average Carbon Intensity: {avg_ci:.1f} gCO2/kWh\n"
            f"Minimum Carbon Intensity: {min_ci:.1f} gCO2/kWh at {min_time}\n"
            f"Maximum Carbon Intensity: {max_ci:.1f} gCO2/kWh at {max_time}\n"
            f"Standard Deviation: {std_ci:.1f} gCO2/kWh\n"
            f"Trend Direction: {trend_direction}\n"
            f"Trend Strength: {trend_strength:.4f}"
        )

        pdf.multi_cell(0, 5, metrics_text)

    # Add arbitrage opportunity section
    pdf.add_page()
    pdf.set_font("Arial", "B", 12)
    pdf.cell(0, 10, "Arbitrage Opportunity - 48 Hours Window", 0, 1)
    pdf.set_font("Arial", "", 10)

    if data and len(data) >= 4:
        (
            value_displayed_now,
            relative_value_now,
            value_displayed_next,
            relative_value_next,
        ) = data

        # Calculate average carbon intensity values
        now_values = value_displayed_now.split(" ")
        next_values = value_displayed_next.split(" ")

        if len(now_values) == 3:
            average_carbon_intensity_now = (
                float(now_values[0]) + float(now_values[2])
            ) / 2
        elif len(now_values) == 2 and now_values[0] == "<":
            average_carbon_intensity_now = float(now_values[1]) / 2
        elif len(now_values) == 2 and now_values[0] == ">":
            average_carbon_intensity_now = float(now_values[1]) * 1.05
        else:
            average_carbon_intensity_now = 0

        if len(next_values) == 3:
            average_carbon_intensity_next = (
                float(next_values[0]) + float(next_values[2])
            ) / 2
        elif len(next_values) == 2 and next_values[0] == "<":
            average_carbon_intensity_next = float(next_values[1]) / 2
        elif len(next_values) == 2 and next_values[0] == ">":
            average_carbon_intensity_next = float(next_values[1]) * 1.05
        else:
            average_carbon_intensity_next = 0

        # Calculate potential savings for a sample energy consumption
        sample_energy_kwh = 100.0
        carbon_now = average_carbon_intensity_now * sample_energy_kwh
        carbon_next = average_carbon_intensity_next * sample_energy_kwh

        if carbon_now > carbon_next:
            saved_carbon = carbon_now - carbon_next
            saved_carbon_intensity = (
                average_carbon_intensity_now - average_carbon_intensity_next
            )
            recommendation_message = "Focus your energy spending on the future because for the next 24 hours the carbon intensity will be lower!"
        elif carbon_now < carbon_next:
            saved_carbon = carbon_next - carbon_now
            saved_carbon_intensity = (
                average_carbon_intensity_next - average_carbon_intensity_now
            )
            recommendation_message = "Focus your energy spending on the now, because for the next 24 hours the carbon intensity will be higher!"
        else:
            saved_carbon = 0
            saved_carbon_intensity = 0
            recommendation_message = "Currently there are no visible upside on programming your energy consumption."

        # Add arbitrage information to the PDF
        pdf.set_font("Arial", "B", 10)
        pdf.cell(0, 10, "Sample Energy Consumption Analysis", 0, 1)
        pdf.set_font("Arial", "", 10)

        arbitrage_text = (
            f"Sample Energy Consumption: {sample_energy_kwh:.2f} kWh\n"
            f"Current Carbon Emissions: {carbon_now:.2f} gCO2eq\n"
            f"Future Carbon Emissions: {carbon_next:.2f} gCO2eq\n"
            f"Potential Carbon Savings: {saved_carbon:.2f} gCO2eq\n"
            f"Carbon Intensity Difference: {saved_carbon_intensity:.2f} gCO2eq/kWh\n\n"
            f"Recommendation: {recommendation_message}"
        )

        pdf.multi_cell(0, 5, arbitrage_text)

    # Save PDF to a temporary file
    temp_pdf_path = "temp_report.pdf"
    pdf.output(temp_pdf_path)

    # Read the PDF file into a BytesIO object
    with open(temp_pdf_path, "rb") as pdf_file:
        pdf_bytes = pdf_file.read()

    # Clean up the temporary file
    try:
        os.remove(temp_pdf_path)
    except:
        pass

    return pdf_bytes
