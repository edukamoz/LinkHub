const mongoose = require('mongoose');

const linkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  // Esta é a "chave estrangeira".
  // É uma referência ao ID de um documento na coleção 'User'.
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;