'use client';

import { useState } from 'react';
import { Voluntario } from '@/services/voluntarioService';

interface VoluntarioFormProps {
  voluntario?: Voluntario;
  onSubmit: (voluntario: Omit<Voluntario, 'id'>) => Promise<void>;
  onCancel: () => void;
}

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

export default function VoluntarioForm({ voluntario, onSubmit, onCancel }: VoluntarioFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Omit<Voluntario, 'id'>>({
    nome: voluntario?.nome || '',
    email: voluntario?.email || '',
    telefone: voluntario?.telefone || '',
    preferencias: voluntario?.preferencias || [],
    habilidades: voluntario?.habilidades || [],
    disponibilidade: voluntario?.disponibilidade || '',
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

  const togglePreferencia = (pref: string) => {
    const newPreferencias = formData.preferencias.includes(pref)
      ? formData.preferencias.filter(p => p !== pref)
      : [...formData.preferencias, pref];
    setFormData({ ...formData, preferencias: newPreferencias });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
          Nome Completo *
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
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email *
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
          Telefone
        </label>
        <input
          type="tel"
          id="telefone"
          value={formData.telefone}
          onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="(00) 00000-0000"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preferências de Atuação
        </label>
        <div className="space-y-2">
          {preferenciasOptions.map((pref) => (
            <label key={pref} className="flex items-center">
              <input
                type="checkbox"
                checked={formData.preferencias.includes(pref)}
                onChange={() => togglePreferencia(pref)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">{pref}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="habilidades" className="block text-sm font-medium text-gray-700">
          Habilidades (separadas por vírgula)
        </label>
        <input
          type="text"
          id="habilidades"
          value={formData.habilidades?.join(', ')}
          onChange={(e) => setFormData({ 
            ...formData, 
            habilidades: e.target.value.split(',').map(h => h.trim()).filter(h => h) 
          })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Ex: Fotografia, Marketing, Veterinária"
        />
      </div>

      <div>
        <label htmlFor="disponibilidade" className="block text-sm font-medium text-gray-700">
          Disponibilidade
        </label>
        <textarea
          id="disponibilidade"
          rows={3}
          value={formData.disponibilidade}
          onChange={(e) => setFormData({ ...formData, disponibilidade: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
          placeholder="Ex: Finais de semana, das 14h às 18h"
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
