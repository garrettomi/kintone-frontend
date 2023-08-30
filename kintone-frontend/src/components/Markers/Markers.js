import { Marker, Popup } from "react-map-gl";
import { useState } from "react";
import "./Markers.css";

const Markers = ({ latitude, longitude, offsetLeft, offsetTop, location }) => {
  // const [showPopup, setShowPopup] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // const togglePopup = () => {
  //   setShowPopup(!showPopup);
  // };

  const togglePopup = (loc) => {
    setSelectedLocation(selectedLocation === loc ? null : loc);
  };

  console.log("LOCATION", location);

  // const coordinates = location.map((loc) => ({
  //   longitude: Number(loc.locCoordsX),
  //   latitude: Number(loc.locCoordsY),
  // }));

  // const handleMarkerClick = (location) => {
  //   setSelectedLocation(location);
  // };

  // console.log("COORDINATES", coordinates);

  // const locationInfo = location.find(
  //   (loc) => loc.coordinates[0] === longitude && loc.coordinates[1] === latitude
  // );

  // console.log("LOCATION INFO", locationInfo);

  return (
    // <div>
    //   <Marker latitude={latitude} longitude={longitude}>
    //     <div
    //       className="marker"
    //       style={{ marginLeft: offsetLeft, marginTop: offsetTop }}
    //       onClick={togglePopup}
    //     >
    //       📍
    //     </div>
    //   </Marker>
    //   {showPopup && (
    //     <Popup
    //       latitude={latitude}
    //       longitude={longitude}
    //       closeButton={true}
    //       closeOnClick={false}
    //       onClose={togglePopup}
    //       anchor="top"
    //     >
    //       <div>
    //         <p>Country: {locationInfo.country}</p>
    //         <p>State: {locationInfo.state}</p>
    //         <p>City: {locationInfo.city}</p>

    //         {locationInfo.imageUrl && (
    //           <img
    //             src={locationInfo.imageUrl}
    //             className="locationImage"
    //             alt="location"
    //           />
    //         )}
    //       </div>
    //     </Popup>
    //   )}
    // </div>
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
