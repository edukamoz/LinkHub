/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useState,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import api from "../services/api";
import { type User } from "../types";

interface AuthContextType {
  token: string | null;
  user: User | null;
  isLoggedIn: boolean;
  login: (newToken: string) => void;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);

  // Este useEffect roda uma vez quando a aplicação carrega
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          // Com o interceptor, o token já está no header
          const response = await api.get("/users/me");
          setUser(response.data.data.user);
        } catch (error) {
          // Se o token for inválido, desloga o usuário
          logout();
        }
      }
    };
    fetchUser();
  }, [token]);

  const login = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  // O !!token converte a string (ou null) em um booleano (true/false)
  const isLoggedIn = !!token && !!user;

  return (
    <AuthContext.Provider
      value={{ token, user, isLoggedIn, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
};
