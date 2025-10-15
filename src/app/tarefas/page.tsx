'use client';

import { useState, useEffect } from 'react';
import { Tarefa, tarefaService, voluntarioService, Voluntario } from '@/services/voluntarioService';

export default function TarefasPage() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [novaTarefa, setNovaTarefa] = useState<Omit<Tarefa, 'id'>>({
    titulo: '',
    descricao: '',
    status: 'pendente',
    prioridade: 'media',
    pontos: 10,
  });

  useEffect(() => {
    loadTarefas();
    loadVoluntarios();
  }, []);

  const loadTarefas = async () => {
    try {
      setLoading(true);
      const data = await tarefaService.getAll();
      setTarefas(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadVoluntarios = async () => {
    try {
      const data = await voluntarioService.getAll();
      setVoluntarios(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateTarefa = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await tarefaService.create(novaTarefa);
      await loadTarefas();
      setShowForm(false);
      setNovaTarefa({
        titulo: '',
        descricao: '',
        status: 'pendente',
        prioridade: 'media',
        pontos: 10,
      });
    } catch (error) {
      alert('Erro ao criar tarefa');
      console.error(error);
    }
  };

  const handleAtribuir = async (tarefaId: number, voluntarioId: number) => {
    try {
      await tarefaService.atribuir(tarefaId, voluntarioId);
      await loadTarefas();
    } catch (error) {
      alert('Erro ao atribuir tarefa');
      console.error(error);
    }
  };

  const handleConcluir = async (tarefaId: number) => {
    try {
      await tarefaService.concluir(tarefaId);
      await loadTarefas();
    } catch (error) {
      alert('Erro ao concluir tarefa');
      console.error(error);
    }
  };

  const prioridadeColors = {
    baixa: 'bg-green-100 text-green-800',
    media: 'bg-yellow-100 text-yellow-800',
    alta: 'bg-red-100 text-red-800',
  };

  const statusColors = {
    pendente: 'bg-gray-100 text-gray-800',
    em_andamento: 'bg-blue-100 text-blue-800',
    concluida: 'bg-green-100 text-green-800',
    cancelada: 'bg-red-100 text-red-800',
  };

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
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Tarefas</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {showForm ? 'Cancelar' : '+ Nova Tarefa'}
        </button>
      </div>

      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Criar Nova Tarefa</h2>
          <form onSubmit={handleCreateTarefa} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Título *
              </label>
              <input
                type="text"
                required
                value={novaTarefa.titulo}
                onChange={(e) => setNovaTarefa({ ...novaTarefa, titulo: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Descrição *
              </label>
              <textarea
                required
                rows={3}
                value={novaTarefa.descricao}
                onChange={(e) => setNovaTarefa({ ...novaTarefa, descricao: e.target.value })}
                className="w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Prioridade
                </label>
                <select
                  value={novaTarefa.prioridade}
                  onChange={(e) => setNovaTarefa({ ...novaTarefa, prioridade: e.target.value as Tarefa['prioridade'] })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="baixa">Baixa</option>
                  <option value="media">Média</option>
                  <option value="alta">Alta</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pontos
                </label>
                <input
                  type="number"
                  min="0"
                  value={novaTarefa.pontos}
                  onChange={(e) => setNovaTarefa({ ...novaTarefa, pontos: parseInt(e.target.value) })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Criar Tarefa
            </button>
          </form>
        </div>
      )}

      <div className="space-y-4">
        {tarefas.map((tarefa) => (
          <div key={tarefa.id} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{tarefa.titulo}</h2>
                <p className="text-gray-600 mt-1">{tarefa.descricao}</p>
              </div>
              <div className="flex gap-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${prioridadeColors[tarefa.prioridade]}`}>
                  {tarefa.prioridade}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[tarefa.status]}`}>
                  {tarefa?.status?.replace('_', ' ') || '-'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              <div>
                {tarefa.pontos && (
                  <p className="text-sm text-gray-600">⭐ {tarefa.pontos} pontos</p>
                )}
              </div>

              {tarefa.status !== 'concluida' && (
                <>
                  <div>
                    <select
                      value={tarefa.voluntarioId || ''}
                      onChange={(e) => handleAtribuir(tarefa.id!, parseInt(e.target.value))}
                      className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
                    >
                      <option value="">Atribuir a...</option>
                      {voluntarios.map((vol) => (
                        <option key={`${vol.id_voluntario} - ${vol.nome}`} value={vol.id_voluntario} className='text-black'>
                          {vol.nome}
                        </option>
                      ))}
                    </select>
                  </div>

                  {tarefa.voluntarioId && (
                    <div>
                      <button
                        onClick={() => handleConcluir(tarefa.id!)}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
                      >
                        Marcar como Concluída
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {tarefas.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Nenhuma tarefa cadastrada.</p>
        </div>
      )}
    </div>
  );
}
