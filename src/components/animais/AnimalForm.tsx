'use client';

import { useState } from 'react';
import { Animal } from '@/services/animalService';

interface AnimalFormProps {
  animal?: Animal;
  onSubmit: (animal: Omit<Animal, 'id'>) => Promise<void>;
  onCancel: () => void;
}

export default function AnimalForm({ animal, onSubmit, onCancel }: AnimalFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Animal, 'id'>>({
    nome: animal?.nome || '',
    especie: animal?.especie || '',
    raca: animal?.raca || '',
    idade: animal?.idade || 0,
    status: animal?.status || 'disponivel',
    descricao: animal?.descricao || '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome *
        </label>
        <input
          type="text"
          id="nome"
          required
          value={formData.nome}
          onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="especie" className="block text-sm font-medium text-gray-700">
          Espécie *
        </label>
        <input
          type="text"
          id="especie"
          required
          value={formData.especie}
          onChange={(e) => setFormData({ ...formData, especie: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Ex: Cachorro, Gato"
        />
      </div>

      <div>
        <label htmlFor="raca" className="block text-sm font-medium text-gray-700">
          Raça
        </label>
        <input
          type="text"
          id="raca"
          value={formData.raca}
          onChange={(e) => setFormData({ ...formData, raca: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="idade" className="block text-sm font-medium text-gray-700">
          Idade (anos)
        </label>
        <input
          type="number"
          id="idade"
          min="0"
          value={formData.idade}
          onChange={(e) => setFormData({ ...formData, idade: parseInt(e.target.value) || 0 })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status *
        </label>
        <select
          id="status"
          required
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as Animal['status'] })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        >
          <option value="disponivel">Disponível para Adoção</option>
          <option value="adotado">Adotado</option>
          <option value="tratamento">Em Tratamento</option>
          <option value="acolhimento">Em Acolhimento</option>
        </select>
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
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Descreva o temperamento e características do animal"
        />
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </div>
    </form>
  );
}
