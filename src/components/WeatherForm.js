// src/components/WeatherForm.js
import React, { useState } from 'react';
import useWeatherStore from '../zustand/store';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../styles/WeatherForm.css';

const WeatherForm = () => {
    const [cityInput, setCityInput] = useState('');
    const setCity = useWeatherStore((state) => state.setCity);
    const fetchWeather = useWeatherStore((state) => state.fetchWeather);
    const loading = useWeatherStore((state) => state.loading);

    const handleSubmit = (e) => {
        e.preventDefault();
        setCity(cityInput);
        fetchWeather(cityInput);
    };

    return (
        !loading && (
            <form onSubmit={handleSubmit} className="weather-form">
                <input
                    type="text"
                    value={cityInput}
                    onChange={(e) => setCityInput(e.target.value)}
                    placeholder="Enter city name"
                    className="weather-input"
                    disabled={loading}
                />
                <button type="submit" className="search-button" disabled={loading}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </form>
        )
    );
};

export default WeatherForm;
