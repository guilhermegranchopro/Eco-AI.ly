import matplotlib.pyplot as plt
import numpy as np

def plot_loss_curve(epochs, loss_values, title="Loss Curve"):
    """
    Generates a line chart for the loss curve over training epochs.

    Args:
        epochs (list or array-like): The epoch numbers.
        loss_values (list or array-like): Loss values corresponding to each epoch.
        title (str): Title for the plot.
    
    Returns:
        matplotlib.figure.Figure: The generated loss curve figure.
    """
    fig, ax = plt.subplots()
    ax.plot(epochs, loss_values, marker='o', linestyle='-')
    ax.set_title(title)
    ax.set_xlabel("Epoch")
    ax.set_ylabel("Loss")
    return fig

def plot_accuracy_curve(epochs, accuracy_values, title="Accuracy Curve"):
    """
    Generates a line chart for the accuracy curve over training epochs.

    Args:
        epochs (list or array-like): The epoch numbers.
        accuracy_values (list or array-like): Accuracy values corresponding to each epoch.
        title (str): Title for the plot.
    
    Returns:
        matplotlib.figure.Figure: The generated accuracy curve figure.
    """
    fig, ax = plt.subplots()
    ax.plot(epochs, accuracy_values, marker='o', linestyle='-')
    ax.set_title(title)
    ax.set_xlabel("Epoch")
    ax.set_ylabel("Accuracy")
    return fig

def plot_matrix(matrix, title="Matrix", xlabel="Predicted", ylabel="Actual"):
    """
    Generates a heatmap for a matrix, such as a confusion matrix or F1 recall matrix.

    Args:
        matrix (np.ndarray): 2D array containing matrix values.
        title (str): Title for the plot.
        xlabel (str): Label for the x-axis.
        ylabel (str): Label for the y-axis.
    
    Returns:
        matplotlib.figure.Figure: The generated matrix heatmap figure.
    """
    fig, ax = plt.subplots()
    cax = ax.imshow(matrix, cmap="viridis")
    ax.set_title(title)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)
    fig.colorbar(cax)
    
    # Annotate each cell with its value
    for i in range(matrix.shape[0]):
        for j in range(matrix.shape[1]):
            ax.text(j, i, f"{matrix[i, j]:.2f}", ha="center", va="center", color="white")
    return fig

if __name__ == "__main__":
    # Demonstration of the functions with dummy data
    epochs = np.arange(1, 11)
    loss_values = np.linspace(1.0, 0.1, 10) + np.random.rand(10) * 0.1
    accuracy_values = np.linspace(0.5, 0.95, 10) + np.random.rand(10) * 0.05

    loss_fig = plot_loss_curve(epochs, loss_values, title="Demo Loss Curve")
    accuracy_fig = plot_accuracy_curve(epochs, accuracy_values, title="Demo Accuracy Curve")
    
    # Example matrix (e.g., a confusion matrix)
    matrix = np.array([[50, 5], [3, 42]])
    matrix_fig = plot_matrix(matrix, title="Demo Confusion Matrix", xlabel="Predicted", ylabel="Actual")
    
    # Display the generated plots
    plt.show()
# Note: The above code is a standalone script for demonstration purposes.