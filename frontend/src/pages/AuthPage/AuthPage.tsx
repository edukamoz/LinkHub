import { useState } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import styles from './AuthPage.module.css';

const AuthPage = () => {
  // O estado 'isLogin' controla qual formulário é exibido
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? 'Login' : 'Criar Conta'}</h2>
      <form>
        {/* O campo de nome só aparece se não for a tela de login */}
        {!isLogin && <Input type="text" placeholder="Seu Nome" required />}

        <Input type="email" placeholder="Seu E-mail" required />
        <Input type="password" placeholder="Sua Senha" required />

        <Button type="submit">{isLogin ? 'Entrar' : 'Registrar'}</Button>
      </form>
      <button 
        type="button" 
        className={styles.switchButton} 
        onClick={switchAuthModeHandler}
      >
        {isLogin ? 'Não tem uma conta? Crie uma agora!' : 'Já tem uma conta? Faça o login.'}
      </button>
    </div>
  );
};

export default AuthPage;