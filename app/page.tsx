"use client";

import React, { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { registerUser } from "@/lib/api";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);


  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const data =  {
      tipo: "ROLE_ESTUDANTE",
      nome: formData.get("firstName"),
      email: formData.get("email"),
      senha: formData.get("password")
    }
    registerUser(data)
      .then(() => {
        setMessage("Cadastro realizado com sucesso! Redirecionando para o login...");
        setError(null);
        router.push("/login");
      }).catch((err) => {
        console.log(err);
        setError("Erro ao cadastrar. Verifique os dados e tente novamente.");
        setMessage(null);
      } );
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-blue-100 via-blue-200 to-white">
      {/* Lado esquerdo - informações */}
      <div className="flex-1 flex flex-col justify-center items-center px-12 text-blue-950">
        <div className="max-w-lg flex flex-col items-center">
          {/* Espaço para o logo */}
          <div className="mb-10 w-40 h-40 bg-white rounded-full shadow-md flex items-center justify-center border border-blue-200">
            <Image
              src="/logo.png"
              alt="Logo da Biblioteca"
              width={160}
              height={160}
              className="rounded-full shadow-md"
            />
          </div>

          <h1 className="text-4xl font-extrabold mb-6 tracking-tight text-center">
            📚 Crie sua Conta de Aluno
          </h1>
          <p className="text-lg leading-relaxed mb-4 font-medium text-center">
            Cadastre-se para acessar o sistema da biblioteca, consultar acervos e gerenciar seus empréstimos de forma simples e rápida.
          </p>
          <ul className="list-disc pl-6 space-y-3 text-base leading-relaxed text-left">
            <li>Pesquise e reserve livros diretamente pelo sistema.</li>
            <li>Acompanhe seus empréstimos e devoluções em tempo real.</li>
            <li>Receba notificações sobre prazos e novas obras disponíveis.</li>
          </ul>
          <p className="mt-6 text-base italic text-blue-900 text-center">
            Comece agora a explorar o mundo do conhecimento! 📖
          </p>
        </div>
      </div>

      {/* Lado direito - formulário */}
      <div className="flex-1 flex items-center justify-center bg-white shadow-inner">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
          <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
            Cadastro de Aluno
          </h2>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Label className="text-lg font-medium text-gray-700">Nome</Label>
              <Input
                name="firstName"
                placeholder="Seu nome completo"
                required
                className="text-base py-3"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-medium text-gray-700">Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Seu email institucional"
                required
                className="text-base py-3"
              />
            </div>

            <div className="space-y-3">
              <Label className="text-lg font-medium text-gray-700">Senha</Label>
              <Input
                name="password"
                type="password"
                placeholder="Crie uma senha segura"
                required
                className="text-base py-3"
              />
            </div>

            {message && (
              <p className="text-green-600 text-center text-sm font-medium mt-2">
                {message}
              </p>
            )}
            {error && (
              <p className="text-red-600 text-center text-sm font-medium mt-2">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full mt-6 py-4 text-lg font-semibold bg-blue-500 hover:bg-blue-600 transition-all"
            >
              Cadastrar
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
              Já possui uma conta?{" "}
              <span
                onClick={() => router.push("/login")}
                className="text-blue-600 font-medium hover:underline cursor-pointer"
              >
                Fazer login
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>

  );
}
