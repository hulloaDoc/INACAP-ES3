function SearchHistory({ history = [], onClear }) {
    if (!history.length) {
        return null;
    }

    return (
        <div className="mb-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
                <strong>Historial de búsquedas</strong>
                <button className="btn btn-sm btn-outline-danger" type="button" onClick={onClear}>
                    Limpiar historial
                </button>
            </div>
            <ul className="list-group">
                {history.map((item, index) => (
                    <li className="list-group-item" key={`${item}-${index}`}>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchHistory;
