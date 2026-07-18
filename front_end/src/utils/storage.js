const SESSION_KEY = 'inventorySession';
const TOKEN_KEY = 'authToken';

export function readJsonStorage(key, fallbackValue = null) {
  try {
    const storedValue = localStorage.getItem(key);

    if (!storedValue) {
      return fallbackValue;
    }

    return JSON.parse(storedValue);
  } catch (error) {
    console.error(`Error al leer LocalStorage: ${key}`, error);

    localStorage.removeItem(key);

    return fallbackValue;
  }
}

export function saveSession(session) {
  if (!session?.token || !session?.user) {
    throw new Error('La sesión no posee una estructura válida.');
  }

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(TOKEN_KEY, session.token);
}

export function getSession() {
  const session = readJsonStorage(SESSION_KEY);

  if (
    !session ||
    typeof session !== 'object' ||
    typeof session.token !== 'string' ||
    typeof session.user !== 'object'
  ) {
    return null;
  }

  return session;
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(TOKEN_KEY);
}