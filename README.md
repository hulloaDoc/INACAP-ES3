# Task Tracker - Evaluación ES3
## Ingeniería en Informática - INACAP

# Autor

Luis Benjamín Henríquez Cortés

Ingeniería en Informática - Vespertino

INACAP

Evaluación ES3

## Descripción

Task Tracker es una aplicación web desarrollada con React y Vite para la gestión de tareas. El proyecto implementa un CRUD completo (Crear, Leer, Actualizar y Eliminar) consumiendo un Mock API propio (`mock-server/mock_api_server.js`), construido sobre el módulo nativo `http` de Node.js con arquitectura de controladores/router/middleware, que expone el recurso `/api/tareas` protegido con autenticación HTTP Basic Auth.

La aplicación incorpora autenticación real contra el Mock API (login con usuario/contraseña, token Basic Auth persistido en LocalStorage), manejo de estado con React Hooks, comunicación HTTP mediante una instancia centralizada de Axios (con interceptores de autenticación y manejo de errores) y almacenamiento local para mantener la sesión y las preferencias visuales del usuario.

---

# Tecnologías utilizadas

- React
- Vite
- JavaScript (ES6+)
- Axios
- Node.js (http nativo, sin frameworks) para el Mock API
- CSS3
- HTML5

---

## Estructura del proyecto

```
INACAP-ES3/
│
├── front_end/
│   ├── node_modules/
│   ├── public/
│   │
│   ├── src/
│   │   ├── api/
│   │   │   └── axiosInstance.js
│   │   │
│   │   ├── assets/
│   │   │
│   │   ├── components/
│   │   │   ├── ErrorAlert.jsx
│   │   │   ├── Header.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── TaskCard.jsx
│   │   │   ├── TaskForm.jsx
│   │   │   └── TaskStats.jsx
│   │   │
│   │   ├── pages/
│   │   │   └── Dashboard.jsx
│   │   │
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   └── taskService.js
│   │   │
│   │   ├── utils/
│   │   │   └── localStorage.js
│   │   │
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   └── vite.config.js
│
├── mock-server/
│   ├── db.json
│   ├── package.json
│   ├── package-lock.json
│   └── node_modules/
│
└── README.md


---

# Funcionalidades implementadas

## Autenticación

- Inicio de sesión real contra el Mock API (`POST /api/login`).
- Token Basic Auth persistido en LocalStorage y adjuntado automáticamente a cada petición mediante un interceptor de Axios.
- Validación de la sesión contra `GET /api/perfil` al recargar la página.
- Cierre de sesión.

---

## Gestión de tareas

- Crear tareas.
- Listar tareas.
- Editar tareas.
- Eliminar tareas (con confirmación previa).
- Actualización automática de la interfaz sin recargar la página.

---

## Estadísticas

La aplicación muestra indicadores en tiempo real de:

- Total de tareas.
- Tareas pendientes.
- Tareas completadas.

---

## Buscador

Permite filtrar tareas por:

- Título.
- Descripción.
- Responsable.

La búsqueda se realiza en tiempo real.

---

## Validaciones

- Campos obligatorios.
- Mensajes de éxito.
- Mensajes de error.
- Confirmación antes de eliminar una tarea.

---

## Manejo de errores y evidencia

- Interceptor centralizado de Axios que captura errores 400, 401, 404 y 500, los registra en la consola del navegador y los traduce a un mensaje visual mediante `<ErrorAlert />`.
- Un token inválido o expirado (401) limpia automáticamente la sesión guardada.
- Ver `evidencia_pruebas/README.md` para las instrucciones exactas de cómo reproducir y capturar cada uno de los 3 casos exigidos por la pauta (401 / 404 / 500).

---

# API utilizada

El proyecto consume un Mock API propio (`mock-server/mock_api_server.js`), construido con el módulo nativo `http` de Node.js (sin frameworks externos).

Base URL

```
http://localhost:4000/api
```

Todas las rutas, salvo `/login`, requieren la cabecera `Authorization: Basic YWRtaW46YWRtaW4xMjM=` (obtenida al iniciar sesión).

Endpoints utilizados

| Método | Endpoint | Descripción | Requiere Auth |
|---------|----------|-------------|---------------|
| POST | /login | Autenticación, retorna token Basic Auth y perfil | No |
| GET | /perfil | Datos del usuario autenticado | Sí |
| GET | /usuarios | Lista de responsables disponibles | Sí |
| GET | /tareas | Obtener todas las tareas | Sí |
| POST | /tareas | Crear una tarea | Sí |
| PUT | /tareas/:id | Actualizar una tarea | Sí |
| DELETE | /tareas/:id | Eliminar una tarea | Sí |

La API también simula errores 500 agregando `?error=500` (o la cabecera `x-simulate-error: 500`) a cualquier petición, usado para la evidencia de manejo de errores (ver `evidencia_pruebas/`).

---

# Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

---

## 2. Instalar dependencias del Front-End

```bash
cd front_end

