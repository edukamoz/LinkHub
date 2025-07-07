/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { useForm, type SubmitHandler } from "react-hook-form";
import api from "../../services/api";
import { type Link } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import toast from "react-hot-toast";
import Button from "../../components/Button/Button";
import LinkItem from "../../components/LinkItem/LinkItem";
import styles from "./DashboardPage.module.css";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../components/Input/Input";

const linkSchema = z.object({
  title: z.string().min(1, { message: "O título é obrigatório." }),
  url: z.string().url({ message: "Por favor, insira uma URL válida." }),
});

type LinkFormData = z.infer<typeof linkSchema>;

const DashboardPage = () => {
  const { logout } = useAuth();

  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estados para o modal de EDIÇÃO
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingLink, setEditingLink] = useState<Link | null>(null);

  const {
    register: registerCreate,
    handleSubmit: handleSubmitCreate,
    formState: { errors: errorsCreate },
    reset: resetCreateForm,
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  });

  const {
    register: registerEdit,
    handleSubmit: handleSubmitEdit,
    formState: { errors: errorsEdit },
    reset: resetEditForm,
  } = useForm<LinkFormData>({
    resolver: zodResolver(linkSchema),
  });

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

  const onCreateSubmit: SubmitHandler<LinkFormData> = async (data) => {
    try {
      const response = await api.post("/links", data);
      setLinks((prevLinks) => [...prevLinks, response.data.data.link]);
      resetCreateForm(); // Limpa o formulário de criação
      toast.success("Link criado com sucesso!");
    } catch (err) {
      toast.error("Erro ao criar o link.");
    }
  };

  const onUpdateSubmit: SubmitHandler<LinkFormData> = async (data) => {
    if (!editingLink) return;
    try {
      const response = await api.put(`/links/${editingLink._id}`, data);
      const updatedLink = response.data.data.link;
      setLinks((prevLinks) =>
        prevLinks.map((link) =>
          link._id === updatedLink._id ? updatedLink : link
        )
      );
      setIsEditModalOpen(false);
      toast.success("Link atualizado com sucesso!");
    } catch (err) {
      toast.error("Erro ao atualizar o link.");
    }
  };

  const handleDeleteLink = async (linkId: string) => {
    // Pede confirmação antes de uma ação destrutiva
    if (!window.confirm("Tem certeza que deseja deletar este link?")) {
      return;
    }
    try {
      await api.delete(`/links/${linkId}`);
      setLinks((prevLinks) => prevLinks.filter((link) => link._id !== linkId));
      toast.success("Link deletado com sucesso!");
    } catch (err) {
      toast.error("Erro ao deletar o link.");
    }
  };

  const handleOpenEditModal = (link: Link) => {
    setEditingLink(link);
    resetEditForm({ title: link.title, url: link.url });
    setIsEditModalOpen(true);
  };

  return (
    <div className={styles.dashboardContainer}>
      <header className={styles.header}>
        <h1>Meu Dashboard</h1>
        <div className={styles.headerActions}>
          <RouterLink to="/settings" className={styles.settingsLink}>
            Configurações
          </RouterLink>
          <Button onClick={logout} style={{ width: "auto" }}>
            Sair
          </Button>
        </div>
      </header>

      <div className={styles.content}>
        <h2>Adicionar Novo Link</h2>
        <form
          onSubmit={handleSubmitCreate(onCreateSubmit)}
          className={styles.addForm}
        >
          <Input
            type="text"
            placeholder="Título do Link"
            {...registerCreate("title")}
          />
          <Input
            type="url"
            placeholder="https://exemplo.com"
            {...registerCreate("url")}
          />
          <Button type="submit" style={{ width: "auto", padding: "10px 20px" }}>
            Adicionar Link
          </Button>
        </form>

        {errorsCreate.title && (
          <p className={styles.error}>{errorsCreate.title.message}</p>
        )}
        {errorsCreate.url && (
          <p className={styles.error}>{errorsCreate.url.message}</p>
        )}

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
            <form onSubmit={handleSubmitEdit(onUpdateSubmit)}>
              <div className={styles.formControl}>
                <label>Título</label>
                <Input type="text" {...registerEdit("title")} />
                {errorsEdit.title && (
                  <p className={styles.error}>{errorsEdit.title.message}</p>
                )}
              </div>
              <div className={styles.formControl}>
                <label>URL</label>
                <Input type="url" {...registerEdit("url")} />
                {errorsEdit.url && (
                  <p className={styles.error}>{errorsEdit.url.message}</p>
                )}
              </div>
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
