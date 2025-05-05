import React from "react";

/**
 * CityFilteringCard component that renders a UI card for selecting and filtering cities by country.
 *
 * @param {Object} props - The component props.
 * @param {string} props.selectedCountry - The currently selected country filter value.
 * @param {function} props.handleCountryChange - Handler function for when the country selection changes or resets.
 * @param {string[]} props.countries - Array of country names available for filtering.
 * @returns {JSX.Element} The rendered filtering card component.
 * @constructor
 */
function CityFilteringCard({selectedCountry, handleCountryChange, countries}) {
    return (
        <div className="card mb-4">
            <div className="card-header bg-light">
                <h5 className="mb-0">Filter Cities</h5>
            </div>
            <div className="row card-body">
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
                        <i className="bi bi-arrow-repeat me-2"/>Reset Filter
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CityFilteringCard;