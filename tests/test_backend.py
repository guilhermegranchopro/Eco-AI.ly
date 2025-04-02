import unittest
import pandas as pd
import numpy as np
from backend.data_preparation import prepare_model_input_data, scale_model_input_data
from sklearn.preprocessing import StandardScaler

class TestDataPreparation(unittest.TestCase):
    def test_prepare_model_input_data(self):
        # Example raw data with one record containing a null value (to be dropped)
        raw_data = {
            "data": [
                {"feature1": 1, "feature2": 2},
                {"feature1": 3, "feature2": 4},
                {"feature1": None, "feature2": 5}  # This record should be dropped
            ]
        }
        df = prepare_model_input_data(raw_data)
        # Verify that the resulting DataFrame is not empty and has dropped the null record
        self.assertIsInstance(df, pd.DataFrame)
        self.assertEqual(len(df), 2)
        self.assertIn("feature1", df.columns)
        self.assertIn("feature2", df.columns)

    def test_scale_model_input_data(self):
        # Create a simple DataFrame with numerical values
        df = pd.DataFrame({
            "feature1": [1, 2, 3],
            "feature2": [4, 5, 6]
        })
        # Fit a StandardScaler to the DataFrame
        scaler = StandardScaler().fit(df)
        # Scale the data using our function
        scaled_data = scale_model_input_data(df, scaler)
        # Check that the output is a numpy array with the same shape as the input DataFrame
        self.assertIsInstance(scaled_data, np.ndarray)
        self.assertEqual(scaled_data.shape, (3, 2))
        # Optionally, verify that the scaled data has zero mean (approximately)
        self.assertTrue(np.allclose(np.mean(scaled_data, axis=0), 0, atol=1e-7))

if __name__ == "__main__":
    unittest.main()
#     matrix_fig = plot_matrix(matrix, title="Demo Matrix")