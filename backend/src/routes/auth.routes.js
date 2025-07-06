const express = require("express");
const authController = require("../controllers/auth.controller");

const router = express.Router();

// Rota para registrar um novo usuário
router.post("/register", authController.register);

// Rota para fazer login
router.post("/login", authController.login);

module.exports = router;
