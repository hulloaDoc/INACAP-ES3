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

    // Opción B: Task Tracker
    this.tareas = [
      { id: 1, titulo: 'Configurar servidor DNS', descripcion: 'Migrar zona de DNS secundario a Amazon Route 53', prioridad: 'Alta', completada: false, responsable: 'Juan Pérez' },
      { id: 2, titulo: 'Diseñar mockup de login', descripcion: 'Elaborar propuesta visual en Figma con paleta INACAP', prioridad: 'Media', completada: true, responsable: 'Ana Gómez' },
      { id: 3, titulo: 'Auditar tablas de LocalStorage', descripcion: 'Validar consistencia de los datos serializados en cliente', prioridad: 'Baja', completada: false, responsable: 'Luis Rojas' }
    ];
    this.usuarios = ['Juan Pérez', 'Ana Gómez', 'Luis Rojas', 'Sofía Díaz'];

    // Opción C: Agenda de Eventos
    this.eventos = [
      { id: 1, nombre_evento: 'Reunión de Coordinación Académica', fecha: '2026-07-20', hora: '10:30', lugar: 'Sala de Reuniones 102', descripcion: 'Planificación de cargas horarias y evaluaciones sumativas' },
      { id: 2, nombre_evento: 'Taller Práctico React + Axios', fecha: '2026-07-22', hora: '14:15', lugar: 'Sala de Computación A', descripcion: 'Demostración práctica de consumo REST y captura de logs de consola' },
      { id: 3, nombre_evento: 'Sustentación de Proyectos TIE', fecha: '2026-07-25', hora: '09:00', lugar: 'Auditorio Central', descripcion: 'Defensa oral de los prototipos del taller front-end' }
    ];
    this.salas = ['Sala de Computación A', 'Auditorio Central', 'Sala de Reuniones 102', 'Laboratorio Químico'];
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

  // --- CRUD Tareas ---
  getTareas() { return this.tareas; }
  getTareaById(id) { return this.tareas.find(t => t.id === id); }
  addTarea(task) {
    const nueva = {
      id: this.tareas.length > 0 ? Math.max(...this.tareas.map(t => t.id)) + 1 : 1,
      titulo: String(task.titulo),
      descripcion: String(task.descripcion),
      prioridad: String(task.prioridad),
      completada: !!task.completada,
      responsable: String(task.responsable)
    };
    this.tareas.push(nueva);
    return nueva;
  }
  updateTarea(id, task) {
    const idx = this.tareas.findIndex(t => t.id === id);
    if (idx === -1) return null;
    this.tareas[idx] = {
      id: id,
      titulo: String(task.titulo),
      descripcion: String(task.descripcion),
      prioridad: String(task.prioridad),
      completada: !!task.completada,
      responsable: String(task.responsable)
    };
    return this.tareas[idx];
  }
  deleteTarea(id) {
    const idx = this.tareas.findIndex(t => t.id === id);
    if (idx === -1) return false;
    this.tareas.splice(idx, 1);
    return true;
  }

  // --- CRUD Eventos ---
  getEventos() { return this.eventos; }
  getEventoById(id) { return this.eventos.find(e => e.id === id); }
  addEvento(evt) {
    const nuevo = {
      id: this.eventos.length > 0 ? Math.max(...this.eventos.map(e => e.id)) + 1 : 1,
      nombre_evento: String(evt.nombre_evento),
      fecha: String(evt.fecha),
      hora: String(evt.hora),
      lugar: String(evt.lugar),
      descripcion: String(evt.descripcion)
    };
    this.eventos.push(nuevo);
    return nuevo;
  }
  updateEvento(id, evt) {
    const idx = this.eventos.findIndex(e => e.id === id);
    if (idx === -1) return null;
    this.eventos[idx] = {
      id: id,
      nombre_evento: String(evt.nombre_evento),
      fecha: String(evt.fecha),
      hora: String(evt.hora),
      lugar: String(evt.lugar),
      descripcion: String(evt.descripcion)
    };
    return this.eventos[idx];
  }
  deleteEvento(id) {
    const idx = this.eventos.findIndex(e => e.id === id);
    if (idx === -1) return false;
    this.eventos.splice(idx, 1);
    return true;
  }
}

module.exports = new InMemoryDb();
