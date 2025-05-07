import useWeatherForecast from "../hooks/useWeatherForecast";
import WeatherDayCard from "../components/WeatherDayCard";
import LoadingWeather from "./LoadingWeather";
import ErrorWeather from "./ErrorWeather";
import React from 'react';

/**
 * A component that displays a 7-day weather forecast for a specified city.
 * Shows loading state, error messages, and renders individual day cards when data is available.
 *
 * @param {Object} city - City data including name and coordinates
 * @returns {JSX.Element}
 * @constructor
 */
const WeatherForecast7Timer = ({city}) => {
    const { forecast, loading, error } = useWeatherForecast(
        city.latitude,
        city.longitude
    );

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-secondary text-white">
                            <h2 className="text-center mb-0">{city.name} Forecast</h2>
                        </div>
                        <div className="card-body">
                            {loading && <LoadingWeather/>}

                            {error && !loading && <ErrorWeather/>}

                            {forecast && !loading && (
                                <div>
                                    <div className="text-center mb-4">
                                        <h3>From Today for Next 7 Days</h3>
                                    </div>

                                    <div className="row">
                                        {forecast.map((day, index) => (
                                            <div className="col-md-6 mb-3" key={index}>
                                                <WeatherDayCard
                                                    day={day}
                                                    />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 mb-2 text-muted text-center small">
                                        <p>Weather for: {city.latitude}°, {city.longitude}° ({city.name})</p>
                                        <p>Data provided by 7Timer API</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherForecast7Timer;
