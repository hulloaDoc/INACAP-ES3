function EventTable({ events = [], onEdit, onDelete }) {
    return (
        <div className="table-responsive">
            <table className="table table-striped table-bordered">
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Fecha</th>
                        <th>Ubicación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {events.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="text-center text-muted">
                                No hay eventos disponibles
                            </td>
                        </tr>
                    ) : (
                        events.map((event) => (
                            <tr key={event.id}>
                                <td>{event.title}</td>
                                <td>{event.date}</td>
                                <td>{event.location}</td>
                                <td>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-sm btn-outline-primary" onClick={() => onEdit(event)}>
                                            Editar
                                        </button>
                                        <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(event.id)}>
                                            Eliminar
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default EventTable;
