import {useState} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import CityForm from "./CityForm";
import CitiesTable from "./CitiesTable";

/**
 * AllCities component for displaying and managing the full list of cities.
 *
 * Allows users to add, edit, delete, and mark cities as favorites.
 * Includes a toast notification for deletions and integrates with a reducer via dispatch.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.cities - An object containing all city data, keyed by city name.
 * @param {string[]} props.countries - An array of available country names.
 * @param {function} props.dispatch - A dispatch function for city-related reducer actions.
 * @returns {JSX.Element} The rendered city management interface.
 * @constructor
 */
function AllCities ({cities, countries, dispatch}) {
    const [editingForm, setEditingForm] = useState(null)
    const [toastMessage, setToastMessage] = useState('');
    let toastTimeoutID = null;

    const sortedCities = Object.entries(cities)
        .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
        .map(([name, city]) => ({ name, ...city }));

    const  saveChanges = (city) =>{
        if (city) {
            dispatch({ type: 'SAVE_CHANGES', payload: city });
        }
        setEditingForm(null)
    }

    const deleteCity = (cityName) => {
        dispatch({ type: 'DELETE_CITY', payload: cityName });
        setToastMessage('Delete city: ' + cityName);

        if (toastTimeoutID){
            clearTimeout(toastTimeoutID);
            toastTimeoutID = null;
        }
        toastTimeoutID = setTimeout(()=> setToastMessage(''), 3000);
    }

    const handleToggleFavorite = (city) => {
        dispatch({ type: 'TOGGLE_FAVORITE', cityName: city });
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Manage Cities</h2>
                    {!editingForm && (
                        <button className="btn btn-secondary" onClick={() => setEditingForm({})}>
                            <i className="bi bi-plus-circle me-2"/>Add New City
                        </button>
                    )}
                </div>

                {(editingForm) && (
                    <CityForm
                        citiesList={cities}
                        countries={countries}
                        onSubmit={saveChanges}
                        editing={editingForm}
                    />
                )}

                {!editingForm && (
                    <>
                        {sortedCities.length === 0 ? (
                            <div className="alert alert-secondary">No cities to display</div>
                        ) : (
                            <CitiesTable
                                cities={sortedCities}
                                toggleFavoriteFunc={handleToggleFavorite}
                                editFunc = {setEditingForm}
                                deleteFunc = {deleteCity}
                            />

                        )}
                    </>
                )}

                <div className={`toast  text-bg-secondary ${toastMessage !== '' ? 'show' : 'hide'}`} role="alert" aria-live="assertive" aria-atomic="true">
                    <div className="d-flex">
                        <div className="toast-body">
                            {toastMessage}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllCities;