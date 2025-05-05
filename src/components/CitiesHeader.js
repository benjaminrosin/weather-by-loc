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