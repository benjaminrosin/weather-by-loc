import CitiesTable from "./CitiesTable";

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
}; export default CitiesContent;