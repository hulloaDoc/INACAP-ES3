import api from '../api/axiosInstance';

function extractArray(data, possibleKeys = []) {
  if (Array.isArray(data)) {
    return data;
  }

  for (const key of possibleKeys) {
    if (Array.isArray(data?.[key])) {
      return data[key];
    }
  }

  return [];
}

export async function getProducts() {
  const response = await api.get('/productos');

  return extractArray(response.data, [
    'productos',
    'products',
    'data',
  ]);
}

export async function getCategories() {
  const response = await api.get('/categorias');

  return extractArray(response.data, [
    'categorias',
    'categories',
    'data',
  ]);
}
export async function getProductById(id) {
  const response = await api.get(`/productos/${id}`);

  return (
    response.data?.producto ||
    response.data?.product ||
    response.data
  );
}

export async function createProduct(product) {
  const response = await api.post('/productos', product);

  return (
    response.data?.producto ||
    response.data?.product ||
    response.data
  );
}

export async function updateProduct(id, product) {
  const response = await api.put(`/productos/${id}`, product);

  return (
    response.data?.producto ||
    response.data?.product ||
    response.data
  );
}

export async function deleteProduct(id) {
  const response = await api.delete(`/productos/${id}`);

  return response.data;
}