import React, { useState } from 'react';

function WeatherCard({ weather, fetchWeather, error }) {
    const [location, setLocation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {
        if (location) {
            setLoading(true);
            await fetchWeather(location);
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="weather-card">
            <div className="weather-card-content">
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Enter city name"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        onKeyDown={handleKeyPress}
                        spellCheck="false"
                    />
                    <button className="search-btn" onClick={handleSearch}>
                        <i className="fas fa-search"></i>
                    </button>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : weather ? (
                    <>
                        <div className="weather-icon">
                            <i className="fas fa-sun"></i>
                        </div>
                        <h2 className="temperature">{weather.temperature}°C</h2>
                        <h3 className="location">{weather.location}</h3>
                        <p className="description">{weather.description}</p>
                        <div className="weather-info">
                            <div className="info-item">
                                <span>{weather.feelslike}°C</span>
                                <p>Feelslike</p>
                            </div>

                            <div className="info-item">
                                <span>{weather.humidity}%</span>
                                <p>Humidity</p>
                            </div>

                            <div className="info-item">
                                <span>{weather.wind_speed} km/h</span>
                                <p>Wind Speed</p>
                            </div>
                        </div>
                    </>
                ) : (
                    <p className="fw-normal">Enter a city to get the weather information</p>
                )}
            </div>
        </div>
    );
}

export default WeatherCard;
