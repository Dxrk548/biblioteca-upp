import { useState } from "react";
import "./libros.css";

export default function BuscarLibros() {
  const [query, setQuery] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscar = async (e) => {
    e.preventDefault();

    const res = await fetch(`http://localhost:4000/api/libros/buscar?q=${query}`);
    const data = await res.json();

    setResultados(data.ok ? data.resultados : []);
  };

  const solicitarLibro = async (id_libro) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Debes iniciar sesión primero");

    const res = await fetch("http://localhost:4000/api/prestamos/solicitar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_usuario: user.id, id_libro }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">🔍 Buscar Libros</h2>

      <form className="buscador" onSubmit={buscar}>
        <input
          type="text"
          placeholder="Busca por título, autor o género..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button>Buscar</button>
      </form>

      <div className="grid-libros">
        {resultados.map((libro) => (
          <div key={libro.id_libro} className="card-libro">
            <h3>{libro.titulo}</h3>
            <p className="autor">{libro.autor}</p>
            <p><b>Género:</b> {libro.genero}</p>

            <p className={`estado ${libro.estado}`}>
              {libro.estado.toUpperCase()}
            </p>

            {libro.estado === "disponible" && (
              <button
                className="btn-solicitar"
                onClick={() => solicitarLibro(libro.id_libro)}
              >
                Solicitar
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
