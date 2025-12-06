import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import Login from './pages/Login'
import Registrar from './pages/registrar'
import Home from './pages/Home'
import MisPrestamos from "./pages/MisPrestamos"
import ProtectedRoute from './components/ProtectedRoute'
import './main.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/registrar" element={<Registrar />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/app" element={<App />}>
            <Route index element={<Home />} />
            <Route path="mis-prestamos" element={<MisPrestamos />} />
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
