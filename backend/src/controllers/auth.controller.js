const User = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Função para gerar um token JWT
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Controlador para registrar um novo usuário
exports.register = async (req, res) => {
  try {
    // 1. Verifica se o email já existe
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Este email já está em uso." });
    }

    // 2. Cria um novo usuário com os dados do corpo da requisição
    // A senha será hasheada automaticamente pelo hook 'pre' no nosso model
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // 3. Gera um token para o novo usuário
    const token = signToken(newUser._id);

    // 4. Envia a resposta de sucesso
    res.status(201).json({
      status: "success",
      token,
      data: {
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao registrar usuário", error: error.message });
  }
};

// Controlador para fazer login de um usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Verifica se email e senha foram fornecidos
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Por favor, forneça email e senha." });
    }

    // 2. Encontra o usuário pelo email e inclui a senha na busca
    const user = await User.findOne({ email }).select("+password");

    // 3. Verifica se o usuário existe e se a senha está correta
    const isCorrect = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: "Email ou senha inválidos." });
    }

    // 4. Se tudo estiver ok, gera e envia o token
    const token = signToken(user._id);
    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao fazer login", error: error.message });
  }
};
