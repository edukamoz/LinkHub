import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.tsx";
import { Toaster } from "react-hot-toast";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Toaster
          position="top-right" // Posição na tela
          gutter={8} // Espaçamento entre eles
          toastOptions={{
            // Estilos padrão para todos os toasts
            style: {
              background: "var(--background-surface)",
              color: "var(--text-primary)",
              border: "1px solid var(--color-support)",
            },
            // Estilos específicos para toasts de sucesso
            success: {
              duration: 3000, // 3 segundos
              iconTheme: {
                primary: "var(--highlight-primary)",
                secondary: "var(--background-main)",
              },
            },
            // Estilos específicos para toasts de erro
            error: {
              iconTheme: {
                primary: "#FF4136",
                secondary: "var(--background-main)",
              },
            },
          }}
        />
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
