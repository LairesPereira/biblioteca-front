"use client";

import { useState } from "react";
import { editBook } from "@/lib/api";
import { useRouter } from "next/navigation";

export interface EditBookModalProps {
    editBookModal: boolean;
    toggleEditBookModal: () => void;
    id?: string;
    titulo?: string;
    autor?: string;
    isbn?: string;
    quantidadeTotal?: number;
    quantidadeDisponivel?: number;
}

export default function EditBookModal(EditBookModalProps: EditBookModalProps) {
    const router = useRouter();
    const [titulo, setTitulo] = useState(EditBookModalProps.titulo || "");
    const [autor, setAutor] = useState(EditBookModalProps.autor || "");
    const [isbn, setIsbn] = useState(EditBookModalProps.isbn || "");
    const [quantidadeTotal, setQuantidadeTotal] = useState(EditBookModalProps.quantidadeTotal || 0);
    
    function handleSubmitEditBook(event: React.FormEvent<HTMLButtonElement>) {
        event.preventDefault();
        const token = localStorage.getItem("token");
        
        if (!token) {
            router.push("/login");
            return;
        }

        const editBookFunction = async () => {
            try {
                const res = await editBook(EditBookModalProps.id, {
                    titulo,
                    autor,
                    isbn,
                    quantidadeTotal,
                }, token);
                if (res) {
                   console.log("Livro editado com sucesso!");
                   EditBookModalProps.toggleEditBookModal();
                } else {
                   console.log("Erro ao editar o livro.");
                   throw new Error("Erro ao editar o livro.");
                }
                
            } catch (error) {
                throw new Error("Erro ao editar o livro: " + error);
            }
        }
        editBookFunction();
        return;
    }


    if (!EditBookModalProps.editBookModal) {
        return null;
    }

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">
          📖 Editar Livro
        </h2>

        <p className="text-center text-gray-700 mb-6">
          Você está Editando:{" "}
          <span className="font-semibold">{EditBookModalProps.titulo}</span>
        </p>

        <form className="space-y-4">
          <div>
            <label
              htmlFor="titulo"
              className="block text-gray-700 font-medium mb-1"
            >
              {EditBookModalProps.titulo}
            </label>
            <input
              id="titulo"
              type="text"
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Digite o novo titulo do livro"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="autor"
              className="block text-gray-700 font-medium mb-1"
            >
              {EditBookModalProps.autor}
            </label>
            <input
              id="autor"
              type="text"
              onChange={(e) => setAutor(e.target.value)}
              placeholder="Digite o nome do autor"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="isbn"
              className="block text-gray-700 font-medium mb-1"
            >
              ISBN
            </label>
            <input
              id="isbn"
              type="text"
              onChange={(e) => setIsbn(e.target.value)}
              placeholder="Digite o identificador ISBN"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label
              htmlFor="quantidadeTotal"
              className="block text-gray-700 font-medium mb-1"
            >
              Quantidade Total
            </label>
            <input
              id="quantidadeTotal"
              type="number"
              onChange={(e) => setQuantidadeTotal(Number(e.target.value))}
              placeholder="Digite a quantidade total"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={EditBookModalProps.toggleEditBookModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
              onClick={handleSubmitEditBook}
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
