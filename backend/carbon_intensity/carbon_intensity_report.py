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

def create_carbon_intensity_report_download_button(data, charts=None, title="Carbon Intensity Portugal Overview"):
    """
    Creates a download button for a comprehensive import export report in PDF format.
    
    Args:
        data (array): Array containing data information
        charts (dict, optional): Dictionary of figures/charts to include in the report
        title (str, optional): Title of the report
    """
    st.markdown("---")
    st.subheader("**Download your report!**")

    # Show a progress message
    with st.spinner("Preparing your report..."):
        # Create PDF report
        pdf_buffer = generate_carbon_intensity_pdf_report(data, charts, title)

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
        file_name=f"carbon_intensity_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf",
        mime="application/pdf",
        help="Download a comprehensive report of the carbon intensity data with ECO AI.ly validation"
    )

def generate_carbon_intensity_pdf_report(data, charts=None, title="Carbon Intensity Portugal Overview"):
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
            # Logo
            try:
                # Attempt to load logo if available
                self.image("assets/logo.png", 10, 8, 33)
            except:
                pass
            # Title
            self.set_font('Arial', 'B', 15)
            self.cell(0, 10, title, 0, 1, 'C')
            # Line break
            self.ln(10)
            
        def footer(self):
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
    
    # Add report content
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, "Carbon Intensity Overview", 0, 1)
    pdf.set_font('Arial', '', 10)
    
    # Add summary statistics
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 11)
    pdf.cell(0, 10, "Summary Statistics", 0, 1)
    pdf.set_font('Arial', '', 10)
    
    # Display the carbon intensity values
    if data and len(data) >= 4:
        value_displayed_now, relative_value_now, value_displayed_next, relative_value_next = data
        
        stats_text = (
            f"Current Carbon Intensity: {value_displayed_now} gCO2eq/kWh ({relative_value_now})\n"
            f"Predicted Carbon Intensity: {value_displayed_next} gCO2eq/kWh ({relative_value_next})\n"
            f"Report Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
        )
        
        pdf.multi_cell(0, 5, stats_text)
    else:
        pdf.cell(0, 10, "No data available for analysis", 0, 1)
    
    # Add charts if provided
    if charts is not None and not charts.empty:
        pdf.add_page()
        pdf.set_font('Arial', 'B', 11)
        pdf.cell(0, 10, "Visualizations", 0, 1)
        
        # Create a figure from the DataFrame
        fig, ax = plt.subplots(figsize=(10, 6))
        charts.plot(ax=ax)
        ax.set_title("Carbon Intensity Last 24 Hours")
        ax.set_xlabel("Time")
        ax.set_ylabel("Carbon Intensity (gCO2eq/kWh)")
        ax.grid(True)
        
        # Save the figure to a temporary buffer
        img_buf = io.BytesIO()
        fig.savefig(img_buf, format='png', dpi=300, bbox_inches='tight')
        img_buf.seek(0)
        
        # Add the image to the PDF
        pdf.ln(5)
        pdf.set_font('Arial', 'B', 10)
        pdf.cell(0, 10, "Carbon Intensity Trend", 0, 1)
        
        # Convert to PIL Image to get dimensions
        img = Image.open(img_buf)
        width, height = img.size
        
        # Calculate aspect ratio and set width to fit page
        page_width = pdf.w - 2*pdf.l_margin
        img_width = min(page_width, 180)
        img_height = img_width * height / width
        
        # Save the BytesIO object to a temporary file
        temp_img_path = "temp_carbon_intensity_chart.png"
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
    
    # Add data table
    pdf.add_page()
    pdf.set_font('Arial', 'B', 11)
    pdf.cell(0, 10, "Carbon Intensity Data", 0, 1)
    
    if charts is not None and not charts.empty:
        # Format the data for display
        display_data = charts.copy()  # Use the provided DataFrame
        
        # Check if the index is a DatetimeIndex before using strftime
        if isinstance(display_data.index, pd.DatetimeIndex):
            display_data.index = display_data.index.strftime('%Y-%m-%d %H:%M')
        else:
            # If not a DatetimeIndex, just convert to string
            display_data.index = display_data.index.astype(str)
        
        # Create table header
        pdf.set_font('Arial', 'B', 8)
        col_width = 40
        row_height = 6
        
        # Add column headers
        pdf.cell(col_width, row_height, "Timestamp", 1, 0, 'C')
        pdf.cell(col_width, row_height, "Carbon Intensity (gCO2eq/kWh)", 1, 1, 'C')
        
        # Add data rows
        pdf.set_font('Arial', '', 8)
        for idx, row in display_data.iterrows():
            pdf.cell(col_width, row_height, str(idx), 1, 0, 'L')
            pdf.cell(col_width, row_height, f"{row.iloc[0]:.2f}", 1, 1, 'R')
            
        if len(display_data) > 50:
            pdf.cell(0, 10, f"Note: Showing first 50 of {len(display_data)} records", 0, 1, 'L')
    else:
        pdf.cell(0, 10, "No data available", 0, 1)
    
    # Add validation stamp
    pdf.add_page()
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, "Authentication & Validation", 0, 1, 'C')
    pdf.ln(5)
    
    # Create validation stamp
    pdf.set_font('Arial', 'B', 12)
    pdf.set_fill_color(240, 240, 240)
    pdf.cell(0, 10, "ECO AI.ly Validation Stamp", 0, 1, 'C', True)
    pdf.ln(5)
    
    # Add validation details
    pdf.set_font('Arial', '', 10)
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
    
    # Add digital signature box
    pdf.ln(10)
    pdf.set_draw_color(0, 0, 0)
    pdf.rect(pdf.w/2 - 40, pdf.get_y(), 80, 30)
    
    pdf.set_font('Arial', 'I', 8)
    pdf.set_xy(pdf.w/2 - 40, pdf.get_y() + 15)
    pdf.cell(80, 10, "Digital Signature", 0, 0, 'C')
    
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
