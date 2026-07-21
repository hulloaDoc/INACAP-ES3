import { useEffect, useMemo, useState } from 'react';
import Header from '../components/Header';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import TaskStats from '../components/TaskStats';
import ErrorAlert from '../components/ErrorAlert';
import { getTasks, createTask, updateTask, deleteTask, getUsuarios } from '../services/taskService';

/**
 * Página principal: lista y administra las tareas del usuario.
 * @param {{ onLogout: () => void, theme?: string, onToggleTheme?: () => void }} props
 */
function Dashboard({ onLogout, theme, onToggleTheme }) {
  const [tasks, setTasks] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [alert, setAlert] = useState({ mensaje: '', tipo: 'exito' });
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadTasks();
    getUsuarios()
      .then((data) => setUsuarios(data))
      .catch((err) => {
        // No bloqueamos el dashboard si falla, pero se registra el error.
        console.error('No fue posible cargar la lista de usuarios/responsables.', err);
      });
  }, []);

  const loadTasks = () => {
    setIsLoading(true);
    getTasks()
      .then((data) => setTasks(data))
      .catch((err) => {
        setAlert({
          mensaje: err.mensaje || 'No fue posible conectar con el Mock Server. Verifica que esté corriendo en el puerto 4000.',
          tipo: 'error',
        });
      })
      .finally(() => setIsLoading(false));
  };

  const handleSubmit = (taskData) => {
    if (editingTask) {
      updateTask(editingTask.id, taskData)
        .then((updated) => {
          setTasks((prev) =>
            prev.map((t) => (t.id === editingTask.id ? updated : t))
          );
          setEditingTask(null);
          setAlert({ mensaje: 'Tarea actualizada correctamente.', tipo: 'exito' });
        })
        .catch((err) => {
          setAlert({ mensaje: err.mensaje || 'No fue posible actualizar la tarea.', tipo: 'error' });
        });
    } else {
      createTask(taskData)
        .then((created) => {
          setTasks((prev) => [...prev, created]);
          setAlert({ mensaje: 'Tarea creada correctamente.', tipo: 'exito' });
        })
        .catch((err) => {
          setAlert({ mensaje: err.mensaje || 'No fue posible crear la tarea.', tipo: 'error' });
        });
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDelete = (id) => {
    deleteTask(id)
      .then(() => {
        setTasks((prev) => prev.filter((t) => t.id !== id));
        if (editingTask && editingTask.id === id) {
          setEditingTask(null);
        }
        setAlert({ mensaje: 'Tarea eliminada correctamente.', tipo: 'exito' });
      })
      .catch((err) => {
        setAlert({ mensaje: err.mensaje || 'No fue posible eliminar la tarea.', tipo: 'error' });
      });
  };

  const filteredTasks = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return tasks;

    return tasks.filter(
      (task) =>
        task.titulo?.toLowerCase().includes(term) ||
        task.descripcion?.toLowerCase().includes(term) ||
        task.responsable?.toLowerCase().includes(term)
    );
  }, [tasks, searchTerm]);

  const stats = useMemo(
    () => ({
      total: tasks.length,
      pendientes: tasks.filter((t) => !t.completada).length,
      completadas: tasks.filter((t) => t.completada).length,
    }),
    [tasks]
  );

  return (
    <div className="dashboard">
      <Header onLogout={onLogout} theme={theme} onToggleTheme={onToggleTheme} />

      <main className="dashboard__content">
        <ErrorAlert
          mensaje={alert.mensaje}
          tipo={alert.tipo}
          onClose={() => setAlert({ mensaje: '', tipo: 'exito' })}
        />

        <TaskForm
          onSubmit={handleSubmit}
          editingTask={editingTask}
          onCancelEdit={handleCancelEdit}
          usuarios={usuarios}
        />

        <TaskStats
          total={stats.total}
          pendientes={stats.pendientes}
          completadas={stats.completadas}
        />

        <div className="search-bar">
          <span className="search-bar__icon">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar tareas por título, descripción o responsable..."
          />
        </div>

        <section className="task-list">
          {isLoading && <p className="task-list__empty">Cargando tareas...</p>}

          {!isLoading && tasks.length === 0 && (
            <p className="task-list__empty">No hay tareas registradas</p>
          )}

          {!isLoading && tasks.length > 0 && filteredTasks.length === 0 && (
            <p className="task-list__empty">
              No se encontraron tareas para "{searchTerm}"
            </p>
          )}

          {!isLoading &&
            filteredTasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
