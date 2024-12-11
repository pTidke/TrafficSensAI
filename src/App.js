import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Import Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faMap,
	faChartBar,
	faMapMarkerAlt,
	faUser,
} from "@fortawesome/free-solid-svg-icons";

import Profiles from "./Profiles";
import Methods from "./Methods";
import Hotspot from "./Hotspot";
import MapPage from "./MapPage";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

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
				{/* Navbar */}
				<div
					style={{
						height: "60px",
						backgroundColor: "#1a1a2e",
						color: "#fff",
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						padding: "6px 20px",
						fontFamily: "'Aptos', sans-serif",
					}}
				>
					{/* App Title */}
					<h2
						style={{
							margin: 0,
							fontSize: "20px",
							fontWeight: "bold",
							color: "white",
						}}
					>
						Traffic SensAI
					</h2>

					{/* Navigation */}
					<nav style={{ display: "flex", gap: "25px" }}>
						<Link
							to='/'
							style={{
								color: "white",
								textDecoration: "none",
								fontSize: "16px",
								display: "flex",
								alignItems: "center",
								transition: "color 0.3s",
							}}
						>
							<FontAwesomeIcon
								icon={faMap}
								style={{ marginRight: "10px" }}
							/>
							Map
						</Link>
						<Link
							to='/Methods'
							style={{
								color: "white",
								textDecoration: "none",
								fontSize: "16px",
								display: "flex",
								alignItems: "center",
								transition: "color 0.3s",
							}}
						>
							<FontAwesomeIcon
								icon={faChartBar}
								style={{ marginRight: "10px" }}
							/>
							Methodology
						</Link>
						<Link
							to='/Hotspot'
							style={{
								color: "white",
								textDecoration: "none",
								fontSize: "16px",
								display: "flex",
								alignItems: "center",
								transition: "color 0.3s",
							}}
						>
							<FontAwesomeIcon
								icon={faMapMarkerAlt}
								style={{ marginRight: "10px" }}
							/>
							Hotspot Map
						</Link>
						<Link
							to='/Profiles'
							style={{
								color: "white",
								textDecoration: "none",
								fontSize: "16px",
								display: "flex",
								alignItems: "center",
								transition: "color 0.3s",
							}}
						>
							<FontAwesomeIcon
								icon={faUser}
								style={{ marginRight: "10px" }}
							/>
							Profiles
						</Link>
					</nav>
				</div>

				{/* Routes */}
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
