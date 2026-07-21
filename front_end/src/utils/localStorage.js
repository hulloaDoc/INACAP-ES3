const SESSION_KEY = 'task_tracker_session';
const PREFS_KEY = 'task_tracker_preferences';

const DEFAULT_PREFERENCES = {
  theme: 'light',
};

/**
 * Valida que el objeto de sesión tenga la forma esperada antes de confiar
 * en él. Previene que un valor corrupto o manipulado en LocalStorage
 * (ej. inyectado manualmente desde la consola) sea usado como token
 * de autenticación válido.
 * @param {unknown} value
 * @returns {boolean}
 */
const isValidSession = (value) =>
  !!value &&
  typeof value === 'object' &&
  typeof value.token === 'string' &&
  value.token.length > 0 &&
  typeof value.user === 'object';

/**
 * Guarda la sesión del usuario (token Basic Auth + datos de perfil) en
 * LocalStorage.
 * @param {{ token: string, user: object }} session
 */
export const saveSession = (session) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
};

/**
 * Lee la sesión actual desde LocalStorage. Si el contenido no es JSON
 * válido o no tiene la forma esperada, se descarta y se limpia para
 * evitar que datos corruptos o manipulados rompan la aplicación.
 * @returns {{ token: string, user: object } | null}
 */
export const getSession = () => {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw);
    if (!isValidSession(parsed)) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed;
  } catch (error) {
    // Sesión corrupta (JSON inválido): la limpiamos para evitar errores en cascada.
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
 * Indica si existe una sesión activa y válida.
 * @returns {boolean}
 */
export const hasSession = () => getSession() !== null;

/**
 * Lee las preferencias visuales del usuario (ej. tema claro/oscuro).
 * Valida el JSON y aplica valores por defecto ante datos ausentes o
 * corruptos.
 * @returns {{ theme: 'light' | 'dark' }}
 */
export const getPreferences = () => {
  const raw = localStorage.getItem(PREFS_KEY);
  if (!raw) return { ...DEFAULT_PREFERENCES };

  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') {
      return { ...DEFAULT_PREFERENCES };
    }
    return { ...DEFAULT_PREFERENCES, ...parsed };
  } catch (error) {
    localStorage.removeItem(PREFS_KEY);
    return { ...DEFAULT_PREFERENCES };
  }
};

/**
 * Guarda las preferencias visuales del usuario.
 * @param {{ theme: 'light' | 'dark' }} prefs
 */
export const savePreferences = (prefs) => {
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
};

/**
 * Borra las preferencias visuales, volviendo a los valores por defecto.
 */
export const clearPreferences = () => {
  localStorage.removeItem(PREFS_KEY);
};
