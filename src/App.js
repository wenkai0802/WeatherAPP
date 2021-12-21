import axios from "axios";
import { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import countries from "./data/countryList.js";
import { useAppContext } from "./Context";
import StateCard from "./StateCard.js";
import Error from "./Error.js";
import WeatherComponent from "./WeatherComponent.js";
import {
  getCodeByCountry,
  getForecastByState,
  getStateByCountry,
  getWeatherByState,
} from "./data/DataProvider";
import "./App.css";

function App() {
  const {
    CountryInput,
    setCountryInput,
    weatherObj,
    setWeatherObj,
    StateList,
    setStateList,
    selectedState,
    setSelectedState,
  } = useAppContext(); //get useState variable from appContext
  const [display, setDisplay] = useState(false); //display unavailable state information for chosen country
  const [errorMsg, setError] = useState(""); //error message for unavailable state weather
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    //request for weather data whenever the selected State change
    async function reqWeather() {
      try {
        if (selectedState !== null) {
          setWeatherObj(await getForecastByState(selectedState));
        } else setWeatherObj(null);
      } catch (error) {
        setError("Sorry, No Weather data avaiable for this city");
        setWeatherObj(null);
      }
    }
    setLoading(true);
    reqWeather();
    setLoading(false);
  }, [selectedState]);
  const clearError = () => {
    setError(null);
    setDisplay(false);
  };
  const onSearch = async (e) => {
    //called when user choose a state
    e.preventDefault();

    setCountryInput(e.target.value);
    if (e.target.value === "--Select Country--") {
      setStateList([]);
      return;
    }
    setLoading(true);
    if (e.target.value !== "Singapore") {
      const code = getCodeByCountry(e.target.value);
      const stateArray = await getStateByCountry(code);
      setStateList(stateArray);
      if (stateArray.length === 0) setDisplay(true);
    } else {
      setStateList([{ id: "Sg", name: "Singapore" }]);
    }
    setLoading(false);
  };
  return (
    <div className="App">
      <h1>MyWeather</h1>
      <div className="main">
        <form>
          <select name="CountriesDDL" onChange={onSearch}>
            <option>--Select Country--</option>
            {countries.map((country) => {
              return (
                <option key={country.code} id={country.code}>
                  {country.name}
                </option>
              );
            })}
          </select>
        </form>
        {isLoading ? <div className="loader"></div> : null}
        {display ? (
          <Error
            clearError={clearError}
            message={`Sorry,No State information available for ${CountryInput}`}
          />
        ) : null}

        <div className="stateTable">
          {StateList.map((stateObj) => {
            return <StateCard {...stateObj} />;
          })}
        </div>
        {errorMsg && <Error message={errorMsg} clearError={clearError} />}
        {weatherObj && <WeatherComponent {...weatherObj} />}
      </div>
    </div>
  );
}

export default App;
