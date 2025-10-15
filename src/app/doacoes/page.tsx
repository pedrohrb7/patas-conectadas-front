'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Doacao, doacaoService } from '@/services/doacaoService';

export default function DoacoesPage() {
  const [doacoes, setDoacoes] = useState<Doacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'todas' | 'financeira' | 'item'>('todas');

  useEffect(() => {
    loadDoacoes();
  }, []);

  const loadDoacoes = async () => {
    try {
      setLoading(true);
      const data = await doacaoService.getAll();
      setDoacoes(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDoacoes = filter === 'todas' 
    ? doacoes 
    : doacoes.filter(d => d.tipo === filter);

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
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Doações</h1>
        <div className="flex gap-4">
          <Link
            href="/doacoes/relatorios"
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            📊 Relatórios
          </Link>
          <Link
            href="/doacoes/nova"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            + Registrar Doação
          </Link>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por tipo:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as typeof filter)}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="todas">Todas</option>
          <option value="financeira">Financeiras</option>
          <option value="item">Itens</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoacoes.map((doacao) => (
          <div key={doacao.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{doacao.doadorNome}</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                doacao.tipo === 'financeira' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
              }`}>
                {doacao.tipo === 'financeira' ? '💰 Financeira' : '📦 Item'}
              </span>
            </div>
            
            <div className="space-y-2 mb-4">
              {doacao.tipo === 'financeira' && doacao.valor && (
                <p className="text-2xl font-bold text-green-600">
                  R$ {doacao.valor.toFixed(2)}
                </p>
              )}
              
              {doacao.tipo === 'item' && doacao.itens && (
                <div>
                  <p className="font-medium text-gray-700">Itens doados:</p>
                  <ul className="list-disc list-inside text-sm text-gray-600">
                    {doacao.itens.map((item, idx) => (
                      <li key={idx}>
                        {item.quantidade} {item.unidade || 'un'} - {item.nome}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {doacao.descricao && (
                <p className="text-gray-600 text-sm">{doacao.descricao}</p>
              )}

              <p className="text-gray-500 text-sm">
                Data: {new Date(doacao.data).toLocaleDateString('pt-BR')}
              </p>

              {doacao.doadorEmail && (
                <p className="text-gray-600 text-sm">
                  <span className="font-medium">Email:</span> {doacao.doadorEmail}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredDoacoes.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Nenhuma doação registrada.</p>
        </div>
      )}
    </div>
  );
}
