/**
  * AuthController.js
  * Controlador para la autenticación y perfil del usuario.
  */

const db = require('../database/InMemoryDb');
const parseJsonBody = require('../utils/bodyParser');

class AuthController {
  async login(req, res) {
    try {
      const data = await parseJsonBody(req);
      console.log('[LOGIN DEBUG] Body recibido:', JSON.stringify(data));
      console.log('[LOGIN DEBUG] db.login:', JSON.stringify(db.login));
      console.log('[LOGIN DEBUG] user match:', data.username === db.login.username, '| pass match:', data.password === db.login.password);
      if (data.username === db.login.username && data.password === db.login.password) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          success: true,
          mensaje: 'Autenticación exitosa',
          token: 'Basic YWRtaW46YWRtaW4xMjM=', // Credencial devuelta para localStorage
          user: db.perfil
        }));
      } else {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Unauthorized', mensaje: 'Usuario o contraseña incorrectos' }));
      }
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Cuerpo JSON inválido o malformado' }));
    }
  }

  async getPerfil(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.perfil));
  }
}

module.exports = new AuthController();
