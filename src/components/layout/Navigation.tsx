'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigation = [
  { name: 'Início', href: '/' },
  { name: 'Animais', href: '/animais' },
  { name: 'Voluntários', href: '/voluntarios' },
  { name: 'Doações', href: '/doacoes' },
  { name: 'Eventos', href: '/eventos' },
  { name: 'Adoções', href: '/adocoes' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              🐾 Patas Conectadas
            </Link>
          </div>
          <div className="flex space-x-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'bg-blue-700 text-white'
                    : 'text-blue-100 hover:bg-blue-500 hover:text-white'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
