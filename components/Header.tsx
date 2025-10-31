'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export default function Header() {

  const router = useRouter();

  const handleLogut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  }

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="bg-white rounded-full shadow-md flex items-center justify-center border border-blue-200">
            <Image
            src="/logo.png"
            alt="Logo da Biblioteca"
            width={60}
            height={30}
            className="rounded-full shadow-md"
            />
        </div>

        {/* Menu de navegação */}
        

        {/* Botão */}
        <div className="hidden md:block">
        <nav className="space-x-6 hidden md:flex">
          <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Buscar Livros
          </Button>
          <Button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Empréstimos
          </Button>
          <Button onClick={() => router.push("register-book")} className="bg-blue-600 text-white py-4 py-2 rounded hover:bg-blue-700">
            Cadastrar Livro
          </Button>
          <Button onClick={handleLogut} className=" py-4 py-2 rounded hover:bg-red-500">
            Sair
          </Button>
        </nav>
        </div>
      </div>
    </header>
  );
}
