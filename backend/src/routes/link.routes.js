const express = require("express");
const linkController = require("../controllers/link.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// A partir daqui, todas as rotas neste arquivo são protegidas.
// O middleware 'protect' será executado antes de qualquer controlador.
router.use(authMiddleware.protect);

router
  .route("/")
  .post(linkController.createLink)
  .get(linkController.getMyLinks);

router
  .route("/:id")
  .put(linkController.updateLink)
  .delete(linkController.deleteLink);

module.exports = router;
