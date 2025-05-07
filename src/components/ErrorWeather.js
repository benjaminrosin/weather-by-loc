import React from "react";

const ErrorWeather = ({message}) => {
    return (
        <div className="alert alert-danger">
            <h4 className="alert-heading">Error Loading Forecast</h4>
            <p>
                Unable to load weather forecast at this time. Please try again later.<br/>
                {message? "reason: "+message:''}
            </p>

        </div>
    )
}; export default ErrorWeather;