import api from './api';

interface Task {
  id: string;
  description: string;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

export const getTaskById = async (id: string): Promise<Task> => {
  const response = await api.get(`/tasks/${id}`);
  return response.data;
};

export const createTask = async (taskData: Omit<Task, 'id'>): Promise<Task> => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

export const updateTask = async (id: string, taskData: Partial<Task>): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, taskData);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};

export const assignTask = async (id: string, volunteerId: string): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}/assign/${volunteerId}`);
  return response.data;
};

export const completeTask = async (id: string, statusId: string): Promise<Task> => {
  const response = await api.patch(`/tasks/${id}/complete/${statusId}`);
  return response.data;
};
