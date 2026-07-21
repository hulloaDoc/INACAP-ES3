# Evidencia de Pruebas — Manejo de Errores (ES3)

Esta carpeta debe contener las 6 capturas de pantalla exigidas por la pauta
(2 por cada código de error: 401, 500 y 404). 
## Requisitos previos

1. Levanta el Mock API real:
   ```bash
   cd mock-server
   npm start
   ```
   Debe quedar escuchando en `http://localhost:4000`.
2. Levanta el front-end:
   ```bash
   cd front_end
   npm run dev
   ```
3. Abre el navegador en `http://localhost:5173`, abre las **DevTools**
   (F12) y ubícate en la pestaña **Console**.

## Cómo funciona el manejo de errores en el código

Todo el manejo centralizado vive en `front_end/src/api/axiosInstance.js`,
en el interceptor de respuesta de Axios:

- Lee `error.response.status` y el campo `mensaje` que retorna la API.
- Si no hay `mensaje` explícito, usa un mensaje por defecto según el código
  (400/401/404/500).
- Llama a `console.error(...)` con el código y el mensaje — **esto es lo
  que debe aparecer en las capturas de consola**.
- Si el código es 401, limpia la sesión guardada (`clearSession()`).
- Rechaza la promesa con `{ status, mensaje }`, que los componentes
  (`Login.jsx`, `Dashboard.jsx`) capturan en sus bloques `.catch()` y
  muestran mediante `<ErrorAlert />`.

## Caso 1 — Error 401 (Unauthorized)

**Cómo reproducirlo:** en la pantalla de Login, ingresa credenciales
incorrectas (usuario o contraseña distintos de `admin` / `admin123`) y
presiona "Ingresar".

- `error_401_consola.png`: captura de la pestaña Console mostrando el log
  `[API Error] 401 - ...` generado por el interceptor, junto con la
  petición fallida en la pestaña Network (`POST /api/login` en rojo,
  status 401).
- `error_401_interfaz.png`: captura del banner rojo de `<ErrorAlert />` en
  el formulario de Login mostrando el mensaje "Usuario o contraseña
  incorrectos".

## Caso 2 — Error 500 (Internal Server Error)

**Cómo reproducirlo:** el servidor simula un 500 cuando la query string
incluye `?error=500`. Como la UI no expone ese parámetro directamente,
la forma más simple es pegar esto en la Console del navegador **estando
ya logueado** (para usar el mismo token guardado en LocalStorage):

```js
fetch('http://localhost:4000/api/tareas?error=500', {
  headers: { Authorization: JSON.parse(localStorage.getItem('task_tracker_session')).token }
}).then(r => console.log('status:', r.status));
```

Alternativamente, en la pestaña **Network** de DevTools puedes clonar
("Copy as fetch") una petición real a `/api/tareas` hecha por la app y
agregarle `?error=500` a la URL antes de reenviarla.

- `error_500_consola.png`: captura de la Console mostrando el log
  `[API Error] 500 - Simulación de error 500 en el servidor mock`.
- `error_500_interfaz.png`: si disparas el error 500 recargando el
  Dashboard con esa query (o adaptando temporalmente `getTasks()` en
  `taskService.js` para apuntar a `/tareas?error=500`), captura el banner
  de `<ErrorAlert />` mostrando el mensaje de error sin que la SPA se
  congele (las tarjetas ya cargadas siguen visibles).

## Caso 3 — Error 404 (Not Found)

**Cómo reproducirlo:** intenta eliminar o editar una tarea con un ID que
ya no existe. La forma más directa: crea una tarea, elimínala, y
**vuelve a hacer clic en Eliminar sobre esa misma tarjeta** antes de que
la lista se refresque (o simplemente pega esto en la Console estando
logueado):

```js
fetch('http://localhost:4000/api/tareas/99999', {
  method: 'DELETE',
  headers: { Authorization: JSON.parse(localStorage.getItem('task_tracker_session')).token }
}).then(r => console.log('status:', r.status));
```

- `error_404_consola.png`: captura de la Console mostrando el log
  `[API Error] 404 - Tarea con ID 99999 no encontrada`.
- `error_404_interfaz.png`: captura del banner de `<ErrorAlert />> en el
  Dashboard mostrando "No fue posible eliminar la tarea." (o el mensaje
  específico devuelto por la API).

## Checklist de archivos a agregar aquí

- [ ] `error_401_consola.png`
- [ ] `error_401_interfaz.png`
- [ ] `error_500_consola.png`
- [ ] `error_500_interfaz.png`
- [ ] `error_404_consola.png`
- [ ] `error_404_interfaz.png`

Una vez agregadas las 6 imágenes, inserta cada una en este archivo con
`![descripción](nombre_archivo.png)` bajo su sección correspondiente antes
de la entrega final.
