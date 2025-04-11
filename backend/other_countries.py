import streamlit as st

@st.cache_data(ttl=3600)  # Cache for 1 hour (static content)
def get_expansion_message():
    """
    Returns a message about the expansion to other countries.
    """
    return """
    ## 🌍 Expanding to More Countries Soon!
    
    Eco AI.ly is currently focused on providing detailed environmental data for Portugal 🇵🇹, but we're rapidly expanding our coverage to include more countries around the world.
    
    ### Coming Soon:
    
    - **Spain** 🇪🇸: Our next country of focus, with similar environmental challenges and opportunities
    - **France** 🇫🇷: A key European energy market with diverse energy sources
    - **Germany** 🇩🇪: Europe's largest economy with ambitious renewable energy goals
    - **United Kingdom** 🇬🇧: A leader in offshore wind and energy transition
    - **Italy** 🇮🇹: Rich in renewable resources, especially solar and hydro
    
    ### Why We're Starting with Portugal:
    
    Portugal offers an ideal testing ground for our environmental data platform:
    
    - **Diverse Energy Mix**: From hydroelectric to wind and solar
    - **Ambitious Climate Goals**: Committed to carbon neutrality by 2050
    - **Geographic Variety**: From coastal areas to mountainous regions
    - **Data Availability**: Good access to environmental data
    - **Innovation Hub**: Growing tech sector focused on sustainability
    
    ### Stay Tuned for Updates:
    
    We're working hard to bring our comprehensive environmental insights to more countries. Sign up for our newsletter to be notified when we expand to new regions!
    
    *For now, enjoy our detailed analysis of Portugal's environmental data, which provides valuable insights into energy production, consumption, and environmental impact.*
    """
