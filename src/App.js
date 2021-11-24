import axios from 'axios';
import { useEffect,useRef, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import countries from "./data/countryList.js"
import {useAppContext} from "./Context"
import StateCard from './StateCard.js';
import Error from './Error.js';
import WeatherComponent from './WeatherComponent.js';
import {getCodeByCountry,getStateByCountry,getWeatherByState} from "./data/DataProvider"
import './App.css';

function App() {
  const {CountryInput,setCountryInput,weatherObj,setWeatherObj,StateList,setStateList,selectedState,setSelectedState}= useAppContext();//get useState variable from appContext
  const [display,setDisplay]  = useState(false);//display unavailable state information for chosen country
  const [errorMsg,setError] = useState("");//error message for unavailable state weather

  useEffect(()=>{
    //request for weather data whenever the selected State change
    async function reqWeather(){
      try {
 
        if(selectedState!==null)
          setWeatherObj(await getWeatherByState(selectedState));
        else
          setWeatherObj(null)

      } catch (error) {
        setError(error);
        setWeatherObj(null);
  
      }
        
    }
     reqWeather();
  },[selectedState])
  const clearError = ()=>{
    setError(null);
    setDisplay(false);
  }
  const onSearch = async(e)=>{
     //called when user choose a state
     e.preventDefault();
    const code = getCodeByCountry(e.target.value);
    const stateArray = await getStateByCountry(code);
    setStateList(stateArray);
    if(stateArray.length===0)
      setDisplay(true);
    setCountryInput(e.target.value)

   
   }
  return (
    
    <div className="App">
   
    <h1>MyWeather</h1>
    <div className="main">
      <form >
        <select name="CountriesDDL"   onChange={onSearch}>
          {countries.map((country)=>{
            return <option key={country.code} id={country.code}>{country.name}</option>
          })}
        </select>
   
      </form>
       
      {display?<Error clearError={clearError} message={`Sorry,No State information available for ${CountryInput}`}/>:null}
      
      <div className="stateTable">
      {StateList.map((stateObj)=>{
        return <StateCard {...stateObj}/>
      })}
      </div>
      {errorMsg&&<Error message={errorMsg.message} clearError={clearError}/>}
      {weatherObj&&<WeatherComponent {...weatherObj}/>}
      </div>
    </div>
  );
}

export default App;
