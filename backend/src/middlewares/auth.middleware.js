const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const User = require("../models/user.model");

exports.protect = async (req, res, next) => {
  try {
    let token;
    // 1) Pega o token e verifica se ele existe
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message:
          "Você não está logado! Por favor, faça o login para ter acesso.",
      });
    }

    // 2) Verifica o token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    // 3) Verifica se o usuário do token ainda existe
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return res.status(401).json({
        message: "O usuário dono deste token não existe mais.",
      });
    }

    // CONCEDE ACESSO À ROTA PROTEGIDA
    // Adiciona o usuário ao objeto da requisição
    req.user = currentUser;
    next(); // Passa para o próximo middleware ou controlador
  } catch (error) {
    return res.status(401).json({
      message: "Token inválido ou expirado. Por favor, faça o login novamente.",
    });
  }
};
