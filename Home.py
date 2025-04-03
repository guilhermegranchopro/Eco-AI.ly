import streamlit as st

# Set up the page configuration
st.set_page_config(
    page_title="Eco AI.ly",
    page_icon="🌿",
    layout="wide",
)

st.title("Eco AI.ly")
st.header("Sustainable Predictions Powered by AI")

st.write("""
**Welcome to Eco AI.ly!**

Eco AI.ly is a startup dedicated to leveraging advanced AI models to promote sustainability and environmental awareness.
Our platform provides accurate predictions for environmental metrics, supporting informed decision-making for a greener future.

**What You’ll Find on This Platform:**
- **app (Home):** An overview of our mission, vision, and innovative tools.
- **1_Portugal_Data (Portugal Data):** Interactive environmental data visualizations and AI model predictions for Portugal.
- **2_Model_Stats (Model Stats):** Precomputed statistics and validation metrics of our backend AI models.

**Our Tools:**
- **AI Models:** State-of-the-art prediction models built with TensorFlow.
- **Streamlit:** An interactive dashboard for real-time data visualization.
- **APIs:** Seamless integration with external data sources for up-to-date information.

Join us on this journey to harness the power of AI for a sustainable future.
""")

