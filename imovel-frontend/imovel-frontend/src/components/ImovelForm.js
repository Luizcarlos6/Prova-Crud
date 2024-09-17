import React, { useState, useEffect } from 'react';
import { createImovel, getImovelById, updateImovel } from '../services/ImovelService';
import { useNavigate, useParams } from 'react-router-dom';

const ImovelForm = () => {
  const [descricao, setDescricao] = useState('');
  const [dataCompra, setDataCompra] = useState('');
  const [endereco, setEndereco] = useState('');
  const [comodos, setComodos] = useState('');
  const { id } = useParams();  // Obtém o ID da URL, se estiver editando
  const navigate = useNavigate();  // Para redirecionar após salvar

  // useEffect para buscar os dados do imóvel se estiver no modo de edição
  useEffect(() => {
    if (id) {
      fetchImovel();
    }
  }, [id]);

  // Função para buscar os dados do imóvel se estiver em modo de edição
  const fetchImovel = async () => {
    try {
      const { data } = await getImovelById(id);  // Busca o imóvel pelo ID
      setDescricao(data.descricao);
      setDataCompra(data.dataCompra.split('T')[0]);  // Ajusta a data para o formato do input
      setEndereco(data.endereco);
      setComodos(data.comodos.map((comodo) => comodo.nome).join(','));  // Une os cômodos em uma string
    } catch (error) {
      console.error('Erro ao buscar imóvel:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imovel = {
      descricao,
      dataCompra,
      endereco,
      comodos: comodos.split(',').map((nome) => ({ nome }))  // Divide os cômodos em uma lista de objetos
    };

    try {
      if (id) {
        // Se existir um ID, estamos editando o imóvel
        await updateImovel(id, imovel);
        alert('Imóvel atualizado com sucesso!');
      } else {
        // Se não houver ID, estamos criando um novo imóvel
        await createImovel(imovel);
        alert('Imóvel criado com sucesso!');
      }
      navigate('/imovel/lista');  // Redireciona para a lista de imóveis após salvar
    } catch (error) {
      console.error('Erro ao salvar imóvel:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">{id ? 'Editar Imóvel' : 'Criar Novo Imóvel'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Descrição:</label>
          <input
            type="text"
            className="form-control"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Data de Compra:</label>
          <input
            type="date"
            className="form-control"
            value={dataCompra}
            onChange={(e) => setDataCompra(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Endereço:</label>
          <input
            type="text"
            className="form-control"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Cômodos (separados por vírgula):</label>
          <input
            type="text"
            className="form-control"
            value={comodos}
            onChange={(e) => setComodos(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {id ? 'Atualizar Imóvel' : 'Criar Imóvel'}
        </button>
      </form>
    </div>
  );
};

export default ImovelForm;
