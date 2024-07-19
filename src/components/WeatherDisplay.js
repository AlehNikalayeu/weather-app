import React from 'react';
import useWeatherStore from '../zustand/store';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {
    faMapMarkerAlt,
    faCloud,
    faSun,
    faCloudSun,
    faWind,
    faTint,
    faCompressArrowsAlt,
    faEye
} from '@fortawesome/free-solid-svg-icons';
import '../styles/WeatherDisplay.css';

const WeatherDisplay = () => {
    const weather = useWeatherStore((state) => state.weather);
    const location = useWeatherStore((state) => state.location);

    if (!weather || !location) {
        return <div>No data to display</div>;
    }

    const roundedTemperature = Math.round(weather.temperature);
    const locationString = `${location.city}, ${location.country}`;

    const weeklyForecast = [
        {day: 'Mon', temp: 15, icon: faCloud},
        {day: 'Tue', temp: 18, icon: faSun},
        {day: 'Wed', temp: 20, icon: faCloudSun},
        {day: 'Thu', temp: 22, icon: faSun},
        {day: 'Fri', temp: 19, icon: faCloud},
        {day: 'Sat', temp: 21, icon: faSun},
        {day: 'Sun', temp: 17, icon: faCloudSun},
    ];

    return (
        <div className="weather-container">
            <div className="current-weather">
                <div className="current-weather-info">
                    <h2>Today</h2>
                    <p>{new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}</p>
                    <h1>{roundedTemperature}°C</h1>
                    <div className="location">
                        <FontAwesomeIcon icon={faMapMarkerAlt}/>
                        <p>{locationString}</p>
                    </div>
                </div>
                <div className="weekly-forecast">
                    {weeklyForecast.map((day, index) => (
                        <div className="forecast-day" key={index}>
                            <p>{day.day}</p>
                            <FontAwesomeIcon icon={day.icon}/>
                            <p>{day.temp}°C</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="weather-details">
                <div className="weather-box">
                    <FontAwesomeIcon icon={faWind}/>
                    <p>Wind Speed: {weather.windSpeed} m/s</p>
                </div>
                <div className="weather-box">
                    <FontAwesomeIcon icon={faTint}/>
                    <p>Humidity: {weather.humidity}%</p>
                </div>
                <div className="weather-box">
                    <FontAwesomeIcon icon={faCompressArrowsAlt}/>
                    <p>Pressure: {weather.pressure} hPa</p>
                </div>
                <div className="weather-box">
                    <FontAwesomeIcon icon={faEye}/>
                    <p>Visibility: {weather.visibility / 1000} km</p>
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;
