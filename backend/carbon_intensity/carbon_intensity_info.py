import streamlit as st

def render_carbon_intensity_info():
    """
    Renders comprehensive information about carbon intensity, the purpose of the page,
    and detailed information about Eco AI.ly's carbon intensity tracking features.
    """
    st.markdown("""
    # 🌡️ Carbon Intensity: Understanding and Optimizing Your Energy Impact
    
    ## What is Carbon Intensity? 📊
    
    Carbon intensity is a critical environmental metric that measures the amount of carbon dioxide (CO₂) emitted per unit of electricity generated, typically expressed in grams of CO₂ per kilowatt-hour (gCO₂/kWh). This metric provides a direct measure of how "clean" or "dirty" your electricity is at any given moment.
    
    ### The Science Behind Carbon Intensity 🔬
    
    When electricity is generated, different energy sources produce varying amounts of CO₂:
    
    - **Renewable sources** (solar, wind, hydro) ☀️💨💧: Produce minimal to zero CO₂ emissions
    - **Nuclear power** ⚛️: Produces very low CO₂ emissions during operation
    - **Natural gas** 🔥: Produces moderate CO₂ emissions (approximately 400-500 gCO₂/kWh)
    - **Coal** ⛏️: Produces high CO₂ emissions (approximately 800-1000 gCO₂/kWh)
    
    The carbon intensity of your electricity grid represents the weighted average of all these sources based on their current contribution to the energy mix. This mix constantly changes throughout the day and year based on:
    
    - Weather conditions (sunny vs. cloudy, windy vs. calm) 🌤️
    - Time of day (solar production peaks during daylight hours) ⏰
    - Seasonal variations (more hydro in rainy seasons, more solar in summer) 🌧️☀️
    - Grid demand patterns 📈
    - Availability of different power plants 🏭
    
    ### Carbon Intensity Classification 📊
    
    Eco AI.ly classifies carbon intensity into six categories to help you quickly understand the environmental impact:
    
    1. **The Best!** (< 118 gCO₂/kWh) 🌟: Extremely clean electricity, primarily from renewables
    2. **Good!** (118-202 gCO₂/kWh) 💚: Clean electricity with minimal environmental impact
    3. **Ok!** (202-286 gCO₂/kWh) 🟢: Moderate carbon intensity, acceptable for most uses
    4. **Bad!** (286-369 gCO₂/kWh) 🟡: High carbon intensity, consider reducing consumption
    5. **Very Bad!** (369-452 gCO₂/kWh) 🟠: Very high carbon intensity, significant environmental impact
    6. **The Worst!** (> 452 gCO₂/kWh) 🔴: Extremely high carbon intensity, maximum environmental impact
    
    ## Why Carbon Intensity Matters 🌍
    
    Understanding carbon intensity is crucial for several reasons:
    
    ### Environmental Impact 🌱
    
    - **Climate Change Mitigation** 🌡️: CO₂ is the primary greenhouse gas contributing to global warming
    - **Biodiversity Protection** 🦋: Reducing emissions helps protect ecosystems affected by climate change
    - **Air Quality** 💨: Lower carbon intensity often correlates with better air quality and reduced health impacts
    
    ### Economic Benefits 💰
    
    - **Cost Optimization** 📊: Energy prices often correlate with carbon intensity (higher during peak demand)
    - **Carbon Pricing** 💵: Many regions are implementing carbon pricing mechanisms that make high-carbon electricity more expensive
    - **Corporate Sustainability** 🌿: Companies can reduce their carbon footprint by optimizing when they consume electricity
    
    ### Policy and Planning 📋
    
    - **Energy Transition Monitoring** 📈: Tracks progress toward decarbonization goals
    - **Policy Effectiveness** ✅: Helps evaluate the success of environmental policies and renewable energy initiatives
    - **Infrastructure Planning** 🏗️: Informs decisions about energy infrastructure investments
    
    ### Personal and Business Decision-Making 🎯
    
    - **Consumption Timing** ⏰: Enables informed choices about when to use electricity for minimal environmental impact
    - **Energy Efficiency** 💡: Helps prioritize energy-saving measures during high carbon intensity periods
    - **Renewable Energy Investment** 💰: Guides decisions about installing solar panels or other renewable systems
    
    ## Eco AI.ly's Carbon Intensity Tools and Features 🛠️
    
    ### 1. Real-Time Carbon Intensity Monitoring 📊
    
    Our platform provides comprehensive time series data showing Portugal's carbon intensity trends in real-time:
    
    - **Interactive Visualization** 📈: Zoom, pan, and explore carbon intensity patterns over the last 24 hours
    - **Detailed Metrics** 📊: Current, average, minimum, maximum, and standard deviation values
    - **Trend Analysis** 📉: Direction and strength of carbon intensity trends
    - **Time-Based Insights** ⏰: Identification of optimal times with lowest carbon intensity
    
    This real-time monitoring allows you to:
    
    - Track daily, weekly, and monthly patterns
    - Identify peak emission periods
    - Understand seasonal variations
    - Compare current values with historical data
    
    ### 2. AI-Powered Carbon Intensity Predictions 🤖
    
    Leveraging advanced machine learning models, we offer sophisticated prediction capabilities:
    
    - **24-Hour Forecasts** 🔮: Accurate predictions of carbon intensity for the next 24 hours
    - **Classification System** 📊: Clear categorization of predicted carbon intensity (from "The Best!" to "The Worst!")
    - **Visual Indicators** 🎨: Color-coded displays (green to red) for intuitive understanding
    - **Consumption Recommendations** 💡: Clear guidance on when to consume energy based on predictions
    
    Our prediction system:
    
    - Uses state-of-the-art LSTM (Long Short-Term Memory) neural networks
    - Incorporates multiple data sources including weather forecasts
    - Updates predictions continuously as new data becomes available
    - Provides confidence metrics to understand prediction reliability
    
    ### 3. Carbon Intensity Arbitrage Opportunities 💹
    
    Our arbitrage tool helps you optimize your energy consumption timing:
    
    - **Energy Consumption Calculator** 🧮: Input your planned energy consumption to see potential carbon savings
    - **Comparative Analysis** ⚖️: Compare carbon emissions between current and future time periods
    - **Savings Quantification** 📊: Calculate exact amounts of CO₂ that could be saved by shifting consumption
    - **Actionable Recommendations** ✅: Clear guidance on whether to consume energy now or later
    
    This feature is particularly valuable for:
    
    - Businesses with flexible energy consumption patterns
    - Electric vehicle charging optimization
    - Home appliance scheduling
    - Industrial processes that can be time-shifted
    
    ### 4. Comprehensive Carbon Intensity Reports 📑
    
    Generate detailed PDF reports for documentation and sharing:
    
    - **Professional Formatting** 📄: Clean, professional layout suitable for business presentations
    - **Data Visualization** 📊: Includes charts and graphs of carbon intensity trends
    - **Detailed Metrics** 📈: Comprehensive statistics and analysis
    - **Recommendations** 💡: Actionable insights based on the data
    - **Exportable Format** 📤: Easy to share with stakeholders, clients, or team members
    
    These reports are valuable for:
    
    - Corporate sustainability reporting
    - Environmental compliance documentation
    - Stakeholder communications
    - Internal decision-making processes
    
    ### 5. Model Performance Statistics 📊
    
    For transparency and trust, we provide detailed statistics on our prediction models:
    
    - **Accuracy Metrics** 📈: RMSE (Root Mean Square Error), MAE (Mean Absolute Error), R² (Coefficient of Determination)
    - **Training Methodology** 🎓: Insights into how our models are trained and validated
    - **Performance Visualizations** 📊: Loss plots, accuracy plots, and confusion matrices
    - **Comparative Analysis** ⚖️: How our models perform against baseline forecasting methods
    
    This transparency helps you:
    
    - Understand the reliability of our predictions
    - Make informed decisions based on model confidence
    - Trust the recommendations provided by our platform
    
    ## How to Use Carbon Intensity Data Effectively 🎯
    
    ### For Businesses 🏢
    
    - **Load Shifting** ⚡: Schedule energy-intensive operations during low carbon intensity periods
    - **Demand Response** 🔄: Participate in demand response programs that align with carbon intensity patterns
    - **Sustainability Reporting** 📊: Track and report on carbon emissions from electricity consumption
    - **Energy Procurement** 💰: Optimize energy purchasing strategies based on carbon intensity forecasts
    - **Facility Management** 🏢: Adjust building systems (HVAC, lighting) based on carbon intensity
    
    ### For Policymakers 👔
    
    - **Policy Evaluation** 📋: Assess the effectiveness of renewable energy incentives and carbon pricing
    - **Grid Planning** 🔌: Inform decisions about grid infrastructure and energy storage needs
    - **Emissions Tracking** 📊: Monitor progress toward decarbonization targets
    - **Public Communication** 📢: Provide transparent information about the environmental impact of electricity
    
    ### For Researchers 🔬
    
    - **Data Analysis** 📊: Study correlations between carbon intensity and other environmental factors
    - **Model Development** 🤖: Use our data to develop and validate new forecasting models
    - **Impact Studies** 📈: Assess the environmental impact of different energy policies
    - **Trend Analysis** 📉: Identify long-term patterns in carbon intensity and their causes
    
    ### For Individuals 👤
    
    - **Appliance Scheduling** ⏰: Run dishwashers, washing machines, and other appliances during low carbon periods
    - **EV Charging** 🔌: Optimize electric vehicle charging times for minimal environmental impact
    - **Home Energy Management** 🏠: Adjust thermostat settings and other home systems based on carbon intensity
    - **Environmental Awareness** 🌍: Develop a deeper understanding of your personal carbon footprint
    
    ## The Future of Carbon Intensity Tracking 🚀
    
    Eco AI.ly is continuously evolving to provide even more powerful carbon intensity insights:
    
    - **Geographic Expansion** 🌍: Adding more countries and regions to our coverage
    - **Enhanced Predictions** 🔮: Improving forecast accuracy with more advanced AI models
    - **Integration Capabilities** 🔌: Developing APIs and integrations with other energy management systems
    - **Personalized Recommendations** 🎯: Creating customized suggestions based on user behavior patterns
    - **Carbon Intensity Alerts** 🔔: Setting up notifications for optimal energy consumption times
    
    ## About Eco AI.ly 🌟
    
    Eco AI.ly is a pioneering environmental technology startup dedicated to making environmental data accessible and actionable. Our mission is to empower businesses, governments, and individuals with real-time environmental insights to drive sustainable decision-making and positive environmental impact.
    
    We combine cutting-edge artificial intelligence with comprehensive environmental data to provide accurate, timely, and actionable insights. Our platform is designed to be intuitive and informative, making complex environmental data understandable and useful for everyone.
    
    Currently focused on Portugal, we're rapidly expanding to provide similar insights for countries around the world, helping to drive global environmental awareness and action.
    
    ### Our Commitment to Accuracy ✅
    
    All data presented on our platform is sourced from reliable, authoritative sources and processed using rigorous methodologies. Our AI models are regularly validated against actual carbon intensity measurements to ensure accuracy and reliability.
    
    ### Join Us in Reducing Carbon Emissions 🌍
    
    By understanding and acting on carbon intensity data, you're taking an important step toward reducing greenhouse gas emissions and combating climate change. Together, we can create a more sustainable energy future for generations to come.
    """)

def main():
    render_carbon_intensity_info()

if __name__ == "__main__":
    main()
