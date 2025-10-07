import api from './api';

export interface Evento {
  id?: number;
  titulo: string;
  descricao?: string;
  data: string;
  local: string;
  tipo: 'adocao' | 'arrecadacao' | 'campanha' | 'outro';
  participantes?: Participante[];
  capacidade?: number;
}

export interface Participante {
  id?: number;
  nome: string;
  email: string;
  tipo: 'voluntario' | 'doador' | 'outro';
  voluntarioId?: number;
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
    const response = await api.get<Evento[]>('/eventos');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Evento>(`/eventos/${id}`);
    return response.data;
  },

  create: async (evento: Omit<Evento, 'id'>) => {
    const response = await api.post<Evento>('/eventos', evento);
    return response.data;
  },

  update: async (id: number, evento: Partial<Evento>) => {
    const response = await api.put<Evento>(`/eventos/${id}`, evento);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/eventos/${id}`);
  },

  registrarParticipacao: async (eventoId: number, participante: Omit<Participante, 'id'>) => {
    const response = await api.post<Participante>(`/eventos/${eventoId}/participantes`, participante);
    return response.data;
  },

  getParticipantes: async (eventoId: number) => {
    const response = await api.get<Participante[]>(`/eventos/${eventoId}/participantes`);
    return response.data;
  },
};

export const adocaoService = {
  getAll: async () => {
    const response = await api.get<Adocao[]>('/adocoes');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Adocao>(`/adocoes/${id}`);
    return response.data;
  },

  create: async (adocao: Omit<Adocao, 'id'>) => {
    const response = await api.post<Adocao>('/adocoes', adocao);
    return response.data;
  },

  update: async (id: number, adocao: Partial<Adocao>) => {
    const response = await api.put<Adocao>(`/adocoes/${id}`, adocao);
    return response.data;
  },

  aprovar: async (id: number) => {
    const response = await api.patch<Adocao>(`/adocoes/${id}/aprovar`, {});
    return response.data;
  },

  rejeitar: async (id: number, motivo: string) => {
    const response = await api.patch<Adocao>(`/adocoes/${id}/rejeitar`, { motivo });
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/adocoes/${id}`);
  },

  getRelatorio: async (ano: number) => {
    const response = await api.get<RelatorioAdocao>(`/adocoes/relatorio/${ano}`);
    return response.data;
  },
};
