import { useState, type FormEvent } from 'react';
// 1. Importamos os tipos e a função de verificação do Axios
import api from '../../services/api';
import { isAxiosError } from 'axios';

import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setError(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    const endpoint = isLogin ? '/auth/login' : '/auth/register';
    const payload = isLogin ? { email, password } : { name, email, password };

    try {
      const response = await api.post(endpoint, payload);

      if (isLogin) {
        const { token } = response.data;
        localStorage.setItem('token', token);
        alert('Login bem-sucedido!');
      } else {
        alert('Cadastro realizado com sucesso! Agora você pode fazer o login.');
        setIsLogin(true);
      }

    } catch (err) {
      if (isAxiosError(err)) {
        const message = err.response?.data?.message || 'Ocorreu um erro. Tente novamente.';
        setError(message);
      } else {
        // Se for um erro genérico (ex: de rede), mostramos uma mensagem padrão.
        setError('Ocorreu um erro inesperado. Verifique sua conexão.');
        console.error('Erro não esperado:', err);
      }
    } finally {
      // O bloco finally é executado sempre, com sucesso ou erro.
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? 'Login' : 'Criar Conta'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <Input 
            type="text" 
            placeholder="Seu Nome" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        )}

        <Input 
          type="email" 
          placeholder="Seu E-mail" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
        />
        <Input 
          type="password" 
          placeholder="Sua Senha" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
        />
        
        {error && <p className={styles.error}>{error}</p>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Registrar')}
        </Button>
      </form>
      <button 
        type="button" 
        className={styles.switchButton} 
        onClick={switchAuthModeHandler}
        disabled={isLoading}
      >
        {isLogin ? 'Não tem uma conta? Crie uma agora!' : 'Já tem uma conta? Faça o login.'}
      </button>
    </div>
  );
};

export default AuthPage;