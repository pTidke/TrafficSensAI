'use client';
import React, { useEffect, useRef } from "react";

export default function HotspotPage() {
  const containerRef = useRef(null);

	useEffect(() => {
		// Dynamically load the ArcGIS script
		const script = document.createElement("script");
		script.type = "module";
		script.src = "https://js.arcgis.com/embeddable-components/4.31/arcgis-embeddable-components.esm.js";
		script.async = true;
		document.head.appendChild(script);

		return () => {
      if (document.head.contains(script)) {
			  document.head.removeChild(script);
      }
		};
	}, []);

	return (
		<div style={{ height: "100vh", width: "100%", paddingTop: "100px", paddingBottom: "20px", display: 'flex', justifyContent: 'center' }}>
      <div className="glass-panel" style={{ width: '90%', height: 'calc(100vh - 120px)', padding: '16px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ marginBottom: "16px", color: 'var(--accent-cyan)' }}>Accident Hotspots</h2>
        <div ref={containerRef} style={{ flex: 1, borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--glass-border)' }}>
          <arcgis-embedded-map
            style={{ height: "100%", width: "100%" }}
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
      </div>
		</div>
	);
}
