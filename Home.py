import streamlit as st

# Set up the page configuration at the very top.
st.set_page_config(
    page_title="Eco AI.ly",
    page_icon="assets/images/logo.png",  # Alternatively, you can use an emoji if needed.
    layout="wide"
)

# Main title and header
st.title("Eco AI.ly")

# Display the logo at the top (adjust width as needed)
st.image("assets/images/logo.png", width=600)

st.header("Sustainable Predictions Powered by AI")

st.markdown("""
Welcome to **Eco AI.ly**, your innovative platform at the intersection of **Artificial Intelligence** and **Sustainability**.  
Our mission is to empower decision-makers with accurate, real-time predictions on environmental metrics, enabling a greener future for all.

## What is Eco AI.ly?

**Eco AI.ly** is a cutting-edge startup that leverages advanced AI models to forecast key environmental parameters. We are committed to:
- **Predictive Analytics:** Harnessing state-of-the-art AI to predict energy and environmental trends.
- **Sustainability:** Providing data-driven insights that help in making environmentally conscious decisions.
- **Innovation:** Merging technology with sustainability to create impactful solutions.

## Explore Our Platform

Our platform is built using **Streamlit**, delivering an interactive dashboard that organizes information into three main pages:

### Home
- **Overview:** Learn about our mission, vision, and the innovative tools we offer.
- **Details:** Get an in-depth introduction to how Eco AI.ly is transforming environmental monitoring and predictions using AI.

### Portugal Data
- **Interactive Visualizations:** Dive into real-time, interactive data visualizations focused on Portugal.
- **Energy Breakdown:** View detailed pie charts showing energy import, production, export, and consumption.
- **AI Predictions:** Explore predictions made by our models regarding environmental metrics.

### Model Stats
- **Model Performance:** Review precomputed statistics such as loss curves, accuracy metrics, and confusion matrices.
- **Validation Metrics:** Understand the performance and reliability of our AI models through detailed validation results.

## Our Technology Stack

- **AI Models:** Built with **TensorFlow**, our AI models provide robust predictions.
- **Streamlit:** Our dynamic dashboard is powered by Streamlit for interactive, real-time data visualization.
- **APIs:** We integrate with leading data providers to deliver up-to-date information to our users.

## Join Us on Our Journey

At Eco AI.ly, we believe that by harnessing the power of AI, we can revolutionize how we approach sustainability and environmental awareness.  
Explore our platform, interact with our visualizations, and see firsthand how technology can drive a sustainable future.

*Together, let's harness the power of AI to protect our planet!*
""")


