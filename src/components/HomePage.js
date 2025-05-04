// components/HomePage.js
import React, { useState } from 'react';
import WeatherForecast from './WeatherForecast';
import CityCard from "./CityCard";


function HomePage ({ cities, countries, selectedCountry, setSelectedCountry }){
    const [weatherData, setWeatherData] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);
    const [loading, setLoading] = useState(false);

     const favoriteCities = Object.entries(cities)
        .filter(([name, city]) => city.isFavorite)
        .filter(([name, city]) =>
            !selectedCountry || city.country === selectedCountry
        )
        .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
        .map(([name, city]) => ({ name, ...city }));

    // Handle country filter change
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    // Reset filter
    const handleResetFilter = () => {
        setSelectedCountry('');
    };

    // Fetch weather data
    const fetchWeatherData = async (city) => {
        setLoading(true);
        setSelectedCity(city);

        try {
            const response = await fetch(
                `https://www.7timer.info/bin/api.pl?lon=${city.longitude}&lat=${city.latitude}&product=civillight&output=json`
            );

            if (!response.ok) {
                throw new Error('Error loading weather data');
            }

            const data = await response.json();
            setWeatherData(data.dataseries);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            alert('Unable to load weather data. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    // Back to cities list
    const handleBackToList = () => {
        setSelectedCity(null);
        setWeatherData(null);
    };

    return (
        <div className="row">
            <div className="col-12">
                <h2 className="mb-4">Favorite Cities</h2>

                {selectedCity ? (
                    <div>
                        <button onClick={handleBackToList} className="btn btn-secondary mb-3">
                            <i className="bi bi-arrow-left me-2"></i> Back to Cities List
                        </button>

                        {weatherData ? (
                            <WeatherForecast
                                weatherData={weatherData}
                                city={selectedCity}
                            />
                        ) : (
                            <div className="d-flex justify-content-center p-5">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <>
                        <div className="card mb-4">
                            <div className="card-header bg-light">
                                <h5 className="mb-0">Filter Cities</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-sm-8">
                                        <select
                                            className="form-select w-100"
                                            value={selectedCountry}
                                            onChange={handleCountryChange}
                                            aria-label="Filter by country"
                                        >
                                            <option value="">All Countries</option>
                                            {countries.map(country => (
                                                <option key={country} value={country}>{country}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-sm-4">
                                        <button
                                            className="btn btn-outline-secondary w-100"
                                            onClick={handleCountryChange}
                                            value={''}
                                        >
                                            <i className="bi bi-arrow-repeat me-2"></i>
                                            Reset Filter
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {favoriteCities.length === 0 ? (
                            <div className="alert alert-warning">
                                No favorite cities {selectedCountry
                                    ? `from ${selectedCountry}`
                                    : 'to display'}
                            </div>
                        ) : (
                            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                                {favoriteCities.map(city => (
                                    <div key={city.name}>
                                        <CityCard
                                            city={city}
                                            fetchWeatherFunc={fetchWeatherData}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default HomePage;