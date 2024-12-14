import React, { useEffect, useRef, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/download.png'
import wind_icon from '../assets/wind-icon.png'
import snow_icon from '../assets/snow-icon.png'
import rain_icon from '../assets/rain.icon.png'
import humidity_icon from '../assets/humidity-icon.png'
import drizzle_icon from '../assets/drizzle-icon.png'
import cloud_icon from '../assets/cloud-icon.png'
import clear_icon from '../assets/clear-icon.jpeg'


const Weather = () => {

    const inputRef = useRef()

    const [weatherData, setWeatherData] = useState(false);

    const search = async(city) => {
        if(city === ''){
            alert('Please enter a city name');
            return;
        }

        try {
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${import.meta.env.VITE_APP_ID}`;

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                city: data.name,
                country: data.sys.country,
                temp: Math.floor(data.main.temp - 273.15), // convert Kelvin to Celsius
                location: data.name,
                description: data.weather[0].description,
                icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            })
        } catch(error) {
            setWeatherData(false);
            console.error("Error in fetching data");
        }
    }

    useEffect(() => {
        search('London'); // default city
    }, []);

  return (
    <div className='weather'>
        <div className="search-bar">
            <input ref={inputRef} type='text' placeholder='Search here' className='search'/>
            <img src={search_icon} className='search-icon' onClick={() => search(inputRef.current.value)}/>
        </div>

        {weatherData?<><img src={weatherData.icon} className='weather-icon'/> 
        <p className='temp'>{weatherData.temp}°C</p>
        <p className='location'>{weatherData.location}</p>
        <div className="weather-data">
            <div className="col">
                <img src={humidity_icon} className='weather-icon'/>
                <div>
                    <p>{weatherData.humidity} %</p>
                    <p>Humidity</p>
                </div>
            </div><div className="col">
                <img src={wind_icon} className='weather-icon'/>
                <div>
                    <p>{weatherData.windSpeed} kmph</p>
                    <p>Wind Speed</p>
                </div>
            </div>
        </div></>:<></>}

    </div>
  )
}

export default Weather