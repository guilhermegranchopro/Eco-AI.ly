import streamlit as st

def main():
    st.title("Eco AI.ly")
    st.header("Sustainable Predictions Powered by AI")

    st.write("""
    **Welcome to Eco AI.ly!**

    Eco AI.ly is a startup dedicated to leveraging advanced AI models to promote sustainability and environmental awareness.
    Our platform provides accurate predictions for environmental metrics, supporting informed decision-making for a greener future.

    **What You’ll Find on This Platform:**
    - **Introduction:** An overview of our mission, vision, and the innovative tools we offer.
    - **Data Visualization:** In-depth analysis of Portugal's environmental data featuring interactive pie charts, line graphs, and AI model predictions.
    - **Model Stats:** Detailed statistics and validation metrics of our backend AI models, including loss curves, accuracy, and confusion matrices.

    **Our Tools:**
    - **AI Models:** State-of-the-art prediction models built with TensorFlow.
    - **Streamlit:** An interactive dashboard that delivers real-time data visualization.
    - **APIs:** Seamless integration with external data sources to ensure up-to-date information.

    Join us on this journey to harness the power of AI for a sustainable future.
    """)

    st.info("Use the sidebar to navigate through the platform and explore different sections.")

if __name__ == "__main__":
    main()
# This code is for the introduction page of the Eco AI.ly web application.