/**
  * Router.js
  * Enrutador asíncrono liviano para mapear métodos HTTP y patrones de ruta.
  * Soporta parámetros de ruta dinámicos (ej. /api/productos/:id).
  */

class Router {
  constructor() {
    this.routes = [];
  }

  // Registra una ruta y su controlador
  add(method, pathPattern, handler) {
    // Convierte el patrón '/api/productos/:id' a una expresión regular
    const pattern = pathPattern.replace(/:[^\s/]+/g, '([\\w-]+)');
    const regexPath = new RegExp('^' + pattern + '$');
    this.routes.push({ method, regexPath, handler });
  }

  // Busca una ruta coincidente y la despacha
  async dispatch(req, res, parsedUrl) {
    const method = req.method;
    const path = parsedUrl.pathname;

    for (const route of this.routes) {
      if (route.method === method) {
        const match = path.match(route.regexPath);
        if (match) {
          // Extraer parámetros dinámicos de la ruta
          const params = match.slice(1);
          return await route.handler(req, res, params, parsedUrl.query);
        }
      }
    }

    // Ruta no encontrada
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not Found', mensaje: `Ruta ${method} ${path} no encontrada` }));
  }
}

module.exports = Router;
