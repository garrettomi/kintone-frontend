import { useState, useEffect } from "react";
import { Map } from "react-map-gl";
import Markers from "../Markers/Markers";
import "./Map.css";

const Mapbox = ({ selectedCoordinates, location }) => {
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const initialViewport = {
    latitude: 0,
    longitude: 0,
    zoom: 1.25,
    minZoom: 0,
    maxZoom: 10,
  };

  const [viewport, setViewport] = useState(initialViewport);
  const [markers, setMarkers] = useState([]);

  // useEffect(() => {
  //   if (selectedCoordinates) {
  //     const newMarker = {
  //       key: Date.now(),
  //       longitude: selectedCoordinates[0],
  //       latitude: selectedCoordinates[1],
  //     };
  //     // setMarkers([...markers, newMarker]);
  //   }
  // }, [selectedCoordinates, markers]);

  useEffect(() => {
    if (location) {
      const newMarkers = location.map((loc, index) => ({
        key: index,
        longitude: loc.locCoordsX,
        latitude: loc.CoordsY,
      }));
      setMarkers(newMarkers);
    }
  }, [location]);

  const handleViewPortChange = (newViewport) => {
    const maxAllowedLongitude = 180;
    const minAllowedLongitude = -180;

    if (newViewport.longitude > maxAllowedLongitude) {
      newViewport.longitude = maxAllowedLongitude;
    } else if (newViewport.longitude < minAllowedLongitude) {
      newViewport.longitude = minAllowedLongitude;
    }
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
        {markers.map((marker, index) => (
          <Markers
            key={index}
            latitude={marker.latitude}
            longitude={marker.longitude}
            offsetLeft={-20}
            offsetTop={-10}
            location={location}
          />
        ))}
      </Map>
    </div>
  );
};

export default Mapbox;
