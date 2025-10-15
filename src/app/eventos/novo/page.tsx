'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Evento, eventoService } from '@/services/eventoService';

export default function NovoEventoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<Omit<Evento, 'id'>>({
    titulo: '',
    descricao: '',
    data: '',
    local: '',
    tipo: 'adocao',
    capacidade: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await eventoService.create(formData);
      alert('Evento cadastrado com sucesso!');
      router.push('/eventos');
    } catch (error) {
      alert('Erro ao cadastrar evento. Verifique se a API está rodando.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cadastrar Novo Evento</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
                Título *
              </label>
              <input
                type="text"
                id="titulo"
                required
                value={formData.titulo}
                onChange={(e) => setFormData({ ...formData, titulo: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div>
              <label htmlFor="tipo" className="block text-sm font-medium text-gray-700">
                Tipo *
              </label>
              <select
                id="tipo"
                required
                value={formData.tipo}
                onChange={(e) => setFormData({ ...formData, tipo: e.target.value as Evento['tipo'] })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="adocao">Feira de Adoção</option>
                <option value="arrecadacao">Evento de Arrecadação</option>
                <option value="campanha">Campanha</option>
                <option value="outro">Outro</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                  Data *
                </label>
                <input
                  type="datetime-local"
                  id="data"
                  required
                  value={formData.data}
                  onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="capacidade" className="block text-sm font-medium text-gray-700">
                  Capacidade
                </label>
                <input
                  type="number"
                  id="capacidade"
                  min="0"
                  value={formData.capacidade}
                  onChange={(e) => setFormData({ ...formData, capacidade: parseInt(e.target.value) || 0 })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="local" className="block text-sm font-medium text-gray-700">
                Local *
              </label>
              <input
                type="text"
                id="local"
                required
                value={formData.local}
                onChange={(e) => setFormData({ ...formData, local: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Endereço completo do evento"
              />
            </div>

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="descricao"
                rows={4}
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Descreva o evento e suas atividades"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/eventos')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Cadastrar Evento
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
