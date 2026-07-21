# Agenda de Eventos y Reuniones - ES3 INACAP

## Opcion C: Agenda de Eventos y Reuniones (Event & Meeting Planner)

Aplicacion web SPA desarrollada con **React + Vite** para la gestion de eventos y reuniones en la sede INACAP.

### Autor

- **Nombre:** Joaquin Osses
- **Asignatura:** Programacion Front-End (TI3V31)
- **Unidad:** 3 - Framework en JavaScript: ReactJS

### Stack Tecnologico

- React 19 + Vite
- Axios (consumo REST)
- React Router DOM (enrutamiento)
- CSS puro con variables
- LocalStorage (persistencia)

### Funcionalidades

- **Autenticacion:** Login con credenciales, persistencia de sesion en LocalStorage
- **Header:** Barra superior con bienvenida, rol, correo, avatar y boton de logout
- **CRUD de Eventos:** Crear, editar y cancelar eventos académicos
- **Busqueda:** Filtrado por nombre de evento
- **Filtro por Sala:** Seleccion de sala disponible desde la API
- **Historial de Busquedas:** Persistido en LocalStorage para busquedas rapidas
- **Control de Errores:** Manejo visual de errores HTTP 400, 401, 404, 500

### Estructura del Proyecto

```
front_end/
├── src/
│   ├── api/axiosInstance.js          # Instancia centralizada de Axios
│   ├── context/AuthContext.jsx       # Estado global de autenticacion
│   ├── components/
│   │   ├── LoginForm.jsx            # Formulario de login
│   │   ├── Header.jsx               # Barra superior
│   │   ├── EventCard.jsx            # Tarjeta de evento
│   │   ├── EventForm.jsx            # Formulario CRUD modal
│   │   ├── SearchBar.jsx            # Barra de busqueda
│   │   ├── RoomFilter.jsx           # Filtro de salas
│   │   ├── SearchHistory.jsx        # Historial de busquedas
│   │   ├── ErrorAlert.jsx           # Alerta de errores
│   │   └── LoadingSpinner.jsx       # Indicador de carga
│   ├── pages/Dashboard.jsx          # Pagina principal
│   ├── utils/localStorage.js        # Helpers de persistencia
│   ├── App.jsx                      # Rutas
│   └── main.jsx                     # Punto de entrada
└── evidencia_pruebas/               # Capturas de errores HTTP
```

### Como Ejecutar

```bash
# 1. Levantar el servidor mock (puerto 4000)
cd mock-server
node mock_api_server.js

# 2. En otra terminal, levantar el front-end
cd front_end
npm install
npm run dev
```

### Credenciales de Acceso

- **Usuario:** admin
- **Contrasena:** admin123

### API Endpoints Consumidos

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | /api/login | Autenticacion |
| GET | /api/perfil | Perfil del usuario |
| GET | /api/eventos | Listar eventos |
| GET | /api/eventos/:id | Detalle de evento |
| POST | /api/eventos | Crear evento |
| PUT | /api/eventos/:id | Editar evento |
| DELETE | /api/eventos/:id | Cancelar evento |
| GET | /api/salas | Listar salas |

---

## 3. Uso de Inteligencia Artificial (IA)

### Prompts Utilizados

**Prompt 1 - Estructura del proyecto React + Vite:**
> "Crea la estructura de un proyecto React + Vite para una aplicacion de agenda de eventos con login, CRUD de eventos, busqueda, filtro por sala y historial de busquedas en LocalStorage. Usa axios para consumir una API mock en localhost:4000. Necesito axiosInstance con interceptor de Authorization, AuthContext para manejo de sesion, y componentes: LoginForm, Header, EventCard, EventForm, SearchBar, RoomFilter, SearchHistory, ErrorAlert."

**Prompt 2 - Manejo de errores HTTP:**
> "Implementa una funcion handleError en React que reciba el error de axios y devuelva un mensaje apropiado segun el status code (400, 401, 404, 500). El componente ErrorAlert debe mostrar el mensaje en un div con role alert y boton de cierre."

**Prompt 3 - Persistencia LocalStorage segura:**
> "Crea helpers para LocalStorage en JavaScript que usen try/catch para controlar errores de JSON.parse y prevengan XSS usando solo textContent o innerHTML. Incluye funciones para guardar sesion, historial de busquedas, y obtener datos con validacion de integridad."

### Analisis Critico

**Prompt 1 - Estructura del proyecto:**
La IA sugirio usar Context API para la autenticacion, lo cual es correcto para este alcance. Se accepto porque no se necesita Redux ni Zustand para un proyecto de esta escala. Se refactoro la sugerencia para agregar interceptores de Axios y manejo de loading states.

**Prompt 2 - Manejo de errores:**
La IA proporciono un patron correcto de manejo de errores con switch/case. Se refactoro a if/else if para mayor claridad academica y se agrego soporte para errores de red (sin respuesta del servidor). Se accepto la sugerencia base y se mejoro con mensajes mas descriptivos en espanol.

**Prompt 3 - LocalStorage seguro:**
La IA sugirio usar try/catch en todas las operaciones de localStorage, lo cual es correcto. Se accepto completamente porque previene crashes cuando el storage esta lleno o los datos estan corruptos. Se agrego validacion de integridad con JSON.parse dentro de try/catch para prevenir datos corruptos.
