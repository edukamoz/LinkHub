/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./SettingsPage.module.css";

const SettingsPage = () => {
  const { user, setUser } = useAuth(); // Pegamos o usuário e a função de atualizar

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (user) {
      setName(user.name);
      setUsername(user.username || "");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");
    try {
      const response = await api.put("/users/me", { name, username });
      setUser(response.data.data.user); // Atualiza o usuário no contexto global
      setMessage("Perfil atualizado com sucesso!");
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Erro ao atualizar perfil.");
    }
  };

  return (
    <div className={styles.settingsContainer}>
      <Link to="/" className={styles.backButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
          />
        </svg>
        Voltar para o Dashboard
      </Link>
      <h1>Configurações do Perfil</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Nome</label>
        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <label>Nome de Usuário (URL Pública)</label>
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button type="submit">Salvar Alterações</Button>
        {message && <p className={styles.message}>{message}</p>}
      </form>
    </div>
  );
};

export default SettingsPage;
