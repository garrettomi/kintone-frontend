import { useState, useEffect } from "react";
import { Map } from "react-map-gl";
import Markers from "../Markers/Markers";
import "./Map.css";

const Mapbox = ({ selectedCoordinates, retrieveCoordinates }) => {
  // console.log("Selected Coordinates", selectedCoordinates);
  console.log("GET COORDINATES PROPS", retrieveCoordinates);
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const initialViewport = {
    latitude: 37.7749,
    longitude: -122.4194,
    zoom: 8,
  };

  const [viewport, setViewport] = useState(initialViewport);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (retrieveCoordinates) {
      const newMarker = {
        key: Date.now(),
        longitude: retrieveCoordinates[0],
        latitude: retrieveCoordinates[1],
      };
      setMarkers([...markers, newMarker]);
    }
  }, [retrieveCoordinates]);

  const handleViewPortChange = (newViewport) => {
    setViewport(newViewport);
  };

  // const handleMapClick = (e) => {
  //   const newMarker = {
  //     key: Date.now(),
  //     longitude: e.lngLat.lng,
  //     latitude: e.lngLat.lat,
  //   };
  //   console.log("newMarker", newMarker);
  //   setMarkers([...markers, newMarker]);
  // };

  return (
    <div className="map-container">
      <Map
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
        initialViewState={viewport}
        onViewPortChange={handleViewPortChange}
        // onClick={handleMapClick}
      >
        {markers.map((marker) => (
          <Markers
            key={marker.key}
            latitude={marker.latitude}
            longitude={marker.longitude}
            offsetLeft={-20}
            offsetTop={-10}
          />
        ))}
      </Map>
    </div>
  );
};

export default Mapbox;
