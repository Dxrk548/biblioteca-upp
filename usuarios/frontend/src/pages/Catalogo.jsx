import { useEffect, useState } from "react";

export default function Catalogo() {
  const [libros, setLibros] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/libros")
      .then(res => res.json())
      .then(data => setLibros(data.ok ? data.libros : []));
  }, []);

  return (
    <div>
      <h2>Catálogo de Libros</h2>

      <ul>
        {libros.map((libro) => (
          <li key={libro.id_libro}>
            <strong>{libro.titulo}</strong> — {libro.autor}  
            ({libro.genero}, {libro.anio_publicacion})
          </li>
        ))}
      </ul>
    </div>
  );
}
