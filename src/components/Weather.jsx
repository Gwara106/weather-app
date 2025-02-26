import React, { useEffect, useState } from 'react'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'
import { useRef } from 'react'
import Sidebar from './Sidebar'
import { toast } from 'react-toastify'

const Weather = () => {
    const [loading, setLoading] = useState(false);
    const [favoriteLocations, setFavoriteLocations] = useState(() => {
        const storedLocations = localStorage.getItem('favoriteLocations');
        return storedLocations ? JSON.parse(storedLocations) : [];
    });

    const handleRemoveFavorite = (location) => {
        setFavoriteLocations(prev => {
            const newFavorites = prev.filter((loc) => loc !== location);
            localStorage.setItem('favoriteLocations', JSON.stringify(newFavorites));
            toast.success(`Removed ${location} from favorites`);
            return newFavorites;
        });
    };

    const handleFavorite = (location) => {
        if (!location) return;
        
        setFavoriteLocations(prev => {
            const existingFavorites = prev.includes(location);
            let newFavorites;
            
            if (existingFavorites) {
                newFavorites = prev.filter((loc) => loc !== location);
                toast.info(`Removed ${location} from favorites`);
            } else {
                newFavorites = [...prev, location];
                toast.success(`Added ${location} to favorites`);
            }
            
            localStorage.setItem('favoriteLocations', JSON.stringify(newFavorites));
            return newFavorites;
        });
    };

    const inputRef = useRef()
    const [weatherData, setWeatherData] = useState(false);
    const [searchHistory, setSearchHistory] = useState(() => {
        const history = localStorage.getItem('searchHistory');
        return history ? JSON.parse(history) : [];
    });

    const allIcons = {
        '01d': clear_icon,
        '01n': clear_icon,
        '02d': cloud_icon,
        '02n': cloud_icon,
        '03d': cloud_icon,
        '03n': cloud_icon,
        '04d': drizzle_icon,
        '04n': drizzle_icon,
        '09d': rain_icon,
        '09n': rain_icon,
        '10d': rain_icon,
        '10n': rain_icon,
        '13d': snow_icon,
        '13n': snow_icon,
    }

    const addToSearchHistory = (city) => {
        setSearchHistory(prev => {
            const newHistory = [city, ...prev.filter(item => item !== city)].slice(0, 5);
            localStorage.setItem('searchHistory', JSON.stringify(newHistory));
            return newHistory;
        });
    };

    const search = async (city) => {
        if (!city) {
            toast.error('Please enter a city name');
            return;
        }

        setLoading(true);
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                toast.error(data.message || 'City not found');
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear_icon;
            setWeatherData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                descriptions: data.weather[0].description,
                feels_like: Math.floor(data.main.feels_like),
                icon: icon
            });

            addToSearchHistory(data.name);
            
        } catch (error) {
            setWeatherData(false);
            toast.error("Error fetching weather data");
            console.error("Error in fetching weather data:", error);
        } finally {
            setLoading(false);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            search(inputRef.current.value);
        }
    };

    useEffect(() => {
        search("Kathmandu");
    }, []);

    return (
        <div className='Mainbody'>
            <div><Sidebar /></div>
            <div className='weather'>
                <div className="main-content">
                    <div className="search-bar">
                        <input 
                            ref={inputRef} 
                            type="text" 
                            placeholder='Search city...'
                            onKeyPress={handleKeyPress}
                        />
                        <img 
                            src={search_icon} 
                            alt="Search" 
                            onClick={() => search(inputRef.current.value)}
                        />
                    </div>

                    {loading && <div className="loading">Loading...</div>}

                    {weatherData && !loading && (
                        <>
                            <img src={weatherData.icon} alt="" className='weather-icon' />
                            <p className='temparature'>{weatherData.temperature}°c</p>
                            <p className='descriptions'>{weatherData.descriptions}</p>
                            <p className='location'>{weatherData.location}</p>
                            <p className='feels-like'>Feels like: {weatherData.feels_like}°c</p>
                            
                            <div className="weather-data">
                                <div className="col">
                                    <img src={humidity_icon} alt="Humidity" />
                                    <div>
                                        <p>{weatherData.humidity}%</p>
                                        <span>Humidity</span>
                                    </div>
                                </div>
                                <div className="col">
                                    <img src={wind_icon} alt="Wind" />
                                    <div>
                                        <p>{weatherData.windSpeed} km/h</p>
                                        <span>Wind speed</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {searchHistory.length > 0 && (
                        <div className="search-history">
                            <h3>Recent Searches</h3>
                            <div className="history-items">
                                {searchHistory.map((city, index) => (
                                    <button
                                        key={index}
                                        onClick={() => search(city)}
                                        className="history-item"
                                    >
                                        {city}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Weather
