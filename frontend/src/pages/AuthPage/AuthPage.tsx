import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { isAxiosError } from "axios";

import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./AuthPage.module.css";

const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: "O nome precisa ter no mínimo 3 caracteres." }),
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z
    .string()
    .min(8, { message: "A senha precisa ter no mínimo 8 caracteres." }),
});

const loginSchema = z.object({
  email: z.string().email({ message: "Por favor, insira um email válido." }),
  password: z.string().min(1, { message: "A senha é obrigatória." }),
});

// Extrai os tipos TypeScript a partir dos schemas
type RegisterFormData = z.infer<typeof registerSchema>;
type LoginFormData = z.infer<typeof loginSchema>;

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();

  const currentSchema = isLogin ? loginSchema : registerSchema;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData | LoginFormData>({
    resolver: zodResolver(currentSchema),
  });

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const onFormSubmit = async (data: RegisterFormData | LoginFormData) => {
    const endpoint = isLogin ? "/auth/login" : "/auth/register";

    try {
      const response = await api.post(endpoint, data);

      if (isLogin) {
        const { token } = response.data;
        login(token);
        toast.success("Login bem-sucedido!");
      } else {
        toast.success("Cadastro realizado com sucesso! Faça o login.");
        setIsLogin(true);
      }
    } catch (err) {
      if (isAxiosError(err)) {
        const message = err.response?.data?.message || "Ocorreu um erro.";
        toast.error(message);
      } else {
        toast.error("Ocorreu um erro inesperado.");
      }
    }
  };

  console.log("Erros do formulário:", errors);

  return (
    <div className={styles.authContainer}>
      <h2>{isLogin ? "Login" : "Criar Conta"}</h2>

      <form onSubmit={handleSubmit(onFormSubmit)}>
        {!isLogin && (
          <div className={styles.formControl}>
            <Input type="text" placeholder="Seu Nome" {...register("name")} />
            {"name" in errors && errors.name && (
              <p className={styles.error}>{errors.name.message}</p>
            )}
          </div>
        )}

        <div className={styles.formControl}>
          <Input type="email" placeholder="Seu E-mail" {...register("email")} />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>

        <div className={styles.formControl}>
          <Input
            type="password"
            placeholder="Sua Senha"
            {...register("password")}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Carregando..." : isLogin ? "Entrar" : "Registrar"}
        </Button>
      </form>

      <button
        type="button"
        className={styles.switchButton}
        onClick={switchAuthModeHandler}
        disabled={isSubmitting}
      >
        {isLogin
          ? "Não tem uma conta? Crie uma agora!"
          : "Já tem uma conta? Faça o login."}
      </button>
    </div>
  );
};

export default AuthPage;
