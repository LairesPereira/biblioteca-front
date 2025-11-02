export interface Livro {
    id: string;
    titulo: string;
    autor: string;
    isbn: string;
    quantidadeTotal: number;
    quantidadeDisponivel: number;
}

export interface Usuario {
    id: string;
    nome: string;
    email: string;
    cpf: string;
}

export interface ListaEmprestimosProps {
    id: string;
    usuario: Usuario;
    livro: Livro;
    inicio: string;
    previsaoDevolucao: string;
    finalizdo: boolean;
    devolucao?: string;
    statusEmprestimo: string;
    rawPrevisao: string
}