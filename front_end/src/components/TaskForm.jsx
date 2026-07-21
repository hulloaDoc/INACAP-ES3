import { useEffect, useState } from 'react';

const PRIORIDADES = ['Alta', 'Media', 'Baja'];

const emptyForm = { titulo: '', descripcion: '', prioridad: 'Media', responsable: '', completada: false };

/**
 * Formulario para crear o editar una tarea.
 * @param {{
 *   onSubmit: (task: object) => void,
 *   editingTask: object | null,
 *   onCancelEdit: () => void,
 *   usuarios: string[]
 * }} props
 */
function TaskForm({ onSubmit, editingTask, onCancelEdit, usuarios = [] }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingTask) {
      setForm({
        titulo: editingTask.titulo,
        descripcion: editingTask.descripcion,
        prioridad: editingTask.prioridad || 'Media',
        responsable: editingTask.responsable || usuarios[0] || '',
        completada: !!editingTask.completada,
      });
    } else {
      setForm({ ...emptyForm, responsable: usuarios[0] || '' });
    }
  }, [editingTask, usuarios]);

  const handleChange = (field) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!form.titulo.trim() || !form.descripcion.trim() || !form.responsable) return;

    onSubmit({ ...form });

    if (!editingTask) {
      setForm({ ...emptyForm, responsable: usuarios[0] || '' });
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
          required
        />
      </label>

      <label className="field">
        <span>Prioridad</span>
        <select value={form.prioridad} onChange={handleChange('prioridad')}>
          {PRIORIDADES.map((prioridad) => (
            <option key={prioridad} value={prioridad}>
              {prioridad}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span>Responsable</span>
        <select value={form.responsable} onChange={handleChange('responsable')} required>
          {usuarios.length === 0 && <option value="">Cargando usuarios...</option>}
          {usuarios.map((usuario) => (
            <option key={usuario} value={usuario}>
              {usuario}
            </option>
          ))}
        </select>
      </label>

      <label className="field field--checkbox">
        <input
          type="checkbox"
          checked={form.completada}
          onChange={handleChange('completada')}
        />
        <span>Completada</span>
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
