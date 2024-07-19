import { create } from 'zustand';
import axios from 'axios';

const useWeatherStore = create((set) => ({
    city: '',
    weather: null,
    location: null,
    loading: false,
    setCity: (city) => set({ city }),
    fetchWeather: async (city) => {
        set({ loading: true });
        try {
            // Убедиться, что API ключ определен
            if (!process.env.REACT_APP_WEATHERAPI_KEY) {
                throw new Error('WeatherAPI ключ не определен');
            }

            // Получение данных о погоде с WeatherAPI
            const weatherResponse = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.REACT_APP_WEATHERAPI_KEY}&q=${city}`);
            console.log('Ответ WeatherAPI:', weatherResponse.data);

            const { temp_c, wind_kph, humidity, pressure_mb, vis_km } = weatherResponse.data.current;
            const { name, country } = weatherResponse.data.location;

            set({
                weather: {
                    temperature: temp_c,
                    windSpeed: wind_kph,
                    humidity: humidity,
                    pressure: pressure_mb,
                    visibility: vis_km,
                },
                location: {
                    city: name,
                    country: country,
                },
            });
        } catch (error) {
            console.error('Не удалось получить данные о погоде:', error);
            set({ weather: null, location: null });
        } finally {
            set({ loading: false });
        }
    },
}));

export default useWeatherStore;
