import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button/Button';

const DashboardPage = () => {
  const { logout } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo! Você está logado.</p>
      <Button onClick={logout} style={{ maxWidth: '200px', margin: '0 auto' }}>
        Sair (Logout)
      </Button>
    </div>
  );
};

export default DashboardPage;