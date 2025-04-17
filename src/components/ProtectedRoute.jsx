import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const usuario = JSON.parse(localStorage.getItem('usuarioActivo'));
  return usuario ? children : <Navigate to="/login" replace />;
}
