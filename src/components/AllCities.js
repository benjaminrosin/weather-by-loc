import {useState} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import CityForm from "./CityForm";
import useToast from "../hooks/useToast"
import Toast from "./Toast";
import CitiesHeader from "./CitiesHeader";
import CitiesContent from "./CitiesContent";

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