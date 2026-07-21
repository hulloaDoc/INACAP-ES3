# Evaluación Sumativa 3 (ES3) — Programación Front-End INACAP

*   **Asignatura:** Programación Front-End
*   **Código:** TI3V31
*   **Unidad:** 3 (Framework en JavaScript: ReactJS)
*   **Porcentaje de Evaluación:** 35% de la Nota de Presentación (NP)
*   **Instrumento:** Escala de apreciación en rúbrica XLSX
*   **Puntaje Total:** 100 Puntos (Aprobación mínima con 60 puntos para nota 4.0)

---

## 1. Contexto de la Problemática y Opciones

El estudiante deberá seleccionar **una** de las siguientes tres problemáticas y desarrollar una aplicación web de una sola página (SPA) en React que solucione las necesidades del negocio. Todas las aplicaciones deben consumir una API mock centralizada mediante peticiones HTTP asíncronas seguras y manejar almacenamiento persistente en el navegador (LocalStorage).

### 👥 Módulo Común de Autenticación (Obligatorio para las 3 opciones)
Toda aplicación debe contar con una pantalla o formulario de inicio de sesión (`login`) que envíe credenciales (`username` y `password`) a la API. Al autenticarse correctamente, el sistema guardará el token de seguridad en LocalStorage y consumirá el perfil del usuario para mostrar una barra superior (Header) con la bienvenida personalizada, rol del usuario, correo y su avatar.

---

### 📦 Opción A: Gestor de Inventario de Tienda (Store Inventory Manager)
*   **Propósito:** Administrar el stock físico de productos de una tienda minorista.
*   **API Endpoints:**
    *   `GET /api/productos`: Lista de todos los productos.
    *   `GET /api/productos/:id`: Detalle de un producto individual.
    *   `POST /api/productos`: Registrar un producto (requiere: `nombre`, `precio`, `stock`, `categoria`).
    *   `PUT /api/productos/:id`: Editar los datos de un producto.
    *   `DELETE /api/productos/:id`: Eliminar un producto del stock.
    *   `GET /api/categorias`: Retorna las categorías disponibles (`['Abarrotes', 'Lácteos', 'Limpieza', 'Electrónica', 'Hogar']`).
*   **Integración LocalStorage:** Crear una bitácora o historial de transacciones realizadas en la sesión (ej: "Usuario admin editó producto ID 2 a las 15:40") para auditoría del administrador.
*   **Wireframe ASCII del Diseño Esperado:**
```
+------------------------------------------------------------+
| [INACAP]   Inventario de Tienda   | Bienvenido, admin [Out]|
+------------------------------------------------------------+
| Categoria: [Abarrotes v]  Filtrar por stock: [En stock v] |
+------------------------------------------------------------+
| + Agregar Producto                                         |
| +--------------------------------------------------------+ |
| | ID | Nombre        | Precio | Stock | Cat.    | Accion | |
| |----+---------------+--------+-------+---------+--------| |
| | 1  | Arroz 1kg     | $1250  | 45    | Abarrot.| [E] [X]| |
| | 2  | Leche 1L      | $950   | 0     | Lácteos | [E] [X]| |
| +--------------------------------------------------------+ |
| BITÁCORA DE AUDITORÍA (LocalStorage)                       |
| - [14:30] admin editó el producto ID 2.                   |
| - [14:28] admin eliminó el producto ID 5.                 |
+------------------------------------------------------------+
```

---

### 📋 Opción B: Task Tracker de Equipo (Team Task Tracker)
*   **Propósito:** Controlar el avance de tareas técnicas asignadas a miembros de un equipo de TI.
*   **API Endpoints:**
    *   `GET /api/tareas`: Lista de todas las tareas.
    *   `GET /api/tareas/:id`: Obtener una tarea en particular.
    *   `POST /api/tareas`: Registrar una tarea (requiere: `titulo`, `descripcion`, `prioridad`, `responsable`, `completada`).
    *   `PUT /api/tareas/:id`: Editar los datos de una tarea.
    *   `DELETE /api/tareas/:id`: Eliminar una tarea del registro.
    *   `GET /api/usuarios`: Retorna el equipo disponible (`['Juan Pérez', 'Ana Gómez', 'Luis Rojas', 'Sofía Díaz']`).
