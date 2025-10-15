import api from './api';

interface Adopter {
  id: string;
  name: string;
}

export const getAdopters = async (): Promise<Adopter[]> => {
  const response = await api.get('/adopters');
  return response.data;
};

export const getAdopterById = async (id: string): Promise<Adopter> => {
  const response = await api.get(`/adopters/${id}`);
  return response.data;
};

export const createAdopter = async (adopterData: Omit<Adopter, 'id'>): Promise<Adopter> => {
  const response = await api.post('/adopters', adopterData);
  return response.data;
};

export const updateAdopter = async (id: string, adopterData: Partial<Adopter>): Promise<Adopter> => {
  const response = await api.put(`/adopters/${id}`, adopterData);
  return response.data;
};

export const deleteAdopter = async (id: string): Promise<void> => {
  await api.delete(`/adopters/${id}`);
};
