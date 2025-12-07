import { useState } from "react";

export default function BuscarLibros() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscar = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:4000/api/libros/buscar?q=${query}`);
    const data = await res.json();

    setResultados(data.ok ? data.resultados : []);
  };

  return (
    <div>
      <h2>Buscar Libros</h2>

      <form onSubmit={buscar}>
        <input
          type="text"
          placeholder="Título, autor o género..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <ul>
        {resultados.map((libro) => (
          <li key={libro.id_libro}>
            <strong>{libro.titulo}</strong> — {libro.autor} ({libro.genero})
          </li>
        ))}
      </ul>
    </div>
  );
}
