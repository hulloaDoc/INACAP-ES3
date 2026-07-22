// Base de datos en memoria para el mock
let mockProducts = [
  { id: 1, nombre: 'Leche Descremada', precio: 1500, stock: 40, categoria: 'Lácteos' },
  { id: 2, nombre: 'Escoba', precio: 3000, stock: 15, categoria: 'Limpieza' }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const getProducts = async () => {
  await delay(500); // Simulamos latencia de red
  return [...mockProducts];
};

export const createProduct = async (product) => {
  await delay(500);
  const newProduct = { ...product, id: Date.now() };
  mockProducts.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id, updatedData) => {
  await delay(500);
  mockProducts = mockProducts.map(p => p.id === id ? { ...p, ...updatedData } : p);
  return mockProducts.find(p => p.id === id);
};

export const deleteProduct = async (id) => {
  await delay(500);
  mockProducts = mockProducts.filter(p => p.id !== id);
  return { success: true };
};

export const getCategories = async () => {
  await delay(200);
  return ['Abarrotes', 'Lácteos', 'Limpieza', 'Electrónica', 'Hogar'];
};