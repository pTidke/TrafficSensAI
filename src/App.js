import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import Profiles from "./Profiles";

// Fix for Marker Icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import Methods from "./Methods";
import Hotspot from "./Hotspot";
import MapPage from "./MapPage";

// Setting default marker icon globally
L.Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x,
	iconUrl: markerIcon,
	shadowUrl: markerShadow,
});

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
							to='/Methods'
							style={{
								color: "white",
								margin: "0 10px",
								textDecoration: "none",
							}}
						>
							Methodology
						</Link>
						<Link
							to='/Hotspot'
							style={{
								color: "white",
								margin: "0 10px",
								textDecoration: "none",
							}}
						>
							ArcGIS Map
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
					<Route path='/Methods' element={<Methods />} />
					<Route path='/Hotspot' element={<Hotspot />} />
					<Route path='/Profiles' element={<Profiles />} />
				</Routes>
			</div>
		</Router>
	);
};

export default App;
