import { useState } from "react";
import { Map } from "react-map-gl";
import "./Map.css";

const Mapbox = () => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const initialViewport = {
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 8,
  };

  const [viewport, setViewport] = useState(initialViewport);

  const handleViewPortChange = (newViewport) => {
    setViewport(newViewport);
  };

  return (
    <div className="map-container">
      <Map
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewport}
        onViewPortChange={handleViewPortChange}
      />
    </div>
  );
};

export default Mapbox;
