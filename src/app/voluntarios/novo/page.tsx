'use client';

import { useRouter } from 'next/navigation';
import VoluntarioForm from '@/components/voluntarios/VoluntarioForm';
import { voluntarioService, Voluntario } from '@/services/voluntarioService';

export default function NovoVoluntarioPage() {
  const router = useRouter();

  const handleSubmit = async (voluntario: Omit<Voluntario, 'id'>) => {
    try {
      await voluntarioService.create(voluntario);
      alert('Voluntário cadastrado com sucesso!');
      router.push('/voluntarios');
    } catch (error) {
      alert('Erro ao cadastrar voluntário. Verifique se a API está rodando.');
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.push('/voluntarios');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cadastrar Novo Voluntário</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <VoluntarioForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
}
