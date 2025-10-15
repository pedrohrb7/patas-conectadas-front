import api from './api';
import { Voluntario } from './voluntarioService';

export interface Evento {
  id_evento?: number;
  nome: string;
  descricao?: string;
  data: string;
  local: string;
  participantes?: Participante[];
  capacidade?: number;
}

export interface Participante {
  id?: number;
  nome: string;
  email: string;
  tipo: 'voluntario' | 'doador' | 'outro';
  voluntario?: Voluntario;
}

export interface Adocao {
  id?: number;
  animalId: number;
  adotante: Adotante;
  dataAdocao: string;
  termoResponsabilidade: string;
  status: 'pendente' | 'aprovada' | 'rejeitada';
  observacoes?: string;
}

export interface Adotante {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  endereco: string;
  cidade: string;
  estado: string;
  cep: string;
  profissao?: string;
  rendaMensal?: number;
  possuiOutrosPets?: boolean;
  descricaoMoradia?: string;
}

export interface RelatorioAdocao {
  totalAdocoes: number;
  adocoesPorMes: { mes: string; total: number }[];
  taxaAdocao: number;
  animaisMaisAdotados: { especie: string; quantidade: number }[];
}

export const eventoService = {
  getAll: async () => {
    const response = await api.get<Evento[]>('/events');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Evento>(`/events/${id}`);
    return response.data;
  },

  create: async (evento: Omit<Evento, 'id'>) => {
    const response = await api.post<Evento>('/events', evento);
    return response.data;
  },

  update: async (id: number, evento: Partial<Evento>) => {
    const response = await api.put<Evento>(`/events/${id}`, evento);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/events/${id}`);
  },

  registrarParticipacao: async (eventoId: number, participante: Omit<Participante, 'id'>) => {
    const response = await api.post<Participante>(`/events/participations`, participante);
    return response.data;
  },

  getParticipantes: async (eventoId: number) => {
    const response = await api.get<Participante[]>(`/events/${eventoId}/participations`);
    return response.data;
  },
};

export const adocaoService = {
  getAll: async () => {
    const response = await api.get<Adocao[]>('/adoptions');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Adocao>(`/adoptions/${id}`);
    return response.data;
  },

  create: async (adocao: Omit<Adocao, 'id'>) => {
    const response = await api.post<Adocao>('/adoptions', adocao);
    return response.data;
  },

  update: async (id: number, adocao: Partial<Adocao>) => {
    const response = await api.put<Adocao>(`/adoptions/${id}`, adocao);
    return response.data;
  },

  aprovar: async (id: number) => {
    const response = await api.patch<Adocao>(`/adoptions/${id}/aprovar`, {});
    return response.data;
  },

  rejeitar: async (id: number, motivo: string) => {
    const response = await api.patch<Adocao>(`/adoptions/${id}/rejeitar`, { motivo });
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/adoptions/${id}`);
  },

  getRelatorio: async (ano: number) => {
    const response = await api.get<RelatorioAdocao>(`/adoptions/reports/annual`);
    return response.data;
  },
};
