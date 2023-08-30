import { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import "./Markers.css";

const Markers = ({ location }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const togglePopup = (loc) => {
    setSelectedLocation(selectedLocation === loc ? null : loc);
  };

  return (
    <div>
      {location.map((loc, index) => (
        <Marker
          key={index}
          latitude={Number(loc.locCoordsY)}
          longitude={Number(loc.locCoordsX)}
        >
          <div className="marker" onClick={() => togglePopup(loc)}>
            📍
          </div>
        </Marker>
      ))}
      {selectedLocation && (
        <Popup
          latitude={Number(selectedLocation.locCoordsY)}
          longitude={Number(selectedLocation.locCoordsX)}
          closeButton={true}
          closeOnClick={false}
          onClose={() => setSelectedLocation(null)}
          anchor="top"
        >
          <div>
            <p>Country: {selectedLocation.country}</p>
            <p>State: {selectedLocation.state}</p>
            <p>City: {selectedLocation.city}</p>

            {selectedLocation.imageUrl && (
              <img
                src={selectedLocation.imageUrl}
                className="locationImage"
                alt="location"
              />
            )}
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Markers;
