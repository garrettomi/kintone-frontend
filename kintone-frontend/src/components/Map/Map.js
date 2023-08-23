import { useState } from "react";
import { Map } from "react-map-gl";
import Markers from "../Markers/Markers";
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
      >
        <Markers
          latitude={37.7749}
          longitude={-122.4194}
          offsetLeft={-20}
          offsetTop={-10}
        />
      </Map>
    </div>
  );
};

export default Mapbox;
