import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Login(){
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)

    try{
      const res = await fetch('http://localhost:4000/api/login', { 
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ username, password })
      })

      const body = await res.json()

      if(!res.ok){
        setError(body.message || 'Credenciales incorrectas')
        return
      }

      localStorage.setItem('token', body.token)
      navigate('/app');
    }
    catch(err){
      setError('Error de conexión con el servidor')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-header">Biblioteca UPP</div>
      <div className="login-card card">
        <h2>Acceder</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Usuario</label>
            <input className="form-control" value={username} onChange={e=>setUsername(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Contraseña</label>
            <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>

          {error && <div className="error">{error}</div>}

          <div style={{marginTop:12}}>
            <button className="btn btn-primary" type="submit">Entrar</button>
          </div>
        </form>

        <div style={{marginTop:12, textAlign:'center'}}>
          <span>¿No tienes cuenta? </span>
          <Link to="/registrar">Regístrate</Link>
        </div>
      </div>
    </div>
  )
}
