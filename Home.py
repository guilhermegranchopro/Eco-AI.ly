import streamlit as st
import streamlit.components.v1 as components

# Set up the page configuration
st.set_page_config(
    page_title="Eco AI.ly - Sustainable Predictions",
    page_icon="🌿",
    layout="wide",
    initial_sidebar_state="collapsed"
)

# Custom CSS for better styling
st.markdown("""
    <style>
    .main-header {
        font-size: 2.5rem;
        color: #2E7D32;
        text-align: center;
        margin-bottom: 1rem;
    }
    .sub-header {
        font-size: 1.8rem;
        color: #1B5E20;
        margin-top: 2rem;
        margin-bottom: 1rem;
    }
    .feature-card {
        padding: 1.5rem;
        margin: 1rem 0;
    }
    </style>
""", unsafe_allow_html=True)

# Display the logo
col1, col2, col3 = st.columns([0.5,3,0.5])
with col2:
    st.image("assets/images/logo.png", width=1600)

# Introduction Section
st.markdown("""
    <div class="feature-card">
        <h3 style="color: #2E7D32;">Welcome to Eco AI.ly</h3>
        <p>Your innovative platform at the intersection of <strong>Artificial Intelligence</strong> and <strong>Sustainability</strong>. 
        We empower decision-makers with accurate, real-time predictions on environmental metrics, enabling a greener future for all.</p>
    </div>
""", unsafe_allow_html=True)

# Key Features Section
st.markdown('<h2 class="sub-header">Our Key Features</h2>', unsafe_allow_html=True)

col1, col2, col3 = st.columns(3)

with col1:
    st.markdown("""
        <div class="feature-card">
            <h3 style="color: #2E7D32;">Predictive Analytics</h3>
            <p>• Real-time energy consumption forecasts<br>
               • Environmental impact predictions<br>
               • Trend analysis and pattern recognition</p>
        </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
        <div class="feature-card">
            <h3 style="color: #2E7D32;">Data Visualization</h3>
            <p>• Interactive dashboards<br>
               • Dynamic charts and graphs<br>
               • Customizable data views</p>
        </div>
    """, unsafe_allow_html=True)

with col3:
    st.markdown("""
        <div class="feature-card">
            <h3 style="color: #2E7D32;">AI-Powered Insights</h3>
            <p>• Machine learning models<br>
               • Pattern recognition<br>
               • Automated reporting</p>
        </div>
    """, unsafe_allow_html=True)

# Platform Overview
st.markdown('<h2 class="sub-header">Explore Our Platform</h2>', unsafe_allow_html=True)

st.markdown("""
    <div class="feature-card">
        <h3 style="color: #2E7D32;">Portugal Data Dashboard</h3>
        <p>• Comprehensive energy consumption metrics<br>
           • Real-time data updates<br>
           • Historical trend analysis<br>
           • Export and import statistics</p>
    </div>
""", unsafe_allow_html=True)

# Technology Stack
st.markdown('<h2 class="sub-header">Our Technology Stack</h2>', unsafe_allow_html=True)

col1, col2 = st.columns(2)

with col1:
    st.markdown("""
        <div class="feature-card">
            <h3 style="color: #2E7D32;">Backend Technologies</h3>
            <p>• Python & TensorFlow for AI models<br>
               • Advanced data processing pipelines<br>
               • Real-time data integration</p>
        </div>
    """, unsafe_allow_html=True)

with col2:
    st.markdown("""
        <div class="feature-card">
            <h3 style="color: #2E7D32;">Frontend Technologies</h3>
            <p>• Streamlit for interactive dashboards<br>
               • Modern visualization libraries<br>
               • Responsive design</p>
        </div>
    """, unsafe_allow_html=True)

# Call to Action
st.markdown("""
    <div style="text-align: center; margin: 2rem 0;">
        <h2 style="color: #2E7D32;">Ready to Make a Difference?</h2>
        <p>Join us in our mission to create a sustainable future through AI-powered insights.</p>
    </div>
""", unsafe_allow_html=True)

# Footer
st.markdown("""
    <div style="text-align: center; margin-top: 3rem; padding: 1rem; border-top: 1px solid #E0E0E0;">
        <p>© 2024 Eco AI.ly - Empowering Sustainable Decisions with AI</p>
    </div>
""", unsafe_allow_html=True)


