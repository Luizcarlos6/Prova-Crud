import React, { useState, useEffect } from 'react';
import { getImovelById, addComodo, removeComodo } from '../services/ImovelService';
import { useParams } from 'react-router-dom';
import ComodoForm from './ComodoForm';

const ImovelDetail = () => {
  const { id } = useParams();
  const [imovel, setImovel] = useState(null);

  useEffect(() => {
    const fetchImovel = async () => {
      try {
        const { data } = await getImovelById(id);
        setImovel(data);
      } catch (error) {
        console.error("Erro ao buscar imóvel", error);
      }
    };

    fetchImovel();
  }, [id]);  // Agora, somente `id` é a dependência

  const handleAddComodo = async (comodo) => {
    await addComodo(id, comodo);
    const { data } = await getImovelById(id);
    setImovel(data);  // Atualiza a lista de cômodos
  };

  const handleRemoveComodo = async (comodoId) => {
    await removeComodo(id, comodoId);
    const { data } = await getImovelById(id);
    setImovel(data);  // Atualiza a lista de cômodos
  };

  return imovel ? (
    <div>
      <h1>{imovel.descricao}</h1>
      <p>Endereço: {imovel.endereco}</p>
      <p>Data de Compra: {new Date(imovel.dataCompra).toLocaleDateString()}</p>

      <h3>Cômodos</h3>
      <ul>
        {imovel.comodos.map((comodo) => (
          <li key={comodo._id}>
            {comodo.nome} <button onClick={() => handleRemoveComodo(comodo._id)}>Remover</button>
          </li>
        ))}
      </ul>
      <ComodoForm onAddComodo={handleAddComodo} />
    </div>
  ) : (
    <p>Carregando...</p>
  );
};
  const handleAddComodo = async (e) => {
    e.preventDefault();
    if (!comodoNome) return alert('Nome do cômodo é obrigatório');

    try {
      await addComodo(id, { nome: comodoNome });
      fetchImovel();  // Atualizar o imóvel após adicionar o cômodo
      setComodoNome('');  // Limpar o campo de texto
    } catch (error) {
      console.error('Erro ao adicionar cômodo:', error);
    }
  };

  const handleRemoveComodo = async (comodoId) => {
    try {
      await removeComodo(id, comodoId);
      fetchImovel();  // Atualizar o imóvel após remover o cômodo
    } catch (error) {
      console.error('Erro ao remover cômodo:', error);
    }
  };

  return imovel ? (
    <div className="container mt-5">
      <h1>Detalhes do Imóvel</h1>
      <p><strong>Descrição:</strong> {imovel.descricao}</p>
      <p><strong>Endereço:</strong> {imovel.endereco}</p>
      <p><strong>Data de Compra:</strong> {new Date(imovel.dataCompra).toLocaleDateString()}</p>

      <h3>Cômodos</h3>
      <ul className="list-group">
        {imovel.comodos.map((comodo) => (
          <li key={comodo._id} className="list-group-item d-flex justify-content-between align-items-center">
            {comodo.nome}
            <button onClick={() => handleRemoveComodo(comodo._id)} className="btn btn-danger btn-sm">Remover</button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddComodo} className="mt-4">
        <div className="form-group mb-3">
          <label>Adicionar Cômodo:</label>
          <input
            type="text"
            className="form-control"
            value={comodoNome}
            onChange={(e) => setComodoNome(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Adicionar Cômodo</button>
      </form>
    </div>
  ) : (
    <p>Carregando...</p>
  );

export default ImovelDetail;
