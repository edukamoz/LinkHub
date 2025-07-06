import { type Link } from "../../types";
import styles from "./LinkItem.module.css";

interface LinkItemProps {
  link: Link;
  onEdit: (link: Link) => void;
  onDelete: (linkId: string) => void;
}

const LinkItem = ({ link, onEdit, onDelete }: LinkItemProps) => {
  return (
    <div className={styles.linkItem}>
      <div className={styles.linkInfo}>
        <span>{link.title}</span>
        <small>{link.url}</small>
      </div>
      <div className={styles.linkActions}>
        <button
          onClick={() => onEdit(link)}
          className={`${styles.actionButton} ${styles.editButton}`}
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(link._id)}
          className={`${styles.actionButton} ${styles.deleteButton}`}
        >
          Deletar
        </button>
      </div>
    </div>
  );
};

export default LinkItem;
