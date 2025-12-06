import { Outlet, Link } from 'react-router-dom'

export default function App(){
  return (
    <div className="app">
      <header className="header">
        <div className="header-inner">
          <h1 className="logo">Biblioteca UPP</h1>
          <nav className="nav">
            <Link to="/app">Inicio</Link>
          </nav>
        </div>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
