import {useEffect, useRef, useState} from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';
import useModal from "../hooks/useModal";
import CityForm from "./CityForm";

function AllCities ({cities, countries, dispatch}) {
    const [editingCity, setEditingCity] = useState(null);
    const [addingCity, setAddingCity] = useState(null);
    const [editingForm, setEditingForm] = useState(null)
    const [modalMessage, setModalMessage] = useState('');
    const [cityToDelete, setCityToDelete] = useState(null);

    const {
        modalRef: messageModalRef,
        showModal: showMessageModal,
        hideModal: hideMessageModal
    } = useModal({
        keyboard: false,
        backdrop: 'static'
    });

    const {
        modalRef: confirmModalRef,
        showModal: showConfirmModal,
        hideModal: hideConfirmModal
    } = useModal({
        keyboard: false,
        backdrop: 'static'
    });

    //const sortedCities = [...cities].sort((a, b) => a.name.localeCompare(b.name));
    const sortedCities = Object.entries(cities)
        .sort(([nameA], [nameB]) => nameA.localeCompare(nameB))
        .map(([name, city]) => ({ name, ...city }));

    const handleAddCity = () => {
        setAddingCity(true);
        setEditingCity(null);
        //setEditingForm({...editingForm, form: true})
    };

    const handleEditCity = (city) => {
        setEditingCity(city);
        setAddingCity(false);
        //setEditingForm({form: true, obj: city})
    }

    const handleAddNewCity = (newCity) => {
        if (cities.some(city => city.name === newCity.name)) {
            setModalMessage('City name already exists');
            showMessageModal();
            return false;
        }

        dispatch({ type: 'ADD_CITY', payload: newCity });
        setAddingCity(false);
        return true;
    };

    const  saveChanges = (city) =>{
        if (city) {
            dispatch({ type: 'SAVE_CHANGES', payload: city });
        }
        setEditingForm(null)
    }

    const handleUpdateCity = (updatedCity) => {
        if (editingCity) {
            dispatch({
                type: 'UPDATE_CITY',
                name: editingCity.name,
                payload: updatedCity
            });
            setEditingCity(null);
        }
        return true;
    };

    const prepareDeleteCity = (city) => {
        setCityToDelete(city);
        showConfirmModal();
    };

    const confirmDeleteCity = () => {
        if (cityToDelete) {
            dispatch({ type: 'DELETE_CITY', name: cityToDelete.name });
            hideConfirmModal();
            setCityToDelete(null);
        }
    };

    const deleteCity = (cityName) => {
        dispatch({ type: 'DELETE_CITY', payload: cityName });
    }

    const handleToggleFavorite = (city) => {
        dispatch({ type: 'TOGGLE_FAVORITE', name: city.name });
    };

    // Cancel adding/editing
    const handleCancel = () => {
        setEditingCity(null);
        setAddingCity(false);
    };

    return (
        <div className="row">
            <div className="col-12">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2>Manage Cities</h2>
                    {!addingCity && !editingCity && (
                        <button className="btn btn-primary" onClick={()=> setEditingForm({})}>
                            <i className="bi bi-plus-circle me-2"></i>
                            Add New City
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

                {/*(addingCity) && (
                    <CityForm
                        editing={editingCity}
                        citiesList={cities}
                        countries={countries}
                        onSubmit={handleAddNewCity}
                        //onCancel={handleCancel}
                    />
                )}

                {(editingCity) && (
                    <CityForm
                        editing={editingCity}
                        citiesList={cities}
                        countries={countries}
                        onSubmit={handleUpdateCity}
                        //onCancel={handleCancel}
                    />
                )*/}

                {/* Cities list */}
                {//!addingCity && !editingCity && (
                    !editingForm &&(
                    <>
                        {sortedCities.length === 0 ? (
                            <div className="alert alert-info">No cities to display</div>
                        ) : (
                            <div className="table-responsive">
                                <table className="table table-striped table-hover">
                                    <thead className="table-dark">
                                    <tr>
                                        <th>City Name</th>
                                        <th>Country</th>
                                        <th>Latitude</th>
                                        <th>Longitude</th>
                                        <th>Favorite</th>
                                        <th>Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {sortedCities.map(city => (
                                        <tr key={city.name}>
                                            <td>{city.name}</td>
                                            <td>{city.country}</td>
                                            <td>{city.latitude}</td>
                                            <td>{city.longitude}</td>
                                            <td>
                                                <div className="d-flex justify-content-center">
                                                    <button
                                                        onClick={() => handleToggleFavorite(city)}
                                                        title={city.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                                                        className="p-0 border-0 bg-transparent"
                                                    >
                                                        <i
                                                            className={`bi ${city.isFavorite ? 'bi-star-fill text-warning' : 'bi-star text-secondary'}`}
                                                        ></i>
                                                    </button>
                                                </div>
                                                {/*<button
                                                    className={`btn bi ${city.isFavorite ? 'bi-star-fill' : 'bi-star'}`}
                                                    onClick={() => handleToggleFavorite(city)}
                                                />*/}
                                            </td>
                                            <td>
                                            <div className="btn-group d-flex justify-content-center">
                                                    <button
                                                        className="btn btn-sm btn-outline-primary"
                                                        onClick={() => setEditingForm(city)}
                                                        title="Edit city"
                                                    >
                                                        <i className="bi bi-pencil"></i>
                                                    </button>
                                                    <button
                                                        className="btn btn-sm btn-outline-danger"
                                                        //onClick={() => prepareDeleteCity(city)}
                                                        onClick={() => deleteCity(city.name)}
                                                        title="Delete city"
                                                    >
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </>
                )}

                {/* Message Modal - Using our custom hook */}
                <div className="modal fade" ref={messageModalRef} tabIndex="-1" aria-labelledby="messageModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="messageModalLabel">Message</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {modalMessage}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Confirmation Modal - Using our custom hook */}
                <div className="modal fade" ref={confirmModalRef} tabIndex="-1" aria-labelledby="confirmModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="confirmModalLabel">Confirm Deletion</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                Are you sure you want to delete {cityToDelete?.name}?
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                                <button type="button" className="btn btn-danger" onClick={confirmDeleteCity}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AllCities;