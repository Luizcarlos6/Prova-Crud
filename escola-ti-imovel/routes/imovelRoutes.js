const express = require('express');
const router = express.Router();
const imovelController = require('../controllers/imovelController');

// Rota para criar um novo imóvel
router.post('/', imovelController.createImovel);

// Outras rotas...
router.get('/', imovelController.getAllImoveis);
router.get('/:id', imovelController.getImovelById);
router.put('/:id', imovelController.updateImovel);
router.delete('/:id', imovelController.deleteImovel);

module.exports = router;
