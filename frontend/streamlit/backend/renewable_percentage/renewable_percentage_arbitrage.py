import streamlit as st


@st.cache_data
def average_renewable_percentage(value_displayed_now, value_displayed_next):
    """
    Separates the input strings by spaces and returns the separated values.

    Args:
        value_displayed_now (str): The first string to separate
        value_displayed_next (str): The second string to separate

    Returns:
        tuple: A tuple containing two lists, each with the separated values
    """
    # Split the strings by spaces
    now_values = value_displayed_now.split(" ")
    next_values = value_displayed_next.split(" ")

    for i in range(len(now_values)):
        if now_values[i] != "<" and now_values[i] != "-" and now_values[i] != ">":
            now_values[i] = now_values[i].replace("%", "")

    for i in range(len(next_values)):
        if next_values[i] != "<" and next_values[i] != "-" and next_values[i] != ">":
            next_values[i] = next_values[i].replace("%", "")

    if len(now_values) == 3:
        average_renewable_percentage_now = (
            float(now_values[0]) + float(now_values[2])
        ) / 2
    elif len(now_values) == 2 and now_values[0] == "<":
        average_renewable_percentage_now = float(now_values[1]) / 2
    elif len(now_values) == 2 and now_values[0] == ">":
        average_renewable_percentage_now = (float(now_values[1]) + 100) / 2
    else:
        st.error("Invalid input for now_values")

    if len(next_values) == 3:
        average_renewable_percentage_next = (
            float(next_values[0]) + float(next_values[2])
        ) / 2
    elif len(next_values) == 2 and next_values[0] == "<":
        average_renewable_percentage_next = float(next_values[1]) / 2
    elif len(next_values) == 2 and next_values[0] == ">":
        average_renewable_percentage_next = (float(next_values[1]) + 100) / 2
    else:
        st.error("Invalid input for now_values")

    return average_renewable_percentage_now, average_renewable_percentage_next


def render_arbitrage_opportunity_RP(value_displayed_now, value_displayed_next):
    """
    Renders the arbitrage opportunity section where users can input energy consumption
    and see potential savings based on carbon intensity variations.
    """
    st.markdown("---")
    st.subheader("Arbitrage Opportunity")

    # Use cached function for calculations
    average_renewable_percentage_now, average_renewable_percentage_next = (
        average_renewable_percentage(value_displayed_now, value_displayed_next)
    )

    if average_renewable_percentage_now > average_renewable_percentage_next:
        saved_renewable_percentage = (
            average_renewable_percentage_now - average_renewable_percentage_next
        )
        recommendation_message = "**Focus your energy spending on the now, because for the next 24 hours the renewable percentage will be lower!**"
    elif average_renewable_percentage_now < average_renewable_percentage_next:
        saved_renewable_percentage = (
            average_renewable_percentage_next - average_renewable_percentage_now
        )
        recommendation_message = "**Focus your energy spending on the next 24 hours, because the renewable percentage will be higher!**"
    else:
        saved_renewable_percentage = 0
        recommendation_message = "**Currently there are no visible upsite on programing your energy consumption.**"

    if saved_renewable_percentage > 0:
        # Calculate potential savings
        st.markdown("### Renewable Energies Upside")

        # Display results
        col3, col4 = st.columns(2)

        with col3:
            st.metric(
                "Renewable Percentage",
                f"{saved_renewable_percentage} %",
            )

    # Recommendation
    st.markdown("**Recommendation**")
    if saved_renewable_percentage > 0:
        st.success(recommendation_message)
    else:
        st.warning(recommendation_message)

    return saved_renewable_percentage


def get_bg_color_RP(value):
    """
    Returns a hex color string interpolated between green (#00FF00) and red (#FF0000).
    0 -> green, 5 -> red.
    """
    # Clamp value between 0 and 5
    value = max(0, min(5, value))
    fraction = value / 5.0
    red = int(255 * fraction)
    green = int(255 * (1 - fraction))
    blue = 0
    return f"#{red:02X}{green:02X}{blue:02X}"


def colored_metric(label, value, bg_color):
    """
    Renders a custom metric with a colored background using st.components.v1.html.
    Adds a fixed transparency level to the background color.
    """
    # Set transparency level (alpha) to 0.6 (60% opacity)
    transparency = 0.6

    # Convert hex color to RGBA with transparency
    r = int(bg_color[1:3], 16)
    g = int(bg_color[3:5], 16)
    b = int(bg_color[5:7], 16)
    rgba_color = f"rgba({r}, {g}, {b}, {transparency})"

    # Create HTML for the colored metric
    html = f"""
    <div style="
        background-color: {rgba_color};
        border-radius: 10px;
        padding: 10px;
        text-align: center;
        margin-bottom: 10px;
    ">
        <div style="font-size: 14px; color: #666;">{label}</div>
        <div style="font-size: 24px; font-weight: bold;">{value}</div>
    </div>
    """

    # Render the HTML
    st.components.v1.html(html, height=80)
