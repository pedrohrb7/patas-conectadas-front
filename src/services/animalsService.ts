import api from './api';

interface Animal {
  id: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface MedicalHistory {
}

export const getAnimals = async (): Promise<Animal[]> => {
  const response = await api.get('/animals');
  return response.data;
};

export const getAnimalById = async (id: string): Promise<Animal> => {
  const response = await api.get(`/animals/${id}`);
  return response.data;
};

export const createAnimal = async (animalData: Omit<Animal, 'id'>): Promise<Animal> => {
  const response = await api.post('/animals', animalData);
  return response.data;
};

export const updateAnimal = async (id: string, animalData: Partial<Animal>): Promise<Animal> => {
  const response = await api.put(`/animals/${id}`, animalData);
  return response.data;
};

export const deleteAnimal = async (id: string): Promise<void> => {
  await api.delete(`/animals/${id}`);
};

export const getAnimalMedicalHistory = async (id: string): Promise<MedicalHistory[]> => {
  const response = await api.get(`/animals/${id}/medical-history`);
  return response.data;
};

export const updateAnimalStatus = async (id: string, statusId: string): Promise<Animal> => {
  const response = await api.patch(`/animals/${id}/status/${statusId}`);
  return response.data;
};
