# Servidor Mock API - ES3 INACAP

Este proyecto contiene el servidor mock local para simular la API REST que consume la aplicación React en la **Evaluación Sumativa 3 (ES3)**.

## 🚀 Requisitos y Ejecución

El servidor está desarrollado utilizando únicamente módulos nativos de NodeJS (`http`, `crypto`, `fs`), por lo que **no requiere la instalación de dependencias externas** mediante `npm install`.

### Levantar el servidor en desarrollo:
Para ejecutar el servidor con reinicio automático ante cambios en el código:
```bash
npm run dev
```

### Levantar el servidor en producción/ejecución básica:
```bash
npm start
```

El servidor estará escuchando solicitudes HTTP en `http://localhost:4000`.

## 🛠️ Endpoints Disponibles

### Comunes (Autenticación)
*   `POST /api/login`: Recibe `{ "username": "admin", "password": "admin123" }` y retorna el token básico y datos del perfil.
*   `GET /api/perfil`: Retorna el perfil del usuario autenticado (requiere cabecera `Authorization`).

### Específicos por Opción de Frontend
*   **Opción A (Inventario):** `/api/productos` (CRUD) y `/api/categorias` (Listar).
*   **Opción B (Tareas):** `/api/tareas` (CRUD) y `/api/usuarios` (Listar).
*   **Opción C (Eventos):** `/api/eventos` (CRUD) y `/api/salas` (Listar).
