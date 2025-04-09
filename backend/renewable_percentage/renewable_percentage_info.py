import streamlit as st

def render_renewable_percentage_info():
    st.markdown("""
    # Renewable Energy Percentage Dashboard
    
    ## Understanding Portugal's Renewable Energy Transition
    
    The Renewable Energy Percentage Dashboard provides comprehensive insights into Portugal's progress toward a sustainable energy future. This dashboard visualizes the proportion of Portugal's energy that comes from renewable sources, offering a clear picture of the nation's energy transition journey.
    
    ## What is Renewable Percentage?
    
    Renewable percentage represents the proportion of total energy production derived from renewable sources such as:
    
    - Solar power
    - Wind energy
    - Hydroelectric power
    - Biomass
    - Geothermal energy
    
    This metric is a critical indicator of a country's progress in transitioning away from fossil fuels and toward a more sustainable energy system. A higher renewable percentage indicates greater energy independence, reduced carbon emissions, and progress toward climate goals.
    
    ## Features of Our Renewable Percentage Dashboard
    
    ### Comprehensive Data Visualization
    
    Our dashboard offers detailed visualizations that allow you to:
    
    - Track the evolution of Portugal's renewable energy mix over time
    - Compare different renewable sources' contributions
    - Identify trends and patterns in renewable adoption
    - Understand seasonal variations in renewable energy production
    
    ### Interactive Analysis Tools
    
    Users can interact with our dashboard to:
    
    - Filter data by time period
    - Compare renewable percentages across different timeframes
    - Explore the relationship between renewable percentage and other environmental metrics
    - Visualize progress toward national and EU renewable energy targets
    
    ### Contextual Insights
    
    We provide context to help you understand the significance of the data:
    
    - Benchmarking against EU and global averages
    - Analysis of policy impacts on renewable adoption
    - Identification of key drivers and barriers to renewable growth
    - Explanations of notable events affecting renewable percentages
    
    ## Why Renewable Percentage Matters
    
    Tracking renewable percentage is crucial for:
    
    - **Climate Action**: Monitoring progress toward decarbonization goals
    - **Energy Security**: Assessing independence from imported fossil fuels
    - **Economic Development**: Understanding the growth of green economy sectors
    - **Policy Evaluation**: Measuring the effectiveness of renewable energy incentives
    - **Investment Guidance**: Identifying opportunities in the renewable energy sector
    
    ## How to Use This Information
    
    The renewable percentage data can be valuable for:
    
    - **Policymakers**: Evaluate the effectiveness of renewable energy policies and set informed targets
    - **Businesses**: Make strategic decisions about energy sourcing and sustainability initiatives
    - **Investors**: Identify trends and opportunities in the renewable energy market
    - **Researchers**: Analyze patterns and correlations in energy transition data
    - **Citizens**: Understand their country's progress toward a sustainable energy future
    
    ## About Eco AI.ly
    
    Eco AI.ly is a pioneering environmental technology startup dedicated to making environmental data accessible and actionable. Our mission is to empower businesses, governments, and individuals with real-time environmental insights to drive sustainable decision-making and positive environmental impact.
    
    We combine cutting-edge artificial intelligence with comprehensive environmental data to provide accurate, timely, and actionable insights. Our platform is designed to be intuitive and informative, making complex environmental data understandable and useful for everyone.
    
    Currently focused on Portugal, we're rapidly expanding to provide similar insights for countries around the world, helping to drive global environmental awareness and action.
    """)

def main():
    render_renewable_percentage_info()

if __name__ == "__main__":
    main()
