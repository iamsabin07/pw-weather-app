import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import './App.css';
import ToggleSwitch from "./Toggle";

const App = () =>{
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState({});
    const [togle, setTogle] = useState(false);
    const[fahrenheit, setFahrenheit] = useState(false);
    const [ temp, setTemp] = useState(0);
    const[celTemp, setCelTemp] = useState(0);
    const[fahTempr, setFahTempr] = useState(0);

    const handleSearch =  async(e) =>{
        
        if(e.key === 'Enter'){
            const data = await fetchWeather(city);
            if(!fahrenheit){
                setCelTemp(data.main.temp)
            }
            else{
                const fahTemp = (data.main.temp * 1.8)+32;
                setFahTempr(fahTemp);
            }
            console.log(data);
            setWeather(data);
            setTogle(true);
            setCity('');


        }
    }
    const handleClick = () =>{
        if(!fahrenheit){
            const fahTemp = (weather.main.temp * 1.8)+32;
            setFahTempr(fahTemp);
        }
        setFahrenheit(!fahrenheit);
    }
    return (
        <div className="main-container">
            
            <div className="input-toggle">
            <input  
                type = "text"
                className="search"
                placeholder="Enter a city name"
                value = {city}
                onChange = {(e)=>setCity(e.target.value)}
                onKeyPress = {handleSearch}
            />
            {togle &&<ToggleSwitch label = "Unit" handleClick={handleClick}/>}
            </div>

            {weather.main && (

                        <div className="city">
                        <h2 className="city-name">
                            {weather.name}
                            <sup>{weather.sys.country}</sup>
                        </h2>
                        {fahrenheit?
                                <div className="city-temp">
                                    {Math.round(fahTempr)}
                                    <sup>&deg;F</sup>
                                </div>:
                                <div className="city-temp">
                                {Math.round(celTemp)}
                                <sup>&deg;C</sup>
                            </div>                                }
                        <div className="info">
                            <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
                            <p>{weather.weather[0].description}</p>
                            <p>Humidity: {weather.main.humidity}%</p>
                        </div>
                </div>
            )}
        </div>
    )

}

export default App;