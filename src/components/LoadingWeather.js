import React from "react";

const LoadingWeather = () => {
    return (
        <div className="text-center p-4">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading weather forecast...</p>
        </div>
    )
}; export default LoadingWeather;