const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const authRoutes = require("./routes/auth.routes");

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: "./.env" });

// Conecta ao banco de dados
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Permite requisições de outras origens
app.use(express.json()); // Permite que o servidor entenda JSON

// Monta o roteador de autenticação na rota /api/auth
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
