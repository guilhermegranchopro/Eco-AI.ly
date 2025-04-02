import pytest
from components.predictions import display_predictions

def test_display_predictions():
    """
    Tests that the display_predictions function runs without errors.
    Since this function only creates UI elements, we're simply checking
    that no exceptions are raised.
    """
    try:
        display_predictions(3, 4)
    except Exception as e:
        pytest.fail(f"display_predictions raised an exception: {e}")
    