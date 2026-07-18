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