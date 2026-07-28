# Evidencia de pruebas — Manejo de errores HTTP

Este documento presenta las evidencias del manejo de errores HTTP implementado en la aplicación Gestor de Inventario, desarrollada con React, Vite y Axios.

La aplicación utiliza una instancia centralizada de Axios ubicada en `front_end/src/api/axiosInstance.js`.

El interceptor de Axios identifica el código HTTP, registra la información en la consola y entrega un mensaje para mostrarlo mediante el componente `ErrorAlert`.

---

## Error 401 — No autorizado

El error 401 se produjo al intentar iniciar sesión con credenciales incorrectas.

### Evidencia de consola

![Error 401 en consola](./error_401_consola.png)

### Evidencia de interfaz

![Error 401 en interfaz](./error_401_interfaz.png)

La aplicación mostró el mensaje “Usuario o contraseña incorrectos” y permitió volver a intentar el inicio de sesión sin congelarse.

---

## Error 404 — Recurso no encontrado

El error 404 se produjo realizando una solicitud al producto inexistente con ID 999999.

Solicitud utilizada: `GET /api/productos/999999`.

### Evidencia de consola

![Error 404 en consola](./error_404_consola.png)

### Evidencia de interfaz

![Error 404 en interfaz](./error_404_interfaz.png)

La aplicación mostró el mensaje “Producto con ID 999999 no encontrado”. La tabla de productos continuó funcionando normalmente.

---

## Error 500 — Error interno del servidor

El error 500 se produjo utilizando la consulta de simulación entregada por el servidor mock.

Solicitud utilizada: `GET /api/productos?error=500`.

### Evidencia de consola

![Error 500 en consola](./error_500_consola.png)

### Evidencia de interfaz

![Error 500 en interfaz](./error_500_interfaz.png)

La aplicación mostró el mensaje “Simulación de error 500 en el servidor mock” sin perder los productos cargados ni congelar la interfaz.

---

## Lógica implementada

La instancia de Axios utiliza un interceptor de respuestas para centralizar el manejo de errores.

Cuando una petición falla, el sistema realiza los siguientes pasos:

1. Obtiene el código HTTP desde `error.response.status`.
2. Recupera el mensaje entregado por la API.
3. Guarda el mensaje en `error.userMessage`.
4. Registra en la consola la URL, el método, el estado y los detalles.
5. El bloque `catch` recibe el error.
6. React guarda el mensaje en el estado `errorMessage`.
7. El componente `ErrorAlert` muestra la alerta visual.

Los mensajes se renderizan de forma segura mediante JSX. No se utiliza `innerHTML` ni `dangerouslySetInnerHTML`, reduciendo el riesgo de inyección XSS.