import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";

const MapPage = () => {
	const [latLng, setLatLng] = useState({ lat: 32.766, lng: -117.1283 });
	const [formData, setFormData] = useState({
		Temperature_F: 69.1,
		Wind_Chill_F: 63.1353,
		Humidity_pct: 75.0,
		Pressure_in: 29.98,
		Visibility_mi: 9.0,
		Wind_Speed_mph: 8.1,
		Precipitation_in: 0.0056,
		Amenity: 0,
		Bump: 0,
		Crossing: 0,
		Give_Way: 0,
		Junction: 0,
		No_Exit: 0,
		Railway: 0,
		Roundabout: 0,
		Station: 0,
		Stop: 0,
		Traffic_Calming: 0,
		Traffic_Signal: 0,
		Turning_Loop: 0,
		Minute_of_Day: 657,
		Weather_Condition_Cloudy: 0,
		Weather_Condition_Dusty: 0,
		Weather_Condition_Hazy: 0,
		Weather_Condition_Rainy: 0,
		Weather_Condition_Snowy: 0,
		Weather_Condition_Thunderstorm: 0,
		Weather_Condition_Unknown: 0,
		is_hotspot: 0,
	});

	const [hotspotResult, setHotspotResult] = useState(""); // State to store hotspot result

	const MapClickHandler = () => {
		useMapEvents({
			click: (e) => {
				setLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
				setFormData({
					...formData,
					Start_Lat: e.latlng.lat,
					Start_Lng: e.latlng.lng,
				});
			},
		});
		return null;
	};

	const handleSubmit = async () => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:5000/api/submit",
				formData
			);
			alert(`Data received by backend: ${JSON.stringify(response.data)}`);
		} catch (error) {
			console.error(error);
			alert("Error submitting data to backend.");
		}
	};

	const handleToggle = (key) => {
		// Toggle between 0 (No) and 1 (Yes)
		setFormData({
			...formData,
			[key]: formData[key] === 1 ? 0 : 1,
		});
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	const checkHotspot = async () => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:5000/api/check_hotspot",
				{ lat: latLng.lat, lng: latLng.lng }
			);
			setFormData({ ...formData, is_hotspot: response.data.is_hotspot });

			// Update the result in the state
			setHotspotResult(response.data.is_hotspot);
		} catch (error) {
			console.error(error);
			setHotspotResult("Error checking hotspot.");
		}
	};

	return (
		<div style={{ display: "flex", height: "calc(100vh - 40px)" }}>
			<div style={{ width: "20%", padding: "20px", overflowY: "scroll" }}>
				{/* <h3>Location</h3> */}
				<div style={{ display: "flex", marginBottom: "6px" }}>
					<div style={{ marginRight: "10px", width: "50%" }}>
						<label style={{ fontWeight: "bold" }}>Latitude</label>
						<p>{latLng.lat}</p>
					</div>
					<div style={{ width: "50%" }}>
						<label style={{ fontWeight: "bold" }}>Longitude</label>
						<p>{latLng.lng}</p>
					</div>
				</div>

				<form>
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "20px",
						}}
					>
						<button
							onClick={(e) => {
								e.preventDefault();
								checkHotspot();
							}}
							style={{
								padding: "10px 15px",
								backgroundColor: "#28a745",
								color: "white",
								border: "none",
								cursor: "pointer",
								borderRadius: "5px",
							}}
						>
							Check if Hotspot
						</button>
						{/* Display the result next to the button */}
						<p style={{ marginLeft: "110px", fontWeight: "bold" }}>
							{hotspotResult}
						</p>
					</div>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "20px",
						}}
					>
						{[
							"Temperature_F",
							"Wind_Chill_F",
							"Humidity_pct",
							"Pressure_in",
							"Visibility_mi",
							"Wind_Speed_mph",
							"Precipitation_in",
						].map((key) => (
							<div key={key} style={{ marginBottom: "2px" }}>
								<label style={{ fontWeight: "bold" }}>
									{key.replace(/_/g, " ")}
								</label>
								<input
									type='number'
									name={key}
									value={formData[key]}
									onChange={handleInputChange}
									style={{
										width: "90%",
										padding: "8px",
										marginTop: "5px",
										border: "1px solid #ccc",
										borderRadius: "5px",
									}}
								/>
							</div>
						))}
					</div>
					<div
						style={{
							display: "grid",
							marginTop: "20px",
							marginBottom: "8px",
							gridTemplateColumns: "1fr 1fr",
							gap: "20px",
						}}
					>
						{[
							"Amenity",
							"Bump",
							"Crossing",
							"Give_Way",
							"Junction",
							"No_Exit",
							"Railway",
							"Roundabout",
							"Station",
							"Stop",
							"Traffic_Calming",
							"Traffic_Signal",
							"Turning_Loop",
							"Weather_Condition_Cloudy",
							"Weather_Condition_Dusty",
							"Weather_Condition_Hazy",
							"Weather_Condition_Rainy",
							"Weather_Condition_Snowy",
							"Weather_Condition_Thunderstorm",
							"Weather_Condition_Unknown",
						].map((key) => (
							<div key={key} style={{ marginBottom: "8px" }}>
								<label style={{ fontWeight: "bold" }}>
									{key.replace(/_/g, " ")}
								</label>
								<button
									type='button'
									onClick={() => handleToggle(key)}
									style={{
										display: "block",
										marginTop: "5px",
										backgroundColor:
											formData[key] === 1
												? "green"
												: "red",
										color: "white",
										border: "none",
										padding: "5px 10px",
										cursor: "pointer",
									}}
								>
									{formData[key] === 1 ? "Yes" : "No"}
								</button>
							</div>
						))}
					</div>
				</form>

				<button
					onClick={handleSubmit}
					style={{
						marginTop: "6px",
						padding: "10px 15px",
						backgroundColor: "#007BFF",
						color: "white",
						border: "none",
						cursor: "pointer",
						borderRadius: "5px",
						width: "100%",
					}}
				>
					Predict Severity
				</button>
			</div>

			<div style={{ width: "80%" }}>
				<MapContainer
					center={[32.766, -117.1283]}
					zoom={13}
					style={{ height: "100%", width: "100%" }}
				>
					<TileLayer
						url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
						attribution='&copy; OpenStreetMap contributors'
					/>
					<MapClickHandler />
					<Marker position={[latLng.lat, latLng.lng]} />
				</MapContainer>
			</div>
		</div>
	);
};

export default MapPage;
