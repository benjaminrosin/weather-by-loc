import CitiesTable from "./CitiesTable";

/**
 * CitiesContent - Renders cities table or empty state message.
 *
 * @param {Object[]} cities - Array of city objects
 * @param {Function} editFunc - Function to handle city editing
 * @param {Function} toggleFavoriteFunc - Function to toggle favorite status
 * @param {Function} deleteFunc - Function to handle city deletion
 * @returns {JSX.Element} - Cities table or empty state message
 */
function CitiesContent({ cities, editFunc, toggleFavoriteFunc, deleteFunc }) {
    return (
        <>
            {cities.length === 0 ? (
                <div className="alert alert-secondary">No cities to display</div>
            ) : (
                <CitiesTable
                    cities={cities}
                    toggleFavoriteFunc={toggleFavoriteFunc}
                    editFunc={editFunc}
                    deleteFunc={deleteFunc}
                />
            )}
        </>
    );
}
export default CitiesContent;