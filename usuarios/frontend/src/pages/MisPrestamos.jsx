import { useEffect, useState } from "react";

export default function MisPrestamos() {
  const [prestamos, setPrestamos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrestamos() {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) return;

      try {
        const res = await fetch(`http://localhost:4000/api/prestamos/${user.id}`);
        const data = await res.json();

        if (data.ok) {
          setPrestamos(data.prestamos);
        }
      } catch (error) {
        console.error("Error:", error);
      }

      setLoading(false);
    }

    fetchPrestamos();
  }, []);

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="card" style={{ padding: 20 }}>
      <h2>Mis Préstamos</h2>

      {prestamos.length === 0 ? (
        <p>No tienes préstamos registrados.</p>
      ) : (
        <ul>
          {prestamos.map((p) => (
            <li key={p.id_prestamo}>
              <strong>{p.titulo}</strong> — {p.autor}
              <br />
              <small>
                Prestado: {p.fecha_prestamo}  
                <br />
                Devolución: {p.fecha_devolucion ?? "Sin fecha"}
              </small>
              <br />
              Estado:{" "}
              {p.estado === "devuelto" ? (
                <span style={{ color: "green" }}>Devuelto</span>
              ) : p.estado === "retrasado" ? (
                <span style={{ color: "red" }}>Retrasado</span>
              ) : (
                <span style={{ color: "orange" }}>Activo</span>
              )}
              <hr />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
