'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Evento, eventoService, Participante } from '@/services/eventoService';

export default function EventoDetalhesPage() {
  const params = useParams();
  const router = useRouter();
  const [evento, setEvento] = useState<Evento | null>(null);
  const [participantes, setParticipantes] = useState<Participante[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [novoParticipante, setNovoParticipante] = useState<Omit<Participante, 'id'>>({
    nome: '',
    email: '',
    tipo: 'voluntario',
  });

  useEffect(() => {
    loadEvento();
    loadParticipantes();
  }, [params.id]);

  const loadEvento = async () => {
    try {
      const data = await eventoService.getById(Number(params.id));
      setEvento(data);
    } catch (error) {
      console.error('Erro ao carregar evento:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadParticipantes = async () => {
    try {
      const data = await eventoService.getParticipantes(Number(params.id));
      setParticipantes(data);
    } catch (error) {
      console.error('Erro ao carregar participantes:', error);
    }
  };

  const handleAddParticipante = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await eventoService.registrarParticipacao(Number(params.id), novoParticipante);
      await loadParticipantes();
      setShowForm(false);
      setNovoParticipante({ nome: '', email: '', tipo: 'voluntario' });
    } catch (error) {
      alert('Erro ao registrar participante');
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

  if (!evento) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-gray-600">Evento não encontrado</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.push('/eventos')}
          className="mb-6 text-blue-600 hover:text-blue-800"
        >
          ← Voltar para lista
        </button>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{evento.nome}</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-gray-600">
                <span className="font-medium">Data:</span> {new Date(evento.data).toLocaleString('pt-BR')}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Local:</span> {evento.local}
              </p>
            </div>
            <div>
              {evento.capacidade && (
                <p className="text-gray-600">
                  <span className="font-medium">Capacidade:</span> {evento.capacidade} pessoas
                </p>
              )}
              <p className="text-gray-600">
                <span className="font-medium">Participantes confirmados:</span> {participantes.length}
              </p>
            </div>
          </div>

          {evento.descricao && (
            <div className="mt-4">
              <p className="font-medium text-gray-900 mb-2">Descrição:</p>
              <p className="text-gray-600">{evento.descricao}</p>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Participantes</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              {showForm ? 'Cancelar' : '+ Registrar Participação'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleAddParticipante} className="mb-6 p-4 bg-gray-50 rounded-md">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={novoParticipante.nome}
                    onChange={(e) => setNovoParticipante({ ...novoParticipante, nome: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={novoParticipante.email}
                    onChange={(e) => setNovoParticipante({ ...novoParticipante, email: e.target.value })}
                    className="w-full rounded-md border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo *
                </label>
                <select
                  required
                  value={novoParticipante.tipo}
                  onChange={(e) => setNovoParticipante({ ...novoParticipante, tipo: e.target.value as Participante['tipo'] })}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                >
                  <option value="voluntario">Voluntário</option>
                  <option value="doador">Doador</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Registrar
              </button>
            </form>
          )}

          {participantes.length > 0 ? (
            <div className="space-y-2">
              {participantes.map((participante) => (
                <div key={participante.id} className="flex justify-between items-center border-b border-gray-200 pb-2">
                  <div>
                    <p className="font-medium text-gray-900">{participante?.voluntario?.nome}</p>
                    <p className="text-sm text-gray-600">{participante?.voluntario?.email}</p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                    {participante?.voluntario?.preferencias_atuacao || 'Sem preferência'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">
              Nenhum participante registrado ainda
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
