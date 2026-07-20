/**
 * Barra de estadísticas: total, pendientes y completadas.
 * @param {{ total: number, pendientes: number, completadas: number }} props
 */
function TaskStats({ total, pendientes, completadas }) {
  return (
    <section className="task-stats">
      <div className="stat-card">
        <span className="stat-card__value">{total}</span>
        <span className="stat-card__label">Total</span>
      </div>

      <div className="stat-card stat-card--pending">
        <span className="stat-card__value">{pendientes}</span>
        <span className="stat-card__label">Pendientes</span>
      </div>

      <div className="stat-card stat-card--done">
        <span className="stat-card__value">{completadas}</span>
        <span className="stat-card__label">Completadas</span>
      </div>
    </section>
  );
}

export default TaskStats;
