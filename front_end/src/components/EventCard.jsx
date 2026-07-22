export default function EventCard({ evento, onEdit, onDelete }) {
  return (
    <div className="event-card">
      <div className="event-card-header">
        <span className="event-card-date">
          {evento.fecha} | {evento.hora}
        </span>
        <span className="event-card-room">{evento.lugar}</span>
      </div>
      <h3 className="event-card-title">{evento.nombre_evento}</h3>
      <p className="event-card-desc">{evento.descripcion}</p>
      <div className="event-card-actions">
        <button className="btn btn-secondary" onClick={() => onEdit(evento)}>
          Editar
        </button>
        <button className="btn btn-danger" onClick={() => onDelete(evento)}>
          Cancelar Evento
        </button>
      </div>
    </div>
  );
}
