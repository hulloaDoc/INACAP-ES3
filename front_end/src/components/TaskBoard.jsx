import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { getPreferences, savePreferences } from '../utils/storage';

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

    return null;
};

export default TaskBoard;
