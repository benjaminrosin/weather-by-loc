import {useState} from "react";

/**
 * Form component for adding or editing city information with validation.
 *
 * @component
 * @param {Object} citiesList - Object containing existing cities
 * @param {string[]} countries - Array of available countries for selection
 * @param {Function} onSubmit - Callback function when form is submitted, receives form data or null
 * @param {Object} editing - City object being edited, empty object for new city
 * @returns {JSX.Element} A form for creating or editing city information
 */
function CityForm({citiesList, countries, onSubmit, editing}) {
    const [formData, setFormData] = useState({...editing});
    const [errors, setErrors] = useState({});

    function resetForm(){
        setFormData({});
        setErrors({});
        onSubmit(null);
    }

    function validate() {
        const currErrors = {};

        //name validation
        if (!formData.name || !formData.name.trim()) {
            currErrors.name = "City name required";
        }
        else if(!/^[a-zA-Z\s]+$/.test(formData.name)){
            currErrors.name = "City name can only contain letters and spaces";
        }
        else if (Object.keys(citiesList).length !== 0 &&
            Object.keys(citiesList).some((city) => city.toLowerCase() === formData.name.toLowerCase()))
        {
            currErrors.name = "City name must be unique";
        }

        //country validation
        if (!formData.country){
            currErrors.country = "Country required";
        }

        //lat validation
        const lat = parseFloat(formData.latitude);
        if (isNaN(lat)) {
            currErrors.latitude = "Latitude is required and must be a number.";
        } else if (lat < -90 || lat > 90) {
            currErrors.latitude = "Latitude must be between -90 and 90.";
        }

        //lon validation
        const lon = parseFloat(formData.longitude);
        if (isNaN(lon)) {
            currErrors.longitude = "Longitude is required and must be a number.";
        } else if (lon < -180 || lon > 180) {
            currErrors.longitude = "Longitude must be between -180 and 180.";
        }

        if(!formData.isFavorite){
            formData.isFavorite = false;
        }

        setErrors(currErrors);
        return Object.keys(currErrors).length === 0;
    }

    function handleChangeTextbox(event) {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    function handleChangeCheckbox(event){
        setFormData({ ...formData, [event.target.name]: event.target.checked });
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (validate()){
            onSubmit(formData);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="mt-4">
            <div className="mb-3">
                <label htmlFor="name" className="form-label">City Name</label>
                <input
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    id="name"
                    name="name"
                    value={formData.name || ''}
                    onChange={handleChangeTextbox}
                    disabled={Object.keys(editing).length !== 0}
                />
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="country" className="form-label">Country</label>
                <select
                    className={`form-select ${errors.country ? "is-invalid" : ""}`}
                    id="country"
                    name="country"
                    value={formData.country || ''}
                    onChange={handleChangeTextbox}
                >
                    <option value="">-- Select Country --</option>
                    {countries.map((c) => (
                        <option key={c} value={c}>{c}</option>
                    ))}
                </select>
                {errors.country && <div className="invalid-feedback">{errors.country}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="latitude" className="form-label">Latitude</label>
                <input
                    type="number"
                    className={`form-control ${errors.latitude ? "is-invalid" : ""}`}
                    id="latitude"
                    name="latitude"
                    value={formData.latitude || ''}
                    onChange={handleChangeTextbox}
                    step="any"
                />
                {errors.latitude && <div className="invalid-feedback">{errors.latitude}</div>}
            </div>

            <div className="mb-3">
                <label htmlFor="longitude" className="form-label">Longitude</label>
                <input
                    type="number"
                    className={`form-control ${errors.longitude ? "is-invalid" : ""}`}
                    id="longitude"
                    name="longitude"
                    value={formData.longitude || ''}
                    onChange={handleChangeTextbox}
                    step="any"
                />
                {errors.longitude && <div className="invalid-feedback">{errors.longitude}</div>}
            </div>

            <div className="form-check mb-3">
                <label className="form-check-label" htmlFor="isFavorite">Favorite</label>
                <input
                    className="form-check-input"
                    type="checkbox"
                    checked={formData.isFavorite || false}
                    name="isFavorite"
                    id="isFavorite"
                    onChange={handleChangeCheckbox}
                />

            </div>

            <div className="mb-3">
                <button type="submit" className="btn btn-outline-secondary">{Object.keys(editing).length !== 0? "Save Changes":"Add City"}</button>
                <button type="reset" className="btn btn-outline-secondary ms-3" onClick={resetForm}>back</button>
            </div>
        </form>
    );

}

export default CityForm;