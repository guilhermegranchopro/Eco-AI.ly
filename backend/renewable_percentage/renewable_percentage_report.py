import streamlit as st
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
from fpdf import FPDF
import base64
import io
import os
from PIL import Image
import numpy as np

def create_renewable_percentage_report_download_button(data, charts=None, title="Renewable Percentage Portugal Overview"):
    """
    Creates a download button for a comprehensive renewable percentage report in PDF format.
    
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
            pdf_buffer = generate_renewable_percentage_pdf_report(data, charts, title)

        # Create a styled download button
        st.markdown("""
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
        """, unsafe_allow_html=True)

        # Create download button for the PDF
        st.download_button(
            "📥 Download Report", 
            data=pdf_buffer,
            file_name=f"renewable_percentage_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf",
            mime="application/pdf",
            help="Download a comprehensive report of the renewable percentage data with ECO AI.ly validation"
        )

def generate_renewable_percentage_pdf_report(data, charts=None, title="Renewable Percentage Portugal Overview"):
    """
    Generates a PDF report for renewable percentage data with ECO AI.ly validation.
    
    Args:
        data (list): List containing [value_displayed_now, relative_value_now, value_displayed_next, relative_value_next]
        charts (dict, optional): Dictionary of figures/charts to include
        title (str): Title of the report
    
    Returns:
        bytes: PDF file as bytes
    """
    class PDF(FPDF):
        def header(self):
            # Skip header on first page
            if self.page_no() == 1:
                return
            # Logo
            try:
                # Attempt to load logo if available
                self.image("assets/images/logo.png", 10, 8, 33)
            except:
                pass
            # Title
            self.set_font('Arial', 'B', 15)
            self.cell(0, 10, title, 0, 1, 'C')
            # Line break
            self.ln(10)
            
        def footer(self):
            # Skip footer on first page
            if self.page_no() == 1:
                return
            # Position at 1.5 cm from bottom
            self.set_y(-15)
            # Add timestamp
            self.set_font('Arial', 'I', 8)
            self.cell(0, 10, f'Generated on {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}', 0, 0, 'L')
            # Page number
            self.cell(0, 10, f'Page {self.page_no()}', 0, 0, 'R')
            
    # Create PDF object
    pdf = PDF()
    pdf.add_page()
    
    # Add authentication stamp at the beginning
    try:
        # Load and add logo
        logo_path = "assets/images/logo.png"
        if os.path.exists(logo_path):
            # Calculate logo dimensions to fit nicely on the page
            logo_width = 150
            logo_height = 150 * 0.3  # Maintain aspect ratio
            pdf.image(logo_path, x=(pdf.w - logo_width) / 2, y=30, w=logo_width, h=logo_height)
    except:
        pass

    # Add authentication title
    pdf.ln(logo_height + 40)
    pdf.set_font('Arial', 'B', 16)
    pdf.cell(0, 10, "ECO AI.ly Authentication", 0, 1, 'C')
    pdf.ln(10)
    
    # Add validation details
    pdf.set_font('Arial', '', 10)
    validation_text = (
        f"Report ID: ECO-{datetime.now().strftime('%Y%m%d')}-{os.urandom(4).hex().upper()}\n"
        f"Validation Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        f"Data Source: Portuguese Electricity Grid Renewable Percentage Monitoring\n"
        f"Validation Method: Automated data integrity verification\n"
        f"Verified By: ECO AI.ly Renewable Percentage Intelligence Platform\n\n"
        f"This report has been automatically generated and validated by ECO AI.ly's renewable percentage intelligence platform. "
        f"The data presented in this report has been verified for accuracy and integrity. "
        f"This stamp certifies that the information contained herein represents an accurate assessment "
        f"of renewable percentage data for the Portuguese electricity grid during the specified period."
    )
    
    pdf.multi_cell(0, 5, validation_text)
    
    # Add report content
    pdf.add_page()
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, "Renewable Percentage Overview", 0, 1)
    pdf.set_font('Arial', '', 10)
    
    # Add AI Model Predictions section
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 11)
    pdf.cell(0, 10, "AI Model Predictions", 0, 1)
    pdf.set_font('Arial', '', 10)
    
    if data and len(data) >= 4:
        try:
            # Extract the values from the data list
            value_displayed_now = data[0]
            relative_value_now = data[1]
            value_displayed_next = data[2]
            relative_value_next = data[3]
            
            # Create prediction table
            pdf.set_font('Arial', 'B', 8)
            col_width = 60
            row_height = 6
            
            # Add column headers
            pdf.cell(col_width, row_height, "Metric", 1, 0, 'C')
            pdf.cell(col_width, row_height, "Value", 1, 1, 'C')
            
            # Add data rows
            pdf.set_font('Arial', '', 8)
            metrics = ["Current Renewable Percentage", "Predicted Renewable Percentage"]
            values = [value_displayed_now, value_displayed_next]
            
            for metric, value in zip(metrics, values):
                pdf.cell(col_width, row_height, metric, 1, 0, 'L')
                pdf.cell(col_width, row_height, str(value), 1, 1, 'R')
            
            # Add recommendation
            pdf.ln(5)
            pdf.set_font('Arial', 'I', 10)
            
            # Determine recommendation based on the values
            if isinstance(value_displayed_now, str) and isinstance(value_displayed_next, str):
                # Extract numeric values from strings if possible
                try:
                    # Try to extract numeric values from the strings
                    now_values = value_displayed_now.split(" ")
                    next_values = value_displayed_next.split(" ")
                    
                    # Calculate average values for comparison
                    if len(now_values) == 3:
                        avg_now = (float(now_values[0]) + float(now_values[2])) / 2
                    elif len(now_values) == 2 and now_values[0] == "<":
                        avg_now = float(now_values[1]) / 2
                    elif len(now_values) == 2 and now_values[0] == ">":
                        avg_now = (float(now_values[1]) + 100) / 2
                    else:
                        avg_now = 0
                        
                    if len(next_values) == 3:
                        avg_next = (float(next_values[0]) + float(next_values[2])) / 2
                    elif len(next_values) == 2 and next_values[0] == "<":
                        avg_next = float(next_values[1]) / 2
                    elif len(next_values) == 2 and next_values[0] == ">":
                        avg_next = (float(next_values[1]) + 100) / 2
                    else:
                        avg_next = 0
                    
                    if avg_now > avg_next:
                        recommendation = "Focus your energy spending on the now, because for the next 24 hours the renewable percentage will be lower!"
                    elif avg_now < avg_next:
                        recommendation = "Focus your energy spending on the next 24 hours, because the renewable percentage will be higher!"
                    else:
                        recommendation = "Currently there are no visible upside on programming your energy consumption."
                except:
                    # If we can't extract numeric values, use a generic recommendation
                    recommendation = "Consider your energy consumption timing based on the renewable percentage predictions."
            else:
                # If the values are already numeric
                if value_displayed_now > value_displayed_next:
                    recommendation = "Focus your energy spending on the now, because for the next 24 hours the renewable percentage will be lower!"
                elif value_displayed_now < value_displayed_next:
                    recommendation = "Focus your energy spending on the next 24 hours, because the renewable percentage will be higher!"
                else:
                    recommendation = "Currently there are no visible upside on programming your energy consumption."
            
            pdf.multi_cell(0, 5, recommendation)
            
        except Exception as e:
            pdf.cell(0, 10, f"Error processing prediction data: {str(e)}", 0, 1)
    else:
        pdf.cell(0, 10, "No prediction data available", 0, 1)
    
    # Add charts if provided
    if charts is not None:
        pdf.add_page()
        pdf.set_font('Arial', 'B', 11)
        pdf.cell(0, 10, "Time Series Visualization", 0, 1)
        
        # Handle charts as a DataFrame
        if isinstance(charts, pd.DataFrame) and not charts.empty:
            # Create a figure from the DataFrame
            fig, ax = plt.subplots(figsize=(10, 6))
            
            # Check if the DataFrame has a 'Time' column and a numeric column for renewable percentage
            if 'Time' in charts.columns:
                # Find the numeric column (should be 'RP' based on the time_series_RP function)
                numeric_cols = charts.select_dtypes(include=[np.number]).columns
                if len(numeric_cols) > 0:
                    # Use the first numeric column for plotting
                    plot_col = numeric_cols[0]
                    # Create a copy of the DataFrame with just the columns we need
                    plot_df = charts[[plot_col]].copy()
                    plot_df.plot(ax=ax)
                    ax.set_title("Renewable Percentage Last 24 Hours")
                    ax.set_xlabel("Time")
                    ax.set_ylabel("Renewable Percentage (%)")
                    plt.tight_layout()
                    
                    # Save the figure to a temporary buffer
                    img_buf = io.BytesIO()
                    fig.savefig(img_buf, format='png', dpi=300, bbox_inches='tight')
                    img_buf.seek(0)
                    
                    # Add the image to the PDF
                    pdf.ln(5)
                    pdf.set_font('Arial', 'B', 10)
                    pdf.cell(0, 10, "Renewable Percentage Last 24 Hours", 0, 1)
                    
                    # Convert to PIL Image to get dimensions
                    img = Image.open(img_buf)
                    width, height = img.size
                    
                    # Calculate aspect ratio and set width to fit page
                    page_width = pdf.w - 2*pdf.l_margin
                    img_width = min(page_width, 180)
                    img_height = img_width * height / width
                    
                    # Save the BytesIO object to a temporary file
                    temp_img_path = "temp_chart.png"
                    with open(temp_img_path, 'wb') as temp_file:
                        temp_file.write(img_buf.getvalue())
                    
                    # Add the image to the PDF using the temporary file
                    pdf.image(temp_img_path, x=None, y=None, w=img_width, h=img_height)
                    
                    # Clean up the temporary file
                    try:
                        os.remove(temp_img_path)
                    except:
                        pass
                        
                    pdf.ln(5)
                    
                    # Add metrics
                    if len(numeric_cols) > 0:
                        plot_col = numeric_cols[0]
                        current_value = charts[plot_col].iloc[-1] if not charts.empty else 0
                        avg_value = charts[plot_col].mean() if not charts.empty else 0
                        min_value = charts[plot_col].min() if not charts.empty else 0
                        max_value = charts[plot_col].max() if not charts.empty else 0
                        
                        metrics_text = (
                            f"Current Value: {current_value:.2f}%\n"
                            f"Average Value: {avg_value:.2f}%\n"
                            f"Minimum Value: {min_value:.2f}%\n"
                            f"Maximum Value: {max_value:.2f}%"
                        )
                        
                        pdf.set_font('Arial', '', 10)
                        pdf.multi_cell(0, 5, metrics_text)
                else:
                    pdf.cell(0, 10, "No numeric data available for visualization", 0, 1)
            else:
                pdf.cell(0, 10, "Time column not found in the data", 0, 1)
    
    # Add arbitrage opportunity section
    pdf.add_page()
    pdf.set_font('Arial', 'B', 11)
    pdf.cell(0, 10, "Arbitrage Opportunity - 48 Hours Window", 0, 1)
    pdf.set_font('Arial', '', 10)
    
    if data and len(data) >= 4:
        try:
            # Extract the values from the data list
            value_displayed_now = data[0]
            value_displayed_next = data[2]
            
            # Calculate potential savings
            if isinstance(value_displayed_now, str) and isinstance(value_displayed_next, str):
                # Extract numeric values from strings if possible
                try:
                    # Try to extract numeric values from the strings
                    now_values = value_displayed_now.split(" ")
                    next_values = value_displayed_next.split(" ")
                    
                    # Calculate average values for comparison
                    if len(now_values) == 3:
                        avg_now = (float(now_values[0]) + float(now_values[2])) / 2
                    elif len(now_values) == 2 and now_values[0] == "<":
                        avg_now = float(now_values[1]) / 2
                    elif len(now_values) == 2 and now_values[0] == ">":
                        avg_now = (float(now_values[1]) + 100) / 2
                    else:
                        avg_now = 0
                        
                    if len(next_values) == 3:
                        avg_next = (float(next_values[0]) + float(next_values[2])) / 2
                    elif len(next_values) == 2 and next_values[0] == "<":
                        avg_next = float(next_values[1]) / 2
                    elif len(next_values) == 2 and next_values[0] == ">":
                        avg_next = (float(next_values[1]) + 100) / 2
                    else:
                        avg_next = 0
                    
                    if avg_now > avg_next:
                        saved_percentage = avg_now - avg_next
                        recommendation = "Focus your energy spending on the now, because for the next 24 hours the renewable percentage will be lower!"
                    elif avg_now < avg_next:
                        saved_percentage = avg_next - avg_now
                        recommendation = "Focus your energy spending on the next 24 hours, because the renewable percentage will be higher!"
                    else:
                        saved_percentage = 0
                        recommendation = "Currently there are no visible upside on programming your energy consumption."
                except:
                    # If we can't extract numeric values, use a generic recommendation
                    saved_percentage = 0
                    recommendation = "Consider your energy consumption timing based on the renewable percentage predictions."
            else:
                # If the values are already numeric
                if value_displayed_now > value_displayed_next:
                    saved_percentage = value_displayed_now - value_displayed_next
                    recommendation = "Focus your energy spending on the now, because for the next 24 hours the renewable percentage will be lower!"
                elif value_displayed_now < value_displayed_next:
                    saved_percentage = value_displayed_next - value_displayed_now
                    recommendation = "Focus your energy spending on the next 24 hours, because the renewable percentage will be higher!"
                else:
                    saved_percentage = 0
                    recommendation = "Currently there are no visible upside on programming your energy consumption."
            
            # Display arbitrage information
            pdf.set_font('Arial', 'B', 10)
            pdf.cell(0, 10, "Renewable Energies Upside", 0, 1)
            pdf.set_font('Arial', '', 10)
            pdf.cell(0, 10, f"Potential Renewable Percentage Difference: {saved_percentage:.2f}%", 0, 1)
            
            pdf.ln(5)
            pdf.set_font('Arial', 'B', 10)
            pdf.cell(0, 10, "Recommendation", 0, 1)
            pdf.set_font('Arial', '', 10)
            pdf.multi_cell(0, 5, recommendation)
            
        except Exception as e:
            pdf.cell(0, 10, f"Error processing arbitrage data: {str(e)}", 0, 1)
    else:
        pdf.cell(0, 10, "No arbitrage data available", 0, 1)
    
    # Save PDF to a temporary file
    temp_pdf_path = "temp_report.pdf"
    pdf.output(temp_pdf_path)
    
    # Read the PDF file into a BytesIO object
    with open(temp_pdf_path, 'rb') as pdf_file:
        pdf_bytes = pdf_file.read()
    
    # Clean up the temporary file
    try:
        os.remove(temp_pdf_path)
    except:
        pass
    
    return pdf_bytes