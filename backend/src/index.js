const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/database");
const publicRoutes = require("./routes/public.routes");
const authRoutes = require("./routes/auth.routes");
const linkRoutes = require("./routes/link.routes");
const userRoutes = require("./routes/user.routes");

// Carrega as variáveis de ambiente do arquivo .env
dotenv.config({ path: "./.env" });

// Conecta ao banco de dados
connectDB();

const app = express();

// Middlewares
app.use(cors()); // Permite requisições de outras origens
app.use(express.json()); // Permite que o servidor entenda JSON

// Rotas
app.use("/api/users", userRoutes);
app.use("/api/public", publicRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/links", linkRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
