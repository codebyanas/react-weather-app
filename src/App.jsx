import React, { useState } from 'react';
import WeatherCard from './components/WeatherCard';
import './App.css';

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const geolocationkey = import.meta.env.VITE_GEOLOCATION_API_KEY;
  const forecastkey = import.meta.env.VITE_FORECAST_API_KEY;

  const fetchWeather = async (location) => {
    if (!location) return;

    setError(null);

    try {
      // Geocoding API request
      const geocodeResponse = await fetch(`https://us1.locationiq.com/v1/search?key=${geolocationkey}&q=${encodeURIComponent(location)}&format=json`);
      const geocodeData = await geocodeResponse.json();

      if (!geocodeData[0]) {
        setError('Location not found.');
        return;
      }

      const { lat, lon, display_name } = geocodeData[0];

      // Forecast API request
      const forecastResponse = await fetch(`http://api.weatherstack.com/current?access_key=${forecastkey}&query=${lat},${lon}&units=m`);
      const forecastData = await forecastResponse.json();

      if (forecastData.error) {
        setError('Unable to retrieve weather data.');
      } else {
        setWeather({
          location: display_name,
          description: forecastData.current.weather_descriptions[0],
          temperature: forecastData.current.temperature,
          humidity: forecastData.current.humidity,
          wind_speed: forecastData.current.wind_speed,
          feelslike: forecastData.current.feelslike
        });
      }
    } catch (e) {
      setError('Unable to connect to the weather service.');
    }
  };

  return (
    <div className="App container">
      <h2 className="my-4 para text-center">Weather Checker</h2>
      {error && <p className="text-danger">{error}</p>}
      <WeatherCard weather={weather} fetchWeather={fetchWeather} />
    </div>
  );
}

export default App;
