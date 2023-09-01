import "./Home.css";
import { useState, useEffect, useContext } from "react";
// import LoadingSpinner from "../../components/spinner";
import CountryPicker from "../../components/countryPicker.js";
import StatePicker from "../../components/statePicker.js";
import CityPicker from "../../components/cityPicker.js";
import Mapbox from "../../components/Map/Map";
import getRecords from "../../requests/getRecords.js";
import postRecord from "../../requests/postRecord.js";
import UserContext from "../../context/UserContext";
import Logout from "../Logout/Logout";
import CloudinaryWidget from "../../components/CloudinaryWidget/CloudinaryWidget";

function Home() {
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [location, setLocation] = useState(null);
  const [imageUrl, setImageUrl] = useState("");

  const userEmail = useContext(UserContext);

  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  useEffect(() => {
    async function fetchData() {
      // setLoading(true);

      let response = await getRecords();
      let getLocation = response.records
        .filter((record) => record.email.value === userEmail.userEmail)
        .map((record) => {
          const city = record.city.value;
          const country = record.country.value;
          const state = record.state ? record.state.value : "";
          const locCoordsX = record.locCoordsX.value;
          const locCoordsY = record.locCoordsY.value;
          const imageUrl = record.imageUrl.value;

          return {
            city,
            country,
            state,
            locCoordsX,
            locCoordsY,
            imageUrl,
          };
        });

      setLocation(getLocation);
      // setLoading(false);
    }

    fetchData();
  }, [userEmail.userEmail]);

  const submit = async () => {
    // setLoading(true);
    let location = {
      country: selectedCountry.name,
      state: selectedState.name,
      city: selectedCity.name,
      imageUrl: imageUrl,
    };

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.city},${location.state},${location.country}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    const coordinates = data.features[0].center;
    setSelectedCoordinates(coordinates);

    location = {
      country: selectedCountry.name,
      state: selectedState.name,
      city: selectedCity.name,
      email: userEmail.userEmail,
      locCoordsX: coordinates[0],
      locCoordsY: coordinates[1],
      imageUrl: imageUrl,
    };

    console.log("NEW LOCATION:", location);

    if (selectedCountry === "") {
      alert("At least pick a country...");
    } else {
      let response = await postRecord(location);
      console.log(response);

      setLocation((prevLocation) => [...prevLocation, location]);
    }
    // setLoading(false);
  };

  return (
    <div className="main">
      <nav className="navbar">
        <h2>Travel Tracker</h2>
        <div className="user-info">Logged in as: {userEmail.userEmail}</div>
        <Logout />
      </nav>
      {/* {loading ? (
        <div className="loadingDiv">
          <LoadingSpinner />
        </div>
      ) : null}
      Where have you visited? */}
      <div className="pickers-container">
        <div className="selectDiv">
          <div className="picker">
            <p>Pick a Country...</p>
            <CountryPicker
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
            />
          </div>
          <div className="picker">
            <p>Then the State...</p>
            <StatePicker
              selectedCountry={selectedCountry}
              selectedState={selectedState}
              setSelectedState={setSelectedState}
            />
          </div>
          <div className="picker">
            <p>Last the City!</p>
            <CityPicker
              selectedState={selectedState}
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />
          </div>
        </div>
        <CloudinaryWidget imageUrl={imageUrl} setImageUrl={setImageUrl} />
        <div className="submitDiv">
          <button
            onClick={submit}
            // disabled={loading ? true : false}
          >
            Submit!
          </button>
        </div>
      </div>
      <Mapbox selectedCoordinates={selectedCoordinates} location={location} />
    </div>
  );
}

export default Home;
