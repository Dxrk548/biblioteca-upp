import express from 'express'
import cors from 'cors'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())

app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  // credenciales demo
  if (username === 'admin' && password === 'password') {
    return res.json({ ok: true, token: 'fake-jwt-token', user: { username } })
  }
  return res.status(401).json({ ok: false, message: 'Credenciales inválidas' })
})

app.get('/', (req, res) => {
  res.send('API Biblioteca corriendo')
})

const port = process.env.PORT || 4000
app.listen(port, () => console.log(`Backend escuchando en http://localhost:${port}`))
