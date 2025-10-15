'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Adocao, adocaoService } from '@/services/eventoService';

const statusColors = {
  pendente: 'bg-yellow-100 text-yellow-800',
  aprovada: 'bg-green-100 text-green-800',
  rejeitada: 'bg-red-100 text-red-800',
};

const statusLabels = {
  pendente: 'Pendente',
  aprovada: 'Aprovada',
  rejeitada: 'Rejeitada',
};

export default function AdocoesPage() {
  const [adocoes, setAdocoes] = useState<Adocao[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Adocao['status'] | 'todas'>('todas');

  useEffect(() => {
    loadAdocoes();
  }, []);

  const loadAdocoes = async () => {
    try {
      setLoading(true);
      const data = await adocaoService.getAll();
      setAdocoes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAprovar = async (id: number) => {
    try {
      await adocaoService.aprovar(id);
      await loadAdocoes();
    } catch (error) {
      alert('Erro ao aprovar adoção');
      console.error(error);
    }
  };

  const handleRejeitar = async (id: number) => {
    const motivo = prompt('Motivo da rejeição:');
    if (motivo) {
      try {
        await adocaoService.rejeitar(id, motivo);
        await loadAdocoes();
      } catch (error) {
        alert('Erro ao rejeitar adoção');
        console.error(error);
      }
    }
  };

  const filteredAdocoes = filter === 'todas' 
    ? adocoes 
    : adocoes.filter(a => a.status === filter);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Adoções</h1>
        <div className="flex gap-4">
          <Link
            href="/adocoes/relatorios"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            📊 Relatórios
          </Link>
          <Link
            href="/adocoes/nova"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + Nova Adoção
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por status:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Adocao['status'] | 'todas')}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="todas">Todas</option>
          <option value="pendente">Pendente</option>
          <option value="aprovada">Aprovada</option>
          <option value="rejeitada">Rejeitada</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredAdocoes.map((adocao) => (
          <div key={adocao.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{adocao.adotante.nome}</h2>
                <p className="text-gray-600">CPF: {adocao.adotante.cpf}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[adocao.status]}`}>
                {statusLabels[adocao.status]}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Email:</span> {adocao.adotante.email}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Telefone:</span> {adocao.adotante.telefone}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Cidade:</span> {adocao.adotante.cidade}/{adocao.adotante.estado}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Data:</span> {new Date(adocao.dataAdocao).toLocaleDateString('pt-BR')}
                </p>
              </div>
              <div>
                {adocao.adotante.possuiOutrosPets !== undefined && (
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Possui outros pets:</span> {adocao.adotante.possuiOutrosPets ? 'Sim' : 'Não'}
                  </p>
                )}
              </div>
            </div>

            {adocao.observacoes && (
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-medium">Observações:</span> {adocao.observacoes}
              </p>
            )}

            {adocao.status === 'pendente' && (
              <div className="flex gap-4">
                <button
                  onClick={() => handleAprovar(adocao.id!)}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Aprovar
                </button>
                <button
                  onClick={() => handleRejeitar(adocao.id!)}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Rejeitar
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {filteredAdocoes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Nenhuma adoção encontrada.</p>
        </div>
      )}
    </div>
  );
}
