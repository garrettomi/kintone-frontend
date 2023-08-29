import { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import "./Markers.css";

const Markers = ({ latitude, longitude, offsetLeft, offsetTop }) => {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

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
      {showPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          closeButton={true}
          closeOnClick={false}
          onClose={togglePopup}
          anchor="top"
        >
          <div>This is a pop-up</div>
        </Popup>
      )}
    </div>
    // <Marker
    //   latitude={latitude}
    //   longitude={longitude}
    //   offsetLeft={offsetLeft}
    //   offsetTop={offsetTop}
    // >
    //   <div className="marker"></div>
    // </Marker>
  );
};

export default Markers;
