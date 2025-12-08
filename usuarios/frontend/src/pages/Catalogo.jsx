import { useEffect, useState } from "react";
import "./libros.css"; 

export default function Catalogo() {
  const [libros, setLibros] = useState([]);

  const cargarLibros = () => {
    fetch("http://localhost:4000/api/libros")
      .then(res => res.json())
      .then(data => setLibros(data.ok ? data.libros : []));
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  const solicitarLibro = async (id_libro) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) return alert("Debes iniciar sesión primero");

    const res = await fetch("http://localhost:4000/api/prestamos/solicitar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_usuario: user.id,
        id_libro,
      }),
    });

    const data = await res.json();
    alert(data.message);
    cargarLibros();
  };

  return (
    <div className="contenedor">
      <h2 className="titulo">📚 Catálogo de Libros</h2>

      <div className="grid-libros">
        {libros.map((libro) => (
          <div key={libro.id_libro} className="card-libro">
            <h3>{libro.titulo}</h3>
            <p className="autor">{libro.autor}</p>
            <p><b>Género:</b> {libro.genero}</p>
            <p><b>Año:</b> {libro.anio_publicacion}</p>

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
