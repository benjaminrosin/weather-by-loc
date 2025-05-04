import useWeatherForecast from "../hooks/useWeatherForecast";
import React, { useState } from 'react';

const WeatherForecast7Timer = ({city}) => {
    /*const [coordinates, setCoordinates] = useState({
        latitude:city.latitude,
        longitude:city.longitude});*/

    const { forecast, loading, error } = useWeatherForecast(
        //coordinates.lat,
        //coordinates.lon
        city.latitude,
        city.longitude
    );

    const formatDate = (dateInt) => {
        if (!dateInt) return '';
        const dateStr = dateInt.toString();
        const year = parseInt(dateStr.slice(0, 4));
        const month = parseInt(dateStr.slice(4, 6)) - 1;
        const day = parseInt(dateStr.slice(6, 8));
        const date = new Date(year, month, day);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric'
        });
    };

    const isToday = (dateInt) => {
        const dateStr = dateInt.toString();
        const year = parseInt(dateStr.slice(0, 4));
        const month = parseInt(dateStr.slice(4, 6)) - 1;
        const day = parseInt(dateStr.slice(6, 8));
        const target = new Date(year, month, day);

        const today = new Date();
        return (
            target.getDate() === today.getDate() &&
            target.getMonth() === today.getMonth() &&
            target.getFullYear() === today.getFullYear()
        );
    };

    const getWeatherIcon = (iconType) => {
        return <i className={`bi bi-${iconType}`}></i>;
    };

    return (
        <div className="container mt-4">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card shadow">
                        <div className="card-header bg-primary text-white">
                            <h2 className="text-center mb-0">7-Day Weather Forecast</h2>
                        </div>
                        <div className="card-body">
                            {loading && (
                                <div className="text-center p-4">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                    <p className="mt-2">Loading weather forecast...</p>
                                </div>
                            )}

                            {error && !loading && (
                                <div className="alert alert-danger">
                                    <h4 className="alert-heading">Error Loading Forecast</h4>
                                    <p>Unable to load weather forecast at this time. Please try again later.</p>
                                </div>
                            )}

                            {forecast && !loading && (
                                <div>
                                    <div className="text-center mb-4">
                                        <h3>From Today for Next 7 Days</h3>
                                        <p className="text-muted">
                                            Showing forecast for {forecast.length} days
                                        </p>
                                    </div>

                                    <div className="row">
                                        {forecast.map((day, index) => (
                                            <div className="col-md-6 mb-3" key={index}>
                                                <div className={`card h-100 ${isToday(day.date) ? 'border-primary' : ''}`}>
                                                    <div className={`card-header d-flex justify-content-between align-items-center ${isToday(day.date) ? 'bg-primary text-white' : ''}`}>
                                                        <span>{isToday(day.date) ? 'Today' : formatDate(day.date)}</span>
                                                        <span className="fs-4">{getWeatherIcon(day.icon)}</span>
                                                    </div>
                                                    <div className="card-body">
                                                        <h5 className="card-title">{day.weather}</h5>
                                                        <div className="d-flex justify-content-between">
                                                            <div>
                                                                <i className="bi bi-thermometer-high text-danger"></i> Max: {day.tempMax}°C
                                                            </div>
                                                            <div>
                                                                <i className="bi bi-thermometer-low text-primary"></i> Min: {day.tempMin}°C
                                                            </div>
                                                        </div>
                                                        <div className="mt-2">
                                                            <i className="bi bi-wind"></i> Wind: {day.wind} (scale 1-10)
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="mt-4 mb-2 text-muted text-center small">
                                        {/*<p>Weather for: {coordinates.lat.toFixed(4)}°, {coordinates.lon.toFixed(4)}° (city.name)</p>*/}
                                        <p>Weather for: {city.latitude.toFixed(4)}°, {city.longitude.toFixed(4)}° ({city.name})</p>
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
