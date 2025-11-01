import { Input } from "./ui/input";
import { registrarEmprestimo } from "@/lib/api";
import { useRouter } from "next/navigation";

export interface Livro {
    id: string;
    titulo: string;
    autor: string;
    isbn: string;
    quantidadeTotal: number;
    quantidadeDisponivel: number;
}

export interface ModalEmprestimoProps {
    emprestimoModalOpen: boolean;
    toggleEmprestimoModal: () => void;
    livro?: Livro;
    
}

export default function ModalEmprestimo(ModalEmprestimoProps: ModalEmprestimoProps) {
    const router = useRouter();
    if (!ModalEmprestimoProps.emprestimoModalOpen) {
        return null;
    }

    const handleEmprestimoSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const token = localStorage.getItem("token") 
        if (!token) {
            router.push("/login");
            return;
        }
        const emprestarLivro = async () => {
            try {
              const res = await registrarEmprestimo({
                livroId: ModalEmprestimoProps.livro?.id,
                cpf: formData.get("aluno") as string,
              }, token);
              if (!res.ok) {
                throw new Error("Erro ao registrar empréstimo");
              } else {
                console.log("Empréstimo registrado com sucesso");
              }
            } catch (error) {
              throw new Error("Erro ao registrar empréstimo: " + error);
            }
        }

        await emprestarLivro();

        console.log("Emprestimo confirmado para o aluno com CPF:", formData.get("aluno"));
        console.log("Livro emprestado:", ModalEmprestimoProps.livro);
        ModalEmprestimoProps.toggleEmprestimoModal();
    }

    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 animate-fade-in">
        <h2 className="text-2xl font-bold text-indigo-700 text-center mb-6">
          📖 Emprestar Livro
        </h2>

        <p className="text-center text-gray-700 mb-6">
          Você está emprestando:{" "}
          <span className="font-semibold">A Revolução dos Bichos</span>
        </p>

        <form className="space-y-4" onSubmit={handleEmprestimoSubmit}>
          <div>
            <label
              htmlFor="aluno"
              className="block text-gray-700 font-medium mb-1"
            >
              CPF do Aluno
            </label>
            <Input 
              id="aluno"
              name="aluno"
              type="text"
              placeholder="Digite o CPF do aluno"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              required
            />
          </div>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              onClick={ModalEmprestimoProps.toggleEmprestimoModal}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all"
            >
              Cancelar
            </button>

            <button
              type="submit"
              className=" px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
