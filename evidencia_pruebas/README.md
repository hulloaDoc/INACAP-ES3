# Evidencia de Pruebas - Manejo de Errores HTTP

## Descripcion de la logica implementada

Esta carpeta contiene las capturas de pantalla que evidencian el manejo correcto de errores HTTP en la aplicacion **Agenda de Eventos y Reuniones (Opcion C)**.

### Logica de manejo de errores

Todos los errores HTTP son atrapados en la funcion `handleError()` del componente `Dashboard.jsx`. La logica funciona de la siguiente manera:

```javascript
function handleError(err) {
  const status = err.response?.status;
  const mensaje = err.response?.data?.mensaje || 'Error desconocido';
  if (status === 401) {
    setError('Sesion expirada o credenciales invalidas...');
  } else if (status === 404) {
    setError(`Recurso no encontrado: ${mensaje}`);
  } else if (status === 500) {
    setError('Error interno del servidor. Intenta mas tarde.');
  } else if (status === 400) {
    setError(`Solicitud invalida: ${mensaje}`);
  } else {
    setError(mensaje);
  }
}
```

### Errores cubiertos

| Error | Como se genera | Comportamiento esperado |
|-------|---------------|------------------------|
| **401 Unauthorized** | Peticion sin header Authorization o credenciales incorrectas en login | Alerta roja en pantalla: "Sesion expirada o credenciales invalidas" |
| **404 Not Found** | Peticion a un ID de evento inexistente (ej: `/api/eventos/999`) | Alerta: "Recurso no encontrado: Evento con ID 999 no encontrado" |
| **500 Internal Server Error** | Agregar query `?error=500` a cualquier URL o header `x-simulate-error: 500` | Alerta: "Error interno del servidor. Intenta mas tarde." |

### Archivos de captura

Las capturas deben tomarse desde la consola del navegador (F12 > Console) y la interfaz grafica:

- `error_401_consola.png` - Error 401 en consola del navegador
- `error_401_interfaz.png` - Alerta visual de error 401 en la UI
- `error_404_consola.png` - Error 404 en consola del navegador
- `error_404_interfaz.png` - Alerta visual de error 404 en la UI
- `error_500_consola.png` - Error 500 en consola del navegador
- `error_500_interfaz.png` - Alerta visual de error 500 en la UI

### Instrucciones para generar las capturas

1. Iniciar sesion con `admin` / `admin123`
2. **Error 401**: Cerrar sesion y hacer una peticion manual en consola con `fetch('http://localhost:4000/api/eventos')` sin header Authorization
3. **Error 404**: Hacer una peticion a un ID inexistente con `fetch('http://localhost:4000/api/eventos/999', { headers: { Authorization: 'Basic YWRtaW46YWRtaW4xMjM=' } })`
4. **Error 500**: Navegar a `http://localhost:4000/api/eventos?error=500` con el header Authorization correcto
