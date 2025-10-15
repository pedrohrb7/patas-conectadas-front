import api from './api';

interface Donor {
  id: string;
  name: string;
}

export const getDonors = async (): Promise<Donor[]> => {
  const response = await api.get('/donors');
  return response.data;
};

export const getDonorById = async (id: string): Promise<Donor> => {
  const response = await api.get(`/donors/${id}`);
  return response.data;
};

export const createDonor = async (donorData: Omit<Donor, 'id'>): Promise<Donor> => {
  const response = await api.post('/donors', donorData);
  return response.data;
};

export const updateDonor = async (id: string, donorData: Partial<Donor>): Promise<Donor> => {
  const response = await api.put(`/donors/${id}`, donorData);
  return response.data;
};

export const deleteDonor = async (id: string): Promise<void> => {
  await api.delete(`/donors/${id}`);
};
