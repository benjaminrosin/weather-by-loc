import React from "react";

const ErrorWeather = () => {
    return (
        <div className="alert alert-danger">
            <h4 className="alert-heading">Error Loading Forecast</h4>
            <p>Unable to load weather forecast at this time. Please try again later.</p>
        </div>
    )
}; export default ErrorWeather;