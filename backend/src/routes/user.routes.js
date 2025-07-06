const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Todas as rotas abaixo são protegidas
router.use(authMiddleware.protect);

router.get("/me", userController.getMe);
router.put("/me", userController.updateMe);

module.exports = router;
