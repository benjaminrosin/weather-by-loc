import {useState} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import CityForm from "./CityForm";
import useToast from "../hooks/useToast"
import Toast from "./Toast";
import CitiesHeader from "./CitiesHeader";
import CitiesContent from "./CitiesContent";

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
    const [toastMessage, showToast] = useToast(3000);

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
        showToast('Delete city: ' + cityName)
    }

    const handleToggleFavorite = (city) => {
        dispatch({ type: 'TOGGLE_FAVORITE', cityName: city });
    };

    return (
        <div className="row">
            <div className="col-12">
                <CitiesHeader
                    editingForm={editingForm}
                    onAddCity={() => setEditingForm({})}
                />

                {(editingForm) && (
                    <CityForm
                        citiesList={cities}
                        countries={countries}
                        onSubmit={saveChanges}
                        editing={editingForm}
                    />
                )}

                {!editingForm && (
                    <CitiesContent
                        cities={sortedCities}
                        toggleFavoriteFunc={handleToggleFavorite}
                        editFunc={setEditingForm}
                        deleteFunc={deleteCity}
                    />
                )}
                <Toast message={toastMessage} />
            </div>
        </div>
    );
}

export default AllCities;