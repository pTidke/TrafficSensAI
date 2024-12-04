import React, { useEffect } from "react";
import "@arcgis/core/assets/esri/themes/light/main.css";
import MapView from "@arcgis/core/views/MapView";
import WebMap from "@arcgis/core/WebMap";

const MapViewer = () => {
    useEffect(() => {
        const webmap = new WebMap({
            portalItem: {
                id: "46da80f91873440a91fa30ae024da3b0" // Replace with your map ID
            }
        });

        new MapView({
            container: "mapDiv",
            map: webmap,
            zoom: 10,
        });
    }, []);

    return <div id="mapDiv" style={{ height: "600px", width: "100%" }}></div>;
};

export default MapViewer;
