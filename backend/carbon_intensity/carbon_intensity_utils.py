import streamlit.components.v1 as components


def get_bg_color_CI(value):
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
    if bg_color.startswith("#") and len(bg_color) == 7:  # Ensure it's a valid hex color
        red = int(bg_color[1:3], 16)
        green = int(bg_color[3:5], 16)
        blue = int(bg_color[5:7], 16)
        bg_color = f"rgba({red}, {green}, {blue}, {transparency})"

    if value == 0:
        value_displayed = "< 118"
        relative_value = "The Best!"
    elif value == 1:
        value_displayed = "118 - 202"
        relative_value = "Good!"
    elif value == 2:
        value_displayed = "202 - 286"
        relative_value = "Ok!"
    elif value == 3:
        value_displayed = "286 - 369"
        relative_value = "Bad!"
    elif value == 4:
        value_displayed = "369 - 452"
        relative_value = "Very Bad!"
    elif value == 5:
        value_displayed = "> 452"
        relative_value = "The Worst!"

    html = f"""
    <div style="
         background-color: {bg_color} !important;
         border-radius: 10px;
         padding: 16px;
         width: 90%;
         text-align: center;
         color: #FFFFFF;
         font-family: Arial, sans-serif;
         margin-bottom: 1rem;
         ">
         <div style="font-size: 16px; font-weight: 600;">{label}</div>
         <div style="font-size: 36px; font-weight: 700; margin-top: 4px;">{value_displayed}</div>
         <div style="font-size: 18px; font-weight: 500; margin-top: 8px;">{relative_value}</div>
     </div>
     """
    components.html(html, height=150)

    return value_displayed, relative_value


def when_to_consume_energy_CI(prediction_class_carbon, mode_labelling_CI):
    """
    Determines the best time to consume energy based on carbon intensity predictions.
    Returns a tuple of (status_type, message) where status_type can be:
    - "success": Good time to consume energy
    - "warning": Not the best time
    - "error": Bad time to consume energy
    """
    if prediction_class_carbon > mode_labelling_CI and mode_labelling_CI < 3:
        return "success", "**Use energy now!**"
    elif prediction_class_carbon < mode_labelling_CI and prediction_class_carbon < 3:
        return "warning", "**Use energy later!**"
    elif (
        prediction_class_carbon == mode_labelling_CI
        and mode_labelling_CI < 3
        or prediction_class_carbon < 3
    ):
        return "success", "**Use energy whenever!**"
    elif prediction_class_carbon <= 3 and mode_labelling_CI <= 3:
        return "error", "**Bad timing!**"
    else:
        return "error", "**Better wait!**"
