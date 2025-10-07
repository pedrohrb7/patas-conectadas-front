'use client';

import { useState, useEffect } from 'react';
import { adocaoService, RelatorioAdocao } from '@/services/eventoService';

export default function RelatoriosAdocoesPage() {
  const [relatorio, setRelatorio] = useState<RelatorioAdocao | null>(null);
  const [loading, setLoading] = useState(true);
  const [ano, setAno] = useState(new Date().getFullYear());

  useEffect(() => {
    loadRelatorio();
  }, [ano]);

  const loadRelatorio = async () => {
    try {
      setLoading(true);
      const data = await adocaoService.getRelatorio(ano);
      setRelatorio(data);
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
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Relatório Anual de Adoções</h1>
          <select
            value={ano}
            onChange={(e) => setAno(parseInt(e.target.value))}
            className="rounded-md border border-gray-300 px-3 py-2"
          >
            {[2024, 2023, 2022, 2021, 2020].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>

        {relatorio ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Total de Adoções</h2>
                <p className="text-4xl font-bold text-blue-600">
                  {relatorio.totalAdocoes}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Taxa de Adoção</h2>
                <p className="text-4xl font-bold text-green-600">
                  {relatorio.taxaAdocao.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Adoções por Mês</h2>
              <div className="space-y-2">
                {relatorio.adocoesPorMes.map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="w-24 text-gray-700">{item.mes}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full"
                        style={{ width: `${(item.total / Math.max(...relatorio.adocoesPorMes.map(d => d.total))) * 100}%` }}
                      />
                    </div>
                    <span className="w-16 text-right text-gray-700">{item.total}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Animais Mais Adotados</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {relatorio.animaisMaisAdotados.map((item, idx) => (
                  <div key={idx} className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-3xl mb-2">
                      {item.especie === 'Cachorro' ? '🐕' : item.especie === 'Gato' ? '🐱' : '🐾'}
                    </p>
                    <p className="font-medium text-gray-900">{item.especie}</p>
                    <p className="text-2xl font-bold text-blue-600">{item.quantidade}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600">Nenhum dado disponível para este ano.</p>
          </div>
        )}
      </div>
    </div>
  );
}
