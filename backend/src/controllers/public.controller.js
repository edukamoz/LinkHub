const User = require("../models/user.model");
const Link = require("../models/link.model");

exports.getUserProfile = async (req, res) => {
  try {
    const { username } = req.params;

    // Encontra o usuário pelo seu username
    const user = await User.findOne({ username: username.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    // Encontra os links que pertencem a esse usuário
    const links = await Link.find({ owner: user._id });

    res.status(200).json({
      status: "success",
      data: {
        user: {
          name: user.name,
          username: user.username,
        },
        links,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error: error.message });
  }
};
