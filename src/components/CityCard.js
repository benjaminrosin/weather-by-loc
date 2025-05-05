import React from "react";

/**
 * Card component displaying city information with option to view forecast.
 *
 * @component
 * @param {Object} city - City object with name and country properties
 * @param {Function} setSelectedCity - Function to set the selected city, receives city object
 * @returns {JSX.Element} A card displaying city details with a forecast button
 */
function CityCard({city, setSelectedCity}){
    return (
        <div className="card h-100 shadow">
            <div className="card-header bg-secondary text-white">
                <h5 className="card-title mb-0">{city.name}</h5>
            </div>
            <div className="card-body">
                <p className="card-text">
                    <strong>Country:</strong> {city.country}
                </p>
            </div>
            <div className="card-footer">
                <button
                    className="btn btn-outline-secondary w-100"
                    onClick={() => setSelectedCity(city)}
                >
                    <i className="bi bi-cloud-sun me-2"/>Show Forecast
                </button>
            </div>
        </div>
    )
}

export default CityCard;