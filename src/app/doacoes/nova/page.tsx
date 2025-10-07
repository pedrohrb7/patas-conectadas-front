'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Doacao, doacaoService, ItemDoacao } from '@/services/doacaoService';

export default function NovaDoacaoPage() {
  const router = useRouter();
  const [tipo, setTipo] = useState<'financeira' | 'item'>('financeira');
  const [formData, setFormData] = useState<Omit<Doacao, 'id'>>({
    tipo: 'financeira',
    doadorNome: '',
    doadorEmail: '',
    doadorTelefone: '',
    data: new Date().toISOString().split('T')[0],
    valor: 0,
    descricao: '',
    itens: [],
  });
  const [novoItem, setNovoItem] = useState<ItemDoacao>({
    nome: '',
    quantidade: 1,
    unidade: 'un',
  });

  const handleAddItem = () => {
    if (novoItem.nome && novoItem.quantidade > 0) {
      setFormData({
        ...formData,
        itens: [...(formData.itens || []), novoItem],
      });
      setNovoItem({ nome: '', quantidade: 1, unidade: 'un' });
    }
  };

  const handleRemoveItem = (index: number) => {
    const newItens = formData.itens?.filter((_, i) => i !== index);
    setFormData({ ...formData, itens: newItens });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await doacaoService.create({ ...formData, tipo });
      alert('Doação registrada com sucesso!');
      router.push('/doacoes');
    } catch (error) {
      alert('Erro ao registrar doação. Verifique se a API está rodando.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Registrar Nova Doação</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tipo de Doação *
              </label>
              <div className="flex gap-4">
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="financeira"
                    checked={tipo === 'financeira'}
                    onChange={(e) => {
                      setTipo(e.target.value as 'financeira' | 'item');
                      setFormData({ ...formData, tipo: e.target.value as 'financeira' | 'item' });
                    }}
                    className="mr-2"
                  />
                  💰 Financeira
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    value="item"
                    checked={tipo === 'item'}
                    onChange={(e) => {
                      setTipo(e.target.value as 'financeira' | 'item');
                      setFormData({ ...formData, tipo: e.target.value as 'financeira' | 'item' });
                    }}
                    className="mr-2"
                  />
                  📦 Item
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="doadorNome" className="block text-sm font-medium text-gray-700">
                Nome do Doador *
              </label>
              <input
                type="text"
                id="doadorNome"
                required
                value={formData.doadorNome}
                onChange={(e) => setFormData({ ...formData, doadorNome: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="doadorEmail" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="doadorEmail"
                  value={formData.doadorEmail}
                  onChange={(e) => setFormData({ ...formData, doadorEmail: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
              <div>
                <label htmlFor="doadorTelefone" className="block text-sm font-medium text-gray-700">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="doadorTelefone"
                  value={formData.doadorTelefone}
                  onChange={(e) => setFormData({ ...formData, doadorTelefone: e.target.value })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label htmlFor="data" className="block text-sm font-medium text-gray-700">
                Data *
              </label>
              <input
                type="date"
                id="data"
                required
                value={formData.data}
                onChange={(e) => setFormData({ ...formData, data: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            {tipo === 'financeira' ? (
              <div>
                <label htmlFor="valor" className="block text-sm font-medium text-gray-700">
                  Valor (R$) *
                </label>
                <input
                  type="number"
                  id="valor"
                  required
                  min="0"
                  step="0.01"
                  value={formData.valor}
                  onChange={(e) => setFormData({ ...formData, valor: parseFloat(e.target.value) })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Itens Doados
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      placeholder="Nome do item"
                      value={novoItem.nome}
                      onChange={(e) => setNovoItem({ ...novoItem, nome: e.target.value })}
                      className="flex-1 rounded-md border border-gray-300 px-3 py-2"
                    />
                    <input
                      type="number"
                      placeholder="Qtd"
                      min="1"
                      value={novoItem.quantidade}
                      onChange={(e) => setNovoItem({ ...novoItem, quantidade: parseInt(e.target.value) })}
                      className="w-20 rounded-md border border-gray-300 px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Un"
                      value={novoItem.unidade}
                      onChange={(e) => setNovoItem({ ...novoItem, unidade: e.target.value })}
                      className="w-20 rounded-md border border-gray-300 px-3 py-2"
                    />
                    <button
                      type="button"
                      onClick={handleAddItem}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      +
                    </button>
                  </div>
                  
                  {formData.itens && formData.itens.length > 0 && (
                    <ul className="space-y-2">
                      {formData.itens.map((item, idx) => (
                        <li key={idx} className="flex justify-between items-center bg-gray-50 p-2 rounded">
                          <span>
                            {item.quantidade} {item.unidade} - {item.nome}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleRemoveItem(idx)}
                            className="text-red-600 hover:text-red-800"
                          >
                            ✕
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            )}

            <div>
              <label htmlFor="descricao" className="block text-sm font-medium text-gray-700">
                Descrição
              </label>
              <textarea
                id="descricao"
                rows={3}
                value={formData.descricao}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => router.push('/doacoes')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Registrar Doação
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
