import api from './api';

export interface Animal {
  id?: number;
  nome: string;
  especie: string;
  raca?: string;
  idade?: number;
  status: 'disponivel' | 'adotado' | 'tratamento' | 'acolhimento';
  descricao?: string;
  historicoMedico?: HistoricoMedico[];
}

export interface HistoricoMedico {
  id?: number;
  data: string;
  descricao: string;
  veterinario?: string;
  tipo: 'consulta' | 'vacina' | 'cirurgia' | 'exame' | 'outro';
}

export const animalService = {
  getAll: async () => {
    const response = await api.get<Animal[]>('/animais');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Animal>(`/animais/${id}`);
    return response.data;
  },

  create: async (animal: Omit<Animal, 'id'>) => {
    const response = await api.post<Animal>('/animais', animal);
    return response.data;
  },

  update: async (id: number, animal: Partial<Animal>) => {
    const response = await api.put<Animal>(`/animais/${id}`, animal);
    return response.data;
  },

  updateStatus: async (id: number, status: Animal['status']) => {
    const response = await api.patch<Animal>(`/animais/${id}/status`, { status });
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/animais/${id}`);
  },

  getHistoricoMedico: async (id: number) => {
    const response = await api.get<HistoricoMedico[]>(`/animais/${id}/historico-medico`);
    return response.data;
  },

  addHistoricoMedico: async (animalId: number, historico: Omit<HistoricoMedico, 'id'>) => {
    const response = await api.post<HistoricoMedico>(`/animais/${animalId}/historico-medico`, historico);
    return response.data;
  },
};
