'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Voluntario, voluntarioService, Badge, tarefaService, Tarefa } from '@/services/voluntarioService';

const preferenciasOptions = [
  'Passeio com animais',
  'Limpeza e higienização',
  'Eventos de adoção',
  'Eventos de arrecadação',
  'Transporte de animais',
  'Cuidados veterinários',
  'Fotografia',
  'Redes sociais',
  'Captação de recursos',
];

export default function VoluntarioDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const [voluntario, setVoluntario] = useState<Voluntario | null>(null);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPreferencias, setEditingPreferencias] = useState(false);
  const [selectedPreferencias, setSelectedPreferencias] = useState<string[]>([]);

  useEffect(() => {
    loadVoluntario();
    // loadBadges();
    // loadTarefas();
  }, [params.id]);

  const loadVoluntario = async () => {
    try {
      const data = await voluntarioService.getById(Number(params.id));
      setVoluntario(data);
      setSelectedPreferencias(data.preferencias || []);
    } catch (error) {
      console.error('Erro ao carregar voluntário:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadBadges = async () => {
    try {
      const data = await voluntarioService.getBadges(Number(params.id));
      setBadges(data);
    } catch (error) {
      console.error('Erro ao carregar badges:', error);
    }
  };

  const loadTarefas = async () => {
    try {
      const data = await tarefaService.getByVoluntario(Number(params.id));
      setTarefas(data);
    } catch (error) {
      console.error('Erro ao carregar tarefas:', error);
    }
  };

  const handleSavePreferencias = async () => {
    try {
      await voluntarioService.updatePreferencias(Number(params.id), selectedPreferencias);
      setEditingPreferencias(false);
      await loadVoluntario();
    } catch (error) {
      alert('Erro ao atualizar preferências');
      console.error(error);
    }
  };

  const togglePreferencia = (pref: string) => {
    setSelectedPreferencias(prev =>
      prev.includes(pref) ? prev.filter(p => p !== pref) : [...prev, pref]
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Carregando...</p>
      </div>
    );
  }

  if (!voluntario) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Voluntário não encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/voluntarios')}
          className="mb-6 text-blue-600 hover:text-blue-800"
        >
          ← Voltar para lista
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{voluntario.nome}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {voluntario.email}
              </p>
              {voluntario.telefone && (
                <p className="text-gray-600">
                  <span className="font-medium">Telefone:</span> {voluntario.telefone}
                </p>
              )}
            </div>
            <div>
              {voluntario.disponibilidade && (
                <p className="text-gray-600">
                  <span className="font-medium">Disponibilidade:</span> {voluntario.disponibilidade}
                </p>
              )}
            </div>
          </div>

          {voluntario.habilidades && voluntario.habilidades.length > 0 && (
            <div className="mb-4">
              <p className="font-medium text-gray-900 mb-2">Habilidades:</p>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                  {voluntario.habilidades}
                </span>
              </div>
            </div>
          )}

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium text-gray-900">Preferências de Atuação:</p>
              <button
                onClick={() => setEditingPreferencias(!editingPreferencias)}
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                {editingPreferencias ? 'Cancelar' : 'Editar'}
              </button>
            </div>

            {editingPreferencias ? (
              <div className="space-y-2 p-4 bg-gray-50 rounded-md">
                {preferenciasOptions.map((pref) => (
                  <label key={pref} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedPreferencias.includes(pref)}
                      onChange={() => togglePreferencia(pref)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-gray-700">{pref}</span>
                  </label>
                ))}
                <button
                  onClick={handleSavePreferencias}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Salvar Preferências
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {voluntario.preferencias && voluntario.preferencias.length > 0 ? (
                  voluntario.preferencias.map((pref, idx) => (
                    <span key={idx} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {pref}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">Nenhuma preferência cadastrada</p>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Gamificação: Pontos e Badges */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Gamificação</h2>

          <div className="mb-6">
            <p className="text-lg font-medium text-gray-900 mb-2">
              Pontos: <span className="text-blue-600 text-2xl">⭐ {voluntario.pontos || 0}</span>
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Badges Conquistados</h3>
            {badges.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {badges.map((badge) => (
                  <div key={badge.id} className="text-center p-4 bg-yellow-50 rounded-lg">
                    <div className="text-4xl mb-2">{badge.icone || '🏆'}</div>
                    <p className="font-medium text-gray-900 text-sm">{badge.nome}</p>
                    <p className="text-xs text-gray-600 mt-1">{badge.descricao}</p>
                    {badge.dataConquista && (
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(badge.dataConquista).toLocaleDateString('pt-BR')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Nenhum badge conquistado ainda</p>
            )}
          </div>
        </div>

        {/* Tarefas */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Minhas Tarefas</h2>

          {tarefas.length > 0 ? (
            <div className="space-y-3">
              {tarefas.map((tarefa) => (
                <div key={tarefa.id} className="border-l-4 border-blue-500 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium text-gray-900">{tarefa.titulo}</h3>
                      <p className="text-sm text-gray-600">{tarefa.descricao}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${tarefa.status === 'concluida' ? 'bg-green-100 text-green-800' :
                      tarefa.status === 'em_andamento' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                      {tarefa.status.replace('_', ' ')}
                    </span>
                  </div>
                  {tarefa.pontos && (
                    <p className="text-xs text-gray-500 mt-1">⭐ {tarefa.pontos} pontos</p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhuma tarefa atribuída</p>
          )}
        </div>
      </div>
    </div>
  );
}
