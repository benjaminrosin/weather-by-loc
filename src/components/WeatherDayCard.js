import React from "react";

/**
 * A card component that displays weather information for a single day.
 * Shows date, weather icon, temperature range and wind conditions.
 *
 * @param {Object} day - Weather data for the specific day
 * @returns {JSX.Element}
 * @constructor
 */
const WeatherDayCard = ({day}) => {
    const formatDate = (dateStr) => {
        if (!dateStr) return '';

        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const isToday = (dateStr) => {
        const target = new Date(dateStr);

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
        <div className={`card h-100 ${isToday(day.date) ? 'border-secondary' : ''}`}>
            <div
                className={`card-header d-flex justify-content-between align-items-center ${isToday(day.date) ? '' : ''}`}>
                <span>{isToday(day.date) ? <strong>Today</strong> : formatDate(day.date)}</span>
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
    )
}; export default WeatherDayCard;