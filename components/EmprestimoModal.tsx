export interface ModalEmprestimoProps {
    emprestimoModalOpen: boolean;
    toggleEmprestimoModal: () => void;
}

export default function ModalEmprestimo(ModalEmprestimoProps: ModalEmprestimoProps) {
    if (!ModalEmprestimoProps.emprestimoModalOpen) {
        return null;
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

        <form className="space-y-4">
          <div>
            <label
              htmlFor="aluno"
              className="block text-gray-700 font-medium mb-1"
            >
              CPF do Aluno
            </label>
            <input
              id="aluno"
              type="text"
              placeholder="Digite o nome do aluno"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* <div>
            <label
              htmlFor="dataDevolucao"
              className="block text-gray-700 font-medium mb-1"
            >
              Data de Devolução
            </label>
            <input
              id="dataDevolucao"
              type="date"
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div> */}

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
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
            >
              Confirmar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
