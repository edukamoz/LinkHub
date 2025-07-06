/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import { type Link } from "../../types";

import Button from "../../components/Button/Button";
import LinkItem from "../../components/LinkItem/LinkItem"; // Importamos o novo componente
import styles from "./DashboardPage.module.css";

const DashboardPage = () => {
  const { logout } = useAuth();

  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para o formulário de CRIAR
  const [newLinkTitle, setNewLinkTitle] = useState("");
  const [newLinkUrl, setNewLinkUrl] = useState("");

  // Estados para o modal de EDIÇÃO
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await api.get("/links");
        setLinks(response.data.data.links);
      } catch (err) {
        setError("Não foi possível carregar os links.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchLinks();
  }, []);

  const handleCreateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLinkTitle || !newLinkUrl) return;
    try {
      const response = await api.post("/links", {
        title: newLinkTitle,
        url: newLinkUrl,
      });
      setLinks((prevLinks) => [...prevLinks, response.data.data.link]);
      setNewLinkTitle("");
      setNewLinkUrl("");
    } catch (err) {
      alert("Erro ao criar o link.");
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    // Pede confirmação antes de uma ação destrutiva
    if (!window.confirm("Tem certeza que deseja deletar este link?")) {
      return;
    }
    try {
      await api.delete(`/links/${linkId}`);
      // Remove o link do estado local para atualizar a UI instantaneamente
      setLinks((prevLinks) => prevLinks.filter((link) => link._id !== linkId));
    } catch (err) {
      alert("Erro ao deletar o link.");
    }
  };

  const handleOpenEditModal = (link: Link) => {
    setEditingLink(link);
    setEditTitle(link.title);
    setEditUrl(link.url);
    setIsEditModalOpen(true);
  };

  const handleUpdateLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingLink) return;
    try {
      const response = await api.put(`/links/${editingLink._id}`, {
        title: editTitle,
        url: editUrl,
      });
      const updatedLink = response.data.data.link;
      // Atualiza o link no estado local
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link._id === updatedLink._id ? updatedLink : link
        )
      );
      setIsEditModalOpen(false);
      setEditingLink(null);
    } catch (err) {
      alert("Erro ao atualizar o link.");
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Meu Dashboard</h1>
        <Button onClick={logout} style={{ width: "auto" }}>
          Sair
        </Button>
      </header>

      <div className={styles.content}>
        <h2>Adicionar Novo Link</h2>
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
        <h2 style={{ marginTop: "2rem" }}>Meus Links</h2>
        {isLoading && <p>Carregando links...</p>}
        {error && <p className={styles.error}>{error}</p>}

        {!isLoading && !error && (
          <div className={styles.linksList}>
            {links.length > 0 ? (
              links.map((link) => (
                // Usando nosso novo componente!
                <LinkItem
                  key={link._id}
                  link={link}
                  onEdit={handleOpenEditModal}
                  onDelete={handleDeleteLink}
                />
              ))
            ) : (
              <p>Você ainda não tem nenhum link. Adicione um!</p>
            )}
          </div>
        )}
      </div>

      {/* Modal de Edição (só aparece quando isEditModalOpen é true) */}
      {isEditModalOpen && editingLink && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>Editar Link</h3>
            <form onSubmit={handleUpdateLink}>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={styles.addInput}
              />
              <input
                type="url"
                value={editUrl}
                onChange={(e) => setEditUrl(e.target.value)}
                className={styles.addInput}
              />
              <div className={styles.modalActions}>
                <Button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className={styles.cancelButton}
                >
                  Cancelar
                </Button>
                <Button type="submit">Salvar</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
