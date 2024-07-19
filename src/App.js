// src/App.js
import React from 'react';
import WeatherForm from './components/WeatherForm';
import WeatherDisplay from './components/WeatherDisplay';
import useWeatherStore from './zustand/store';
import Loader from './components/Loader';
import './App.css';

function App() {
    const loading = useWeatherStore((state) => state.loading);
    const weather = useWeatherStore((state) => state.weather);

    return (
        <div className="App">
            <h1>Weather App</h1>
            {!loading && <WeatherForm />}
            {loading && <Loader />}
            {!loading && weather && <WeatherDisplay />}
            <footer>
                Created by <span className="highlight">Aleh Nikalayeu</span>
            </footer>
        </div>
    );
}

export default App;
