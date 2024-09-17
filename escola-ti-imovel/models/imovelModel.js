const mongoose = require('mongoose');

const ComodoSchema = new mongoose.Schema({
  nome: { type: String, required: true }
});

const ImovelSchema = new mongoose.Schema({
  descricao: { type: String, required: true },
  dataCompra: { type: Date, required: true },
  endereco: { type: String, required: true },
  comodos: [ComodoSchema] // Array de cômodos
});

module.exports = mongoose.model('Imovel', ImovelSchema);
