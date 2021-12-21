import axios from "axios";
import CountryList from "./countryList";
//get data from countrystatecity and weathermapApi
const getStateByCountry = async (countryCode) => {
  let data = [];
  const res = await axios({
    method: "get",
    url: `https://api.countrystatecity.in/v1/countries/${countryCode}/states`,
    headers: { "X-CSCAPI-KEY": process.env.REACT_APP_STATE_KEY },
  });
  data = res.data;
  data.sort((a, b) => {
    if (a.name > b.name) return 1;
    else return -1;
  });
  return data;
};
const getCodeByCountry = (country) => {
  const foundCountry = CountryList.find((c) => {
    return c.name === country;
  });
  return foundCountry.code;
};
const getWeatherByState = async (State) => {
  const weatherObj = await axios({
    method: "get",
    url: "https://api.openweathermap.org/data/2.5/weather",
    params: {
      appid: process.env.REACT_APP_WEATHER_API_KEY,
      q: State,
    },
  })
    .then((res) => {
      const { data } = res;
      const weather = {
        name: data.name,
        temp: (data.main.temp - 273.15).toFixed(2),
        humidity: data.main.humidity,
        maxTemp: (data.main.temp_max - 273.15).toFixed(2),
        minTemp: (data.main.temp_min - 273.15).toFixed(2),
        imgUrl: data.weather[0].icon,
      };
      return weather;
    })
    .catch((error) => {
      throw new Error("no weather data for the selected state");
    });
  return weatherObj;
};
const getForecastByState = async (state) => {
  let filteredList;
  const dt = new Date();

  const result = await axios({
    url: `https://api.openweathermap.org/data/2.5/forecast?q=${state}&appid=${process.env.REACT_APP_WEATHER_API_KEY}`,
    method: "get",
  });

  const fullList = result.data.list;
  filteredList = fullList.filter((weather) => {
    const wDate = new Date(weather.dt_txt);
    return wDate > dt;
  });
  const dateList = [
    ...new Set(
      filteredList.map((item) => {
        const dt = new Date(item.dt_txt);
        const date = dt.toLocaleDateString("en-GB");
        return date;
      })
    ),
  ];
  filteredList = filteredList.map((item) => {
    const temp = (item.main.temp - 273.15).toFixed(2);
    const image = item.weather[0].icon;
    const weathertext = item.weather[0].description;

    const dt = new Date(item.dt_txt);
    const day = dt.toLocaleDateString("en-us", { weekday: "long" });
    const date = dt.toLocaleDateString("en-GB");
    const time = dt.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    return {
      id: item.dt,
      temperature: temp,
      image: image,
      weather: weathertext,
      date: date,
      day: day,
      time: time,
    };
  });

  return { city: state, list: filteredList, dateList: dateList };
};
export {
  getStateByCountry,
  getCodeByCountry,
  getWeatherByState,
  getForecastByState,
};
