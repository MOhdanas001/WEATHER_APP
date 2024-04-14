// WeatherPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface WeatherData {
  temperature: number;
  weatherDescription: string;
  humidity: number;
  windSpeed: number;
  pressure:number;
  high:number;
  low:number;
  icon:string;
}

const WeatherPage: React.FC = () => {
  const { cityId } = useParams<{ cityId: string }>();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const[temperature,settemperature]=useState(0);
  const[temp,setTemp]=useState("C")

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${cityId}&appid=cbbdf6296227c362411653ac32ac230d`
        );
        const data=await response.json();
          console.log(data);
        const weatherData: WeatherData = {
          temperature: Math.round(data.main.temp-273),
          weatherDescription: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon,
          pressure:data.main.pressure,
          high:Math.floor(data.main.temp_min-273),
          low:Math.floor(data.main.temp_max-273)
          
        };
        settemperature(data.main.temp-273);
        setWeather(weatherData);
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    };
    fetchWeather();
  
  }, [cityId]);

 
  if (!weather) return <div>Loading...</div>;

  const weatherIcons: { [key: string]: string } = {
    '01d': 'clear-sky-day.svg',
    '01n': 'clear-sky-night.svg',
    '02d': 'few-clouds-day.svg',
    '02n': 'few-clouds-night.svg',
    '03d': 'scattered-clouds-day.svg',
    '03n': 'scattered-clouds-night.svg',
    '04d': 'broken-clouds-day.svg',
    '04n': 'broken-clouds-night.svg',
    '09d': 'shower-rain-day.svg',
    '09n': 'shower-rain-night.svg',
    '10d': 'rain-day.svg',
    '10n': 'rain-night.svg',
    '11d': 'thunderstorm-day.svg',
    '11n': 'thunderstorm-night.svg',
    '13d': 'snow-day.svg',
    '13n': 'snow-night.svg',
    '50d': 'mist-day.svg',
    '50n': 'mist-night.svg',
  };
  
  return (

    <div className="min-h-screen flex items-center justify-center hover:bg-slate-200 drop-shadow-2xl ">
    <div className="flex flex-col bg-white rounded p-5 w-full max-w-xs">
						<div className="font-bold text-xl">Weather for {cityId}</div>
             <p>Switch temperature
                <button className="ml-2 mt-2 cursor-pointer border-black border-2 hover:bg-slate-400 rounded-full p-2 " onClick={() => {
                  temp==="C" ? settemperature((temperature*9)/5+32) : settemperature((temperature-32)*5/9);
                  temp==="C" ? setTemp("F") : setTemp("C");
                }}>
                Change to {temp==="F"?"C":"F"}
              </button>
             </p>
						<div className="text-sm text-gray-500">{new Date().toLocaleString("en-US", { weekday: "long" })},{" "}
        {new Date().toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
          year: "numeric",
        })}</div>
						<div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-24">
            <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z"></path></svg>
						</div>
						<div className="flex flex-row items-center justify-center mt-6">
							<div className="font-medium text-6xl">{temperature.toFixed(2)}{temp}</div>
							<div className="flex flex-col items-center ml-6">
								<div className='text-xl'>{weather.weatherDescription}</div>
								
							</div>
						</div>
						<div className="flex flex-row justify-between mt-6">
              <div className="flex flex-col items-center">
								<div className="font-medium text-sm">Description</div>
								<div className="text-sm text-gray-500">{weather.weatherDescription}</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="font-medium text-sm">Wind</div>
								<div className="text-sm text-gray-500">{weather.windSpeed}</div>
							</div>
							<div className="flex flex-col items-center">
								<div className="font-medium text-sm">Humidity</div>
								<div className="text-sm text-gray-500">{weather.humidity}</div>
							</div>
							
						</div>
					</div>
</div>

  );
};

export default WeatherPage;