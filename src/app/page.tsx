import Link from "next/link";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Bem-vindo ao Patas Conectadas
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Sistema de gestão para ONGs de proteção animal
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/animais" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">🐕 Animais</h2>
            <p className="text-gray-600">Gerencie o cadastro e status dos animais</p>
          </Link>

          <Link href="/voluntarios" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">👥 Voluntários</h2>
            <p className="text-gray-600">Cadastre voluntários e gerencie tarefas</p>
          </Link>

          <Link href="/doacoes" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">💝 Doações</h2>
            <p className="text-gray-600">Registre e acompanhe doações</p>
          </Link>

          <Link href="/eventos" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">📅 Eventos</h2>
            <p className="text-gray-600">Organize eventos e campanhas</p>
          </Link>

          <Link href="/adocoes" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">❤️ Adoções</h2>
            <p className="text-gray-600">Gerencie o processo de adoção</p>
          </Link>

          <Link href="/relatorios" className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">📊 Relatórios</h2>
            <p className="text-gray-600">Visualize relatórios e estatísticas</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