*   **Integración LocalStorage:** Guardar las preferencias visuales del usuario (ej: filtro de tareas por prioridad activa o tema oscuro/claro) para que persistan al recargar la web.
*   **Wireframe ASCII del Diseño Esperado:**
```
+------------------------------------------------------------+
| [INACAP]   Task Tracker de Equipo | Bienvenido, admin [Out]|
+------------------------------------------------------------+
| Asignado: [Sofía Díaz v]   Filtro Prioridad: [Todas v]     |
+------------------------------------------------------------+
| + Nueva Tarea                                              |
| +--------------------+ +--------------------+ +----------+ |
| | PENDIENTE (1)      | | EN PROCESO (2)     | | COMPL.   | |
| |--------------------| |--------------------| |----------| |
| | * Config. DNS      | | * Mockup Login     | |          | |
| |   [Alta] [Sofía]   | |   [Media] [Ana]    | |          | |
| |   [Iniciar] [X]    | |   [Completar] [X]  | |          | |
| +--------------------+ +--------------------+ +----------+ |
| PREFERENCIAS VISUALES (LocalStorage): [X] Modo Oscuro      |
+------------------------------------------------------------+
```

---

### 📅 Opción C: Agenda de Eventos y Reuniones (Event & Meeting Planner)
*   **Propósito:** Agendar el uso de salas académicas y laboratorios dentro de la sede INACAP.
*   **API Endpoints:**
    *   `GET /api/eventos`: Lista de eventos agendados.
    *   `GET /api/eventos/:id`: Obtener datos de un evento particular.
    *   `POST /api/eventos`: Reservar sala (requiere: `nombre_evento`, `fecha`, `hora`, `lugar`, `descripcion`).
    *   `PUT /api/eventos/:id`: Editar reserva de evento.
    *   `DELETE /api/eventos/:id`: Cancelar la reserva de evento.
    *   `GET /api/salas`: Salas de la sede (`['Sala de Computación A', 'Auditorio Central', 'Sala de Reuniones 102', 'Laboratorio Químico']`).
*   **Integración LocalStorage:** Almacenar el historial de búsquedas del usuario de salas o eventos para permitir búsquedas rápidas locales.
*   **Wireframe ASCII del Diseño Esperado:**
```
+------------------------------------------------------------+
| [INACAP]   Agenda de Eventos      | Bienvenido, admin [Out]|
+------------------------------------------------------------+
| Buscar: [Taller React...]  Sala: [Todas v]                 |
+------------------------------------------------------------+
| + Agendar Evento                                           |
| +--------------------------------------------------------+ |
| | [2026-07-22 | 14:15] Sala de Computación A              | |
| | Taller Práctico React + Axios                          | |
| | Desc: Demostración consumo REST y logs en consola.      | |
| | [Editar] [Cancelar Evento]                             | |
| +--------------------------------------------------------+ |
| ÚLTIMAS BÚSQUEDAS (LocalStorage)                           |
| - "Taller React" (2026-07-11)                             |
| - "Coordinación" (2026-07-10)                            |
+------------------------------------------------------------+
```

---

## 2. Requerimientos Técnicos Obligatorios

1.  **Framework React + Vite:** El proyecto debe ser inicializado con Vite y estructurado con componentes reutilizables (mínimo: login, barra de navegación, formulario de CRUD, listado dinámico, tarjeta individual, alertas de error).
2.  **Consumo REST con Axios:**
    *   Crear una instancia centralizada de Axios en `src/api/axiosInstance.js` utilizando `axios.create()`.
    *   Configurar los headers globales para enviar la cabecera `Authorization` de autenticación HTTP Basic de forma dinámica.
3.  **Persistencia LocalStorage:**
    *   Guardar la sesión (token/perfil) al iniciar sesión de forma correcta.
    *   Implementar las operaciones CRUD en LocalStorage descritas en cada opción, validando la integridad estructural (ej: control de errores al usar `JSON.parse()`) y previniendo vulnerabilidades XSS mediante desinfección de textos o renderizado nativo seguro (evitar `dangerouslySetInnerHTML`).
