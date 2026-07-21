function SearchHistory({ history = [], onClear }) {
    if (!history.length) {
        return null;
    }

    return (
        <div className="card shadow-sm border-0 mb-4">
            <div className="card-body">
                <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 gap-2">
                    <strong>Historial de búsquedas</strong>
                    <button className="btn btn-sm btn-outline-danger" type="button" onClick={onClear}>
                        Limpiar historial
                    </button>
                </div>
                <ul className="list-group list-group-flush">
                    {history.map((item, index) => (
                        <li className="list-group-item px-0" key={`${item}-${index}`}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchHistory;
