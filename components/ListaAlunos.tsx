"use client";

interface Aluno {
  id: number;
  nome: string;
  email: string;
  matricula: string;
  curso: string;
}

interface ListaAlunosProps {
  alunos: Aluno[];
}

export default function ListaAlunos({ alunos }: ListaAlunosProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 p-8">
      <div className="w-full max-w-4xl bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-indigo-100">
        <h2 className="text-3xl font-bold text-indigo-700 mb-10 text-center drop-shadow-sm">
          🎓 Lista de Alunos
        </h2>

        {alunos.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            Nenhum aluno cadastrado ainda.
          </p>
        ) : (
          <ul className="space-y-6">
            {alunos.map((aluno) => (
              <li
                key={aluno.id}
                className="p-6 rounded-xl bg-white/90 border border-indigo-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h3 className="text-xl font-semibold text-indigo-800">
                      {aluno.nome}
                    </h3>
                    <p className="text-gray-600 text-sm">{aluno.email}</p>
                    <p className="text-gray-500 text-sm mt-1">
                      Matrícula: {aluno.matricula}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Curso: {aluno.curso}
                    </p>
                  </div>

                  <div className="flex gap-3 mt-4 sm:mt-0">
                    <button className="px-4 py-2 rounded-lg bg-indigo-500 text-white text-sm font-medium hover:bg-indigo-600 transition-all">
                      Editar
                    </button>
                    <button className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-all">
                      Excluir
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
