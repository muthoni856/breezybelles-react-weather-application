import React from 'react';
import './App.css';
import axios from "axios"
import logo from './logo.svg';

function App() {
  return (
    <div className="App">
      <div className="overlay">
        <header>
          <div className="logo">
            <img className="image" src={logo} alt="background" />
            <h1 className="text">Breezy Belle</h1>
          </div>
          <form className="form" id="search-form">
            <input
              type="search"
              placeholder="Enter a city..."
              required
              className="form-input"
              id="search-form-input"
            />
            <input
              type="submit"
              value="search"
              className="form-button"
              id="search-form-button"
            />
          </form>
        </header>
        <main>
          <div className="main-content">
            <div className="city-data">
              <h1 className="city-name" id="city">--</h1>
              <p className="weather-details">
                <span id="time">---</span>, <span id="description">---</span>
                <br />
                Humidity: <strong id="humidity">--%</strong>, Wind: <strong id="wind">-- km/h</strong>
              </p>
            </div>

            <div className="temperature">
              <div id="weather-emoji"></div>
              <div className="weather-value" id="weather-value">--</div>
              <div className="weather-celcius">°C</div>
            </div>
          </div>
          <div className="weather-forecast" id="forecast"></div>
        </main>
        <footer>
          <p>
            This project was coded by
            <a href="https://github.com/muthoni856" target="_blank" rel="noopener noreferrer"> Joy Muthoni</a> and is
            <a href="https://github.com/muthoni856/Weather-App" target="_blank" rel="noopener noreferrer"> on GitHub</a> and
            <a href="https://breezybelle.netlify.app/" target="_blank" rel="noopener noreferrer"> hosted on Netlify</a>.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;
