import api from './api';

export interface Animal {
  id_animal?: number;
  nome: string;
  especie: string;
  raca?: string;
  idade?: number;
  id_status: 'disponivel' | 'adotado' | 'tratamento' | 'acolhimento';
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
    const response = await api.get<Animal[]>('/animals');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Animal>(`/animals/${id}`);
    return response.data;
  },

  create: async (animal: Omit<Animal, 'id'>) => {
    const response = await api.post<Animal>('/animals', animal);
    return response.data;
  },

  update: async (id: number, animal: Partial<Animal>) => {
    const response = await api.put<Animal>(`/animals/${id}`, animal);
    return response.data;
  },

  updateStatus: async (id: number, status: Animal['id_status']) => {
    const response = await api.patch<Animal>(`/animals/${id}/status`, { status });
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/animals/${id}`);
  },

  getHistoricoMedico: async (id: number) => {
    const response = await api.get<HistoricoMedico[]>(`/animals/${id}/historico-medico`);
    return response.data;
  },

  addHistoricoMedico: async (animalId: number, historico: Omit<HistoricoMedico, 'id'>) => {
    const response = await api.post<HistoricoMedico>(`/animals/${animalId}/historico-medico`, historico);
    return response.data;
  },
};
