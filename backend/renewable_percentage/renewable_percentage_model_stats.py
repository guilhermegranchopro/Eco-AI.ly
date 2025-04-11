import streamlit as st
import os

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

    st.subheader(f"{model_name} Model Stats")
    
    # Define file paths in the desired order:
    # 1. Loss Plot
    # 2. Accuracy Plot
    # 3. Confusion Matrix
    # 4. Heatmap Table
    loss_img = os.path.join(base_path, "loss_plot.png")
    accuracy_img = os.path.join(base_path, "accuracy_plot.png")
    confusion_img = os.path.join(base_path, "confusion_matrix.png")
    
    # Define file paths for test metrics
    test_accuracy_file = os.path.join(base_path, "test_accuracy.txt")
    test_loss_file = os.path.join(base_path, "test_loss.txt")
    
    # Display images with proper caption and use_container_width
    st.image(loss_img, caption="Loss Plot", use_container_width=True)
    st.markdown("<br>", unsafe_allow_html=True)  # Add space
    st.image(accuracy_img, caption="Accuracy Plot", use_container_width=True)
    st.markdown("<br>", unsafe_allow_html=True)  # Add space
    st.image(confusion_img, caption="Confusion Matrix", use_container_width=True)
    
    # Load and display test metrics
    test_accuracy = load_text(test_accuracy_file)
    test_loss = load_text(test_loss_file)
    
    st.markdown("### Test Metrics")
    col1, col2 = st.columns(2)
    with col1:
        st.write("**Test Accuracy:**")
        st.write(test_accuracy)
    with col2:
        st.write("**Test Loss:**")
        st.write(test_loss)

def rend_model_stats_RP():

    set_page_config_once()

    # Main content for the Model Stats page
    st.title("Model Statistics")
    st.write("Below are the precomputed performance metrics for our AI models.")

    # Set base paths for each model's statistics
    renewable_base_path = os.path.join("backend", "renewable_percentage", "model_stats")

    st.header("Renewable Percentage Model")
    display_model_stats("Renewable Percentage", renewable_base_path)
