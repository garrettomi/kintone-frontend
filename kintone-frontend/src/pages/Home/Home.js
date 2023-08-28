import "./Home.css";
import { useState } from "react";
import LoadingSpinner from "../../components/spinner";
import CountryPicker from "../../components/countryPicker.js";
import StatePicker from "../../components/statePicker.js";
import CityPicker from "../../components/cityPicker.js";
import Mapbox from "../../components/Map/Map";
// Import the functions to make API calls
import getRecords from "../../requests/getRecords.js";
import postRecord from "../../requests/postRecord.js";

function Home() {
  // Our hooks for data and setting that data.
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [records, setRecords] = useState([]);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);

  const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

  // Submit button's onclick function. Calls POST request
  const submit = async () => {
    setLoading(true);
    let location = {
      country: selectedCountry.name,
      state: selectedState.name,
      city: selectedCity.name,
    };
    console.log(selectedCountry);

    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${location.city},${location.state},${location.country}.json?access_token=${MAPBOX_TOKEN}`
    );
    const data = await response.json();
    const coordinates = data.features[0].center;

    setSelectedCoordinates(coordinates);

    if (selectedCountry === "") {
      alert("At least pick a country...");
    } else {
      let response = await postRecord(location);
      console.log(response);
    }
    setLoading(false);
  };

  // Get button's onClick function. Calls GET API request.
  const get = async () => {
    setLoading(true);
    let response = await getRecords();
    let locationArray = [];
    response.records.forEach((record, index) => {
      locationArray.push(
        <li key={index}>
          {record.country.value}, {record.state.value}, {record.city.value}
        </li>
      );
    });
    setRecords(locationArray);
    setLoading(false);
  };

  // Our react JSX.
  return (
    <div className="main">
      <h2>Travel Tracker</h2>
      {/* If loading is true, show a spinner, otherwise show nothing. */}
      {loading ? (
        <div className="loadingDiv">
          <LoadingSpinner />
        </div>
      ) : null}
      Where have you visited?
      <div className="selectDiv">
        <p>Pick a Country</p>
        <CountryPicker
          selectedCountry={selectedCountry}
          setSelectedCountry={setSelectedCountry}
        />
        <p>Then Pick a State</p>
        <StatePicker
          selectedCountry={selectedCountry}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />
        <p>Lastly, Pick a City</p>
        <CityPicker
          selectedState={selectedState}
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
        />
      </div>
      <div className="submitDiv">
        <button onClick={submit} disabled={loading ? true : false}>
          Submit!
        </button>
        <button onClick={get} disabled={loading ? true : false}>
          Get!
        </button>
      </div>
      <div className="listRecordsDiv">
        <ul>{records}</ul>
      </div>
      <div>
        <Mapbox selectedCoordinates={selectedCoordinates} />
      </div>
    </div>
  );
}

export default Home;
