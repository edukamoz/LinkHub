const express = require("express");
const publicController = require("../controllers/public.controller");

const router = express.Router();

// Rota pública que usa o username como parâmetro
router.get("/:username", publicController.getUserProfile);

module.exports = router;
