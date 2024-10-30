import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './App.css';

const WeatherApp = () => {
    const [city, setCity] = useState('Paris');
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [unit, setUnit] = useState("C");

    const showForecast = useCallback((response) => {
        const forecast = response.data.daily.map((day) => ({
            time: formatDay(day.time),
            icon: day.condition.icon_url,
            max: Math.round(day.temperature.maximum),
            min: Math.round(day.temperature.minimum),
        }));
        setForecastData(forecast);
    }, []);

    const getForecast = useCallback((city) => {
        const apiKey = "6b025c7d6331b719f34f6a74oab04ft9";
        const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
        axios.get(apiUrl).then(showForecast);
    }, [showForecast]); 

    const updateWeather = useCallback((response) => {
        const weather = response.data.daily[0];
        setWeatherData({
            city: response.data.city,
            temperature: Math.round(weather.temperature.day),
            description: weather.condition.description,
            humidity: `${weather.temperature.humidity}%`,
            wind: `${weather.wind.speed}km/h`,
            time: formatDate(weather.time),
            emoji: weather.condition.icon_url,
        });
        getForecast(response.data.city); 
    }, [getForecast]); 

    const searchCity = useCallback((city) => {
        const apiKey = "6b025c7d6331b719f34f6a74oab04ft9";
        const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
        axios.get(apiUrl).then(updateWeather);
    }, [updateWeather]); 

    useEffect(() => {
        searchCity(city);
    }, [city, searchCity]); 

    const formatDate = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const day = days[date.getDay()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day} ${hours}:${minutes}`;
    };

    const formatDay = (timestamp) => {
        const date = new Date(timestamp * 1000);
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[date.getDay()];
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        setCity(searchInput);
    };

    const toggleUnit = () => {
        setUnit(prevUnit => (prevUnit === "C" ? "F" : "C"));
    };

    const getTemperature = (tempCelsius) => {
        return unit === "C" ? tempCelsius : Math.round((tempCelsius * 9) / 5 + 32);
    };

    return (
        <div className="overlay">
            <header>
                <div className="logo">
                    <img className="image" src="https://i.pinimg.com/originals/b2/b8/74/b2b874f5acecbbee0d94635d3ef70c31.gif" alt="logo" />
                    <h1 className="text">Breezy Belle</h1>
                </div>
                <form className="form" onSubmit={handleSearchSubmit}>
                    <input
                        type="search"
                        placeholder="Enter a city..."
                        required
                        className="form-input"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                    <input type="submit" value="search" className="form-button" />
                </form>
            </header>

            <main>
                <div className="main-content">
                    {weatherData && (
                        <div className="city-data">
                            <h1 className="city-name">{weatherData.city}</h1>
                            <p className="weather-details">
                                <span id="time">{weatherData.time}</span>, <span id="description">{weatherData.description}</span>
                                <br />
                                Humidity: <strong id="humidity">{weatherData.humidity}</strong>, Wind: <strong id="wind">{weatherData.wind}</strong>
                            </p>
                        </div>
                    )}

                    {weatherData && (
                        <div className="temperature">
                            <div id="weather-emoji">
                                <img src={weatherData.emoji} className="weather-emoji" alt="weather icon" />
                            </div>
                            <div className="weather-value" id="weather-value">
                                {getTemperature(weatherData.temperature)} {/* Call getTemperature here */}
                            </div>
                            <div className="weather-celcius" onClick={toggleUnit}> {/* Toggle unit on click */}
                                °C | °F
                            </div>
                        </div>
                    )}
                </div>

                <div className="weather-forecast" id="forecast">
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '5px' }}>
                        {forecastData.map((day, index) => (
                            <div key={index} style={{ textAlign: 'center', padding: '10px 38px', borderRadius: '5px' }}>
                                <div className="weather-forecast-date" style={{ display: 'block' }}>
                                    {day.time}
                                </div>
                                <img src={day.icon} className="weather-forcast-emoji" alt="forecast icon" />
                                <div className="weather-forecast-temperatures">
                                    <span className="weather-forecast-temperature-max">{day.max}°</span>
                                    <span className="weather-forecast-temperature-min">{day.min}°</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <footer>
                <p>
                    This project was coded by{' '}
                    <a href="https://github.com/muthoni856" target="_blank" rel="noopener noreferrer">
                        Joy Muthoni
                    </a>{' '}
                    and is{' '}
                    <a href="https://www.shecodes.io/graduates/121537-joy-muthoni" target="_blank" rel="noopener noreferrer">
                        on GitHub
                    </a>{' '}
                    and{' '}
                    <a href="https://breezybelle.netlify.app/" target="_blank" rel="noopener noreferrer">
                        hosted on Netlify!
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default WeatherApp;
