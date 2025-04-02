import matplotlib.pyplot as plt

def create_pie_chart(values, labels, title=""):
    """
    Creates a pie chart using matplotlib.

    Args:
        values (list or array-like): Numeric values for each pie slice.
        labels (list): Labels corresponding to each slice.
        title (str): Title of the pie chart.
    
    Returns:
        fig: A matplotlib figure object containing the pie chart.
    """
    fig, ax = plt.subplots()
    ax.pie(values, labels=labels, autopct='%1.1f%%')
    ax.set_title(title)
    return fig

def create_line_chart(x, y, title="", xlabel="", ylabel=""):
    """
    Creates a line chart using matplotlib.

    Args:
        x (list or array-like): Values for the x-axis.
        y (list or array-like): Values for the y-axis.
        title (str): Title of the line chart.
        xlabel (str): Label for the x-axis.
        ylabel (str): Label for the y-axis.
    
    Returns:
        fig: A matplotlib figure object containing the line chart.
    """
    fig, ax = plt.subplots()
    ax.plot(x, y, marker='o')
    ax.set_title(title)
    ax.set_xlabel(xlabel)
    ax.set_ylabel(ylabel)
    return fig

if __name__ == "__main__":
    # Example usage:
    # Create a sample pie chart
    pie_fig = create_pie_chart([40, 60], ["Renewable", "Non-renewable"], "Sample Power Mix")
    # Create a sample line chart
    line_fig = create_line_chart(list(range(24)), [i + 10 for i in range(24)], "Hourly Data", "Hour", "Value")
    
    # Display the figures
    plt.show()
