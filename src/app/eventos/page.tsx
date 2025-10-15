'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Evento, eventoService } from '@/services/eventoService';

export default function EventosPage() {
  const [eventos, setEventos] = useState<Evento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadEventos();
  }, []);

  const loadEventos = async () => {
    try {
      setLoading(true);
      const data = await eventoService.getAll();
      setEventos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Eventos</h1>
        <Link
          href="/eventos/novo"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Novo Evento
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventos.map((evento) => (
          <div key={evento.id_evento} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-gray-900">{evento.nome}</h2>
            </div>

            <div className="space-y-2 mb-4">
              <p className="text-gray-600">
                <span className="font-medium">Data:</span> {new Date(evento.data).toLocaleDateString('pt-BR')}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Local:</span> {evento.local}
              </p>

              {evento.descricao && (
                <p className="text-gray-600 text-sm">{evento.descricao}</p>
              )}
              {evento.capacidade && (
                <p className="text-gray-600">
                  <span className="font-medium">Capacidade:</span> {evento.capacidade} pessoas
                </p>
              )}
            </div>

            <Link
              href={`/eventos/${evento.id_evento}`}
              className="block w-full text-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              Ver Detalhes
            </Link>
          </div>
        ))}
      </div>

      {eventos.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600">Nenhum evento cadastrado.</p>
        </div>
      )}
    </div>
  );
}
