export async function registerUser(userData) {  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";
  
  const res = await fetch(`${apiUrl}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    console.error("Failed to register user:", await res.text());  
    throw new Error("Failed to register user");
  }
  return res.json();
}

export async function loginUser(credentials) {  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";  

  const res = await fetch(`${apiUrl}/auth/login`, { 
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    throw new Error("Failed to login");
  }
  return res.json();
}

export async function registerBook(bookData, token) {  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";
  const res = await fetch(`${apiUrl}/biblioteca/livros`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  });

  if (!res.ok) {
    throw new Error("Failed to register book");
  }
  return res;
}

export async function fetchBooks(token) {  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

  const res = await fetch(`${apiUrl}/biblioteca/livros`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch books");
  }
  return res;
}

export async function deleteBook(bookId, token) {  
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";
  if (!bookId == null || token == null) {
    throw new Error("Book ID and token are required");
  }

  const res = await fetch(`${apiUrl}/biblioteca/livros/${bookId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  })

  if (!res.ok) {
    throw new Error("Failed to delete book");
  }
  return res;
}


export async function editBook(bookId, bookData, token) {
  if (!bookId || !token || !bookData) {
    throw new Error("Book ID, book data, and token are required");
  }

  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

  const res = await fetch(`${apiUrl}/biblioteca/livros/${bookId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(bookData),
  })
  if (!res.ok) {
    throw new Error("Failed to edit book");
  }
  return res;
}

export async function registrarEmprestimo(emprestimoData, token) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

  const res = await fetch(`${apiUrl}/biblioteca/emprestar`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(emprestimoData),
  });
  if (!res.ok) {
    throw new Error("Failed to register loan");
  }
  return res;
}

export async function fetchEmprestimos(token) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";

  const res = await fetch(`${apiUrl}/biblioteca/todosEmprestimos`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch loans");
  }
  return res;
}

export async function devolverLivro(cpf, emprestimoId, livroId, token) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8080";
  const res = await fetch(`${apiUrl}/biblioteca/devolver`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({ emprestimoId, cpf, livroId }),
  });

  if (!res.ok) {
    throw new Error("Failed to return book");
  }
  return res;
}