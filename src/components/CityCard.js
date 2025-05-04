import React from "react";


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