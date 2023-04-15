import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

const exampleChainData = {
  chain: [
    // ...
    // Your example chain data goes here
    // ...
  ],
};

function App() {
  const [chain, setChain] = useState([]);

  useEffect(() => {
    // Replace this with your actual API call
    const fetchChainData = async () => {
      const response = await fetch("http://localhost:3001/blockchain");
      const data = await response.json();
      //const data = exampleChainData;
      setChain(data.chain);
    };

    fetchChainData();
  }, [chain]);

  return (
    <div className="App">
      <MapContainer
        center={[0, 0]}
        zoom={3}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
        />
        {chain.map((block, index) => {
          if (block.latitude && block.longitude) {
            return (
              <Marker
                key={index}
                position={[
                  parseFloat(block.latitude),
                  parseFloat(block.longitude),
                ]}
              >
                <Popup>
                  Block Index: {block.index}
                  <br />
                  Timestamp: {block.timestamp}
                  <br />
                  Latitude: {block.latitude}
                  <br />
                  Longitude: {block.longitude}
                </Popup>
              </Marker>
            );
          } else {
            return null;
          }
        })}
      </MapContainer>
    </div>
  );
}

export default App;
