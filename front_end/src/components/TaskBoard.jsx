import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { getPreferences, savePreferences } from '../utils/storage';
import TaskFormModal from './TaskFormModal';

const TaskBoard = () => {

    // 1. estados para almacenar datos del servidor
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    // 2. estado para la tareas que estan en proceso
    const [enProcesoIds, setEnProcesoIds] = useState(() => {
        const saved = localStorage.getItem('enProcesoIds');
        return saved ? JSON.parse(saved) : [];
    });

    // 3. estados para filtros persistentes 
    const [priorityFilter, setPriorityFilter] = useState(() => {
        const prefs = getPreferences();
        return prefs.priorityFilter || 'Todas';
    });
    const [assigneerFilter, setAssigneerFilter] = useState('Todos');

    // 4. estados para el modal de creacion/edicion
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null); // null = crear, cualquier cosa = editar

    // 5. efecto para cargar los datos por primera vez al iniciar el tablero
    useEffect(() => {
        fetchTasks();
        fetchUsers();
    }, []);

    // funcion para obtener las tareas del servidor
    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get('/api/tareas');
            setTasks(response.data); // guardamos las tareas en el estado
        } catch (err) {
            console.error('Error al obtener tareas:', err);
        }
    };

    // funcion para obtener los usuarios disponibles para asignar
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/api/usuarios');
            setUsers(response.data); // guardamos la lista de usuarios en el estado
        } catch (err) {
            console.error("Error al obtener usuarios:", err);
        }
    };

    // 6. Eliminar una tarea del servidor 
    const handleDeleteTask = async (id) => {
        if (window.confirm("¿Estás seguro de que deseas eliminar esta tarea?")) {
            try {
                // enviamos la peticion delete al servidor mock
                await axiosInstance.delete(`/api/tareas/${id}`);

                // si la tarea estaba en proceso, se elimina de localstorage
                const nuevosIds = enProcesoIds.filter(taskId => taskId !== id);
                setEnProcesoIds(nuevosIds);
                localStorage.setItem('enProcesoIds', JSON.stringify(nuevosIds));

                // se recarga la lista 
                fetchTasks();
            } catch (err) {
                console.error("Error al eliminar la tarea:", err);
            }
        }
    };

    // 7. mover una tarea de columna para cambiar su estado
    const handleMoveTask = async (task, nuevoEstado) => {
        let nuevosIds = [...enProcesoIds];
        try {
            if (nuevoEstado === 'En Proceso') {
                // si pasa a en proceso, agregamos su ID al localstorage
                if (!nuevosIds.includes(task.id)) {
                    nuevosIds.push(task.id);
                }
                // si venia de completada, la volvemos a false en el servidor
                if (task.completada) {
                    await axiosInstance.put(`/api/tareas/${task.id}`, {
                        ...task,
                        completada: false
                    });
                }
            } else if (nuevoEstado === 'Completada') {
                // si pasa a completado, actualizamos el servidor
                await axiosInstance.put(`/api/tareas/${task.id}`, {
                    ...task,
                    completada: true
                });
                // la sacamos de la lista en proceso
                nuevosIds = nuevosIds.filter(id => id !== task.id);
            } else if (nuevoEstado === 'Pendiente') {
                // si se regresa a pendiente, se quita del localstorage y se marca false en el servidor
                nuevosIds = nuevosIds.filter(id => id !== task.id);
                if (task.completada) {
                    await axiosInstance.put(`/api/tareas/${task.id}`, {
                        ...task,
                        completada: false
                    });
                }
            }

            // guardamos el nuevo estado de en proceso
            setEnProcesoIds(nuevosIds);
            localStorage.setItem('enProcesoIds', JSON.stringify(nuevosIds));

            // refrescamos las tareas en la interfaz 
            fetchTasks();
        } catch (err) {
            console.error("Error al mover la tarea: ", err);
        }
    };

    // 8. crear o editar una tarea en el servidor
    const handleSaveTask = async (taskData) => {
        try {
            if (taskData.id) {
                // si tiene ID, es edicion (PUT)
                await axiosInstance.put(`/api/tareas/${taskData.id}`, taskData);
            } else {
                // si no tiene ID, es creacion (POST)
                await axiosInstance.post('/api/tareas', taskData);
            }
            setShowModal(false); // cerramos el modal
            setEditingTask(null); // reseteamos edicion
            fetchTasks(); // refrescamos lista
        } catch (err) {
            console.error("Error al guardar la tarea:", err);
        }
    };

    // filtrar la lista de tareas segun lo filtros selecionados
    const filteredTasks = tasks.filter(taskItem => {
        // filtro de prioridad 
        const coincidePrioridad = priorityFilter === 'Todas' || taskItem.prioridad === priorityFilter;
        // filtro de responsable
        const coincideResponsable = assigneerFilter === 'Todos' || taskItem.responsable === assigneerFilter;

        return coincidePrioridad && coincideResponsable;
    });

    // funcion para manejar el cambio en el filtro de prioridad y guardalo en localstorage
    const handlePriorityFilterChange = (valor) => {
        setPriorityFilter(valor);
        // guardamos la preferencia del filtro usando la funcion de storage.js
        savePreferences({ theme: localStorage.getItem('theme') || 'light', priorityFilter: valor });
    };

    return (
        <div className='tablero-contenedor'>
            {/* Barra de Filtros y Controles */}
            <div className='tablero-controles'>
                <div className='grupo-filtros'>
                    <div className='filtro-item'>
                        <label>Prioridad:</label>
                        <select value={priorityFilter} onChange={(e) => handlePriorityFilterChange(e.target.value)}>
                            <option value='Todas'>Todas</option>
                            <option value='Alta'>Alta</option>
                            <option value='Media'>Media</option>
                            <option value='Baja'>Baja</option>
                        </select>
                    </div>
                    <div className='filtro-item'>
                        <label>Responsable:</label>
                        <select value={assigneerFilter} onChange={(e) => setAssigneerFilter(e.target.value)}>
                            <option value="Todos">Todos</option>
                            {users.map(u => (
                                <option key={u} value={u}>{u}</option>
                            ))}
                        </select>
                    </div>
                </div>
                <button onClick={() => { setEditingTask(null); setShowModal(true); }} className='btn-crear-tarea'>
                    + Nueva Tarea
                </button>
            </div>

            {/* Contenedor de las 3 columnas Kanban */}
            <div className="tablero-columnas">

                {/* 1. Columna PENDIENTE */}
                <div className="columna">
                    <h3 className="columna-titulo">PENDIENTE</h3>
                    <div className="columna-contenido">
                        {filteredTasks
                            .filter(t => !t.completada && !enProcesoIds.includes(t.id))
                            .map(t => (
                                <div key={t.id} className="tarjeta-tarea">
                                    <h4>{t.titulo}</h4>
                                    <p>{t.descripcion}</p>
                                    <div className="tarjeta-info">
                                        <span className={`prioridad-${t.prioridad.toLowerCase()}`}>
                                            {t.prioridad}
                                        </span>
                                        <span className="responsable-nombre">{t.responsable}</span>
                                    </div>
                                    <div className="tarjeta-acciones">
                                        <button onClick={() => handleMoveTask(t, 'En Proceso')} className="btn-iniciar">
                                            Iniciar
                                        </button>
                                        <button onClick={() => { setEditingTask(t); setShowModal(true); }} className="btn-editar">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDeleteTask(t.id)} className="btn-eliminar">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* 2. Columna EN PROCESO */}
                <div className="columna">
                    <h3 className="columna-titulo">EN PROCESO</h3>
                    <div className="columna-contenido">
                        {filteredTasks
                            .filter(t => !t.completada && enProcesoIds.includes(t.id))
                            .map(t => (
                                <div key={t.id} className="tarjeta-tarea">
                                    <h4>{t.titulo}</h4>
                                    <p>{t.descripcion}</p>
                                    <div className="tarjeta-info">
                                        <span className={`prioridad-${t.prioridad.toLowerCase()}`}>
                                            {t.prioridad}
                                        </span>
                                        <span className="responsable-nombre">{t.responsable}</span>
                                    </div>
                                    <div className="tarjeta-acciones">
                                        <button onClick={() => handleMoveTask(t, 'Completada')} className="btn-completar">
                                            Completar
                                        </button>
                                        <button onClick={() => handleMoveTask(t, 'Pendiente')} className="btn-regresar">
                                            Regresar
                                        </button>
                                        <button onClick={() => { setEditingTask(t); setShowModal(true); }} className="btn-editar">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDeleteTask(t.id)} className="btn-eliminar">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                {/* 3. Columna COMPLETADA */}
                <div className="columna">
                    <h3 className="columna-titulo">COMPLETADA</h3>
                    <div className="columna-contenido">
                        {filteredTasks
                            .filter(t => t.completada)
                            .map(t => (
                                <div key={t.id} className="tarjeta-tarea tarjeta-completada">
                                    <h4>{t.titulo}</h4>
                                    <p>{t.descripcion}</p>
                                    <div className="tarjeta-info">
                                        <span className="prioridad-completada">Terminado</span>
                                        <span className="responsable-nombre">{t.responsable}</span>
                                    </div>
                                    <div className="tarjeta-acciones">
                                        <button onClick={() => handleMoveTask(t, 'En Proceso')} className="btn-regresar">
                                            Regresar
                                        </button>
                                        <button onClick={() => { setEditingTask(t); setShowModal(true); }} className="btn-editar">
                                            Editar
                                        </button>
                                        <button onClick={() => handleDeleteTask(t.id)} className="btn-eliminar">
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

            </div>
            {showModal && (
                <TaskFormModal
                    task={editingTask}
                    users={users}
                    onClose={() => setShowModal(false)}
                    onSave={handleSaveTask}
                />
            )}
        </div>
    );
};

export default TaskBoard;
