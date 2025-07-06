import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { type Link } from "../../types"; // Importando nosso novo tipo

import Button from "../../components/Button/Button";
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const { logout } = useAuth();

  // Estados para gerenciar os links, carregamento e erros
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle || !newLinkUrl) return;

    try {
      const response = await api.post("/links", {
        title: newLinkTitle,
        url: newLinkUrl,
      });
      // Adiciona o novo link à lista existente para atualizar a UI instantaneamente
      setLinks((prevLinks) => [...prevLinks, response.data.data.link]);
      // Limpa o formulário
      setNewLinkTitle("");
      setNewLinkUrl("");
    } catch (err) {
      alert("Erro ao criar o link.");
      console.error(err);
    }
  };

  // useEffect para buscar os links quando o componente for montado
  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await api.get("/links");
        setLinks(response.data.data.links);
      } catch (err) {
        setError("Não foi possível carregar os links.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLinks();
  }, []); // O array vazio [] garante que isso rode apenas uma vez

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Meu Dashboard</h1>
        <Button onClick={logout} style={{ width: "auto" }}>
          Sair
        </Button>
      </header>

      <div className={styles.content}>
        <h2>Meus Links</h2>

        {isLoading && <p>Carregando links...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {/* Formulário de Adição de Link */}
        <form onSubmit={handleCreateLink} className={styles.addForm}>
          <input
            type="text"
            placeholder="Título do Link"
            value={newLinkTitle}
            onChange={(e) => setNewLinkTitle(e.target.value)}
            className={styles.addInput}
          />
          <input
            type="url"
            placeholder="https://exemplo.com"
            value={newLinkUrl}
            onChange={(e) => setNewLinkUrl(e.target.value)}
            className={styles.addInput}
          />
          <Button type="submit" style={{ width: "auto", padding: "10px 20px" }}>
            Adicionar Link
          </Button>
        </form>

        {!isLoading && !error && (
          <div className={styles.linksList}>
            {links.length > 0 ? (
              links.map((link) => (
                <div key={link._id} className={styles.linkItem}>
                  <span>{link.title}</span>
                  <small>{link.url}</small>
                </div>
              ))
            ) : (
              <p>Você ainda não tem nenhum link. Adicione um!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
