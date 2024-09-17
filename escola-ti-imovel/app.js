const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const imovelRoutes = require('./routes/imovelRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rotas de Imóvel
app.use('/imoveis', imovelRoutes);

// Conexão com o MongoDB
mongoose.connect('mongodb://localhost:27017/imoveis', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao MongoDB');
}).catch((error) => {
  console.error('Erro ao conectar ao MongoDB:', error);
});

// Iniciar o servidor
app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
