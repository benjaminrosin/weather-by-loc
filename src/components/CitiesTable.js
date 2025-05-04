
function CitiesTable({cities,toggleFavoriteFunc ,editFunc, deleteFunc}) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-hover text-center">
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
                {cities.map(city => (
                    <tr key={city.name}>
                        <td>{city.name}</td>
                        <td>{city.country}</td>
                        <td>{city.latitude}</td>
                        <td>{city.longitude}</td>
                        <td>
                            <button
                                onClick={() => toggleFavoriteFunc(city.name)}
                                className={`btn bi p-0 border-0 ${city.isFavorite ? 'bi-star-fill text-warning' : 'bi-star'}`}
                            />
                        </td>
                        <td>
                            <div className="btn-group d-flex justify-content-center">
                                <button
                                    className="btn bi btn-sm btn-outline-primary bi-pencil"
                                    onClick={() => editFunc(city)}
                                />
                                <button
                                    className="btn bi btn-sm btn-outline-danger bi-trash"
                                    onClick={() => deleteFunc(city.name)}
                                />

                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default CitiesTable;