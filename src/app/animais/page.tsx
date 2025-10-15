'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Animal } from '@/services/animalService';
import { animalService } from '@/services/animalService';

const statusColors = {
  disponivel: 'bg-green-100 text-green-800',
  adotado: 'bg-blue-100 text-blue-800',
  tratamento: 'bg-yellow-100 text-yellow-800',
  acolhimento: 'bg-purple-100 text-purple-800',
};

const statusLabels = {
  disponivel: 'Disponível',
  adotado: 'Adotado',
  tratamento: 'Em Tratamento',
  acolhimento: 'Em Acolhimento',
};

export default function AnimaisPage() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<Animal['status'] | 'todos'>('todos');

  useEffect(() => {
    loadAnimais();
  }, []);

  const loadAnimais = async () => {
    try {
      setLoading(true);
      const data = await animalService.getAll();
      setAnimais(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar animais. Verifique se a API está rodando.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (id: number, status: Animal['status']) => {
    try {
      await animalService.updateStatus(id, status);
      await loadAnimais();
    } catch (err) {
      alert('Erro ao atualizar status');
      console.error(err);
    }
  };

  const filteredAnimais = filter === 'todos'
    ? animais
    : animais.filter(a => a.status === filter);

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
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Animais</h1>
        <Link
          href="/animais/novo"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Cadastrar Animal
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Filtrar por status:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as Animal['status'] | 'todos')}
          className="rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="todos">Todos</option>
          <option value="disponivel">Disponível</option>
          <option value="adotado">Adotado</option>
          <option value="tratamento">Em Tratamento</option>
          <option value="acolhimento">Em Acolhimento</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAnimais.map((animal) => (
          <div key={animal.id_animal} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{animal.nome}</h2>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[animal.status]}`}>
                {statusLabels[animal.status]}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-gray-600">
                <span className="font-medium">Espécie:</span> {animal.especie}
              </p>
              {animal.raca && (
                <p className="text-gray-600">
                  <span className="font-medium">Raça:</span> {animal.raca}
                </p>
              )}
              {animal.idade !== undefined && (
                <p className="text-gray-600">
                  <span className="font-medium">Idade:</span> {animal.idade} {animal.idade === 1 ? 'ano' : 'anos'}
                </p>
              )}
              {animal.descricao && (
                <p className="text-gray-600 text-sm">{animal.descricao}</p>
              )}
            </div>

            <div className="space-y-2">
              <select
                value={animal.status}
                onChange={(e) => handleStatusChange(animal.id!, e.target.value as Animal['status'])}
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              >
                <option value="disponivel">Disponível</option>
                <option value="adotado">Adotado</option>
                <option value="tratamento">Em Tratamento</option>
                <option value="acolhimento">Em Acolhimento</option>
              </select>

              <Link
                href={`/animais/${animal.id}`}
                className="block w-full text-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
              >
                Ver Detalhes
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filteredAnimais.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Nenhum animal encontrado.</p>
        </div>
      )}
    </div>
  );
}
