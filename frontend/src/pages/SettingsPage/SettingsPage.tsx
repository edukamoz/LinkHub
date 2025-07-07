/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import api from "../../services/api";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./SettingsPage.module.css";
import toast from "react-hot-toast";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const profileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres." }),
  username: z
    .string()
    .refine((val) => val.length === 0 || val.length >= 3, {
      message: "O nome de usuário precisa ter no mínimo 3 caracteres.",
    })
    .refine((val) => val.length === 0 || /^[a-z0-9-]+$/.test(val), {
      message: "Use apenas letras minúsculas, números e hifens.",
    }),
});

type ProfileFormData = z.infer<typeof profileSchema>;

const SettingsPage = () => {
  const { user, setUser } = useAuth(); // Pegamos o usuário e a função de atualizar

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
  });

  useEffect(() => {
    if (user) {
      reset({
        name: user.name,
        username: user.username || "",
      });
    }
  }, [user, reset]);

  const onSubmit: SubmitHandler<ProfileFormData> = async (data) => {
    try {
      const response = await api.put("/users/me", data);
      setUser(response.data.data.user);
      toast.success("Perfil atualizado com sucesso!");
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Erro ao atualizar perfil.";
      toast.error(errorMessage);
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
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.formControl}>
          <label>Nome</label>
          <Input type="text" {...register("name")} />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.formControl}>
          <label>Nome de Usuário (URL Pública)</label>
          <Input type="text" {...register("username")} />
          {errors.username && (
            <p className={styles.error}>{errors.username.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Alterações"}
        </Button>
      </form>
    </div>
  );
};

export default SettingsPage;
