// WeatherPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface WeatherData {
  temperature: number;
  weatherDescription: string;
  humidity: number;
  windSpeed: number;
  // Add more properties as needed
}

const WeatherPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    fetchWeather();
  }, [cityId]);

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?id=${cityId}&appid=YOUR_API_KEY`
      );
      const weatherData: WeatherData = {
        temperature: response.data.main.temp,
        weatherDescription: response.data.weather[0].description,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        // Parse more data as needed
      };
      setWeather(weatherData);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };

  if (!weather) return <div>Loading...</div>;

  return (
    <div>
      <h1>Weather for City</h1>
      <p>Temperature: {weather.temperature}</p>
      <p>Weather Description: {weather.weatherDescription}</p>
      <p>Humidity: {weather.humidity}</p>
      <p>Wind Speed: {weather.windSpeed}</p>
      {/* Add more weather details */}
    </div>
  );
};

export default WeatherPage;
