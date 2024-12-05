from flask import Flask, request, jsonify
from flask_cors import CORS
from flask import Flask, request, jsonify
import pickle
import pandas as pd
import time
import numpy as np

app = Flask(__name__)
CORS(app)

# Load the model
model = pickle.load(open(
    "/Users/shadowclone/Documents/coursework/BDA594/group Project/data_processing/collision_rf_model.pkl", "rb"))

all_coords = pd.read_csv(
    "/Users/shadowclone/Documents/coursework/BDA696/mapapp/react-map-app/src/flat_coords.csv")


def haversine(lat1, lon1, lat2, lon2):
    """
    Compute haversine distance between two points in miles.
    """
    R = 3958.8  # Radius of Earth in miles
    print('in hav')
    print(lat1, lon1, lat2, lon2)
    lat1, lon1, lat2, lon2 = map(np.radians, [lat1, lon1, lat2, lon2])
    print('in hav')
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    print('in hav')
    a = np.sin(dlat / 2) ** 2 + np.cos(lat1) * \
        np.cos(lat2) * np.sin(dlon / 2) ** 2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    print('in hav')
    print(R * c)

    return R * c

    # Create a UDF for haversine distance computation


def compute_membership(start_lat, start_lng, eps, min_samples, all_coords):
    """
    Determines if a point belongs to a cluster based on DBSCAN-like parameters.
    """
    print(all_coords)
    distances = [haversine(start_lat, start_lng, coord[0], coord[1])
                 for coord in all_coords]

    print(distances)
    neighbors_within_eps = sum(d <= 0.5 for d in distances)

    return 1 if neighbors_within_eps >= 15 else 0


@app.route("/api/check_hotspot", methods=["POST"])
def check_hotspot():
    try:
        # Get JSON data from the request
        lat = request.json['lat']
        lng = request.json['lng']

        epsilon = 2 / 6371.0088

        # is_hotspot = compute_membership(lat, lng, epsilon, 15, all_coords)
        # time.sleep(3)
        # print(is_hotspot)

        # print(all_coords)

        # calculations here

        return jsonify({"is_hotspot": 1})
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
        data['is_hotspot'] = 1
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

        # Respond back with a success message
        return jsonify({"prediction": int(prediction)})
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
