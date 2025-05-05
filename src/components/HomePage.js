import React, { useState } from 'react';
import WeatherForecast from './WeatherForecast';
import CityCard from "./CityCard";
import CityFilteringCard from "./CityFilteringCard";

/**
 * HomePage component that displays a list of favorite cities, allows filtering by country,
 * and shows detailed weather forecasts for a selected city.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.cities - A dictionary of city data keyed by city name.
 * @param {string[]} props.countries - An array of available country names for filtering.
 * @param {string} props.selectedCountry - The currently selected country used as a filter.
 * @param {function} props.setSelectedCountry - Function to update the selected country state.
 * @returns {JSX.Element} The rendered homepage component.
 * @constructor
 */
function HomePage ({ cities, countries, selectedCountry, setSelectedCountry }){
    const [selectedCity, setSelectedCity] = useState(null);

    // filtering and sorting cities
     const favoriteCities = Object.entries(cities)
        .filter(([name, city]) => city.isFavorite)
        .filter(([name, city]) =>
            !selectedCountry || city.country === selectedCountry)
        .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
        .map(([name, city]) => ({ name, ...city }));

    // Handle country filter change
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
    };

    // Back to cities list
    const handleBackToList = () => {
        setSelectedCity(null);
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

                        <WeatherForecast
                            city={selectedCity} />
                    </div>
                ) : (
                    <>
                        <CityFilteringCard
                            selectedCountry={selectedCountry}
                            handleCountryChange={handleCountryChange}
                            countries={countries}
                        />

                        {favoriteCities.length === 0 ? (
                            <div className="alert alert-warning">
                                No favorite cities {selectedCountry
                                    ? `from ${selectedCountry}`
                                    : 'to display'}
                            </div>
                        ) : (
                            <div className="row  row-cols-md-2 row-cols-lg-3 g-4">
                                {favoriteCities.map(city => (
                                    <div key={city.name}>
                                        <CityCard
                                            city={city}
                                            setSelectedCity={setSelectedCity}
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