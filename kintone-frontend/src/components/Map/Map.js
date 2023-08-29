import { useState, useEffect } from "react";
import { Map } from "react-map-gl";
import Markers from "../Markers/Markers";
import "./Map.css";

const Mapbox = ({ selectedCoordinates, location }) => {
  // console.log("Selected Coordinates", selectedCoordinates);
  console.log("LOCATION PROPS", location);
  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  const initialViewport = {
    latitude: 0,
    longitude: 0,
    zoom: 1,
    minZoom: 1,
    maxZoom: 10,
  };

  const [viewport, setViewport] = useState(initialViewport);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (selectedCoordinates) {
      const newMarker = {
        key: Date.now(),
        longitude: selectedCoordinates[0],
        latitude: selectedCoordinates[1],
      };
      setMarkers([...markers, newMarker]);
    }
  }, [selectedCoordinates]);

  useEffect(() => {
    if (location) {
      const newMarkers = location.map((loc, index) => ({
        key: index,
        longitude: loc.coordinates[0],
        latitude: loc.coordinates[1],
      }));
      setMarkers(newMarkers);
    }
  }, [location]);

  // useEffect(() => {
  //   if (retrieveCoordinates) {
  //     const newMarkers = retrieveCoordinates.map((coords, index) => ({
  //       key: index,
  //       longitude: coords[0],
  //       latitude: coords[1],
  //     }));
  //     setMarkers([...markers, ...newMarkers]);
  //   }
  // }, [retrieveCoordinates]);

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
