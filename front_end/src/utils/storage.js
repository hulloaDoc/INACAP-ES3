// 1. primera funcion para limpiar posibles inyecciones de codigo html/js (xss)

export const sanitizeText = (text) => {
  if (typeof text !== 'string') return text;
  return text

    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2f;');
};

//2. guardar la sesion del usuario (token y datos de perfil)

export const saveSession = (token, user) => {
  try {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  } catch (error) {
    console.error('Error al guardar la sesion en localstorage', error);
  }
};

// 3. limpiar los datos de sesion (cerrar sesion)

export const clearSession = () => {
  try {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  } catch (error) {
    console.error('Error al limpiar la sesion de localstorage', error);
  }
};

// 4. obtener datos del usuario
export const getSession = () => {
  try {
    const token = localStorage.getItem('token');
    const userJson = localStorage.getItem('user');

    // si es que llegase a faltar algunos de los dos es que no hay sesion activa

    if (!token || !userJson) return null;

    // se intenta parsear el json de forma segura
    const user = JSON.parse(userJson);
    return { token, user };
  } catch (error) {
    console.error('error al leer la sesion localstorage corrupto):', error);
    clearSession(); // se borra los datos invalidados para solucionar el problema 
    return null;
  }
};

// 5. guardar preferencias (tema y filtros de prioridad)
export const savePreferences = (preferences) => {
  try {
    localStorage.setItem('preferences',
      JSON.stringify(preferences));
  } catch (error) {
    console.error('error al guardar preferencias en localstorage', error);
  }
};

// 6. obtener preferencias visuales
export const getPreferences = () => {
  try {
    const prefsJson = localStorage.getItem('preferences');
    // si no existe preferencias previas, retornamos valores por defecto

    if (!prefsJson) return { theme: 'light', priorityFilter: 'Todas' };
    return JSON.parse(prefsJson);
  } catch (error) {
    console.error('error al leer preferencias de localstorage', error);
    return { theme: 'light', priorityFilter: 'Todas' };
  }
};
