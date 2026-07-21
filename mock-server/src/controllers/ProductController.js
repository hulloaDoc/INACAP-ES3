/**
  * ProductController.js
  * Controlador para el CRUD de productos y listado de categorías.
  */

const db = require('../database/InMemoryDb');
const parseJsonBody = require('../utils/bodyParser');

class ProductController {
  async getAll(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getProductos()));
  }

  async getById(req, res, params) {
    const id = parseInt(params[0]);
    const prod = db.getProductoById(id);
    if (prod) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(prod));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found', mensaje: `Producto con ID ${id} no encontrado` }));
    }
  }

  async create(req, res) {
    try {
      const body = await parseJsonBody(req);
      if (!body.nombre || body.precio === undefined || body.stock === undefined || !body.categoria) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Campos obligatorios faltantes: nombre, precio, stock, categoria' }));
        return;
      }
      const nuevo = db.addProducto(body);
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
      if (!body.nombre || body.precio === undefined || body.stock === undefined || !body.categoria) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Campos obligatorios faltantes: nombre, precio, stock, categoria' }));
        return;
      }
      const actualizado = db.updateProducto(id, body);
      if (actualizado) {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(actualizado));
      } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not Found', mensaje: `Producto con ID ${id} no encontrado` }));
      }
    } catch (err) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Bad Request', mensaje: 'Cuerpo JSON inválido o malformado' }));
    }
  }

  async delete(req, res, params) {
    const id = parseInt(params[0]);
    const exitoso = db.deleteProducto(id);
    if (exitoso) {
      res.writeHead(204);
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Not Found', mensaje: `Producto con ID ${id} no encontrado` }));
    }
  }

  async getCategorias(req, res) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(db.getCategorias()));
  }
}

module.exports = new ProductController();
