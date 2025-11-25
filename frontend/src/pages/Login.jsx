import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [error,setError] = useState(null)
  const navigate = useNavigate()

  async function handleSubmit(e){
    e.preventDefault()
    setError(null)
    try{
      const res = await fetch('http://localhost:4000/api/login',{ 
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify({username,password})
      })
      if(!res.ok){
        const body = await res.json()
        setError(body.message || 'Error')
        return
      }
      const body = await res.json()
      console.log('login ok', body)
      navigate('/')
    }catch(err){
      setError('Error de conexión')
    }
  }

  return (
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
      <p style={{marginTop:12}} className="muted">Credenciales demo: <b>admin</b> / <b>password</b></p>
    </div>
  )
}
