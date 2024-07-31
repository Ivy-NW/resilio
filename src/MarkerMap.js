import React, { useState, useRef } from "react";
import { TileLayer, Marker, Popup } from "react-leaflet";
import { MapContainer as Map } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

import osm from "./osm-providers";
import cities from "./cities.json";
import Navbar from "./components/Nav/Navbar";
import Footer from "./Footer";

// Define marker icons for different facility types
const markerIcons = {
  Shelter: new L.Icon({
    iconUrl: require("./assets/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  Hospital: new L.Icon({
    iconUrl: require("./assets/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  Firehouse: new L.Icon({
    iconUrl: require("./assets/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  }),
  "Police Station": new L.Icon({
    iconUrl: require("./assets/marker.png"),
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  })
};

const MarkersMap = () => {
  const [center, setCenter] = useState({ lat: -1.286389, lng: 36.817223 }); // Center of Kenya
  const ZOOM_LEVEL = 6; // Adjust zoom level to cover Kenya
  const mapRef = useRef();

  // Define facility types
  const facilityTypes = ['Shelter', 'Hospital', 'Firehouse', 'Police Station'];

  return (
    <div className="App">
      <Navbar />
      <>
        <div className="mb-3">
          <div className="text-center">
            <h1 style={{ color: "#1a2a6c" }}>Emergency Facilities in Kenya</h1>
            <p style={{ color: "#1a2a6c" }}>Nearest emergency facilities across Kenya</p>
            <div>
              <Map center={center} zoom={ZOOM_LEVEL} ref={mapRef} style={{ height: "70vh" }}>
                <TileLayer
                  url={osm.maptiler.url}
                  attribution={osm.maptiler.attribution}
                />

                {facilityTypes.map(type => (
                  cities.filter(city => city.type === type).map((city, idx) => (
                    <Marker
                      position={[city.lat, city.lng]}
                      icon={markerIcons[city.type]}
                      key={idx}
                    >
                      <Popup>
                        <b>{city.name}</b><br />
                        {city.type}
                      </Popup>
                    </Marker>
                  ))
                ))}

              </Map>
            </div>
          </div>
        </div>
      </>
      <Footer />
    </div>
  );
};

export default MarkersMap;
