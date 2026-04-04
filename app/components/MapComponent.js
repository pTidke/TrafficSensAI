'use client';
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, CircleMarker, useMapEvents } from "react-leaflet";
import Modal from "react-modal";
import "leaflet/dist/leaflet.css";

// Standardize markers for leaflet
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
	iconRetinaUrl: markerIcon2x.src || markerIcon2x,
	iconUrl: markerIcon.src || markerIcon,
	shadowUrl: markerShadow.src || markerShadow,
});

Modal.setAppElement('body');

const MapComponent = () => {
	const [latLng, setLatLng] = useState({ lat: 32.766, lng: -117.1283 });
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [modalContent, setModalContent] = useState({ text: "", severity: 0 });
	const [panelOpen, setPanelOpen] = useState(true);
	
	const [timeStr, setTimeStr] = useState("10:57"); // Default corresponds to 657 minutes
	const [weatherSelect, setWeatherSelect] = useState("Unknown");

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
		is_hotspot: 0,
	});

	const [hotspotResult, setHotspotResult] = useState(""); 

	const MapClickHandler = () => {
		useMapEvents({
			click: (e) => {
				setLatLng({ lat: e.latlng.lat, lng: e.latlng.lng });
				setFormData(prev => ({
					...prev,
					Start_Lat: e.latlng.lat,
					Start_Lng: e.latlng.lng,
				}));
                setHotspotResult(""); // reset interaction visually
				if(!panelOpen) setPanelOpen(true);
			},
		});
		return null;
	};

	const handleSubmit = async () => {
		// Calculate derived fields cleanly
		let mins = 657;
		try {
			const [hh, mm] = timeStr.split(':');
			mins = parseInt(hh, 10) * 60 + parseInt(mm, 10);
		} catch(e) {}
		
		const payload = {
			...formData,
			Minute_of_Day: mins,
			Weather_Condition_Cloudy: weatherSelect === "Cloudy" ? 1 : 0,
			Weather_Condition_Dusty: weatherSelect === "Dusty" ? 1 : 0,
			Weather_Condition_Hazy: weatherSelect === "Hazy" ? 1 : 0,
			Weather_Condition_Rainy: weatherSelect === "Rainy" ? 1 : 0,
			Weather_Condition_Snowy: weatherSelect === "Snowy" ? 1 : 0,
			Weather_Condition_Thunderstorm: weatherSelect === "Thunderstorm" ? 1 : 0,
			Weather_Condition_Unknown: weatherSelect === "Unknown" ? 1 : 0,
		};

		try {
			const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
			// Using native fetch to stay lightweight vs axios
			const res = await fetch(`${baseUrl}/api/submit`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const data = await res.json();
			setModalContent({
				text: `${data.prediction} - ${data.text}`,
				severity: data.prediction
			});
			setIsModalOpen(true);
		} catch (error) {
			console.error(error);
			setModalContent({ text: "Error submitting data to backend.", severity: 0 });
			setIsModalOpen(true);
		}
	};

	const closeModal = () => setIsModalOpen(false);

	const handleToggle = (key) => setFormData(prev => ({ ...prev, [key]: prev[key] === 1 ? 0 : 1 }));
	const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) || 0 });

	const checkHotspot = async () => {
		try {
			const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";
			const res = await fetch(`${baseUrl}/api/check_hotspot`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ lat: latLng.lat, lng: latLng.lng })
			});
			const data = await res.json();
			setFormData(prev => ({ ...prev, is_hotspot: data.is_hotspot }));
			setHotspotResult(data.is_hotspot === 1 ? "Yes" : "No");
		} catch (error) {
			console.error(error);
			setHotspotResult("Error");
		}
	};

	const getToggleColor = (val) => val === 1 ? 'var(--accent-green)' : 'rgba(255, 255, 255, 0.1)';
    
    // Dynamic styling
    const severityColor = modalContent.severity >= 3 ? 'var(--accent-red)' : (modalContent.severity > 1 ? 'var(--accent-yellow)' : 'var(--accent-cyan)');

	return (
		<div style={{ height: "100%", width: "100%", position: "relative" }}>
			<MapContainer center={[32.766, -117.1283]} zoom={13} style={{ height: "100%", width: "100%" }} zoomControl={false}>
				<TileLayer url='https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png' />
				<MapClickHandler />
				<Marker position={[latLng.lat, latLng.lng]} />
                
                {/* Advanced Pulsing UI for Hotspots */}
                {hotspotResult === 'Yes' && (
                    <CircleMarker center={[latLng.lat, latLng.lng]} radius={30} color="var(--accent-red)" fillColor="var(--accent-red)" fillOpacity={0.4} className="pulse-circle" />
                )}
			</MapContainer>

			{/* Floating Panel Configuration */}
			{panelOpen && (
				<div className="glass-panel" style={{ position: "absolute", top: "100px", left: "30px", width: "380px", maxHeight: "calc(100vh - 140px)", overflowY: "auto", padding: "24px", zIndex: 1000, color: "var(--text-primary)" }}>
					<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
						<h3 style={{ margin: 0, fontWeight: 600 }}>Location Context</h3>
						<button onClick={() => setPanelOpen(false)} style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", fontSize: "18px" }}>✕</button>
					</div>

					<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
						<div style={{ flex: 1, padding: "10px", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
							<div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Latitude</div>
							<div style={{ fontWeight: 500, fontSize: "14px", fontFamily: "monospace" }}>{latLng.lat.toFixed(4)}</div>
						</div>
						<div style={{ flex: 1, padding: "10px", background: "rgba(0,0,0,0.3)", borderRadius: "8px" }}>
							<div style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Longitude</div>
							<div style={{ fontWeight: 500, fontSize: "14px", fontFamily: "monospace" }}>{latLng.lng.toFixed(4)}</div>
						</div>
					</div>

					<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px", padding: "12px", background: "rgba(0,0,0,0.2)", borderRadius: "8px", border: hotspotResult === 'Yes' ? '1px solid var(--accent-red)' : '1px solid transparent', transition: 'border 0.3s' }}>
						<button onClick={checkHotspot} style={{ padding: "8px 16px", backgroundColor: "rgba(6, 182, 212, 0.2)", color: "var(--accent-cyan)", border: "1px solid var(--accent-cyan)", borderRadius: "6px", cursor: "pointer", fontWeight: 500, transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.backgroundColor='var(--accent-cyan)'} onMouseOut={e => e.currentTarget.style.backgroundColor='rgba(6, 182, 212, 0.2)'}>
							Verify Hotspot
						</button>
						<div style={{ fontWeight: "bold", fontSize: "14px", color: hotspotResult === "Yes" ? "var(--accent-red)" : (hotspotResult === 'No' ? 'var(--accent-green)': 'var(--text-secondary)') }}>
							{hotspotResult ? `Matched: ${hotspotResult}` : "Pending"}
						</div>
					</div>

					<h4 style={{ marginBottom: "12px", color: "var(--text-secondary)", fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>Environmental Variables</h4>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginBottom: "16px" }}>
						{["Temperature_F", "Wind_Chill_F", "Humidity_pct", "Pressure_in", "Visibility_mi", "Wind_Speed_mph", "Precipitation_in"].map((key) => (
							<div key={key}>
								<label style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>{key.replace(/_/g, " ")}</label>
								<input type='number' name={key} value={formData[key]} onChange={handleInputChange} className="glass-input" />
							</div>
						))}
                        <div>
                            <label style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Time Of Day</label>
                            <input type='time' value={timeStr} onChange={(e) => setTimeStr(e.target.value)} className="glass-input" />
                        </div>
					</div>
                    <div style={{ marginBottom: "24px" }}>
                        <label style={{ fontSize: "12px", color: "var(--text-secondary)", display: "block", marginBottom: "4px" }}>Weather Condition</label>
                        <select value={weatherSelect} onChange={e => setWeatherSelect(e.target.value)} className="glass-input" style={{width: '100%', appearance: 'auto', cursor: 'pointer'}}>
                            <option value="Unknown">Unknown / Fair</option>
                            <option value="Cloudy">Cloudy</option>
                            <option value="Dusty">Dusty</option>
                            <option value="Hazy">Hazy</option>
                            <option value="Rainy">Rainy</option>
                            <option value="Snowy">Snowy</option>
                            <option value="Thunderstorm">Thunderstorm</option>
                        </select>
                    </div>

					<h4 style={{ marginBottom: "12px", color: "var(--text-secondary)", fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>Infrastructure Hazards</h4>
					<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "24px" }}>
						{["Amenity", "Bump", "Crossing", "Give_Way", "Junction", "No_Exit", "Railway", "Roundabout", "Station", "Stop", "Traffic_Calming", "Traffic_Signal", "Turning_Loop"].map((key) => (
							<button key={key} onClick={(e) => { e.preventDefault(); handleToggle(key); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 12px", background: getToggleColor(formData[key]), color: formData[key] === 1 ? '#000': 'white', border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", textAlign: "left", transition: 'all 0.2s', boxShadow: formData[key] === 1 ? '0 0 10px var(--accent-green)' : 'none' }}>
								<span>{key.replace(/_/g, " ")}</span>
							</button>
						))}
					</div>

					<button onClick={(e) => { e.preventDefault(); handleSubmit(); }} className="btn-primary" style={{ width: "100%", padding: "14px", fontSize: "16px", background: 'linear-gradient(45deg, var(--accent-cyan), var(--accent-blue))' }}>
						Analyze Collision Risk
					</button>
				</div>
			)}

			{!panelOpen && (
				<button onClick={() => setPanelOpen(true)} className="glass-panel" style={{ position: "absolute", top: "100px", left: "30px", zIndex: 1000, padding: "12px 20px", color: "var(--accent-cyan)", border: "1px solid var(--accent-cyan)", cursor: "pointer", fontWeight: "bold" }}>
					Configure Settings &rarr;
				</button>
			)}

            {/* Dynamic Severity Context Modal */}
			<Modal isOpen={isModalOpen} onRequestClose={closeModal} style={{
					overlay: { backgroundColor: "rgba(0, 0, 0, 0.8)", zIndex: 2000, backdropFilter: 'blur(10px)' },
					content: {
						position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
						background: 'var(--bg-panel-solid)', border: `2px solid ${severityColor}`, boxShadow: `0 0 60px ${severityColor}50`,
						borderRadius: '20px', padding: '40px', color: 'white', maxWidth: '400px', width: '90%', bottom: 'auto', right: 'auto',
                        transition: 'all 0.5s'
					},
				}}>
				<h2 style={{ textAlign: "center", margin: 0, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '2px', color: 'var(--text-secondary)' }}>Prediction Engine</h2>
				<div style={{ textAlign: "center", fontSize: "32px", fontWeight: "800", padding: "30px 0", color: severityColor, textShadow: `0 0 20px ${severityColor}` }}>
                    {modalContent.text}
                </div>
				<button onClick={closeModal} style={{ width: "100%", padding: '12px', fontSize: '16px', background: severityColor, color: '#000', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'filter 0.2s' }} onMouseOver={e => e.currentTarget.style.filter='brightness(1.2)'} onMouseOut={e => e.currentTarget.style.filter='brightness(1.0)'}>
                    Acknowledge
                </button>
			</Modal>
		</div>
	);
};

export default MapComponent;
