/**
  * mock_api_server.js
  * Punto de entrada principal para el servidor Mock API.
  * Inicializa el Router, registra controladores y levanta el servidor HTTP nativo.
  * Diseñado bajo principios SOLID y patrones de diseño limpio para fines académicos.
  */

const http = require('http');
const url = require('url');

const Router = require('./src/router/Router');
const middleware = require('./src/middleware/Middleware');

// Controladores
const authController = require('./src/controllers/AuthController');
const productController = require('./src/controllers/ProductController');
const taskController = require('./src/controllers/TaskController');
const eventController = require('./src/controllers/EventController');

const PORT = 4000;

// 1. Inicialización y registro de rutas en el Enrutador
const router = new Router();

// Rutas de Autenticación
router.add('POST', '/api/login', (req, res) => authController.login(req, res));
router.add('GET', '/api/perfil', (req, res) => authController.getPerfil(req, res));

// Rutas de Consultas Generales
router.add('GET', '/api/categorias', (req, res) => productController.getCategorias(req, res));
router.add('GET', '/api/usuarios', (req, res) => taskController.getUsuarios(req, res));
router.add('GET', '/api/salas', (req, res) => eventController.getSalas(req, res));

// Rutas CRUD Opción A: Gestor de Inventario (Productos)
router.add('GET', '/api/productos', (req, res) => productController.getAll(req, res));
router.add('GET', '/api/productos/:id', (req, res, params) => productController.getById(req, res, params));
router.add('POST', '/api/productos', (req, res) => productController.create(req, res));
router.add('PUT', '/api/productos/:id', (req, res, params) => productController.update(req, res, params));
router.add('DELETE', '/api/productos/:id', (req, res, params) => productController.delete(req, res, params));

// 2. Creación del Servidor HTTP y orquestación del flujo de Middlewares
const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);

  // Ejecución en cadena de middlewares
  if (!middleware.applyCors(req, res)) return;
  if (!middleware.simulateError(req, res, parsedUrl)) return;
  if (!middleware.authenticate(req, res, parsedUrl)) return;

  // Despacho de la ruta al controlador correspondiente
  try {
    await router.dispatch(req, res, parsedUrl);
  } catch (err) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Internal Server Error', mensaje: 'Fallo crítico al procesar la solicitud' }));
  }
});

// 3. Encendido del Servidor
server.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Servidor Mock API ES3 iniciado en puerto ${PORT}`);
  console.log(`   Acceso Local: http://localhost:${PORT}`);
  console.log(`====================================================`);
});
