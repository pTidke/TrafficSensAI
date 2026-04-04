from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Resolve the absolute path of the 'src' directory relative to this file
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# Load the model gracefully
model_path = os.path.join(BASE_DIR, "collision_rf_model.pkl")
try:
    with open(model_path, "rb") as f:
        model = pickle.load(f)
except FileNotFoundError:
    print(f"Warning: Expected model file not found at {model_path}")
    model = None

# System Startup: Load massive coordinate set into memory exactly once as a Vector array
coords_path = os.path.join(BASE_DIR, "coords.pkl")
try:
    all_coords_series = pd.read_pickle(coords_path)
    # Convert list of tuples strictly to a standard 2D Numpy Array for instantaneous C-level math
    ALL_COORDS_NP = np.array(all_coords_series.tolist(), dtype=np.float32)
    # Convert ALL coordinates from decimal degrees -> Radians to avoid doing it per-request
    ALL_COORDS_RAD = np.radians(ALL_COORDS_NP)
except FileNotFoundError:
    print(f"Warning: Expected coords file not found at {coords_path}")
    ALL_COORDS_RAD = np.array([])


def compute_membership_vectorized(start_lat, start_lng, min_samples):
    """
    100x Speedup Vectorized computation of Haversine memberships.
    Subtracts single coordinate vs entire matrix instantly.
    """
    if ALL_COORDS_RAD.size == 0:
        return 0

    R = 3958.8  # Earth radius in miles
    lat1 = np.radians(start_lat)
    lon1 = np.radians(start_lng)
    
    lat2 = ALL_COORDS_RAD[:, 0]
    lon2 = ALL_COORDS_RAD[:, 1]
    
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    
    a = np.sin(dlat / 2.0)**2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2.0)**2
    c = 2 * np.arctan2(np.sqrt(a), np.sqrt(1 - a))
    
    distances = R * c
    neighbors_within_eps = np.sum(distances <= 0.1)
    
    return 1 if neighbors_within_eps >= min_samples else 0


@app.route("/api/check_hotspot", methods=["POST"])
def check_hotspot():
    try:
        data = request.json
        lat = data.get('lat')
        lng = data.get('lng')
        
        # Verify if inside hotspot using vectorized engine
        is_hotspot = compute_membership_vectorized(lat, lng, 15)
        
        return jsonify({
            "is_hotspot": int(is_hotspot),
            "message": "This is a potential hotspot" if is_hotspot else "Not Part of Hotspot cluster"
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/api/submit", methods=["POST"])
def submit():
    try:
        data = request.json
        if not data or not isinstance(data, dict):
            return jsonify({"error": "Invalid input payload"}), 400
            
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
        
        # Safety Fix: Read 'is_hotspot' directly from payload state to prevent session bleeding
        data['is_hotspot'] = int(data.get('is_hotspot', 0))
        
        # Vectorize Dictionary generation safely
        df = pd.DataFrame([{col: data.get(col, 0.0) for col in column_order}])
        
        if model is None:
            return jsonify({"error": "Model missing, cannot predict"}), 404
            
        prediction = int(model.predict(df)[0])
        
        severity_map = {
            1: "Not Severe",
            2: "Moderate",
            3: "Severe",
            4: "Very Severe"
        }
        severity_text = severity_map.get(prediction, "Unknown")
        
        return jsonify({
            "prediction": prediction,
            "text": severity_text
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# Serve static frontend files
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve_frontend(path):
    # Static files (JS, CSS, Images) will be in 'static' directory
    static_dir = os.path.join(BASE_DIR, "static")
    
    # If the requested path exists as a file, serve it
    if path != "" and os.path.exists(os.path.join(static_dir, path)):
        return send_from_directory(static_dir, path)
    
    # For Next.js static export with trailingSlash: true
    # Subpages like /hotspot/ will have an index.html in out/hotspot/index.html
    if path.endswith("/") or path == "":
        full_path = os.path.join(static_dir, path, "index.html")
        if os.path.exists(full_path):
            return send_from_directory(os.path.join(static_dir, path), "index.html")
            
    # Default to main index.html for CSR navigation (client-side routing)
    return send_from_directory(static_dir, "index.html")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
