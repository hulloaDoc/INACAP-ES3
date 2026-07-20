/**
  * TaskController.js
  * Controlador para el CRUD de tareas y listado de usuarios del equipo.
  */

const db = require('../database/InMemoryDb');
const parseJsonBody = require('../utils/bodyParser');

class TaskController {
  async getAll(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getTareas()));
  }

  async getById(req, res, params) {
    const id = parseInt(params[0]);
    const tarea = db.getTareaById(id);
    if (tarea) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(tarea));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found', mensaje: `Tarea con ID ${id} no encontrada` }));
    }
  }

  async create(req, res) {
    try {
      const body = await parseJsonBody(req);
      if (!body.titulo || !body.descripcion || !body.prioridad || !body.responsable) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Campos obligatorios faltantes: titulo, descripcion, prioridad, responsable' }));
        return;
      }
      const nueva = db.addTarea(body);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(nueva));
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Cuerpo JSON inválido o malformado' }));
    }
  }

  async update(req, res, params) {
    try {
      const id = parseInt(params[0]);
      const body = await parseJsonBody(req);
      if (!body.titulo || !body.descripcion || !body.prioridad || !body.responsable) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Campos obligatorios faltantes: titulo, descripcion, prioridad, responsable' }));
        return;
      }
      const actualizada = db.updateTarea(id, body);
      if (actualizada) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(actualizada));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found', mensaje: `Tarea con ID ${id} no encontrada` }));
      }
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Cuerpo JSON inválido o malformado' }));
    }
  }

  async delete(req, res, params) {
    const id = parseInt(params[0]);
    const exitoso = db.deleteTarea(id);
    if (exitoso) {
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found', mensaje: `Tarea con ID ${id} no encontrada` }));
    }
  }

  async getUsuarios(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getUsuarios()));
  }
}

module.exports = new TaskController();
