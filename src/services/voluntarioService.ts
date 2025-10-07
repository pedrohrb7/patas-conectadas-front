import api from './api';

export interface Voluntario {
  id?: number;
  nome: string;
  email: string;
  telefone?: string;
  preferencias: string[];
  habilidades?: string[];
  disponibilidade?: string;
  pontos?: number;
  badges?: Badge[];
}

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
    const response = await api.get<Voluntario[]>('/voluntarios');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Voluntario>(`/voluntarios/${id}`);
    return response.data;
  },

  create: async (voluntario: Omit<Voluntario, 'id'>) => {
    const response = await api.post<Voluntario>('/voluntarios', voluntario);
    return response.data;
  },

  update: async (id: number, voluntario: Partial<Voluntario>) => {
    const response = await api.put<Voluntario>(`/voluntarios/${id}`, voluntario);
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
    const response = await api.get<Tarefa[]>('/tarefas');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Tarefa>(`/tarefas/${id}`);
    return response.data;
  },

  getByVoluntario: async (voluntarioId: number) => {
    const response = await api.get<Tarefa[]>(`/tarefas/voluntario/${voluntarioId}`);
    return response.data;
  },

  create: async (tarefa: Omit<Tarefa, 'id'>) => {
    const response = await api.post<Tarefa>('/tarefas', tarefa);
    return response.data;
  },

  update: async (id: number, tarefa: Partial<Tarefa>) => {
    const response = await api.put<Tarefa>(`/tarefas/${id}`, tarefa);
    return response.data;
  },

  atribuir: async (id: number, voluntarioId: number) => {
    const response = await api.patch<Tarefa>(`/tarefas/${id}/atribuir`, { voluntarioId });
    return response.data;
  },

  concluir: async (id: number) => {
    const response = await api.patch<Tarefa>(`/tarefas/${id}/concluir`, {});
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/tarefas/${id}`);
  },
};
