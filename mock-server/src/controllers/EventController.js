/**
  * EventController.js
  * Controlador para el CRUD de eventos académicos y listado de salas.
  */

const db = require('../database/InMemoryDb');
const parseJsonBody = require('../utils/bodyParser');

class EventController {
  async getAll(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getEventos()));
  }

  async getById(req, res, params) {
    const id = parseInt(params[0]);
    const evt = db.getEventoById(id);
    if (evt) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(evt));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found', mensaje: `Evento con ID ${id} no encontrado` }));
    }
  }

  async create(req, res) {
    try {
      const body = await parseJsonBody(req);
      if (!body.nombre_evento || !body.fecha || !body.hora || !body.lugar || !body.descripcion) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Campos obligatorios faltantes: nombre_evento, fecha, hora, lugar, descripcion' }));
        return;
      }
      const nuevo = db.addEvento(body);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(nuevo));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Cuerpo JSON inválido o malformado' }));
    }
  }

  async update(req, res, params) {
    try {
      const id = parseInt(params[0]);
      const body = await parseJsonBody(req);
      if (!body.nombre_evento || !body.fecha || !body.hora || !body.lugar || !body.descripcion) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Campos obligatorios faltantes: nombre_evento, fecha, hora, lugar, descripcion' }));
        return;
      }
      const actualizado = db.updateEvento(id, body);
      if (actualizado) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(actualizado));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found', mensaje: `Evento con ID ${id} no encontrado` }));
      }
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Cuerpo JSON inválido o malformado' }));
    }
  }

  async delete(req, res, params) {
    const id = parseInt(params[0]);
    const exitoso = db.deleteEvento(id);
    if (exitoso) {
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found', mensaje: `Evento con ID ${id} no encontrado` }));
    }
  }

  async getSalas(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getSalas()));
  }
}

module.exports = new EventController();
