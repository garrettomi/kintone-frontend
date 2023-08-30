import { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import "./Markers.css";

const Markers = ({ latitude, longitude, offsetLeft, offsetTop, location }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  console.log("LOCATION", location);

  const locationInfo = location.find(
    (loc) => loc.coordinates[0] === longitude && loc.coordinates[1] === latitude
  );

  console.log("LOCATION INFO", locationInfo);

  return (
    <div>
      <Marker latitude={latitude} longitude={longitude}>
        <div
          className="marker"
          style={{ marginLeft: offsetLeft, marginTop: offsetTop }}
          onClick={togglePopup}
        >
          📍
        </div>
      </Marker>
      {showPopup && locationInfo && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={togglePopup}
          anchor="top"
        >
          <div>
            <p>Country: {locationInfo.country}</p>
            <p>State: {locationInfo.state}</p>
            <p>City: {locationInfo.city}</p>

            {locationInfo.imageUrl && (
              <img
                src={locationInfo.imageUrl}
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
