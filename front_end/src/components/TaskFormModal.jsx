import React, { useState, useEffect } from 'react';
const TaskFormModal = ({ task, users, onClose, onSave }) => {
    // definimos los estados para cada campo del formulario

    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [prioridad, setPrioridad] = useState('Baja');
    const [responsable, setResponsable] = useState('');

    //useeffect para auto-rellenar los cmapos si estamos editanto una tarea existente
    useEffect(() => {
        if (task) {
            // si nos pasan una tarea, cargamos sus datos en el formulario
            setTitulo(task.titulo);
            setDescripcion(task.descripcion);
            setPrioridad(task.prioridad);
            setResponsable(task.responsable);
        } else {
            // si es una tarea nueva, dejamos los campos vacios o pro defecto
            setTitulo('');
            setDescripcion('');
            setPrioridad('Baja');
            setResponsable(users.length > 0 ? users[0] : '');
        }
    }, [task, users]);

    const handleSubmit = (e) => {
        e.preventDefault(); // evitamos que la pagina se recargue
        // creamos el objeto con los datos recopilados del formulario

        const taskData = {
            titulo,
            descripcion,
            prioridad,
            responsable,
            completada: task ? task.completada : false
        };

        // si estamos editanto le adjuntamos el id para saber cual tarea actualizar
        if (task) {
            taskData.id = task.id;
        }

        // se llama a la funcion onsave que nos pasa el padre para guardar en el servidor
        onSave(taskData);
    };
    return (
        <div className="modal-overlay">
            <div className="modal-card">
                <h2>{task ? 'Editar Tarea' : 'Nueva Tarea'}</h2>

                <form onSubmit={handleSubmit} className="modal-form">
                    <div className="form-group">
                        <label htmlFor="modal-titulo">Título:</label>
                        <input
                            type="text"
                            id="modal-titulo"
                            value={titulo}
                            onChange={(e) => setTitulo(e.target.value)}
                            placeholder="Ej: Migrar DNS"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="modal-descripcion">Descripción:</label>
                        <textarea
                            id="modal-descripcion"
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            placeholder="Describe detalladamente la tarea..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="modal-prioridad">Prioridad:</label>
                        <select
                            id="modal-prioridad"
                            value={prioridad}
                            onChange={(e) => setPrioridad(e.target.value)}
                        >
                            <option value="Alta">Alta</option>
                            <option value="Media">Media</option>
                            <option value="Baja">Baja</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="modal-responsable">Responsable:</label>
                        <select
                            id="modal-responsable"
                            value={responsable}
                            onChange={(e) => setResponsable(e.target.value)}
                            required
                        >
                            {users.map((usuario) => (
                                <option key={usuario} value={usuario}>
                                    {usuario}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="modal-buttons">
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="btn-save"
                        >
                            Guardar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TaskFormModal;

