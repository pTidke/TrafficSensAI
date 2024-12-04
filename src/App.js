import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import axios from "axios";
import L from "leaflet";

import page1 from "./page1";
import page2 from "./page2";
import Profiles from "./Profiles";

// Fix for Marker Icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Setting default marker icon globally
L.Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
});

const MapPage = () => {
	const [latLng, setLatLng] = useState({ lat: 32.766, lng: -117.1283 });
	const [formData, setFormData] = useState({
		Start_Lat: 32.766,
		Start_Lng: -117.1283,
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
		is_hotspot: 1,
		Minute_of_Day: 657,
		Weather_Condition_Cloudy: 1,
		Weather_Condition_Clear: 0,
		Weather_Condition_Rain: 0,
	});

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
		setFormData({ ...formData, [key]: formData[key] === 1 ? 0 : 1 });
	};

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData({ ...formData, [name]: value });
	};

	return (
		<div style={{ display: "flex", height: "calc(100vh - 60px)" }}>
			<div style={{ width: "15%", padding: "20px", overflowY: "scroll" }}>
				<h3>Location</h3>
				<p>Latitude: {latLng.lat}</p>
				<p>Longitude: {latLng.lng}</p>
				<form>
					{Object.keys(formData).map((key) => {
						const isToggle = [
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
						].includes(key);
						return (
							<div key={key} style={{ marginBottom: "10px" }}>
								<label>{key}:</label>
								{isToggle ? (
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
										{formData[key]}
									</button>
								) : (
									<input
										type='text'
										name={key}
										value={formData[key]}
										onChange={handleInputChange}
										style={{ width: "100%" }}
									/>
								)}
							</div>
						);
					})}
				</form>
				<button
					onClick={handleSubmit}
					style={{
						marginTop: "10px",
						padding: "10px 15px",
						cursor: "pointer",
					}}
				>
					Submit to Backend
				</button>
			</div>
			<div style={{ width: "85%" }}>
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

const BlankPage = ({ title }) => (
	<div style={{ padding: "20px" }}>
		<h1>{title}</h1>
		<p>This is a blank page. You can add content here.</p>
	</div>
);

const App = () => {
	return (
		<Router>
			<div>
				<div
					style={{
						height: "60px",
						backgroundColor: "#282c34",
						color: "white",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "0 20px",
					}}
				>
					<h2>Traffic SensAI</h2>
					<nav>
						<Link
							to='/'
							style={{
								color: "white",
								margin: "0 10px",
								textDecoration: "none",
							}}
						>
							Map
						</Link>
						<Link
							to='/page1'
							style={{
								color: "white",
								margin: "0 10px",
								textDecoration: "none",
							}}
						>
							Page 1
						</Link>
						<Link
							to='/page2'
							style={{
								color: "white",
								margin: "0 10px",
								textDecoration: "none",
							}}
						>
							Page 2
						</Link>
						<Link
							to='/Profiles'
							style={{
								color: "white",
								margin: "0 10px",
								textDecoration: "none",
							}}
						>
							Profiles
						</Link>
					</nav>
				</div>
				<Routes>
					<Route path='/' element={<MapPage />} />
					<Route path='/page1' element={<page1 />} />
					<Route path='/page2' element={<page2 />} />
					<Route path='/Profiles' element={<Profiles />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
