from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask, request, jsonify
import pickle
import pandas as pd
import time
import numpy as np

app = Flask(__name__)
CORS(app)

is_hotspot = 0

# Load the model
model = pickle.load(open(
    "/Users/shadowclone/Documents/coursework/BDA594/group Project/data_processing/collision_rf_model.pkl", "rb"))

all_coords = pd.read_pickle(
    "/Users/shadowclone/Documents/coursework/BDA696/mapapp/react-map-app/src/coords.pkl")


# Define haversine function for PySpark
def haversine(lat1, lon1, lat2, lon2):
    """
    Compute haversine distance between two points in miles.
    """
    R = 3958.8  # Radius of Earth in miles

    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = np.sin(dlat / 2) ** 2 + np.cos(lat1) * \
        np.cos(lat2) * np.sin(dlon / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))

    return R * c

# Create a UDF for haversine distance computation


def compute_membership(start_lat, start_lng, eps, min_samples, all_coords):
    """
    Determines if a point belongs to a cluster based on DBSCAN-like parameters.
    """

    distances = [haversine(start_lat, start_lng, coord[0], coord[1])
                 for coord in all_coords]

    # print(distances)

    neighbors_within_eps = sum(d <= 0.1 for d in distances)

    return 1 if neighbors_within_eps >= min_samples else 0


@app.route("/api/check_hotspot", methods=["POST"])
def check_hotspot():
    try:
        # Get JSON data from the request
        lat = request.json['lat']
        lng = request.json['lng']

        epsilon = 2 / 6371.0088

        # print(all_coords)
        # all_coords = all_coords['0']

        # print(type(all_coords))

        global is_hotspot

        is_hotspot = compute_membership(lat, lng, epsilon, 15, all_coords)
        # time.sleep(3)
        # print(is_hotspot)

        # print(all_coords)

        # calculations here

        if is_hotspot:
            x = "This is potential hotspot"
        else:
            x = "Not Part of Hotspot cluster"

        return jsonify({"is_hotspot": x})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


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
        print(is_hotspot)
        data['is_hotspot'] = is_hotspot
        print(data)

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
        if (prediction == 1):
            x = f"{prediction} - Very Severe"
        elif (prediction == 2):
            x = f"{prediction} - Severe"
        elif (prediction == 3):
            x = f"{prediction} - Moderate"
        else:
            x = f"{prediction} - Not Severe"

        # Respond back with a success message
        return jsonify({"prediction": str(x)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
