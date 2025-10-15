'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Animal, animalService, HistoricoMedico } from '@/services/animalService';

const statusLabels = {
  disponivel: 'Disponível',
  adotado: 'Adotado',
  tratamento: 'Em Tratamento',
  acolhimento: 'Em Acolhimento',
};

const tipoHistoricoLabels = {
  consulta: 'Consulta',
  vacina: 'Vacina',
  cirurgia: 'Cirurgia',
  exame: 'Exame',
  outro: 'Outro',
};

export default function AnimalDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [historico, setHistorico] = useState<HistoricoMedico[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddHistorico, setShowAddHistorico] = useState(false);
  const [novoHistorico, setNovoHistorico] = useState<Omit<HistoricoMedico, 'id'>>({
    data: new Date().toISOString().split('T')[0],
    descricao: '',
    veterinario: '',
    tipo: 'consulta',
  });

  useEffect(() => {
    loadAnimal();
    loadHistorico();
  }, [params.id]);

  const loadAnimal = async () => {
    try {
      const data = await animalService.getById(Number(params.id));
      setAnimal(data);
    } catch (error) {
      console.error('Erro ao carregar animal:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistorico = async () => {
    try {
      const data = await animalService.getHistoricoMedico(Number(params.id));
      setHistorico(data);
    } catch (error) {
      console.error('Erro ao carregar histórico:', error);
    }
  };

  const handleAddHistorico = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await animalService.addHistoricoMedico(Number(params.id), novoHistorico);
      await loadHistorico();
      setShowAddHistorico(false);
      setNovoHistorico({
        data: new Date().toISOString().split('T')[0],
        descricao: '',
        veterinario: '',
        tipo: 'consulta',
      });
    } catch (error) {
      alert('Erro ao adicionar histórico médico');
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (!animal) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Animal não encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/animais')}
          className="mb-6 text-blue-600 hover:text-blue-800"
        >
          ← Voltar para lista
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{animal.nome}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
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
            </div>
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Status:</span> {statusLabels[animal.id_status]}
              </p>
            </div>
          </div>

          {animal.descricao && (
            <div className="mt-4">
              <p className="font-medium text-gray-900 mb-2">Descrição:</p>
              <p className="text-gray-600">{animal.descricao}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Histórico Médico</h2>
            <button
              onClick={() => setShowAddHistorico(!showAddHistorico)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {showAddHistorico ? 'Cancelar' : '+ Adicionar Registro'}
            </button>
          </div>

          {showAddHistorico && (
            <form onSubmit={handleAddHistorico} className="mb-6 p-4 bg-gray-50 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data *
                  </label>
                  <input
                    type="date"
                    required
                    value={novoHistorico.data}
                    onChange={(e) => setNovoHistorico({ ...novoHistorico, data: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo *
                  </label>
                  <select
                    required
                    value={novoHistorico.tipo}
                    onChange={(e) => setNovoHistorico({ ...novoHistorico, tipo: e.target.value as HistoricoMedico['tipo'] })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  >
                    <option value="consulta">Consulta</option>
                    <option value="vacina">Vacina</option>
                    <option value="cirurgia">Cirurgia</option>
                    <option value="exame">Exame</option>
                    <option value="outro">Outro</option>
                  </select>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Veterinário
                </label>
                <input
                  type="text"
                  value={novoHistorico.veterinario}
                  onChange={(e) => setNovoHistorico({ ...novoHistorico, veterinario: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Descrição *
                </label>
                <textarea
                  required
                  rows={3}
                  value={novoHistorico.descricao}
                  onChange={(e) => setNovoHistorico({ ...novoHistorico, descricao: e.target.value })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Adicionar Registro
              </button>
            </form>
          )}

          {historico.length > 0 ? (
            <div className="space-y-4">
              {historico.map((item) => (
                <div key={item.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium text-gray-900">
                      {tipoHistoricoLabels[item.tipo]}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(item.data).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-gray-600">{item.descricao}</p>
                  {item.veterinario && (
                    <p className="text-sm text-gray-500 mt-1">
                      Veterinário: {item.veterinario}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Nenhum registro médico encontrado
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
