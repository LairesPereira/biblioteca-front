"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";
import Image from "next/image";

export default function Login() {
    const router = useRouter();
    const formRef = useRef<HTMLFormElement>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data =  {
          email: formData.get("email"),
          password: formData.get("password")
        };
        try {
            const res = await login(data);
            
            type Role = "ROLE_ESTUDANTE" | "ROLE_BIBLIOTECARIO" | "ROLE_PROFESSOR";
            const rotas: Record<Role, string> = {
                ROLE_ESTUDANTE: "/usuario/dashboard",
                ROLE_BIBLIOTECARIO: "/bibliotecario/dashboard",
                ROLE_PROFESSOR: "/bibliotecario/dashboard",
            };

            setMessage("Login realizado com sucesso! Redirecionando...");
            setError(null);
            localStorage.setItem("token", res.token);
            
            const role = res.role as Role;
            router.push(rotas[role] || "/login");
        } catch (err) {
            setError("Erro ao fazer login. Verifique suas credenciais e tente novamente.");
            setMessage(null);
        }
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
                 Acesse sua conta
            </h1>
            <p className="text-lg leading-relaxed mb-4 font-medium text-center">
                Entre com seu email institucional e senha para gerenciar empréstimos, consultar o acervo e aproveitar todos os recursos que nossa biblioteca digital oferece.
            </p>
            
            <p className="mt-6 text-base italic text-blue-900 text-center">
                Comece agora a explorar o mundo do conhecimento! 📖
            </p>
            </div>
        </div>

        {/* Lado direito - formulário */}
        <div className="flex-1 flex items-center justify-center bg-white shadow-inner">
            <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
            <h2 className="text-3xl font-semibold mb-8 text-gray-800 text-center">
                Acesso 
            </h2>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
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
                Login
                </Button>

                <p className="text-center text-sm text-gray-600 mt-4">
                Não possui uma conta?{" "}
                <span
                    onClick={() => router.push("/")}
                    className="text-blue-600 font-medium hover:underline cursor-pointer"
                >
                    Registre-se
                </span>
                </p>
            </form>
            </div>
        </div>
        </div>
    );
};