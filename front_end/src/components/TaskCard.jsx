import { useState } from 'react';

const PRIORIDAD_CLASS = {
  Alta: 'badge--alta',
  Media: 'badge--media',
  Baja: 'badge--baja',
};

/**
 * Tarjeta que representa una tarea individual.
 * @param {{
 *   task: { id: string|number, titulo: string, descripcion: string, prioridad: string, responsable: string, completada: boolean },
 *   onEdit: (task: object) => void,
 *   onDelete: (id: string|number) => void,
 *   index?: number
 * }} props
 */
function TaskCard({ task, onEdit, onDelete, index = 0 }) {
  const [confirmingDelete, setConfirmingDelete] = useState(false);

  const prioridadClass = `badge ${PRIORIDAD_CLASS[task.prioridad] || 'badge--media'}`;
  const estadoClass = `badge ${task.completada ? 'badge--completada' : 'badge--pendiente'}`;
  const estadoLabel = task.completada ? 'Completada' : 'Pendiente';

  const handleConfirmDelete = () => {
    onDelete(task.id);
    setConfirmingDelete(false);
  };

  return (
    <article className="task-card" style={{ '--i': index }}>
      <div className="task-card__header">
        <h3>{task.titulo}</h3>
        <div className="task-card__badges">
          <span className={prioridadClass}>{task.prioridad}</span>
          <span className={estadoClass}>{estadoLabel}</span>
        </div>
      </div>

      {task.descripcion && (
        <p className="task-card__description">{task.descripcion}</p>
      )}

      {task.responsable && (
        <p className="task-card__responsable">👤 {task.responsable}</p>
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
