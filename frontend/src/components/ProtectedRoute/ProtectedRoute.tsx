import { useAuth } from '../../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isLoggedIn } = useAuth();

  // Se o usuário estiver logado, renderiza o conteúdo da rota (Outlet).
  // Se não, redireciona para a página de autenticação.
  return isLoggedIn ? <Outlet /> : <Navigate to="/auth" replace />;
};

export default ProtectedRoute;