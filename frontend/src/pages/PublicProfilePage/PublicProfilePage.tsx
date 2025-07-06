/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../../services/api";
import { type Link } from "../../types";
import styles from "./PublicProfilePage.module.css";

interface ProfileData {
  name: string;
  username: string;
}

const PublicProfilePage = () => {
  // O hook useParams pega os parâmetros da URL, como o :username
  const { username } = useParams<{ username: string }>();

  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [links, setLinks] = useState<Link[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;

    const fetchProfile = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await api.get(`/public/${username}`);
        setProfile(response.data.data.user);
        setLinks(response.data.data.links);
      } catch (err) {
        setError("Usuário não encontrado ou erro ao carregar perfil.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [username]); // Roda o efeito sempre que o username na URL mudar

  if (isLoading) return <p className={styles.message}>Carregando perfil...</p>;
  if (error) return <p className={styles.message}>{error}</p>;

  return (
    <div className={styles.profileContainer}>
      <h1>{profile?.name}</h1>
      <p>@{profile?.username}</p>
      <div className={styles.linksContainer}>
        {links.map((link) => (
          <a
            key={link._id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkButton}
          >
            {link.title}
          </a>
        ))}
      </div>
    </div>
  );
};

export default PublicProfilePage;