4.  **Manejo de Errores y Evidencia de Logs (15%):**
    *   La API mock responderá con códigos HTTP inválidos (400, 401, 404, 500) según las solicitudes enviadas o la presencia de la query `?error=500`.
    *   El estudiante debe atrapar estos códigos en su flujo de Axios y notificar al usuario con un componente de alerta visual dinámico en la UI.
    *   **Evidencia Requerida:** Crear una carpeta en la raíz del proyecto llamada `evidencia_pruebas/` y guardar obligatoriamente las siguientes capturas de pantalla de la consola del navegador y la interfaz del usuario:
        *   `error_401_consola.png` / `error_401_interfaz.png`: Captura del error 401 Unauthorized (petición sin auth o credenciales incorrectas en login) y la alerta en pantalla.
        *   `error_500_consola.png` / `error_500_interfaz.png`: Captura del error 500 Internal Server Error (simulado con la query `?error=500` o cabecera `x-simulate-error: 500`) y el componente `<ErrorAlert />` en la UI sin congelar la app.
        *   `error_404_consola.png` / `error_404_interfaz.png`: Captura del error 404 Not Found (petición a ID inexistente) y la alerta en pantalla.
        *   Incluir un archivo `evidencia_pruebas/README.md` breve en el que insertes estas imágenes y expliques la lógica implementada en tus bloques `catch` para controlarlas.
5.  **Flujo Git y Control de Versiones (15%):**
    *   Trabajar de manera incremental en su propio fork de `evaluacion_sumativa_3`.
    *   Crear ramas independientes `feature/...` para el desarrollo.
    *   Crear y proponer un Pull Request final hacia la rama de entrega `release/es3_nombre_apellido` a partir de su rama base de ES2.
    *   Nomenclatura semántica obligatoria de commits (`feat:`, `fix:`, `docs:`, `refactor:`).

---

## 3. Uso de Inteligencia Artificial (IA)

De acuerdo a los criterios 3.1.1 y 3.1.2 de INACAP, el estudiante debe incorporar herramientas de IA generativa (ChatGPT, Github Copilot, Gemini) en su flujo de desarrollo y documentarlo en su informe final o en la parte inferior del archivo `README.md` del repositorio entregado:
1.  **Prompts Utilizados:** Copiar textualmente las instrucciones dadas a la IA para resolver modularización, validación segura de inputs o el setup de Axios.
2.  **Análisis Crítico:** Explicar el motivo técnico de aceptar o refactorizar la sugerencia provista por la IA, demostrando criterio y comprensión del código.

---

## 4. Instrucciones para levantar el Servidor de Mocks

El servidor mock de la API no cuenta con dependencias npm externas para facilitar su uso. Se ejecuta directamente con NodeJS:
```bash
# 1. Posicionarse en la carpeta where se encuentra el archivo mock_api_server.js
# 2. Levantar el servicio
node mock_api_server.js
```
El servidor comenzará a escuchar peticiones en la dirección `http://localhost:4000`.


## Uso de Inteligencia Artificial

### Prompts Utilizados
"Actúa como un desarrollador experto en React y seguridad web. Genera un ecosistema modular completo partiendo desde un repositorio limpio. Inicializa un entorno de React con Vite e integra Axios mediante un archivo centralizado `axiosInstance.js` con un interceptor de solicitudes asíncronas que inyecte tokens de autenticación de forma dinámica desde `LocalStorage`."

### Análisis Crítico 
Se adoptó la arquitectura modular sugerida dividiendo la vista principal en componentes independientes (Header, ProductForm, ErrorAlert y la vista de administración), garantizando un código mantenible bajo los estándares exigidos por la rúbrica entregada. Se refactorizó la propuesta inicial de la IA eliminando cualquier manipulación directa del DOM (como innerHTML) y restringiendo el procesamiento de inputs a tipos primitivos y serializaciones JSON estrictas, mitigando de forma nativa vulnerabilidades de inyección de código (XSS) al leer o persistir registros en la Bitácora de Auditoría de LocalStorage.