npm install
```

---

## 3. Instalar dependencias del Mock Server

```bash
cd mock-server

npm install
```

---

# Ejecución del proyecto

El proyecto requiere dos terminales.

## Terminal 1

Iniciar el Mock API.

```bash
cd mock-server

npm start
```

Servidor:

```
http://localhost:4000
```

---

## Terminal 2

Iniciar React.

```bash
cd front_end

npm run dev
```

Aplicación:

```
http://localhost:5173
```

---

# Credenciales de acceso

La autenticación es real contra el Mock API (`POST /api/login`), validada en el backend.

Usuario

admin
```

Contraseña

admin123
```

El token Basic Auth y los datos de perfil quedan almacenados en LocalStorage hasta cerrar sesión. La app valida ese token contra `GET /api/perfil` al recargar la página.

---

# Componentes principales

## Login

Responsable del inicio de sesión del usuario.

---

## Header

Muestra el nombre de la aplicación, usuario autenticado y botón de cierre de sesión.

---

## Dashboard

Contenedor principal de la aplicación.

Administra:

- carga de tareas
- formulario
- estadísticas
- búsqueda
- listado

---

## TaskForm

Formulario para crear y editar tareas.

---

## TaskCard

Representa visualmente una tarea.

Permite:

- editar
- eliminar

---

## TaskStats

Calcula y muestra estadísticas de las tareas.

---

## ErrorAlert

Muestra mensajes de error y confirmaciones para el usuario.

---

# Servicios

## authService.js

Contiene la lógica relacionada con:

- inicio de sesión
- cierre de sesión
- validación del usuario

---

## taskService.js

Gestiona las peticiones HTTP utilizando Axios.

Incluye:

- GET
- POST
- PUT
- DELETE

---

# Persistencia de datos

La aplicación utiliza dos mecanismos:

## Mock API (mock-server)

Almacena las tareas en memoria (`InMemoryDb.js`) durante la ejecución del servidor, expuestas mediante `/api/tareas`.

## LocalStorage

Mantiene la sesión del usuario autenticado (token Basic Auth + perfil) y las preferencias visuales (tema claro/oscuro), validando el JSON antes de confiar en él para evitar datos corruptos o manipulados.

---

# Características del proyecto

- Arquitectura basada en componentes.
- Código modular.
- Separación entre componentes, servicios y utilidades.
- Comunicación mediante Axios.
- Estado administrado con React Hooks.
- Interfaz responsive.
- Actualización dinámica de la información.
- Código organizado siguiendo buenas prácticas de React.

---

# Prompt utilizado para la IA Generativa

Durante el desarrollo del proyecto se utilizó IA generativa (Claude AI) como apoyo para la creación de la estructura base del proyecto y algunos componentes, manteniendo posteriormente revisiones, correcciones y adaptaciones manuales para cumplir con los requisitos de la evaluación.

## Prompt utilizado

```
Desarrolla una aplicación completa de gestión de tareas utilizando React + Vite.

La aplicación debe cumplir los siguientes requisitos:

