import axiosInstance from '../api/axiosInstance';

const RESOURCE = '/tasks';

/**
 * Obtiene todas las tareas.
 * @returns {Promise<Array>}
 */
export const getTasks = async () => {
  const response = await axiosInstance.get(RESOURCE);
  return response.data;
};

/**
 * Crea una nueva tarea.
 * @param {{ titulo: string, descripcion: string, estado: string }} task
 * @returns {Promise<Object>}
 */
export const createTask = async (task) => {
  const response = await axiosInstance.post(RESOURCE, task);
  return response.data;
};

/**
 * Actualiza una tarea existente.
 * @param {string|number} id
 * @param {{ titulo: string, descripcion: string, estado: string }} task
 * @returns {Promise<Object>}
 */
export const updateTask = async (id, task) => {
  const response = await axiosInstance.put(`${RESOURCE}/${id}`, task);
  return response.data;
};

/**
 * Elimina una tarea por id.
 * @param {string|number} id
 * @returns {Promise<void>}
 */
export const deleteTask = async (id) => {
  await axiosInstance.delete(`${RESOURCE}/${id}`);
};
