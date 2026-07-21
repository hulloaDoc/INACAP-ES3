# Evaluación ES3 - React + Vite

Proyecto desarrollado en el marco de la evaluación sumativa de Programación Front-End INACAP. La aplicación implementa una SPA con autenticación básica, CRUD de eventos, integración con salas, historial de búsquedas persistido en LocalStorage y manejo centralizado de errores HTTP.

## Descripción

La aplicación permite:
- Iniciar sesión con credenciales básicas.
- Gestionar eventos desde un dashboard.
- Crear, editar y eliminar eventos.
- Asociar eventos a salas disponibles.
- Mantener historial de búsquedas persistido en el navegador.
- Mostrar alertas visuales para errores HTTP.

## Instalación

1. Clonar el repositorio.
2. Ingresar a la carpeta del frontend:
   ```bash
   cd front_end
   ```
3. Instalar dependencias:
   ```bash
   npm install
   ```

## Ejecución

Para ejecutar el proyecto en modo desarrollo:

```bash
cd front_end
npm run dev
```

La aplicación quedará disponible en el puerto 5173 o en el siguiente disponible por Vite.

## Tecnologías

- React
- Vite
- Bootstrap
- Axios
- LocalStorage
- JavaScript ES6+

## Arquitectura

La estructura del proyecto está organizada de forma modular:

- components: componentes visuales reutilizables.
- pages: vistas principales como Login y Dashboard.
- hooks: lógica reutilizable de estado y sesión.
- services: integración con APIs y servicios del frontend.
- utils: utilidades auxiliares y almacenamiento local.
- styles: estilos base globales.

## Flujo Git

El desarrollo se realizó de manera incremental mediante ramas y commits semánticos, siguiendo un flujo orientado a la evaluación:

- feature/sprint-1...
- feature/sprint-2...
- feature/sprint-3...
- feature/sprint-4...
- feature/sprint-5...
- feature/sprint-6...
- feature/sprint-7...
- feature/sprint-8...
- feature/sprint-9...

Cada cambio fue registrado con mensajes tipo:
- feat: para nuevas funcionalidades.
- fix: para correcciones.
- docs: para documentación.
- style: para mejoras visuales.

## Dependencias

- react
- react-dom
- bootstrap
- axios
- vite
- @vitejs/plugin-react

## Autor

Luis Albayay

## Documentación complementaria

- [docs/IA.md](docs/IA.md)
- [docs/EVIDENCIAS.md](docs/EVIDENCIAS.md)
