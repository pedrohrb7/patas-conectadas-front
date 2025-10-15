'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Adocao, adocaoService, Adotante } from '@/services/eventoService';
import { Animal, animalService } from '@/services/animalService';

export default function NovaAdocaoPage() {
  const router = useRouter();
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [formData, setFormData] = useState<Omit<Adocao, 'id'>>({
    animalId: 0,
    dataAdocao: new Date().toISOString().split('T')[0],
    termoResponsabilidade: '',
    status: 'pendente',
    observacoes: '',
    adotante: {
      nome: '',
      cpf: '',
      email: '',
      telefone: '',
      endereco: '',
      cidade: '',
      estado: '',
      cep: '',
      profissao: '',
      rendaMensal: 0,
      possuiOutrosPets: false,
      descricaoMoradia: '',
    },
  });

  useEffect(() => {
    loadAnimais();
  }, []);

  const loadAnimais = async () => {
    try {
      const data = await animalService.getAll();
      setAnimais(data.filter(a => a.status === 'disponivel'));
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await adocaoService.create(formData);
      alert('Adoção registrada com sucesso!');
      router.push('/adocoes');
    } catch (error) {
      alert('Erro ao registrar adoção. Verifique se a API está rodando.');
      console.error(error);
    }
  };

  const updateAdotante = (field: keyof Adotante, value: string | number | boolean) => {
    setFormData({
      ...formData,
      adotante: {
        ...formData.adotante,
        [field]: value,
      },
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Registrar Nova Adoção</h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="animalId" className="block text-sm font-medium text-gray-700">
                Animal *
              </label>
              <select
                id="animalId"
                required
                value={formData.animalId}
                onChange={(e) => setFormData({ ...formData, animalId: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              >
                <option value="">Selecione um animal</option>
                {animais.map((animal) => (
                  <option key={animal.id} value={animal.id}>
                    {animal.nome} - {animal.especie} {animal.raca && `(${animal.raca})`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="dataAdocao" className="block text-sm font-medium text-gray-700">
                Data da Adoção *
              </label>
              <input
                type="date"
                id="dataAdocao"
                required
                value={formData.dataAdocao}
                onChange={(e) => setFormData({ ...formData, dataAdocao: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <h2 className="text-xl font-bold text-gray-900 border-t pt-4">Dados do Adotante</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                  Nome Completo *
                </label>
                <input
                  type="text"
                  id="nome"
                  required
                  value={formData.adotante.nome}
                  onChange={(e) => updateAdotante('nome', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">
                  CPF *
                </label>
                <input
                  type="text"
                  id="cpf"
                  required
                  value={formData.adotante.cpf}
                  onChange={(e) => updateAdotante('cpf', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="000.000.000-00"
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
                  value={formData.adotante.email}
                  onChange={(e) => updateAdotante('email', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="telefone" className="block text-sm font-medium text-gray-700">
                  Telefone *
                </label>
                <input
                  type="tel"
                  id="telefone"
                  required
                  value={formData.adotante.telefone}
                  onChange={(e) => updateAdotante('telefone', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="(00) 00000-0000"
                />
              </div>
            </div>

            <div>
              <label htmlFor="endereco" className="block text-sm font-medium text-gray-700">
                Endereço *
              </label>
              <input
                type="text"
                id="endereco"
                required
                value={formData.adotante.endereco}
                onChange={(e) => updateAdotante('endereco', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label htmlFor="cidade" className="block text-sm font-medium text-gray-700">
                  Cidade *
                </label>
                <input
                  type="text"
                  id="cidade"
                  required
                  value={formData.adotante.cidade}
                  onChange={(e) => updateAdotante('cidade', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="estado" className="block text-sm font-medium text-gray-700">
                  Estado *
                </label>
                <input
                  type="text"
                  id="estado"
                  required
                  value={formData.adotante.estado}
                  onChange={(e) => updateAdotante('estado', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="SP"
                  maxLength={2}
                />
              </div>

              <div>
                <label htmlFor="cep" className="block text-sm font-medium text-gray-700">
                  CEP *
                </label>
                <input
                  type="text"
                  id="cep"
                  required
                  value={formData.adotante.cep}
                  onChange={(e) => updateAdotante('cep', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                  placeholder="00000-000"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="profissao" className="block text-sm font-medium text-gray-700">
                  Profissão
                </label>
                <input
                  type="text"
                  id="profissao"
                  value={formData.adotante.profissao}
                  onChange={(e) => updateAdotante('profissao', e.target.value)}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>

              <div>
                <label htmlFor="rendaMensal" className="block text-sm font-medium text-gray-700">
                  Renda Mensal (R$)
                </label>
                <input
                  type="number"
                  id="rendaMensal"
                  min="0"
                  value={formData.adotante.rendaMensal}
                  onChange={(e) => updateAdotante('rendaMensal', parseFloat(e.target.value))}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.adotante.possuiOutrosPets}
                  onChange={(e) => updateAdotante('possuiOutrosPets', e.target.checked)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-2"
                />
                <span className="text-sm font-medium text-gray-700">Possui outros pets</span>
              </label>
            </div>

            <div>
              <label htmlFor="descricaoMoradia" className="block text-sm font-medium text-gray-700">
                Descrição da Moradia
              </label>
              <textarea
                id="descricaoMoradia"
                rows={3}
                value={formData.adotante.descricaoMoradia}
                onChange={(e) => updateAdotante('descricaoMoradia', e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Descreva o tipo de moradia (casa, apartamento, quintal, etc.)"
              />
            </div>

            <div>
              <label htmlFor="termoResponsabilidade" className="block text-sm font-medium text-gray-700">
                Termo de Responsabilidade *
              </label>
              <textarea
                id="termoResponsabilidade"
                rows={4}
                required
                value={formData.termoResponsabilidade}
                onChange={(e) => setFormData({ ...formData, termoResponsabilidade: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
                placeholder="Digite ou cole o termo de responsabilidade assinado pelo adotante"
              />
            </div>

            <div>
              <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700">
                Observações
              </label>
              <textarea
                id="observacoes"
                rows={3}
                value={formData.observacoes}
                onChange={(e) => setFormData({ ...formData, observacoes: e.target.value })}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
              />
            </div>

            <div className="flex justify-end space-x-4 border-t pt-4">
              <button
                type="button"
                onClick={() => router.push('/adocoes')}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Registrar Adoção
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
