
import "./App.css";
import { useState } from "react";
import axios from "axios";

const OPEN_WEATHER_API_KEY = "e4e45d016a19f7ec736aad5be209b912";

function App(){

  const [cityInputValue, setCityInputValue] = useState("");
  const [weather, setWeather] = useState({});
  const [cityOutputValue, setCityOutputValue] = useState("");
  const [icon, setIcon] = useState();
  
  const handleChange = (event) => {
    setCityInputValue(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityInputValue}&limit=1&appid=${OPEN_WEATHER_API_KEY}`
      )
      .then((response) => (response.data[0]))
      .then((cityGeoData)=>
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${cityGeoData.lat}&lon=${cityGeoData.lon}&appid=${OPEN_WEATHER_API_KEY}&units=metric`
        )
      )
      .then((response)=> {
        const weatherData = response.data;
        setCityOutputValue(weatherData.name)
        setWeather(weatherData.main)
        setIcon(weatherData.weather[0].icon)
        // console.log(weather);
      })
      .catch((err)=> console.log(err));
  };

if (cityOutputValue){
  return (
  <div className = "App">
    <p>Type in city to view weather</p>
    <form onSubmit = {handleSubmit}>
      <input 
          type="text"
          value = {cityInputValue}
          onChange = {handleChange}
           />
      <button type = "submit"> Submit</button>
    </form>
      <div>
      <p>This is the weather for {cityOutputValue}:</p>
      <img
    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
    alt="weather description icon"/>
      <p>Feels like: {weather.feels_like}</p>
      <p>Temperature: {weather.temp}</p>
      <p>Temperature min: {weather.temp_min}</p>
      <p>Temperature max: {weather.temp_max}</p>
      <p>Humidity: {weather.humidity}</p>
    </div>
  
  </div>
)
} else {
    return (
    <div className = "App">
      <p>Type in your city to view the weather.</p>
      <form onSubmit = {handleSubmit}>
        <input 
            type="text"
            value = {cityInputValue}
            onChange = {handleChange}
            />
        <button type = "submit"> Submit</button>
      </form>
    </div>
  )
  }
}

export default App;
