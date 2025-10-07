'use client';

import { useRouter } from 'next/navigation';
import AnimalForm from '@/components/animais/AnimalForm';
import { animalService, Animal } from '@/services/animalService';

export default function NovoAnimalPage() {
  const router = useRouter();

  const handleSubmit = async (animal: Omit<Animal, 'id'>) => {
    try {
      await animalService.create(animal);
      alert('Animal cadastrado com sucesso!');
      router.push('/animais');
    } catch (error) {
      alert('Erro ao cadastrar animal. Verifique se a API está rodando.');
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.push('/animais');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Cadastrar Novo Animal</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <AnimalForm onSubmit={handleSubmit} onCancel={handleCancel} />
        </div>
      </div>
    </div>
  );
}
