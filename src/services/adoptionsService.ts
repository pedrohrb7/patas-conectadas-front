import api from './api';

interface Adoption {
  id: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface AnnualReport {
}

export const getAdoptions = async (): Promise<Adoption[]> => {
  const response = await api.get('/adoptions');
  return response.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getAnnualAdoptionsReport = async (params: any): Promise<AnnualReport> => {
  const response = await api.get('/adoptions/reports/annual', { params });
  return response.data;
};

export const getAdoptionById = async (id: string): Promise<Adoption> => {
  const response = await api.get(`/adoptions/${id}`);
  return response.data;
};

export const createAdoption = async (adoptionData: Omit<Adoption, 'id'>): Promise<Adoption> => {
  const response = await api.post('/adoptions', adoptionData);
  return response.data;
};

export const updateAdoption = async (id: string, adoptionData: Partial<Adoption>): Promise<Adoption> => {
  const response = await api.put(`/adoptions/${id}`, adoptionData);
  return response.data;
};

export const deleteAdoption = async (id: string): Promise<void> => {
  await api.delete(`/adoptions/${id}`);
};
