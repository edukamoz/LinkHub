const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Garante que não haverá dois usuários com o mesmo email
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    select: false, // Para não incluir a senha nas buscas por padrão
  },
}, { timestamps: true }); // Adiciona os campos createdAt e updatedAt automaticamente

// Hook que é executado ANTES de salvar o usuário no banco
userSchema.pre('save', async function(next) {
  // Se a senha não foi modificada, não faz nada
  if (!this.isModified('password')) return next();

  // Gera o hash da senha com um custo de 12 (padrão seguro)
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

const User = mongoose.model('User', userSchema);
module.exports = User;