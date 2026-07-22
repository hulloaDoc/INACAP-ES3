/**
  * InMemoryDb.js
  * Encapsula los datos y el estado en memoria para la simulación CRUD.
  * Sigue el Principio de Responsabilidad Única (SRP) al aislar el acceso a datos.
  */

class InMemoryDb {
  constructor() {
    this.login = {
      username: 'admin',
      password: 'admin123'
    };
    
    this.perfil = {
      username: 'admin',
      nombre: 'Administrador General',
      rol: 'Coordinador del Sistema',
      correo: 'admin@inacap.cl',
      avatar: 'https://api.dicebear.com/7.x/adventurer/svg?seed=admin'
    };

    // Opción A: Gestor de Inventario
    this.productos = [
      { id: 1, nombre: 'Arroz Grano Largo 1kg', precio: 1250, stock: 45, categoria: 'Abarrotes' },
      { id: 2, nombre: 'Leche Entera 1L', precio: 950, stock: 12, categoria: 'Lácteos' },
      { id: 3, nombre: 'Cloro Gel Multiuso 900cc', precio: 1890, stock: 0, categoria: 'Limpieza' }
    ];
    this.categorias = ['Abarrotes', 'Lácteos', 'Limpieza', 'Electrónica', 'Hogar'];
  }

  // --- Métodos de Selección de Datos ---
  getCategorias() { return this.categorias; }
  getUsuarios() { return this.usuarios; }
  getSalas() { return this.salas; }

  // --- CRUD Productos ---
  getProductos() { return this.productos; }
  getProductoById(id) { return this.productos.find(p => p.id === id); }
  addProducto(prod) {
    const nuevo = {
      id: this.productos.length > 0 ? Math.max(...this.productos.map(p => p.id)) + 1 : 1,
      nombre: String(prod.nombre),
      precio: Number(prod.precio),
      stock: Number(prod.stock),
      categoria: String(prod.categoria)
    };
    this.productos.push(nuevo);
    return nuevo;
  }
  updateProducto(id, prod) {
    const idx = this.productos.findIndex(p => p.id === id);
    if (idx === -1) return null;
    this.productos[idx] = {
      id: id,
      nombre: String(prod.nombre),
      precio: Number(prod.precio),
      stock: Number(prod.stock),
      categoria: String(prod.categoria)
    };
    return this.productos[idx];
  }
  deleteProducto(id) {
    const idx = this.productos.findIndex(p => p.id === id);
    if (idx === -1) return false;
    this.productos.splice(idx, 1);
    return true;
  }
}

module.exports = new InMemoryDb();
