/**
 * CitiesHeader Component
 *
 * A header component for the Cities management section that displays a title
 * and conditionally renders an "Add New City" button when not in editing mode.
 *
 * @param {Object} props - Component props
 * @param {boolean} props.editingForm - Flag indicating if a city form is currently being edited
 * @param {Function} props.onAddCity - Callback function triggered when the Add New City button is clicked
 * @returns {JSX.Element} - The rendered header with title and conditional button
 */
function CitiesHeader({ editingForm, onAddCity }) {
    return (
        <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Manage Cities</h2>
            {!editingForm && (
                <button className="btn btn-secondary" onClick={onAddCity}>
                    <i className="bi bi-plus-circle me-2"/>Add New City
                </button>
            )}
        </div>
    );
}
export default CitiesHeader;