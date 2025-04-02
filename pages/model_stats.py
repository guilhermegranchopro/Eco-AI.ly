import streamlit as st
import os

def load_text(file_path):
    """
    Reads the content of a text file.
    """
    try:
        with open(file_path, "r") as file:
            return file.read().strip()
    except Exception as e:
        st.error(f"Error loading {file_path}: {e}")
        return "Not Available"

def display_model_stats(model_name: str, base_path: str):
    """
    Displays the statistics images and test metrics for a given model.
    
    Args:
        model_name (str): Name of the model (for display purposes).
        base_path (str): Base path to the model's stats files (images and text files).
    """
    st.subheader(f"{model_name} Model Stats")
    
    # Define file paths for the images
    loss_img = os.path.join(base_path, "loss_plot.png")
    heatmap_img = os.path.join(base_path, "heatmap_table.png")
    confusion_img = os.path.join(base_path, "confusion_matrix.png")
    accuracy_img = os.path.join(base_path, "accuracy_plot.png")
    
    # Define file paths for the test metrics
    test_accuracy_file = os.path.join(base_path, "test_accuracy.txt")
    test_loss_file = os.path.join(base_path, "test_loss.txt")
    
    # Display the four images
    st.image(loss_img, caption="Loss Plot", use_column_width=True)
    st.image(heatmap_img, caption="Heatmap Table", use_column_width=True)
    st.image(confusion_img, caption="Confusion Matrix", use_column_width=True)
    st.image(accuracy_img, caption="Accuracy Plot", use_column_width=True)
    
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

def main():
    st.title("Model Statistics")
    st.write("Below are the precomputed performance metrics for our AI models.")
    
    # Set base paths for each model's statistics.
    # Adjust these paths as needed based on your project structure.
    carbon_base_path = os.path.join("backend", "model_stats", "carbon")
    renewable_base_path = os.path.join("backend", "model_stats", "renewable")
    
    st.header("Carbon Intensity Model")
    display_model_stats("Carbon Intensity", carbon_base_path)
    
    st.markdown("---")
    
    st.header("Renewable Percentage Model")
    display_model_stats("Renewable Percentage", renewable_base_path)

if __name__ == "__main__":
    main()
# This script is designed to be run in a Streamlit app.