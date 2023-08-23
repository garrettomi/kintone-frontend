import { Marker } from "react-map-gl";
import "./Markers.css";

const Markers = ({ latitude, longitude, offsetLeft, offsetTop }) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      offsetLeft={offsetLeft}
      offsetTop={offsetTop}
    >
      <div className="marker"></div>
    </Marker>
  );
};

export default Markers;
