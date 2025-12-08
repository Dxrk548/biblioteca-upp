import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // Leer usuario guardado
  const rawUser = localStorage.getItem("user");
  
  let user = null;
  try {
    user = rawUser ? JSON.parse(rawUser) : null;
  } catch (err) {
    user = null;
  }

  // Si no hay usuario o no tiene id → NO permitir acceso
  if (!user || !user.id) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
