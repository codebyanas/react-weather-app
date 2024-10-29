import React, { useState } from 'react';

function WeatherForm({ fetchWeather }) {
    const [location, setLocation] = useState('');

    const onSubmit = (e) => {
        e.preventDefault();
        fetchWeather(location);
    };

    return (
        <form onSubmit={onSubmit} className="mb-4">
            <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="form-control"
                placeholder="Enter city name"
                required
            />
            <button type="submit" className="btn btn-primary mt-3">Check Weather</button>
        </form>
    );
}

export default WeatherForm;
