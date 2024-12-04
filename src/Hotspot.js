import React, { useEffect } from "react";

const Hotspot = () => {
	useEffect(() => {
		// Dynamically load the ArcGIS script
		const script = document.createElement("script");
		script.type = "module";
		script.src =
			"https://js.arcgis.com/embeddable-components/4.31/arcgis-embeddable-components.esm.js";
		script.async = true;
		document.head.appendChild(script);

		// Clean up the script when the component unmounts
		return () => {
			document.head.removeChild(script);
		};
	}, []);

	return (
		<div style={{ height: "100vh", width: "100vw", margin: 0, padding: 0 }}>
			<arcgis-embedded-map
				style={{
					height: "calc(100vh - 50px)", // Adjusting height to leave space for the header
					width: "100%",
				}}
				item-id='46da80f91873440a91fa30ae024da3b0'
				theme='dark'
				portal-url='https://sdsugeo.maps.arcgis.com'
				bookmarks-enabled
				heading-enabled
				legend-enabled
				information-enabled
				share-enabled
			></arcgis-embedded-map>
		</div>
	);
};

export default Hotspot;
