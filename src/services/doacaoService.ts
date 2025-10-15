import api from './api';

export interface Doacao {
  id?: number;
  tipo: 'financeira' | 'item';
  valor?: number;
  descricao?: string;
  itens?: ItemDoacao[];
  doadorNome: string;
  doadorEmail?: string;
  doadorTelefone?: string;
  data: string;
  comprovante?: string;
}

export interface ItemDoacao {
  id?: number;
  nome: string;
  quantidade: number;
  unidade?: string;
}

export interface RelatorioDoacao {
  totalFinanceiro: number;
  totalItens: number;
  doacoesPorMes: { mes: string; total: number }[];
  itensMaisDoados: { item: string; quantidade: number }[];
  impacto: string;
}

export const doacaoService = {
  getAll: async () => {
    const response = await api.get<Doacao[]>('/donations');
    return response.data;
  },

  getById: async (id: number) => {
    const response = await api.get<Doacao>(`/donations/${id}`);
    return response.data;
  },

  create: async (doacao: Omit<Doacao, 'id'>) => {
    const response = await api.post<Doacao>('/donations', doacao);
    return response.data;
  },

  update: async (id: number, doacao: Partial<Doacao>) => {
    const response = await api.put<Doacao>(`/donations/${id}`, doacao);
    return response.data;
  },

  delete: async (id: number) => {
    await api.delete(`/doacoes/${id}`);
  },

  getRelatorio: async (ano?: number) => {
    const params = ano ? { ano } : {};
    const response = await api.get<RelatorioDoacao>('/donations/reports/periodic', { params });
    return response.data;
  },
};
