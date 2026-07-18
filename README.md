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
## Proyecto desarrollado

### Gestor de Inventario de Tienda

Aplicación web SPA desarrollada con React y Vite para administrar el inventario de una tienda.

La aplicación permite iniciar sesión, consultar productos, filtrar el inventario, registrar nuevos productos, editar información existente, eliminar registros y conservar una bitácora de auditoría en LocalStorage.

### Estudiante

- **Nombre:** Matías Espíndola
- **Asignatura:** Programación Front-End
- **Evaluación:** Evaluación Sumativa 3
- **Unidad:** Framework en JavaScript: ReactJS

---

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- Axios
- CSS
- LocalStorage
- Node.js
- Git y GitHub

---

## Funcionalidades implementadas

- Inicio de sesión con usuario y contraseña.
- Autenticación mediante token Basic Auth.
- Persistencia de sesión en LocalStorage.
- Consulta del perfil del usuario autenticado.
- Header con nombre, rol, correo y avatar.
- Listado dinámico de productos.
- Consulta de categorías.
- Filtro por categoría.
- Filtro por disponibilidad de stock.
- Registro de productos mediante POST.
- Edición de productos mediante PUT.
- Eliminación de productos mediante DELETE.
- Validación de nombre, precio, stock y categoría.
- Bitácora de auditoría persistente en LocalStorage.
- Limpieza del historial de auditoría.
- Manejo centralizado de errores HTTP 400, 401, 404 y 500.
- Alertas visuales sin congelar la aplicación.
- Evidencias de errores de consola e interfaz.

---

## Credenciales de prueba

```text
Usuario: admin
Contraseña: admin123
```

---

## Ejecución del proyecto

### 1. Ejecutar el servidor simulado

Desde la raíz del repositorio:

```bash
cd mock-server
node mock_api_server.js
```

El servidor se ejecuta en:

```text
http://localhost:4000
```

### 2. Ejecutar React

En una segunda terminal:

```bash
cd front_end
npm install
npm run dev
```

La aplicación se ejecuta en:

```text
http://localhost:5173
```

React y el servidor simulado deben mantenerse ejecutándose simultáneamente.

---

## Estructura principal

```text
INACAP-ES3
├── evidencia_pruebas
│   ├── README.md
│   ├── error_401_consola.png
│   ├── error_401_interfaz.png
│   ├── error_404_consola.png
│   ├── error_404_interfaz.png
│   ├── error_500_consola.png
│   └── error_500_interfaz.png
├── front_end
│   └── src
│       ├── api
│       ├── components
│       ├── services
│       ├── utils
│       ├── App.jsx
│       └── App.css
└── mock-server
```

---

## Seguridad e integridad

La aplicación implementa las siguientes medidas:

- Lectura segura de LocalStorage mediante `try/catch`.
- Validación de la estructura de la sesión y de la bitácora.
- Eliminación de valores dañados almacenados localmente.
- Validación de entradas antes de enviarlas a la API.
- Renderizado de textos mediante JSX.
- No se utiliza `innerHTML`.
- No se utiliza `dangerouslySetInnerHTML`.
- El token se incorpora automáticamente mediante un interceptor de Axios.
- Los errores HTTP son capturados sin detener la aplicación.

---

## Evidencia de errores

Las capturas y la explicación técnica se encuentran en:

```text
evidencia_pruebas/README.md
```

Se documentaron los siguientes casos:

- Error 401 por credenciales incorrectas.
- Error 404 al consultar un producto inexistente.
- Error 500 mediante una simulación del servidor.
- Error 400 por campos obligatorios faltantes.

---

## Uso de Inteligencia Artificial — ES3

Durante el desarrollo se utilizó ChatGPT como herramienta de apoyo para comprender React, modularizar componentes, configurar Axios, validar entradas y organizar el flujo Git.

### Prompt 1 — Configuración de Axios

> Necesito crear una instancia centralizada de Axios en `src/api/axiosInstance.js` para una aplicación React con Vite. Debe utilizar `axios.create()`, conectarse a `http://localhost:4000/api`, agregar dinámicamente el token Basic Auth guardado en LocalStorage y manejar de forma centralizada los errores HTTP 400, 401, 404 y 500.

#### Análisis crítico

Se aceptó la recomendación de utilizar una instancia centralizada porque evita repetir la URL, los encabezados y la lógica de autenticación en cada solicitud. También permite que todos los errores sean tratados de manera uniforme mediante interceptores.

La solución fue revisada para que la petición de login no incluyera un token anterior y para que las demás solicitudes protegidas recibieran el encabezado `Authorization`.

---

### Prompt 2 — Modularización de React

> Necesito modularizar un gestor de inventario desarrollado en React. Debe utilizar componentes reutilizables para el login, alertas, formulario de productos, tabla, filtros, bitácora y pruebas de errores. La lógica de conexión con la API debe estar separada en servicios y debe utilizar `useState`, `useEffect`, `useMemo` y componentes funcionales.

#### Análisis crítico

Se aceptó la separación en componentes porque facilita la lectura, reutilización y mantenimiento del proyecto.

La lógica del CRUD se separó en `productService.js`, mientras que la visualización se distribuyó en componentes como `ProductForm`, `ProductTable`, `AuditLog` y `ErrorAlert`.

También se revisó que cada Hook tuviera una función concreta y que no existieran estados o imports sin utilizar. Esto se comprobó mediante `npm run lint`.

---

### Prompt 3 — Validación segura de entradas

> Necesito validar de forma segura un formulario de productos con los campos nombre, precio, stock y categoría. Los mensajes deben aparecer en español, el precio debe ser mayor que cero, el stock debe ser un número entero igual o mayor que cero y no se debe utilizar `innerHTML` ni `dangerouslySetInnerHTML`.

#### Análisis crítico

La validación automática del navegador mostraba algunos mensajes en inglés. Por ese motivo se utilizó `noValidate` en el formulario y se implementaron validaciones personalizadas en React.

Esta decisión permite mostrar mensajes claros en español y mantener un comportamiento uniforme entre navegadores.

Los textos se renderizan mediante JSX, por lo que no se insertan directamente como HTML. Esto reduce riesgos de inyección XSS.

---

### Prompt 4 — Bitácora en LocalStorage

> Necesito implementar una bitácora de auditoría en LocalStorage que registre el usuario, la acción realizada, el ID, el nombre del producto y la fecha. Debe validar el JSON almacenado, persistir después de actualizar la página y permitir limpiar el historial.

#### Análisis crítico

Se aceptó LocalStorage porque era un requerimiento específico de la opción de inventario.

La solución fue limitada a 50 registros para evitar un crecimiento indefinido. Además, se validó la estructura de cada entrada y se implementó un bloque `try/catch` para impedir que un JSON dañado bloquee la aplicación.

---

## Conclusión sobre el uso de IA

Las sugerencias de inteligencia artificial no fueron aplicadas de forma automática. Cada bloque fue probado en el servidor simulado, revisado mediante el navegador y validado con ESLint.

También se realizaron modificaciones propias, como:

- Personalizar los mensajes en español.
- Corregir imports sin uso.
- Separar la lógica de servicios y componentes.
- Validar la estructura de LocalStorage.
- Confirmar cada operación CRUD.
- Crear evidencias reales de errores 401, 404 y 500.

La IA se utilizó como apoyo para comprender y organizar la solución, mientras que las decisiones finales se comprobaron directamente en el proyecto.