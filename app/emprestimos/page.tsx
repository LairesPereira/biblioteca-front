"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ListaEmprestimosProps } from "@/components/ListaEmprestimos";
import { devolverLivro, fetchEmprestimos } from "@/lib/api";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";

export default function ListaEmprestimosPage() {
  const router = useRouter();
  const [emprestimos, setEmprestimos] = useState<ListaEmprestimosProps[]>([]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const loadEmprestimos = async () => {
      const response = await fetchEmprestimos(token);
      const data = await response.json();
      console.log(data);
      setEmprestimos(data);
    };

    loadEmprestimos();
  }, [router]);

  const handleDevolver = (emp: ListaEmprestimosProps) => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    const devolverEmprestimo = async () => {
       const res = await devolverLivro(emp.usuario.cpf, emp.id, emp.livro.id, token);
        if (res.ok) {
          router.refresh();
        } else {
          alert("Erro ao devolver o livro.");
        }
    };
    devolverEmprestimo();
  }

  return (
    <>
      <div className="mb-24">
        <Header />
      </div>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              📚 Lista de Empréstimos
            </h1>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-indigo-600 text-white text-sm uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium tracking-wide">Aluno</th>
                  <th className="px-5 py-3 font-medium tracking-wide">CPF</th>
                  <th className="px-5 py-3 font-medium tracking-wide">Livro</th>
                  <th className="px-5 py-3 font-medium tracking-wide">Autor</th>
                  <th className="px-5 py-3 font-medium tracking-wide">Início</th>
                  <th className="px-5 py-3 font-medium tracking-wide">Prev. Devolução</th>
                  <th className="px-5 py-3 font-medium tracking-wide">Devolução</th>
                  <th className="px-5 py-3 font-medium tracking-wide text-center">Status</th>
                  <th className="px-5 py-3 font-medium tracking-wide text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {emprestimos.map((emp) => {
                  const isDevolvido = emp.statusEmprestimo === "DEVOLVIDO";


                  return (
                    <tr
                      key={emp.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-5 py-4 text-gray-700 font-medium">
                        {emp.usuario.nome}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{emp.usuario.cpf}</td>
                      <td className="px-5 py-4 text-gray-700">{emp.livro.titulo}</td>
                      <td className="px-5 py-4 text-gray-600">{emp.livro.autor}</td>
                      <td className="px-5 py-4 text-gray-600">{emp.inicio}</td>
                      <td className="px-5 py-4 text-gray-600">{emp.previsaoDevolucao}</td>
                      <td className="px-5 py-4 text-gray-600">{emp.devolucao}</td>
                      <td className="px-5 py-4 text-center">{emp.statusEmprestimo}</td>
                      <td className="px-5 py-4 text-center">
                        <Button
                          disabled={isDevolvido}
                          onClick={() => handleDevolver(emp)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm ${
                            isDevolvido
                              ? "bg-gray-400 text-gray-200 cursor-not-allowed"
                              : "bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md"
                          }`}
                        >
                          Devolver
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
