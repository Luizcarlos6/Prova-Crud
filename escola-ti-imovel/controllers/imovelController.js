const Imovel = require('../models/imovelModel');

// Função para criar um novo imóvel
exports.createImovel = async (req, res) => {
  const { descricao, dataCompra, endereco, comodos } = req.body;

  if (!descricao || !dataCompra || !endereco) {
    return res.status(400).json({ error: 'Descrição, data de compra e endereço são obrigatórios' });
  }

  try {
    const novoImovel = new Imovel({
      descricao,
      dataCompra,
      endereco,
      comodos: comodos || []
    });

    await novoImovel.save();
    res.status(201).json(novoImovel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar imóvel' });
  }
};

// Função para obter todos os imóveis
exports.getAllImoveis = async (req, res) => {
  try {
    const imoveis = await Imovel.find();
    res.status(200).json(imoveis);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imóveis' });
  }
};

// Função para obter um imóvel por ID
exports.getImovelById = async (req, res) => {
  try {
    const imovel = await Imovel.findById(req.params.id);
    if (!imovel) {
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }
    res.status(200).json(imovel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar imóvel' });
  }
};

// Função para atualizar um imóvel por ID
exports.updateImovel = async (req, res) => {
  try {
    const imovel = await Imovel.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!imovel) {
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }
    res.status(200).json(imovel);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar imóvel' });
  }
};

// Função para deletar um imóvel por ID
exports.deleteImovel = async (req, res) => {
  try {
    const imovel = await Imovel.findByIdAndDelete(req.params.id);
    if (!imovel) {
      return res.status(404).json({ error: 'Imóvel não encontrado' });
    }
    res.status(200).json({ message: 'Imóvel excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir imóvel' });
  }
};