- Implementar un sistema de login simulado utilizando LocalStorage.
- Utilizar Axios para consumir una API REST creada con JSON Server.
- Implementar un CRUD completo de tareas:
  - Crear
  - Listar
  - Editar
  - Eliminar
- Organizar el proyecto siguiendo buenas prácticas de React separando:
  - components
  - pages
  - services
  - api
  - utils
- Crear componentes reutilizables.
- Mantener el estado utilizando React Hooks.
- Mostrar mensajes de éxito y error cuando corresponda.
- Confirmar antes de eliminar una tarea.
- Agregar un buscador para filtrar tareas por título o descripción.
- Mostrar estadísticas de tareas:
  - Total
  - Pendientes
  - Completadas
- Utilizar CSS puro con una interfaz limpia, moderna y responsive.
- Crear un Mock Server utilizando JSON Server.
- Configurar Axios mediante una instancia reutilizable.
- Entregar el proyecto completamente funcional, organizado y comentado cuando sea necesario.
```

## Uso de la IA

La inteligencia artificial fue utilizada únicamente como apoyo para acelerar el desarrollo del proyecto. El código generado fue revisado, probado, corregido y adaptado manualmente para cumplir con los requisitos solicitados en la evaluación.

---

## Segundo prompt — Auditoría y corrección contra la pauta ES3

Tras integrar el Mock API real (`mock-server/mock_api_server.js`, con Basic Auth y el recurso `/api/tareas`), el front-end seguía apuntando a la versión de práctica inicial (login simulado por correo, JSON Server en `/tasks`, tareas con un campo `estado` libre). Se usó IA generativa con el siguiente prompt para auditar el proyecto completo contra la rúbrica oficial y corregir únicamente lo necesario:

```
Actúa como un desarrollador Senior especializado en React, Vite, Axios y JSON Server.
NO quiero que rehagas el proyecto. NO quiero una nueva arquitectura. NO quiero un
nuevo diseño. Quiero que trabajes SOBRE MI PROYECTO ACTUAL.
Tu trabajo es únicamente AUDITAR y CORREGIR: compara el proyecto punto por punto
con la pauta ES3 y realiza únicamente las modificaciones necesarias para cumplir
el 100% de los requisitos, manteniendo estructura, nombres de archivo y lógica
existente siempre que sea posible.
```

### Justificación técnica crítica de lo implementado

- **Instancia de Axios con interceptores en lugar de headers manuales por llamada**: se centralizó la inyección del token Basic Auth y el manejo de errores HTTP en `axiosInstance.js` (interceptores de request/response) en vez de repetirlo en cada servicio. Esto evita duplicar lógica de autenticación en `taskService.js`/`authService.js` y asegura que cualquier error 400/401/404/500 se registre en consola y se traduzca a un mensaje consistente sin tocar cada componente.
- **Validación de la sesión leída desde LocalStorage**: se agregó una función `isValidSession()` que verifica la forma del objeto antes de confiar en él, en vez de asumir que cualquier JSON parseable es válido. Un `localStorage` es editable manualmente desde la consola del navegador; sin esta validación, un valor manipulado podría enviarse como header `Authorization` sin control.
- **Cambio del modelo de tarea (`estado` → `prioridad` + `responsable` + `completada`)**: se adoptó porque el Mock API real (`InMemoryDb.js`) ya define ese esquema; mantener el campo `estado` habría generado un CRUD que compila pero nunca persiste datos reales contra el backend de la evaluación.
- **Preferencia de tema persistida (`getPreferences`/`savePreferences`/`clearPreferences`)**: se implementó como la funcionalidad más simple que cumple el requisito explícito de la Opción B de la pauta ("Almacena en LocalStorage preferencias de configuración visual") sin introducir una reestructuración de la UI existente.
- **Riesgo no adoptado**: se evaluó reescribir el diseño de las tarjetas para un tablero Kanban (Pendiente/En Proceso/Completada) como en el wireframe oficial, pero se descartó por instrucción explícita de no rediseñar la interfaz existente; en su lugar se mantiene el listado con badges de estado y prioridad, que cubre el mismo requisito funcional (CRUD reactivo) sin alterar el layout aprobado.