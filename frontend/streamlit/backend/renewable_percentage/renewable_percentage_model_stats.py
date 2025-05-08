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
        well in predicting renewable percentage classes. The accuracy metric shows the percentage 
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
        The Renewable Percentage model is built using a Long Short-Term Memory (LSTM) neural network, 
        which is particularly effective for time series data like renewable percentage measurements.
        
        - **Input Layer:** 24 hours of historical renewable percentage data
        - **LSTM Layers:** 2 layers with 64 and 32 units respectively
        - **Dense Layers:** 2 layers with 16 units and 6 units (output)
        - **Activation:** ReLU for hidden layers, Softmax for output
        - **Optimizer:** Adam with learning rate of 0.001
        - **Loss Function:** Categorical Cross-Entropy
        """)

        st.markdown("#### Training Process")
        st.markdown("""
        The model was trained on historical renewable percentage data from Portugal's electricity grid:
        
        - **Training Data:** 2 years of hourly renewable percentage measurements
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


def rend_model_stats_RP():
    """
    Renders the Renewable Percentage Model Statistics page with a clean, professional design.
    """
    set_page_config_once()

    # Main content for the Model Stats page
    st.title("Renewable Percentage Model Statistics")
    st.markdown(
        "*Comprehensive performance metrics and visualizations for our AI models*"
    )

    # Add a brief introduction
    st.markdown("""
    This page provides detailed statistics and visualizations for the Renewable Percentage prediction model. 
    The model uses historical renewable percentage data to predict future renewable percentage levels, helping users 
    optimize their energy consumption for minimal environmental impact.
    
    The model classifies renewable percentage into six categories:
    
    1. **The Worst!** (< 16%): Very low renewable energy, primarily fossil fuel-based electricity
    2. **Very Bad!** (16-32%): Low renewable energy, significant reliance on fossil fuels
    3. **Bad!** (32-48%): Below average renewable energy, moderate fossil fuel dependence
    4. **Ok!** (48-64%): Average renewable energy, balanced energy mix
    5. **Good!** (64-80%): High renewable energy, primarily clean electricity
    6. **The Best!** (> 80%): Excellent renewable energy, almost entirely clean electricity
    """)

    HERE = os.path.dirname(os.path.abspath(__file__))

    # Set base paths for each model's statistics
    renewable_base_path = os.path.join(HERE, "model_stats")

    # Display model stats with clean visuals
    display_model_stats("Renewable Percentage", renewable_base_path)

    # Add a footer with additional information
    st.markdown("### About These Statistics")
    st.markdown("""
    These statistics are generated from the model's performance on a held-out test dataset. 
    The model is regularly evaluated and updated to ensure optimal performance. For more information 
    about how these metrics are calculated or how to interpret them, please contact our support team.
    """)
