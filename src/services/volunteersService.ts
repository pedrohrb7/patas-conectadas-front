import api from './api';

interface Volunteer {
  id: string;
  name: string;
}

export const getVolunteers = async (): Promise<Volunteer[]> => {
  const response = await api.get('/volunteers');
  return response.data;
};

export const getVolunteerById = async (id: string): Promise<Volunteer> => {
  const response = await api.get(`/volunteers/${id}`);
  return response.data;
};

export const createVolunteer = async (volunteerData: Omit<Volunteer, 'id'>): Promise<Volunteer> => {
  const response = await api.post('/volunteers', volunteerData);
  return response.data;
};

export const updateVolunteer = async (id: string, volunteerData: Partial<Volunteer>): Promise<Volunteer> => {
  const response = await api.put(`/volunteers/${id}`, volunteerData);
  return response.data;
};

export const deleteVolunteer = async (id: string): Promise<void> => {
  await api.delete(`/volunteers/${id}`);
};
