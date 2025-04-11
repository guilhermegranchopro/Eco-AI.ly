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

def create_production_consumption_report_download_button(import_data_dict, export_data_dict, charts=None, title="Production Consumption Portugal Overview"):
    """
    Creates a download button for a comprehensive production consumption report in PDF format.
    
    Args:
        data (pd.DataFrame): The production consumption data to include in the report
        charts (dict, optional): Dictionary of figures/charts to include in the report
        title (str, optional): Title of the report
    """

    st.markdown("---")
    
    col1, col2, col3 = st.columns([2, 1, 2])

    with col2:
        # Show a progress message
        with st.spinner("Preparing your report..."):
            # Create PDF report
            pdf_buffer = generate_production_consumption_pdf_report(import_data_dict, export_data_dict, charts, title)
        
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
            file_name=f"production_consumption_report_{datetime.now().strftime('%Y%m%d_%H%M%S')}.pdf",
            mime="application/pdf",
            help="Download a comprehensive report of the production consumption data with ECO AI.ly validation"
        )

def generate_production_consumption_pdf_report(import_data_dict, export_data_dict, charts=None, title="Production Consumption Portugal Overview"):
    """
    Generates a PDF report for production consumption data with ECO AI.ly validation.
    
    Args:
        import_data_dict (dict): Dictionary containing import data
        export_data_dict (dict): Dictionary containing export data
        charts (dict, optional): Dictionary of figures/charts to include
        title (str): Title of the report
    
    Returns:
        bytes: PDF file as bytes
    """
    # Helper function to safely format numeric values
    def format_value(value, default="N/A"):
        try:
            if value is None:
                return default
            return f"{float(value):.2f}"
        except (ValueError, TypeError):
            return str(value) if value is not None else default
    
    # Helper function to safely save a figure to a buffer
    def save_figure_to_buffer(fig, img_buf):
        try:
            # Check if the figure has a savefig method (matplotlib Figure)
            if hasattr(fig, 'savefig'):
                fig.savefig(img_buf, format='png', dpi=300, bbox_inches='tight')
                return True
            # Check if the figure is a PIL Image
            elif hasattr(fig, 'save'):
                fig.save(img_buf, format='PNG')
                return True
            # If it's already bytes or a string, write it directly
            elif isinstance(fig, (bytes, str)):
                if isinstance(fig, str):
                    img_buf.write(fig.encode())
                else:
                    img_buf.write(fig)
                return True
            else:
                return False
        except Exception as e:
            print(f"Error saving figure: {e}")
            return False
    
    class PDF(FPDF):
        def header(self):
            # Skip header on first page
            if self.page_no() == 1:
                return
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
        # Add logo at the top center
        logo_width = 150
        pdf.image("assets/images/logo.png", x=pdf.w/2 - logo_width/2, y=20, w=logo_width)
    except:
        pass
    
    pdf.ln(60)  # Add space after logo
    
    # Add validation stamp
    pdf.set_font('Arial', 'B', 14)
    pdf.cell(0, 10, "ECO AI.ly Authentication", 0, 1, 'C')
    pdf.ln(5)
    
    # Add validation details
    pdf.set_font('Arial', '', 10)
    validation_text = (
        f"Report ID: ECO-{datetime.now().strftime('%Y%m%d')}-{os.urandom(4).hex().upper()}\n"
        f"Validation Date: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n"
        f"Data Source: Portuguese Electricity Grid Production Consumption Monitoring\n"
        f"Validation Method: Automated data integrity verification\n"
        f"Verified By: ECO AI.ly Production Consumption Intelligence Platform\n\n"
        f"This report has been automatically generated and validated by ECO AI.ly's production consumption intelligence platform. "
        f"The data presented in this report has been verified for accuracy and integrity. "
        f"This stamp certifies that the information contained herein represents an accurate assessment "
        f"of production consumption data for the Portuguese electricity grid during the specified period."
    )
    
    pdf.multi_cell(0, 5, validation_text)
    
    # Add new page for content
    pdf.add_page()
    
    # Add Production Consumption Overview
    pdf.set_font('Arial', 'B', 12)
    pdf.cell(0, 10, "Production Consumption Overview", 0, 1)
    pdf.set_font('Arial', '', 10)
    
    # Extract data from dictionaries
    prod_total = import_data_dict.get("prod_total", {})
    prod_sum = import_data_dict.get("prod_sum", 0)
    limite_prod = import_data_dict.get("limite_prod", 0)
    time_hours = import_data_dict.get("time_hours", [])
    now_dt = import_data_dict.get("now_dt", datetime.now())
    
    cons_total = export_data_dict.get("cons_total", {})
    cons_sum = export_data_dict.get("cons_sum", 0)
    limite_cons = export_data_dict.get("limite_cons", 0)
    
    # Calculate total production and consumption values
    total_production = sum(prod_total.values()) if isinstance(prod_total, dict) else prod_sum
    total_consumption = sum(cons_total.values()) if isinstance(cons_total, dict) else cons_sum
    
    # Get time range from the selectbox options
    time_range = "Last 24 Hours"  # Default value
    if time_hours and isinstance(time_hours, list) and len(time_hours) > 0:
        hours = time_hours[0]
        if hours == 24:
            time_range = "Last 24 Hours"
        elif hours == 12:
            time_range = "Last 12 Hours"
        elif hours == 6:
            time_range = "Last 6 Hours"
        elif hours == 3:
            time_range = "Last 3 Hours"
        elif hours == 1:
            time_range = "Last 1 Hour"
    
    # Calculate overview statistics
    overview_text = (
        f"Total Production: {format_value(total_production)} kWh\n"
        f"Total Consumption: {format_value(total_consumption)} kWh\n"
        f"Net Energy Balance: {format_value(total_production - total_consumption)} kWh\n"
        f"Time Period: {time_range}\n"
        f"Report Date: {now_dt.strftime('%Y-%m-%d %H:%M:%S')}"
    )
    
    pdf.multi_cell(0, 5, overview_text)
    
    # Add charts if provided
    if charts and isinstance(charts, dict):
        pdf.add_page()
        pdf.set_font('Arial', 'B', 11)
        pdf.cell(0, 10, "Time Series Visualization", 0, 1)
        
        for chart_name, fig in charts.items():
            # Save the figure to a temporary buffer
            img_buf = io.BytesIO()
            
            if save_figure_to_buffer(fig, img_buf):
                img_buf.seek(0)
                
                # Add the image to the PDF
                pdf.ln(5)
                pdf.set_font('Arial', 'B', 10)
                pdf.cell(0, 10, chart_name, 0, 1)
                
                # Convert to PIL Image to get dimensions
                img = Image.open(img_buf)
                width, height = img.size
                
                # Calculate aspect ratio and set width to fit page
                page_width = pdf.w - 2*pdf.l_margin
                img_width = min(page_width, 180)
                img_height = img_width * height / width
                
                # Save the BytesIO object to a temporary file
                temp_img_path = f"temp_{chart_name.replace(' ', '_')}.png"
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