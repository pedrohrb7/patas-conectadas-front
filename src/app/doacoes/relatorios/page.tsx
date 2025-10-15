'use client';

import { useState, useEffect } from 'react';
import { doacaoService, RelatorioDoacao } from '@/services/doacaoService';

export default function RelatoriosDoacoesPage() {
  const [relatorio, setRelatorio] = useState<RelatorioDoacao | null>(null);
  const [loading, setLoading] = useState(true);
  const [ano, setAno] = useState(new Date().getFullYear());

  useEffect(() => {
    loadRelatorio();
  }, [ano]);

  const loadRelatorio = async () => {
    try {
      setLoading(true);
      const data = await doacaoService.getRelatorio(ano);
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
          <h1 className="text-3xl font-bold text-gray-900">Relatório de Doações</h1>
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
                <h2 className="text-xl font-bold text-gray-900 mb-2">Total Financeiro</h2>
                <p className="text-4xl font-bold text-green-600">
                  R$ {relatorio.totalFinanceiro.toFixed(2)}
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-2">Total de Itens</h2>
                <p className="text-4xl font-bold text-blue-600">
                  {relatorio.totalItens}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Doações por Mês</h2>
              <div className="space-y-2">
                {relatorio.doacoesPorMes.map((item, idx) => (
                  <div key={idx} className="flex items-center">
                    <span className="w-24 text-gray-700">{item.mes}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-4">
                      <div
                        className="bg-blue-600 h-4 rounded-full"
                        style={{ width: `${(item.total / Math.max(...relatorio.doacoesPorMes.map(d => d.total))) * 100}%` }}
                      />
                    </div>
                    <span className="w-16 text-right text-gray-700">{item.total}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Itens Mais Doados</h2>
              <div className="space-y-2">
                {relatorio.itensMaisDoados.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center border-b border-gray-200 pb-2">
                    <span className="text-gray-700">{item.item}</span>
                    <span className="font-medium text-gray-900">{item.quantidade}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">Impacto das Doações</h2>
              <p className="text-gray-700">{relatorio.impacto}</p>
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
