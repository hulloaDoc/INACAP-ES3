const SESSION_KEY = 'task_tracker_session';

/**
 * Guarda la sesión del usuario en localStorage.
 * @param {{ email: string, loginAt: string }} session
 */
export const saveSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

/**
 * Lee la sesión actual desde localStorage.
 * @returns {{ email: string, loginAt: string } | null}
 */
export const getSession = () => {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch (error) {
    // Sesión corrupta: la limpiamos para evitar errores en cascada.
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
};

/**
 * Elimina la sesión actual (logout).
 */
export const clearSession = () => {
  localStorage.removeItem(SESSION_KEY);
};

/**
 * Indica si existe una sesión activa.
 * @returns {boolean}
 */
export const hasSession = () => getSession() !== null;
