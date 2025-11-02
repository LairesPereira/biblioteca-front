"use client";

import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deleteUser, loadUsers } from "@/lib/api";

interface Usuario {
    id: string,
    nome: string,
    cpf: string,
    email: string,
    matricula: string
}

export default function UsuariosPage() {
    const [usuarios, setUsuarios] = useState<Usuario[]>([])
    const [error, setError] = useState("")
    
    const router = useRouter();

    const handleDeletarUsuario = async (user: Usuario) => {
        const token = localStorage.getItem("token")
        if(!token) {
            router.push("/login")
            return;
        }


        try {
            const res = await deleteUser(user.cpf, token)
            if (!res.ok) {
                const data = await res.json()
                alert("Nao é possível deletar usuários com empréstimos em aberto!")
            }
            if (res) {
                const data = await res.json()
                console.log(data)
                router.refresh()
                return;
            }
        } catch (error) {
            throw new Error("Erro ao deletar usuario")
        }
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if(!token) {
            router.push("/")
            return;
        }

        const carregarUsuarios = async () => {
            try {
              console.log(token)
                const response = (await loadUsers(token));
                if (response) {
                    const res = await response.json()
                    setUsuarios(res)
                } else {
                    throw new Error("Erro ao carregar usuários")
                }
            } catch (error) {
                return;
            }
        }
        carregarUsuarios();
    }, [])

    return (
        <>
      <div className="mb-24">
        <Header 
            userType="admin"
        />
      </div>
      <div className="p-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-semibold text-gray-800">
              📚 Lista de userréstimos
            </h1>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead className="bg-indigo-600 text-white text-sm uppercase">
                <tr>
                  <th className="px-5 py-3 font-medium tracking-wide">Aluno</th>
                  <th className="px-5 py-3 font-medium tracking-wide">Email</th>
                  <th className="px-5 py-3 font-medium tracking-wide">CPF</th>
                  <th className="px-5 py-3 font-medium tracking-wide">Matricula</th>
                  <th className="px-5 py-3 font-medium tracking-wide">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {usuarios.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      <td className="px-5 py-4 text-gray-700 font-medium">{user.nome}</td>
                      <td className="px-5 py-4 text-gray-600">{user.email}</td>
                      <td className="px-5 py-4 text-gray-700">{user.cpf}</td>
                      <td className="px-5 py-4 text-gray-600">{user.matricula}</td>
                      <td className="px-5 py-4 text-center">
                        <Button
                          onClick={() => handleDeletarUsuario(user)}
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 shadow-sm bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-md`}
                        >
                          Remover
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