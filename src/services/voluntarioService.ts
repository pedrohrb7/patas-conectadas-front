import api from './api';

export interface Voluntario {
  id_voluntario?: number;
  nome: string;
  email: string;
  telefone?: string;
  preferencias: string[];
  habilidades?: string[];
  disponibilidade?: string;
  pontos?: number;
  badges?: Badge[];
  preferencias_atuacao?: string;
}

export type CreateVoluntario = Omit<Voluntario, 'id_voluntario'>;

export interface Badge {
  id?: number;
  nome: string;
  descricao: string;
  icone?: string;
  dataConquista?: string;
}

export interface Tarefa {
  id?: number;
  titulo: string;
  descricao: string;
  voluntarioId?: number;
  status: 'pendente' | 'em_andamento' | 'concluida' | 'cancelada';
  prioridade: 'baixa' | 'media' | 'alta';
  dataInicio?: string;
  dataConclusao?: string;
  pontos?: number;
}

export const voluntarioService = {
  getAll: async () => {
    const response = await api.get<Voluntario[]>('/volunteers');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Voluntario>(`/volunteers/${id}`);
    return response.data;
  },

  create: async (voluntario: CreateVoluntario) => {
    const response = await api.post<Voluntario>('/volunteers', voluntario);
    return response.data;
  },

  update: async (id: number, voluntario: Partial<Voluntario>) => {
    const response = await api.put<Voluntario>(`/volunteers/${id}`, voluntario);
    return response.data;
  },

  updatePreferencias: async (id: number, preferencias: string[]) => {
    const response = await api.patch<Voluntario>(`/voluntarios/${id}/preferencias`, { preferencias });
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/voluntarios/${id}`);
  },

  getBadges: async (id: number) => {
    const response = await api.get<Badge[]>(`/voluntarios/${id}/badges`);
    return response.data;
  },
};

export const tarefaService = {
  getAll: async () => {
    const response = await api.get<Tarefa[]>('/tasks');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Tarefa>(`/tasks/${id}`);
    return response.data;
  },

  getByVoluntario: async (voluntarioId: number) => {
    const response = await api.get<Tarefa[]>(`/tasks/voluntario/${voluntarioId}`);
    return response.data;
  },

  create: async (tarefa: Omit<Tarefa, 'id'>) => {
    const response = await api.post<Tarefa>('/tasks', tarefa);
    return response.data;
  },

  update: async (id: number, tarefa: Partial<Tarefa>) => {
    const response = await api.put<Tarefa>(`/tasks/${id}`, tarefa);
    return response.data;
  },

  atribuir: async (id: number, voluntarioId: number) => {
    const response = await api.patch<Tarefa>(`/tasks/${id}/assign/${voluntarioId}`);
    return response.data;
  },

  concluir: async (id: number) => {
    const response = await api.patch<Tarefa>(`/tasks/${id}/complete`, {});
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/tasks/${id}`);
  },
};
