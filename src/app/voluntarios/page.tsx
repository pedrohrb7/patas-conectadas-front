'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Voluntario, voluntarioService } from '@/services/voluntarioService';

export default function VoluntariosPage() {
  const [voluntarios, setVoluntarios] = useState<Voluntario[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadVoluntarios();
  }, []);

  const loadVoluntarios = async () => {
    try {
      setLoading(true);
      const data = await voluntarioService.getAll();
      setVoluntarios(data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar voluntários. Verifique se a API está rodando.');
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
        <h1 className="text-3xl font-bold text-gray-900">Gestão de Voluntários</h1>
        <Link
          href="/voluntarios/novo"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          + Cadastrar Voluntário
        </Link>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {voluntarios.map((voluntario) => (
          <div key={`${voluntario.id_voluntario} - ${voluntario.nome}`} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">{voluntario.nome}</h2>

            <div className="space-y-2 mb-4">
              <p className="text-gray-600">
                <span className="font-medium">Email:</span> {voluntario.email}
              </p>
              {voluntario.telefone && (
                <p className="text-gray-600">
                  <span className="font-medium">Telefone:</span> {voluntario.telefone}
                </p>
              )}
              {voluntario.pontos !== undefined && (
                <p className="text-gray-600">
                  <span className="font-medium">Pontos:</span> ⭐ {voluntario.pontos}
                </p>
              )}
              {voluntario.preferencias && voluntario.preferencias.length > 0 && (
                <div>
                  <p className="font-medium text-gray-700 text-sm">Preferências:</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {voluntario.preferencias.slice(0, 3).map((pref, idx) => (
                      <span key={idx} className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {pref}
                      </span>
                    ))}
                    {voluntario.preferencias.length > 3 && (
                      <span className="text-xs text-gray-500">+{voluntario.preferencias.length - 3}</span>
                    )}
                  </div>
                </div>
              )}
            </div>

            <Link
              href={`/voluntarios/${voluntario.id_voluntario}`}
              className="block w-full text-center px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
            >
              Ver Perfil
            </Link>
          </div>
        ))}
      </div>

      {voluntarios.length === 0 && !loading && (
        <div className="text-center py-12">
          <p className="text-gray-600">Nenhum voluntário cadastrado.</p>
        </div>
      )}
    </div>
  );
}
