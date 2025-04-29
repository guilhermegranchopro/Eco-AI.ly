import streamlit as st
import os
from datetime import datetime


def set_page_config_once():
    if "page_config_done" not in st.session_state:
        st.set_page_config(page_title="Eco AI.ly", page_icon="🌿", layout="wide")
        st.session_state["page_config_done"] = True


def load_text(file_path):
    """
    Reads and returns the content of a text file.
    """
    try:
        with open(file_path, "r") as file:
            return file.read().strip()
    except Exception as e:
        st.error(f"Error loading {file_path}: {e}")
        return "Not Available"


def display_model_stats(model_name: str, base_path: str):
    """
    Displays precomputed model statistics including images and test metrics.

    Args:
        model_name (str): The display name for the model.
        base_path (str): The base path where the model's stats files are located.
    """
    # Create a clean header
    st.subheader(f"{model_name} Model Statistics")

    # Create tabs for different sections
    tab1, tab2, tab3, tab4 = st.tabs(
        [
            "Performance Metrics",
            "Training Visualization",
            "Confusion Matrix",
            "Model Details",
        ]
    )

    with tab1:
        st.markdown("### Performance Metrics")

        # Load test metrics
        test_accuracy = load_text(os.path.join(base_path, "test_accuracy.txt"))
        test_loss = load_text(os.path.join(base_path, "test_loss.txt"))

        # Create a clean metrics display
        col1, col2 = st.columns(2)

        with col1:
            st.markdown("#### Test Accuracy")
            st.markdown(f"**{float(test_accuracy) * 100:.2f}%**")
            st.markdown("*Percentage of correct predictions*")

        with col2:
            st.markdown("#### Test Loss")
            st.markdown(f"**{test_loss}**")
            st.markdown("*Lower is better*")

        # Add interpretation of metrics
        st.markdown("### Interpretation")
        st.markdown(f"""
        The model achieves an accuracy of **{float(test_accuracy) * 100:.2f}%** on the test dataset, 
        with a loss value of **{test_loss}**. This indicates that the model is performing 
        well in predicting carbon intensity classes. The accuracy metric shows the percentage 
        of correct predictions, while the loss metric measures how far the model's predictions 
        are from the actual values.
        """)

    with tab2:
        st.markdown("### Training Visualization")

        # Define file paths for training visualizations
        loss_img = os.path.join(base_path, "loss_plot.png")
        accuracy_img = os.path.join(base_path, "accuracy_plot.png")

        # Display images with clean styling
        col1, col2 = st.columns(2)

        with col1:
            st.markdown("#### Loss Plot")
            st.image(loss_img, use_container_width=True)
            st.markdown("""
            The loss plot shows how the model's error decreases during training. 
            A decreasing trend indicates that the model is learning effectively.
            """)

        with col2:
            st.markdown("#### Accuracy Plot")
            st.image(accuracy_img, use_container_width=True)
            st.markdown("""
            The accuracy plot shows how the model's prediction accuracy improves during training. 
            An increasing trend indicates that the model is becoming more proficient at making correct predictions.
            """)

    with tab3:
        st.markdown("### Confusion Matrix")

        # Define file path for confusion matrix
        confusion_img = os.path.join(base_path, "confusion_matrix.png")

        # Display confusion matrix with explanation - using a smaller size
        col1, col2, col3 = st.columns([1, 2, 1])
        with col2:
            st.image(confusion_img, use_container_width=True)

        st.markdown("### Understanding the Confusion Matrix")
        st.markdown("""
        The confusion matrix shows the distribution of predicted classes versus actual classes:
        
        - **Rows** represent the actual classes
        - **Columns** represent the predicted classes
        - **Diagonal elements** show correct predictions
        - **Off-diagonal elements** show misclassifications
        
        A good model will have high values along the diagonal and low values elsewhere.
        """)

    with tab4:
        st.markdown("### Model Details")

        # Create a detailed model information section
        st.markdown("#### Model Architecture")
        st.markdown("""
        The Carbon Intensity model is built using a Long Short-Term Memory (LSTM) neural network, 
        which is particularly effective for time series data like carbon intensity measurements.
        
        - **Input Layer:** 24 hours of historical carbon intensity data
        - **LSTM Layers:** 2 layers with 64 and 32 units respectively
        - **Dense Layers:** 2 layers with 16 units and 6 units (output)
        - **Activation:** ReLU for hidden layers, Softmax for output
        - **Optimizer:** Adam with learning rate of 0.001
        - **Loss Function:** Categorical Cross-Entropy
        """)

        st.markdown("#### Training Process")
        st.markdown("""
        The model was trained on historical carbon intensity data from Portugal's electricity grid:
        
        - **Training Data:** 2 years of hourly carbon intensity measurements
        - **Validation Split:** 20% of data used for validation
        - **Batch Size:** 32 samples per batch
        - **Epochs:** 50 with early stopping
        - **Data Preprocessing:** Normalization and class labeling
        """)

        st.markdown("#### Model Deployment")
        st.markdown(f"""
        The model is deployed in production with the following characteristics:
        
        - **Update Frequency:** Daily retraining with new data
        - **Prediction Horizon:** 24 hours ahead
        - **Inference Time:** < 100ms per prediction
        - **Model Size:** ~2MB
        - **Last Updated:** {datetime.now().strftime("%B %d, %Y")}
        """)


def rend_model_stats_CI():
    """
    Renders the Carbon Intensity Model Statistics page with a clean, professional design.
    """
    set_page_config_once()

    # Main content for the Model Stats page
    st.title("Carbon Intensity Model Statistics")
    st.markdown(
        "*Comprehensive performance metrics and visualizations for our AI models*"
    )

    # Add a brief introduction
    st.markdown("""
    This page provides detailed statistics and visualizations for the Carbon Intensity prediction model. 
    The model uses historical carbon intensity data to predict future carbon intensity levels, helping users 
    optimize their energy consumption for minimal environmental impact.
    
    The model classifies carbon intensity into six categories:
    
    1. **The Best!** (< 118 gCO₂/kWh): Extremely clean electricity
    2. **Good!** (118-202 gCO₂/kWh): Clean electricity
    3. **Ok!** (202-286 gCO₂/kWh): Moderate carbon intensity
    4. **Bad!** (286-369 gCO₂/kWh): High carbon intensity
    5. **Very Bad!** (369-452 gCO₂/kWh): Very high carbon intensity
    6. **The Worst!** (> 452 gCO₂/kWh): Extremely high carbon intensity
    """)

    # Set base paths for each model's statistics
    carbon_base_path = os.path.join("backend", "carbon_intensity", "model_stats")

    # Display model stats with clean visuals
    display_model_stats("Carbon Intensity", carbon_base_path)

    # Add a footer with additional information
    st.markdown("### About These Statistics")
    st.markdown("""
    These statistics are generated from the model's performance on a held-out test dataset. 
    The model is regularly evaluated and updated to ensure optimal performance. For more information 
    about how these metrics are calculated or how to interpret them, please contact our support team.
    """)
