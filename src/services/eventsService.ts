import api from './api';

interface Event {
  id: string;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface Participation {
}

export const getEvents = async (): Promise<Event[]> => {
  const response = await api.get('/events');
  return response.data;
};

export const getEventById = async (id: string): Promise<Event> => {
  const response = await api.get(`/events/${id}`);
  return response.data;
};

export const createEvent = async (eventData: Omit<Event, 'id'>): Promise<Event> => {
  const response = await api.post('/events', eventData);
  return response.data;
};

export const updateEvent = async (id: string, eventData: Partial<Event>): Promise<Event> => {
  const response = await api.put(`/events/${id}`, eventData);
  return response.data;
};

export const deleteEvent = async (id: string): Promise<void> => {
  await api.delete(`/events/${id}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createParticipation = async (participationData: any): Promise<Participation> => {
  const response = await api.post('/events/participations', participationData);
  return response.data;
};

export const getEventParticipations = async (id: string): Promise<Participation[]> => {
  const response = await api.get(`/events/${id}/participations`);
  return response.data;
};
