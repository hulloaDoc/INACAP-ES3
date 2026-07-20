# Task Tracker - Evaluación ES3
## Ingeniería en Informática - INACAP

# Autor

Luis Benjamín Henríquez Cortés

Ingeniería en Informática - Vespertino

INACAP

Evaluación ES3

## Descripción

Task Tracker es una aplicación web desarrollada con React y Vite para la gestión de tareas. El proyecto implementa un CRUD completo (Crear, Leer, Actualizar y Eliminar) utilizando un Mock Server con JSON Server como API REST simulada.

La aplicación incorpora autenticación simulada, manejo de estado con React Hooks, comunicación HTTP mediante Axios y almacenamiento local utilizando LocalStorage para mantener la sesión del usuario.

---

# Tecnologías utilizadas

- React
- Vite
- JavaScript (ES6+)
- Axios
- JSON Server
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

- Inicio de sesión simulado.
- Validación local de credenciales.
- Persistencia de sesión mediante LocalStorage.
- Cierre de sesión.

---

## Gestión de tareas

- Crear tareas.
- Listar tareas.
- Editar tareas.
- Eliminar tareas.
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

La búsqueda se realiza en tiempo real.

---

## Validaciones

- Campos obligatorios.
- Mensajes de éxito.
- Mensajes de error.
- Confirmación antes de eliminar una tarea.

---

# API utilizada

El proyecto utiliza JSON Server como API REST simulada.

Base URL

```
http://localhost:3000
```

Endpoints utilizados

| Método | Endpoint | Descripción |
|---------|----------|-------------|
| GET | /tasks | Obtener todas las tareas |
| POST | /tasks | Crear una tarea |
| PUT | /tasks/:id | Actualizar una tarea |
| DELETE | /tasks/:id | Eliminar una tarea |

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

Iniciar el Mock Server.

```bash
cd front_end/mock-server

npm start
```

Servidor:

```
http://localhost:3000
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

La autenticación es simulada.

Correo

```
admin@inacap.cl
```

Contraseña

```
123456
```

La sesión permanece almacenada en LocalStorage hasta cerrar sesión.

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

## JSON Server

Almacena las tareas.

## LocalStorage

Mantiene la sesión del usuario autenticado.

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