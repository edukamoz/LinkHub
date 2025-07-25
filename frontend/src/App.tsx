import { Routes, Route, Navigate } from "react-router-dom";
import PublicProfilePage from "./pages/PublicProfilePage/PublicProfilePage";
import AuthPage from "./pages/AuthPage/AuthPage";
import DashboardPage from "./pages/DashboardPage/DashboardPage";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import SettingsPage from "./pages/SettingsPage/SettingsPage";
import { useAuth } from "./context/AuthContext";

function App() {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      {/* Se o usuário tentar ir para /auth mas já está logado, redireciona para o dashboard */}
      <Route
        path="/auth"
        element={isLoggedIn ? <Navigate to="/" /> : <AuthPage />}
      />

      {/* A rota '/' é protegida. */}
      <Route path="/" element={<ProtectedRoute />}>
        {/* O Outlet do ProtectedRoute renderizará este componente se o usuário estiver logado */}
        <Route index element={<DashboardPage />} />
      </Route>

      {/* ROTA PÚBLICA DINÂMICA */}
      <Route path="/:username" element={<PublicProfilePage />} />

      <Route path="/" element={<ProtectedRoute />}>
        <Route index element={<DashboardPage />} />
        <Route path="settings" element={<SettingsPage />} /> {/* NOVA ROTA */}
      </Route>

      {/* Qualquer outra rota não encontrada redireciona para a home */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
