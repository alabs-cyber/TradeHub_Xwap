import { api } from './api';

export interface Item {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export const itemService = {
  getAllItems: () => api.get('/products'),
  getItemById: (id: number) => api.get(`/products/${id}`),
  getCategories: () => api.get('/products/categories'),
  getItemsByCategory: (category: string) => api.get(`/products/category/${category}`),
  createItem: (item: Partial<Item>) => api.post('/products', item),
  updateItem: (id: number, item: Partial<Item>) => api.put(`/products/${id}`, item),
  deleteItem: (id: number) => api.delete(`/products/${id}`),
};
