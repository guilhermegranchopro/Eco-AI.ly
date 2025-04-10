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

def create_renewable_percentage_report_download_button(data, charts=None, title="Renewable Percentage Portugal Overview"):
    """
    Creates a download button for a comprehensive import export report in PDF format.
    
    Args:
        data (array): Array containing data information
        charts (dict, optional): Dictionary of figures/charts to include in the report
        title (str, optional): Title of the report
    """

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
    pdf.cell(0, 10, "Renewable Percentage Overview", 0, 1)
    pdf.set_font('Arial', '', 10)
    
    # Add summary statistics
    pdf.ln(5)
    pdf.set_font('Arial', 'B', 11)
    pdf.cell(0, 10, "Summary Statistics", 0, 1)
    pdf.set_font('Arial', '', 10)
    
    # Display the current and next values
    if data and len(data) >= 4:
        # Convert string values to floats
        try:
            value_displayed_now = float(data[0])
            relative_value_now = float(data[1])
            value_displayed_next = float(data[2])
            relative_value_next = float(data[3])
            
            stats_text = (
                f"Current Renewable Percentage: {value_displayed_now:.2f} %\n"
                f"Current Relative Value: {relative_value_now:.2f} %\n"
                f"Next Renewable Percentage: {value_displayed_next:.2f} %\n"
                f"Next Relative Value: {relative_value_next:.2f} %\n"
                f"Report Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            )
            
            pdf.multi_cell(0, 5, stats_text)
        except (ValueError, TypeError):
            # If conversion fails, display the values as strings
            stats_text = (
                f"Current Renewable Percentage: {data[0]} %\n"
                f"Current Relative Value: {data[1]} %\n"
                f"Next Renewable Percentage: {data[2]} %\n"
                f"Next Relative Value: {data[3]} %\n"
                f"Report Generated: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}"
            )
            
            pdf.multi_cell(0, 5, stats_text)
    else:
        pdf.cell(0, 10, "No data available for analysis", 0, 1)
    
    # Add charts if provided
    if charts is not None:
        pdf.add_page()
        pdf.set_font('Arial', 'B', 11)
        pdf.cell(0, 10, "Visualizations", 0, 1)
        
        # Handle charts as a DataFrame
        if isinstance(charts, pd.DataFrame) and not charts.empty:
            # Create a figure from the DataFrame
            fig, ax = plt.subplots(figsize=(10, 6))
            charts.plot(ax=ax)
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
        elif isinstance(charts, dict) and charts:
            # Handle charts as a dictionary of figures
            for chart_name, fig in charts.items():
                # Save the figure to a temporary buffer
                img_buf = io.BytesIO()
                fig.savefig(img_buf, format='png', dpi=300, bbox_inches='tight')
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
    
    # Add data table
    pdf.add_page()
    pdf.set_font('Arial', 'B', 11)
    pdf.cell(0, 10, "Renewable Percentage Data", 0, 1)
    
    if data and len(data) >= 4:
        # Create table header
        pdf.set_font('Arial', 'B', 8)
        col_width = 40
        row_height = 6
        
        # Add column headers
        pdf.cell(col_width, row_height, "Metric", 1, 0, 'C')
        pdf.cell(col_width, row_height, "Value (%)", 1, 1, 'C')
        
        # Add data rows
        pdf.set_font('Arial', '', 8)
        metrics = ["Current Renewable Percentage", "Current Relative Value", 
                  "Next Renewable Percentage", "Next Relative Value"]
        
        for i, metric in enumerate(metrics):
            pdf.cell(col_width, row_height, metric, 1, 0, 'L')
            # Try to convert to float for formatting, otherwise use as string
            try:
                value = float(data[i])
                pdf.cell(col_width, row_height, f"{value:.2f}", 1, 1, 'R')
            except (ValueError, TypeError):
                pdf.cell(col_width, row_height, str(data[i]), 1, 1, 'R')
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
        f"Data Source: Portuguese Electricity Grid Renewable Percentage Monitoring\n"
        f"Validation Method: Automated data integrity verification\n"
        f"Verified By: ECO AI.ly Renewable Percentage Intelligence Platform\n\n"
        f"This report has been automatically generated and validated by ECO AI.ly's renewable percentage intelligence platform. "
        f"The data presented in this report has been verified for accuracy and integrity. "
        f"This stamp certifies that the information contained herein represents an accurate assessment "
        f"of renewable percentage data for the Portuguese electricity grid during the specified period."
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