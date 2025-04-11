import streamlit as st
import pandas as pd
import numpy as np
from datetime import datetime, timedelta, timezone

def average_carbon_intensity(value_displayed_now, value_displayed_next):
    """
    Separates the input strings by spaces and returns the separated values.
    
    Args:
        value_displayed_now (str): The first string to separate
        value_displayed_next (str): The second string to separate
        
    Returns:
        tuple: A tuple containing two lists, each with the separated values
    """
    # Split the strings by spaces
    now_values = value_displayed_now.split(" ") 
    next_values = value_displayed_next.split(" ")

    if len(now_values)==3:
        average_carbon_intensity_now = (float(now_values[0]) + float(now_values[2])) / 2
    elif len(now_values)==2 and now_values[0] == "<":
        average_carbon_intensity_now = float(now_values[1]) / 2
    elif len(now_values)==2 and now_values[0] == ">":
        average_carbon_intensity_now = float(now_values[1]) * 1.05 
    else:
        st.error("Invalid input for now_values")

    if len(next_values)==3:
        average_carbon_intensity_next = (float(next_values[0]) + float(next_values[2])) / 2
    elif len(next_values)==2 and next_values[0] == "<":
        average_carbon_intensity_next = float(next_values[1]) / 2
    elif len(next_values)==2 and next_values[0] == ">":
        average_carbon_intensity_next = float(next_values[1]) * 1.05
    else:
        st.error("Invalid input for now_values")

    return average_carbon_intensity_now, average_carbon_intensity_next

def render_arbitrage_opportunity_CI(value_displayed_now, value_displayed_next):
    """
    Renders the arbitrage opportunity section where users can input energy consumption
    and see potential savings based on carbon intensity variations.
    """
    st.markdown("---")
    st.subheader("Arbitrage Opportunity")
    
    # Energy consumption input
    energy_kwh = st.number_input(
        "Energy Consumption (kWh)", 
        min_value=0.0,
        max_value=10000.0,
        value=100.0,
        step=10.0,
        help="Enter the amount of energy you plan to consume in kilowatt-hours"
    )

    average_carbon_intensity_now, average_carbon_intensity_next = average_carbon_intensity(value_displayed_now, value_displayed_next)

    carbon_now = average_carbon_intensity_now * energy_kwh
    carbon_next = average_carbon_intensity_next * energy_kwh

    if carbon_now > carbon_next:
        saved_carbon = carbon_now - carbon_next
        saved_carbon_intensity = average_carbon_intensity_now - average_carbon_intensity_next
        recommendation_message = "**Focus your energy spending on the future because for the next 24 hours the carbon intensity will be lower!**"
    elif carbon_now < carbon_next:
        saved_carbon = carbon_next - carbon_now
        saved_carbon_intensity = average_carbon_intensity_next - average_carbon_intensity_now
        recommendation_message = "**Focus your energy spending on the now, because for the next 24 hours the carbon intensity will be higher!**"
    else:
        saved_carbon = 0
        saved_carbon_intensity = 0
        recommendation_message = "**Currently there are no visible upsite on programing your energy consumption.**"

    # Calculate potential savings
    st.markdown("### Potential Savings")
        
    # Display results
    col3, col4 = st.columns(2)
    
    with col3:
        st.metric(
            "Carbon Intensity Lifecycle", 
            f"{saved_carbon_intensity} gCO₂eq/kWh",
        )
    
    with col4:
        st.metric(
            "Carbon Emissions", 
            f"{saved_carbon} gCO₂eq",
        )
            
    # Recommendation
    st.markdown("### Recommendation")
    if saved_carbon > 0:
        st.success(recommendation_message)
    else:
        st.warning(recommendation_message)

def get_bg_color_CI(value):
    """
    Returns a hex color string interpolated between green (#00FF00) and red (#FF0000).
    0 -> green, 5 -> red.
    """
    # Clamp value between 0 and 5
    value = max(0, min(5, value))
    fraction = value / 5.0
    red = int(255 * fraction)
    green = int(255 * (1 - fraction))
    blue = 0
    return f"#{red:02X}{green:02X}{blue:02X}"

def colored_metric(label, value, bg_color):
    """
    Renders a custom metric with a colored background using st.components.v1.html.
    Adds a fixed transparency level to the background color.
    """
    # Set transparency level (alpha) to 0.6 (60% opacity)
    transparency = 0.6
    
    # Convert hex color to RGBA with transparency
    r = int(bg_color[1:3], 16)
    g = int(bg_color[3:5], 16)
    b = int(bg_color[5:7], 16)
    rgba_color = f"rgba({r}, {g}, {b}, {transparency})"
    
    # Create HTML for the colored metric
    html = f"""
    <div style="
        background-color: {rgba_color};
        border-radius: 10px;
        padding: 10px;
        text-align: center;
        margin-bottom: 10px;
    ">
        <div style="font-size: 14px; color: #666;">{label}</div>
        <div style="font-size: 24px; font-weight: bold;">{value}</div>
    </div>
    """
    
    # Render the HTML
    st.components.v1.html(html, height=80)
