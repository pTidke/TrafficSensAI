from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask, request, jsonify
import pickle
import pandas as pd

app = Flask(__name__)
CORS(app)

# Load the model
model = pickle.load(open(
    "/Users/shadowclone/Documents/coursework/BDA594/group Project/data_processing/collision_rf_model.pkl", "rb"))


@app.route("/api/submit", methods=["POST"])
def submit():
    try:
        # Expected column order
        column_order = [
            'Start_Lat', 'Start_Lng', 'Temperature_F', 'Wind_Chill_F',
            'Humidity_pct', 'Pressure_in', 'Visibility_mi', 'Wind_Speed_mph',
            'Precipitation_in', 'Amenity', 'Bump', 'Crossing', 'Give_Way',
            'Junction', 'No_Exit', 'Railway', 'Roundabout', 'Station', 'Stop',
            'Traffic_Calming', 'Traffic_Signal', 'Turning_Loop', 'is_hotspot',
            'Minute_of_Day', 'Weather_Condition_Cloudy', 'Weather_Condition_Dusty',
            'Weather_Condition_Hazy', 'Weather_Condition_Rainy',
            'Weather_Condition_Snowy', 'Weather_Condition_Thunderstorm',
            'Weather_Condition_Unknown'
        ]

        # Get JSON data from the request
        data = request.json

        # Ensure the expected structure
        if not data or not isinstance(data, dict):
            return jsonify({"error": "Invalid input format"}), 400

        # Create a pandas DataFrame with the specified column order
        # Default missing values to None
        df = pd.DataFrame([{col: data.get(col, None) for col in column_order}])

        # Print the DataFrame for debugging
        print(df)

        prediction = model.predict(df)[0]
        print(prediction)

        # Respond back with a success message
        return jsonify({"prediction": int(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
