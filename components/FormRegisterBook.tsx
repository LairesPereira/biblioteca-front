"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { registerBook } from "@/lib/api";

export default function FormRegisterBook() {
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    const data = {
      titulo: formData.get("titulo"),
      autor: formData.get("autor"),
      isbn: formData.get("codigo"),
      quantidadeTotal: formData.get("quantidade"),
    };

    const token = localStorage.getItem("token");
    if (!token) {
        setError("Usuário não autenticado. Faça login novamente.");
    }

    try {
        const res = await registerBook(data, token);
        if (!res.ok) {
            setError("Erro ao cadastrar o livro. Tente novamente.");
            setMessage("");
        } else {
            setMessage("Livro cadastrado com sucesso!");
            setError("");
        } 
    } catch (err) {
      setError("Erro. Verifique sua conexão e tente novamente.");
      return;
    }

  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-12 space-y-8"
      >
        <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
          Cadastro de Livros
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-700">Título</Label>
            <Input
              name="titulo"
              type="text"
              placeholder="Título do livro"
              required
              className="text-base py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-700">Autor</Label>
            <Input
              name="autor"
              type="text"
              placeholder="Autor do livro"
              required
              className="text-base py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-700">Código</Label>
            <Input
              name="codigo"
              type="text"
              placeholder="Código do livro"
              required
              className="text-base py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-lg font-medium text-gray-700">Quantidade</Label>
            <Input
              name="quantidade"
              type="number"
              placeholder="Quantidade de livros"
              required
              className="text-base py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
          </div>
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
          className="w-full py-4 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-all shadow-lg"
        >
          Cadastrar
        </Button>
      </form>
    </div>
  );
}
