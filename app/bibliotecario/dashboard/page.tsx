"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import { fetchBooks, deleteBook } from "@/lib/api";
import ModalEmprestimo from "@/components/EmprestimoModal";
import EditBookModal from "@/components/EditBookModal";

export interface Livro {
    id: string;
    titulo: string;
    autor: string;
    isbn: string;
    quantidadeTotal: number;
    quantidadeDisponivel: number;
}

export default function DashboardPage() {
    const router = useRouter();
    const [livros, setLivros] = useState<Livro[]>([]);
    const [foundBooks, setFoundBooks] = useState<Livro[]>([]);
    const [livroEmprestimo, setLivroEmprestimo] = useState<Livro>();
    const [bookToEdit, setBookToEdit] = useState<Livro>();
    const [emprestimoModalOpen, setEmprestimoModalOpen] = useState(false);
    const [editBookModalOpen, setEditBookModalOpen] = useState(false);
    const findBook = useRef("");

    function toggleEmprestimoModal() {
        setEmprestimoModalOpen(!emprestimoModalOpen);
    }

    function handleEmprestimo(bookId: Livro) {
        setLivroEmprestimo(bookId);
        setEmprestimoModalOpen(!emprestimoModalOpen);
    }

    function handleFindBook(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.value === "") {
            setFoundBooks([]);
            reFetchBooks();
            return;
        }

        const query = event.target.value.toLowerCase();
        findBook.current = query;
        
        const foundBooks = livros.filter((livro) => 
            livro.titulo.toLowerCase().includes(query) ||
            livro.autor.toLowerCase().includes(query) ||
            livro.isbn.toLowerCase().includes(query)
        );

        setLivros(foundBooks);
    }

    function handleEditBook(livro: Livro) {
        setEditBookModalOpen(!editBookModalOpen);
        setBookToEdit(livro);
        return;
    }

    function reFetchBooks() {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login-bibliotecario");
            return;
        }
        
        const loadBooks = async () => {
            try {
                const res = await fetchBooks(token);
                if (res.ok) {
                    const data = await res.json();
                    setLivros(data);
                }
            } catch (error) {
                throw new Error("Erro ao buscar livros" + error);
            }
        }
        loadBooks();
    }

    function handleRemoveBook(id: string) {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login-bibliotecario");
            return;
        }
        const deletedBook = async () => {
            try {
                const res = await deleteBook(id, token);
                if (res.ok) {
                    console.log("Livro deletado com sucesso", res);
                    reFetchBooks();
                } else {
                    throw new Error("Erro ao deletar livro");
                }
            } catch (error) {
                throw new Error("Erro ao deletar livro" + error);
            }
        }            
        deletedBook();
        return;
    }

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            router.push("/login-bibliotecario");
            return;
        }

        const loadBooks = async () => {
            try {
                const res = await fetchBooks(token);
                if (res.ok) {
                    const data = await res.json();
                    setLivros(data);
                } else {
                    console.error("Erro ao buscar livros"); 
                }
            } catch (error) {
                console.error("Erro de rede ao buscar livros", error);
            }
        };
        loadBooks();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-white">
            <Header 
                userType="admin"
            />
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 p-6">
                <div className="w-full max-w-4xl">
                    <h2 className="text-3xl font-bold mb-10 mt-30 text-center text-indigo-700 drop-shadow-sm">
                    📚 Lista de Livros
                    </h2>

                    <Input
                        type="text"
                        onChange={handleFindBook}
                        placeholder="🔍 Buscar livros por título, autor ou ISBN"
                        className="mb-6 bg-white/70 backdrop-blur-sm border border-indigo-200 focus:border-indigo-400 shadow-md hover:shadow-lg transition-all">
                    </Input>
                    { emprestimoModalOpen &&
                        <ModalEmprestimo 
                            emprestimoModalOpen={emprestimoModalOpen} 
                            toggleEmprestimoModal={toggleEmprestimoModal}
                            livro={livroEmprestimo}
                         />
                    }

                    {
                        editBookModalOpen &&  
                        <EditBookModal
                            editBookModal={editBookModalOpen}
                            toggleEditBookModal={() => setEditBookModalOpen(!editBookModalOpen)}
                            id={bookToEdit?.id}
                            titulo={bookToEdit?.titulo}
                            autor={bookToEdit?.autor}
                            isbn={bookToEdit?.isbn}
                            quantidadeTotal={bookToEdit?.quantidadeTotal}
                            quantidadeDisponivel={bookToEdit?.quantidadeDisponivel}
                        />
                    }
                    
                    {livros.length === 0 ? (
                    <p className="text-center text-gray-600 text-lg">Nenhum livro cadastrado ainda.</p>
                    ) : (
                    <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {livros.map((livro) => (
                        <li
                            key={livro.id}
                            className="p-5 rounded-2xl bg-white/60 backdrop-blur-md border border-indigo-100 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                        >
                            <div className="flex flex-col justify-between h-full">
                            <div>
                                <h3 className="text-xl font-semibold text-indigo-800 mb-2">{livro.titulo}</h3>
                                <p className="text-gray-700 font-medium">Autor: {livro.autor}</p>
                                <p className="text-gray-500 text-sm mt-1">Código: {livro.isbn}</p>
                                <p className="text-gray-500 text-sm">Quantidade: {livro.quantidadeTotal}</p>
                                <p className="text-gray-500 text-sm">Disponíveis: {livro.quantidadeDisponivel}</p>
                            </div>

                            <div className="mt-6 flex flex-wrap justify-center gap-3">
                                <button
                                    onClick={() => handleEmprestimo(livro)}
                                    className="px-4 py-2 min-w-[100px] rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow hover:bg-indigo-700 hover:shadow-md transition-all duration-200"
                                >
                                    Emprestar
                                </button>

                                <button
                                    onClick={() => handleEditBook(livro)}
                                    className="px-4 py-2 min-w-[100px] rounded-lg bg-purple-600 text-white text-sm font-semibold shadow hover:bg-purple-700 hover:shadow-md transition-all duration-200"
                                >
                                    Editar
                                </button>

                                <button
                                    onClick={() => handleRemoveBook(livro.id)}
                                    className="px-4 py-2 min-w-[100px] rounded-lg bg-red-500 text-white text-sm font-semibold shadow hover:bg-red-600 hover:shadow-md transition-all duration-200"
                                >
                                    Remover
                                </button>
                                </div>

                            </div>
                        </li>
                        ))}
                    </ul>
                    )}
                </div>
            </div>
        </div>
    );
}