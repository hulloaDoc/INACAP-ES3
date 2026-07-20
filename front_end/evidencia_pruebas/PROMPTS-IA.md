## 1. Planificación de la estructura del proyecto

**Prompt:**
> ¿Cómo debería estructurarse el proyecto es3-inventario? Necesito una arquitectura de carpetas recomendada para una SPA en React con autenticación (login), un CRUD de productos y manejo centralizado de errores HTTP (400/401/404/500).

**Resultado:** se definió separar por responsabilidad (no por tipo de archivo): `api/` (cliente HTTP centralizado con interceptores), `context/` (sesión de autenticación), `hooks/` (un hook por dominio: `useProductos`, `useAuth`, `useAuditLog`), `components/` (UI reutilizable sin conocimiento del backend) y `pages/` (orquestan hooks + componentes por ruta).

## 2. Pantalla en blanco al ejecutar `npm run dev`

**Prompt:**
> Antes de editar algo o modificar el código, dime dónde puede estar presentando las fallas y por qué no se muestra nada al momento de utilizar npm run dev.

**Resultado:** se identificó un typo de import (`AutheProvider` en vez de `AuthProvider`) en `main.jsx` y una ruta de script incorrecta en `index.html`.

## 3. Error de conexión al iniciar sesión

**Prompt:**
> ¿Por qué al momento de intentar logearme aparece un error de "no fue posible conectar con el servidor"? ¿Cuál es el error?

**Resultado:** se determinó que el `mock-server` (backend) no estaba levantado en el puerto 4000.

## 4. El error 400 no se mostraba al crear/editar productos

**Prompt:**
> Para el error 400, es utilizado cuando al momento de ingresar un producto (nuevo o actualizado) este no arroja un mensaje con el número 400, a comparación de como lo hace en el panel de pruebas QA. ¿Cómo podríamos solucionar eso?

**Resultado:** se detectó que el `ErrorAlert` de la página quedaba oculto detrás del overlay (z-index) del modal `ProductForm`.

## 5. Mostrar el error dentro del propio formulario

**Prompt:**
> Lo que busco es que al momento de estar actualizando o agregando un nuevo producto este pueda mostrar en el DOM lo que ocasiona el error (ej: ingresa mal un campo ya sea nombre, precio, stock o categoría), el mensaje debe ser visible dentro del DOM y no tenga que estar utilizando el panel de pruebas.

**Resultado:** se integró `ErrorAlert` dentro del propio modal `ProductForm`, y se corrigió un bug adicional: `actualizar()` usaba `POST` en vez de `PUT`, por lo que toda edición fallaba con un 404 de ruta no encontrada antes de llegar a la validación real.

## 6. Igualar el tratamiento de errores 404 y 500 al del 401

**Prompt:**
> El error 401 está bien implementado debido a que hace un reflejo para el usuario dentro de la UI, y a la vez al momento de inspeccionar la consola y el DOM se evidencia el mismo error. Necesito lo mismo para los otros errores (404 y 500).

**Resultado:** se identificó que los botones 404/500 del panel QA hacían llamadas `axios` aisladas con su propio `ErrorAlert`, desacoplado del resto de la app.

## 7. Habilitar que el usuario dispare el 404 de forma real

**Prompt:**
> Para que el error 404 pueda ser ejecutado por un usuario, falta un apartado que permita buscar alguno de los elementos (ID, nombre, categoría), ya que de otra forma solo se puede ejecutar el error por el panel, y lo que se busca es la fluidez completa del servidor.

**Resultado:** se implementó `SearchBar`, con búsqueda por ID contra el backend real (`GET /productos/:id`).

## 8. Ampliar la búsqueda a nombre y categoría

**Prompt:**
> Agrega que la búsqueda sea no solo por ID, sino también por nombre o categoría.

**Resultado:** se agregó filtro local por nombre/categoría dentro del mismo campo de búsqueda.

## 9. Consistencia del error 404 en búsquedas por texto

**Prompt:**
> Al momento de buscar por ID y no encontrarlo, aparece el error dentro de la consola y el DOM, pero al momento de buscarlo por nombre o categoría no aparece el error dentro de la consola al visualizar el DOM. Solo eso hay que corregir.

**Resultado:** se generó un error 404 equivalente (con el mismo log `[API ERROR]` en consola y el mismo `ErrorAlert` en UI) cuando la búsqueda local por nombre/categoría no encuentra coincidencias.

## 10. Limpieza del panel de pruebas QA

**Prompt:**
> Ahora borra del panel de prueba el apartado del error 404, ya que este funciona de manera manual al momento de que el usuario interactúa con el servidor.

**Resultado:** se quitó el botón de forzar 404 del panel QA, dejando únicamente el de forzar 500 (que sigue siendo necesariamente simulado, al no existir una forma real de provocar una caída del servidor desde la UI).

## 11. Explicación de la conexión entre frontend y backend

**Prompt:**
> Explícame cómo se conecta el frontend (es3-inventario) con el backend (mock-server). ¿Dónde se define la URL de la API, cómo se envía la autenticación en cada petición, y cómo llega el CORS entre los dos puertos distintos (5137 y 4000)?

**Resultado:** se explicó que la conexión se centraliza en `axiosClient.js`: la URL base (`http://localhost:4000/api`) se define una sola vez, un interceptor de request adjunta automáticamente el token Basic Auth guardado en `localStorage`, el middleware `applyCors` del mock-server habilita las cabeceras CORS y responde a las peticiones `OPTIONS` (preflight) entre los puertos 5137 y 4000, y un interceptor de response normaliza cualquier error HTTP a un formato único (`{status, mensaje}`) reutilizado por todos los componentes.

---

**Resumen de aprendizajes aplicados:**
- Diagnóstico de errores de import/rutas en un proyecto Vite + React.
- Diferencia entre errores de red (sin `response`) y errores HTTP con `status` (400/401/404/500).
- Manejo de z-index/overlays en modales y su efecto sobre la visibilidad de componentes.
- Coherencia entre el método HTTP del cliente (axios) y las rutas registradas en el backend (Node/HTTP nativo).
- Centralización del estado de error para reutilizar un mismo componente de alerta (`ErrorAlert`) en distintos flujos de la aplicación.
