import axios from "axios"
import CountryList from "./countryList";
//get data from countrystatecity and weathermapApi
const getStateByCountry = async (countryCode)=>{
    let data=[];
    const res = await axios({
      method: 'get',
      url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
      headers:{"X-CSCAPI-KEY":process.env.REACT_APP_STATE_KEY}
    })
    data = res.data
    data.sort((a,b)=>{
      if(a.name>b.name)
        return 1;
      else 
        return -1;
    })
    return data;
}
const getCodeByCountry = (country)=>{
    const foundCountry = CountryList.find(c=>{
      return c.name===country
    })
    return foundCountry.code;
}
const getWeatherByState = async(State)=>{
  const weatherObj = await axios({

      method: 'get',
      url: 'https://api.openweathermap.org/data/2.5/weather',
      params:{
        appid:process.env.REACT_APP_WEATHER_API_KEY,
        q:State
      }
    }).then((res)=>{
      const {data} = res;
      const weather={
        name:data.name,
        temp:(data.main.temp-273.15).toFixed(2),
        humidity:data.main.humidity,
        maxTemp:(data.main.temp_max-273.15).toFixed(2),
        minTemp:(data.main.temp_min-273.15).toFixed(2),
        imgUrl:data.weather[0].icon
      }
      return weather;
    }).catch(error=>{
     
      throw new Error("no weather data for the selected state");
    })
    return weatherObj;
}
export {getStateByCountry,getCodeByCountry,getWeatherByState}