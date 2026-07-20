import { useState } from 'react';

const ESTADO_LABELS = {
  pendiente: 'Pendiente',
  'en progreso': 'En progreso',
  completada: 'Completada',
};

/**
 * Tarjeta que representa una tarea individual.
 * @param {{
 *   task: { id: string|number, titulo: string, descripcion: string, estado: string },
 *   onEdit: (task: object) => void,
 *   onDelete: (id: string|number) => void,
 *   index?: number
 * }} props
 */
function TaskCard({ task, onEdit, onDelete, index = 0 }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const estadoLabel = ESTADO_LABELS[task.estado] || task.estado;
  const estadoClass = `badge badge--${(task.estado || 'pendiente').replace(' ', '-')}`;

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setConfirmingDelete(false);
  };

  return (
    <article className="task-card" style={{ '--i': index }}>
      <div className="task-card__header">
        <h3>{task.titulo}</h3>
        <span className={estadoClass}>{estadoLabel}</span>
      </div>

      {task.descripcion && (
        <p className="task-card__description">{task.descripcion}</p>
      )}

      {!confirmingDelete ? (
        <div className="task-card__actions">
          <button
            type="button"
            className="btn btn--small btn--primary"
            onClick={() => onEdit(task)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn--small btn--danger"
            onClick={() => setConfirmingDelete(true)}
          >
            Eliminar
          </button>
        </div>
      ) : (
        <div className="task-card__confirm">
          <span>¿Eliminar esta tarea?</span>
          <div className="task-card__confirm-actions">
            <button
              type="button"
              className="btn btn--small btn--danger"
              onClick={handleConfirmDelete}
            >
              Sí, eliminar
            </button>
            <button
              type="button"
              className="btn btn--small btn--outline"
              onClick={() => setConfirmingDelete(false)}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </article>
  );
}

export default TaskCard;
