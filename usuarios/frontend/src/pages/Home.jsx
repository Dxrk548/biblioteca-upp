import { Link } from "react-router-dom";

export default function Home(){
  return (
    <div>
      <div className="hero card">
        <h2>Bienvenido a Biblioteca UPP</h2>
        <p className="muted">Explora el catálogo, consulta tus préstamos y administra tu perfil.</p>
      </div>

      <div className="card actions" style={{marginTop:12}}>
        <button className="btn btn-primary">Buscar libros</button>
        <button className="btn">Catálogo</button>
        <Link to="/app/mis-prestamos" className="btn">Mis préstamos</Link>
      </div>
    </div>
  )
}
