import streamlit as st

def render_carbon_intensity_info():
    """
    Renders information about carbon intensity, the purpose of the page,
    and details about Eco AI.ly's carbon intensity tracking features.
    """
    st.markdown("""
    # Carbon Intensity Overview
    
    ## What is Carbon Intensity?
    
    Carbon intensity measures the amount of carbon dioxide (CO₂) emitted per unit of electricity generated, typically expressed in grams of CO₂ per kilowatt-hour (gCO₂/kWh). It's a critical metric for understanding the environmental impact of electricity production and consumption.
    
    Lower carbon intensity values indicate cleaner electricity generation with fewer greenhouse gas emissions, while higher values suggest a greater reliance on fossil fuels and a larger carbon footprint.
    
    ## Why Carbon Intensity Matters
    
    Carbon intensity is a key indicator for:
    
    - **Climate Impact Assessment**: Directly measures the climate impact of electricity generation
    - **Energy Transition Monitoring**: Tracks progress toward decarbonization goals
    - **Policy Effectiveness**: Helps evaluate the success of environmental policies
    - **Consumer Decision-Making**: Enables informed choices about energy consumption timing
    
    ## Features of Our Carbon Intensity Dashboard
    
    ### Real-Time Data Visualization
    Our dashboard provides comprehensive time series data showing Portugal's carbon intensity trends over time. This allows you to:
    
    - Track daily, weekly, and monthly patterns
    - Identify peak emission periods
    - Understand seasonal variations
    - Compare current values with historical data
    
    ### AI-Powered Predictions
    Leveraging advanced machine learning models, we offer:
    
    - Short-term forecasts of carbon intensity
    - Trend analysis and pattern recognition
    - Anomaly detection for unexpected emission spikes
    - Confidence intervals to understand prediction reliability
    
    ### Model Performance Statistics
    For transparency and trust, we provide detailed statistics on our prediction models:
    
    - Accuracy metrics (RMSE, MAE, R²)
    - Model training methodology
    - Historical prediction performance
    - Comparison with baseline forecasting methods
    
    ## How to Use This Information
    
    The carbon intensity data and predictions can be valuable for:
    
    - **Businesses**: Schedule energy-intensive operations during low carbon intensity periods
    - **Policymakers**: Evaluate the effectiveness of renewable energy initiatives
    - **Researchers**: Analyze correlations between carbon intensity and other environmental factors
    - **Individuals**: Make informed decisions about when to use electricity for minimal environmental impact
    
    ## About Eco AI.ly
    
    Eco AI.ly is a pioneering environmental technology startup dedicated to making environmental data accessible and actionable. Our mission is to empower businesses, governments, and individuals with real-time environmental insights to drive sustainable decision-making and positive environmental impact.
    
    We combine cutting-edge artificial intelligence with comprehensive environmental data to provide accurate, timely, and actionable insights. Our platform is designed to be intuitive and informative, making complex environmental data understandable and useful for everyone.
    
    Currently focused on Portugal, we're rapidly expanding to provide similar insights for countries around the world, helping to drive global environmental awareness and action.
    """)

def main():
    render_carbon_intensity_info()

if __name__ == "__main__":
    main()
