/**
  * Middleware.js
  * Implementa filtros interceptores (CORS, simulación de fallas y autenticación HTTP Basic).
  * Sigue el Principio de Responsabilidad Única (SRP) y permite el desacoplamiento de filtros.
  */

class Middleware {
  // 1. Cabeceras CORS y Preflight OPTIONS
  applyCors(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, x-simulate-error');

    if (req.method === 'OPTIONS') {
      res.writeHead(204);
      res.end();
      return false; // Detener flujo
    }
    return true; // Continuar flujo
  }

  // 2. Simulación de errores HTTP 500 para la evidencia de los logs
  simulateError(req, res, parsedUrl) {
    const errorHeader = req.headers['x-simulate-error'];
    const errorQuery = parsedUrl.query.error;

    if (errorHeader === '500' || errorQuery === '500') {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Internal Server Error', 
        mensaje: 'Simulación de error 500 en el servidor mock' 
      }));
      return false; // Detener flujo
    }
    return true; // Continuar flujo
  }

  // 3. Validación de credenciales Basic Auth
  authenticate(req, res, parsedUrl) {
    // La ruta de login se excluye de la verificación previa
    if (parsedUrl.pathname === '/api/login') {
      return true; // Continuar flujo
    }

    const authHeader = req.headers['authorization'];
    // admin:admin123 codificado en base64 para Basic Auth es: Basic YWRtaW46YWRtaW4xMjM=
    if (!authHeader || authHeader !== 'Basic YWRtaW46YWRtaW4xMjM=') {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        error: 'Unauthorized', 
        mensaje: 'Acceso Denegado: Cabecera Authorization inválida o ausente' 
      }));
      return false; // Detener flujo
    }
    return true; // Continuar flujo
  }
}

module.exports = new Middleware();
