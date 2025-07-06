import { Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage/AuthPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* Se o usuário tentar ir para /auth mas já está logado, redireciona para o dashboard */}
      <Route path="/auth" element={isLoggedIn ? <Navigate to="/" /> : <AuthPage />} />

      {/* A rota '/' é protegida. */}
      <Route path="/" element={<ProtectedRoute />}>
        {/* O Outlet do ProtectedRoute renderizará este componente se o usuário estiver logado */}
        <Route index element={<DashboardPage />} />
      </Route>

      {/* Qualquer outra rota não encontrada redireciona para a home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;