import { useEffect, useState } from 'react';

const ESTADOS = ['pendiente', 'en progreso', 'completada'];

const emptyForm = { titulo: '', descripcion: '', estado: 'pendiente' };

/**
 * Formulario para crear o editar una tarea.
 * @param {{
 *   onSubmit: (task: object) => void,
 *   editingTask: object | null,
 *   onCancelEdit: () => void
 * }} props
 */
function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingTask) {
      setForm({
        titulo: editingTask.titulo,
        descripcion: editingTask.descripcion,
        estado: editingTask.estado || 'pendiente',
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingTask]);

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.titulo.trim()) return;

    onSubmit({ ...form });

    if (!editingTask) {
      setForm(emptyForm);
    }
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Editar tarea' : 'Nueva tarea'}</h2>

      <label className="field">
        <span>Título</span>
        <input
          type="text"
          value={form.titulo}
          onChange={handleChange('titulo')}
          placeholder="Título de la tarea"
          required
        />
      </label>

      <label className="field">
        <span>Descripción</span>
        <textarea
          value={form.descripcion}
          onChange={handleChange('descripcion')}
          placeholder="Descripción de la tarea"
          rows={3}
        />
      </label>

      <label className="field">
        <span>Estado</span>
        <select value={form.estado} onChange={handleChange('estado')}>
          {ESTADOS.map((estado) => (
            <option key={estado} value={estado}>
              {estado}
            </option>
          ))}
        </select>
      </label>

      <div className="task-form__actions">
        <button type="submit" className="btn btn--primary">
          Guardar
        </button>
        {editingTask && (
          <button
            type="button"
            className="btn btn--outline"
            onClick={onCancelEdit}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
