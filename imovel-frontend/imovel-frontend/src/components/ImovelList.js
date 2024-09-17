import React, { useEffect, useState } from 'react';
import { getImoveis, deleteImovel } from '../services/ImovelService';
import { Link } from 'react-router-dom';  // Importar Link para navegação

const ImovelList = () => {
  const [imoveis, setImoveis] = useState([]);

  useEffect(() => {
    fetchImoveis();
  }, []);

  const fetchImoveis = async () => {
    try {
      const response = await getImoveis();
      setImoveis(response.data);
    } catch (error) {
      console.error('Erro ao buscar imóveis:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteImovel(id);
      fetchImoveis();  // Atualiza a lista após deletar
    } catch (error) {
      console.error('Erro ao deletar imóvel:', error);
    }
  };

  return (
    <ul className="list-group">
      {imoveis.map((imovel) => (
        <li key={imovel._id} className="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <strong>{imovel.descricao}</strong> <br />
            Endereço: {imovel.endereco} <br />
            Data de Compra: {new Date(imovel.dataCompra).toLocaleDateString()} <br />
            
            {/* Exibir os cômodos se eles existirem */}
            {imovel.comodos && imovel.comodos.length > 0 ? (
              <div>
                <strong>Cômodos:</strong>
                <ul>
                  {imovel.comodos.map((comodo, index) => (
                    <li key={index}>{comodo.nome}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p><strong>Nenhum cômodo registrado</strong></p>
            )}
          </div>
          
          <div>
            {/* Botão de Editar */}
            <Link to={`/imovel/editar/${imovel._id}`} className="btn btn-info mr-2">
              Editar
            </Link>
            
            {/* Botão de Excluir */}
            <button onClick={() => handleDelete(imovel._id)} className="btn btn-danger">Excluir</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ImovelList;
