const Link = require("../models/link.model");

// Cria um novo link
exports.createLink = async (req, res) => {
  try {
    const { title, url } = req.body;

    // O ID do usuário vem do middleware 'protect' que adicionou 'req.user'
    const owner = req.user._id;

    const newLink = await Link.create({ title, url, owner });

    res.status(201).json({
      status: "success",
      data: {
        link: newLink,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao criar o link", error: error.message });
  }
};

// Pega todos os links do usuário logado
exports.getMyLinks = async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user._id });

    res.status(200).json({
      status: "success",
      results: links.length,
      data: {
        links,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao buscar os links", error: error.message });
  }
};

// Atualiza um link
exports.updateLink = async (req, res) => {
  try {
    const { title, url } = req.body;
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({ message: "Link não encontrado." });
    }

    // Verifica se o usuário logado é o dono do link
    if (link.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para editar este link." });
    }

    link.title = title || link.title;
    link.url = url || link.url;
    await link.save();

    res.status(200).json({
      status: "success",
      data: {
        link,
      },
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Erro ao atualizar o link", error: error.message });
  }
};

// Deleta um link
exports.deleteLink = async (req, res) => {
  try {
    const link = await Link.findById(req.params.id);

    if (!link) {
      return res.status(404).json({ message: "Link não encontrado." });
    }

    if (link.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Você não tem permissão para deletar este link." });
    }

    await Link.findByIdAndDelete(req.params.id);

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao deletar o link", error: error.message });
  }
};
