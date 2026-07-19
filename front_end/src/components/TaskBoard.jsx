import React, { useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';
import { getPreferences, savePreferences } from '../utils/storage';

const TaskBoard = () => {

    //1. estados para almacenar datos del servidor
    const [tasks, setTasks] = useState([]);
    const [users, setUsers] = useState([]);

    //2. estado para la tareas que estan en proceso
    const [enProcesoIds, setEnProcesoIds] = useState(() => {
        const saved = localStorage.getItem('enProcesoIds');
        return saved ? JSON.parse(saved) : [];
    });

    //3. estados para filtros persistentes 
    const [priorityFilter, setPriorityFilter] = useState(() => {
        const prefs = getPreferences();
        return prefs.priorityFilter || 'Todas';
    });
    const [assigneerFilter, setAssigneerFilter] = useState('Todos');

    //4. estados para el modal de creacion/edicion
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState(null); // null = crear, cualquier cosa = editar

    //5. efecto para cargar los datos por primera vez al inciar el tablero
    useEffect(() => {
        fetchTasks();
        fetchUsers();
    }, []);

    //funcion para obtener las tareas del servidor
    const fetchTasks = async () => {
        try {
            const response = await axiosInstance.get('/api/tareas');
            setTasks(response.data); // guardamos las tareas en el estado
        } catch (err) { console.error('Error al obtener tareas:', err) };
    };
    // fucnionar para obtener los usuarios disponibles para asignar
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/api/usuarios');
            setUsers(response.data); //guardamos la lista de usuarios en el estado
        } catch (err) {
            console.error("Error al obtener usuarios:", err);

        }
    };

