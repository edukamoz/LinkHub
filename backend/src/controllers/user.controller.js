const User = require("../models/user.model");

// Pega os dados do usuário logado
exports.getMe = (req, res) => {
  // O objeto 'req.user' foi adicionado pelo nosso middleware 'protect'
  res.status(200).json({
    status: "success",
    data: {
      user: req.user,
    },
  });
};

// Atualiza os dados do usuário logado
exports.updateMe = async (req, res) => {
  try {
    const { name, username } = req.body;

    // Verifica se o novo username já está em uso por OUTRO usuário
    if (username) {
      const existingUser = await User.findOne({
        username: username.toLowerCase(),
      });
      if (
        existingUser &&
        existingUser._id.toString() !== req.user._id.toString()
      ) {
        return res
          .status(400)
          .json({ message: "Este nome de usuário já está em uso." });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { name, username },
      { new: true, runValidators: true } // Opções para retornar o novo doc e rodar validações
    );

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Erro ao atualizar o perfil", error: error.message });
  }
};
