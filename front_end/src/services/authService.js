import { saveSession, clearSession } from '../utils/localStorage';

// No existe backend de autenticación: se valida contra un usuario falso.
const FAKE_USER = {
  email: 'admin@inacap.cl',
  password: '123456',
};

/**
 * Intenta iniciar sesión con las credenciales del usuario falso.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{email: string, loginAt: string}>}
 */
export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const isValid = email === FAKE_USER.email && password === FAKE_USER.password;

    if (!isValid) {
      reject(new Error('Correo o contraseña incorrectos.'));
      return;
    }

    const session = {
      email,
      loginAt: new Date().toISOString(),
    };

    saveSession(session);
    resolve(session);
  });
};

/**
 * Cierra la sesión actual.
 */
export const logout = () => {
  clearSession();
};
