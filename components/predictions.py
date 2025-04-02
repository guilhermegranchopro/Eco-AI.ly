import streamlit as st

def display_predictions(carbon_prediction: int, renewable_prediction: int):
    """
    Displays AI model predictions using Streamlit's metric component.

    Args:
        carbon_prediction (int): Predicted carbon intensity value (scale 0 to 5) for the next 24 hours.
        renewable_prediction (int): Predicted renewable percentage value (scale 0 to 5) for the next 24 hours.
    """
    col1, col2 = st.columns(2)
    with col1:
        st.metric("Carbon Intensity Prediction (Next 24 Hours)", carbon_prediction)
    with col2:
        st.metric("Renewable Percentage Prediction (Next 24 Hours)", renewable_prediction)

if __name__ == "__main__":
    # Demo: Run this file with Streamlit (streamlit run components/predictions.py) to see the output.
    st.title("Prediction Display Demo")
    # Example predictions (dummy values)
    display_predictions(3, 4)
    # In a real scenario, you would replace these with actual predictions from your model.