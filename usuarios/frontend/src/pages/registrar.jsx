import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Registrar(){
  const [nombre, setNombre] = useState('')
  const [correo, setCorreo] = useState('')
  const [usuario, setUsuario] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    setSuccess(null)

    try{
      const res = await fetch('http://localhost:4000/api/register', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({ nombre, correo, usuario, password })
      })

      const body = await res.json()

      if(!res.ok){
        setError(body.message || 'Error al registrar')
        return
      }

      localStorage.setItem('token', 'fake-jwt-token')
      localStorage.setItem('user', JSON.stringify({ id: body.id, nombre, correo, rol: 'usuario' }))

      setSuccess('Usuario registrado correctamente')
      setTimeout(()=> navigate('/app'), 1500)
    }
    catch(err){
      setError('Error de conexión con el servidor')
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-header">Biblioteca UPP</div>
      <div className="login-card card">
        <h2>Registrar</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Nombre</label>
            <input className="form-control" value={nombre} onChange={e=>setNombre(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Correo</label>
            <input className="form-control" type="email" value={correo} onChange={e=>setCorreo(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Usuario</label>
            <input className="form-control" value={usuario} onChange={e=>setUsuario(e.target.value)} />
          </div>
          <div className="form-row">
            <label>Contraseña</label>
            <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>

          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}

          <div style={{marginTop:12}}>
            <button className="btn btn-primary" type="submit">Registrar</button>
          </div>
        </form>
      </div>
    </div>
  )
}
