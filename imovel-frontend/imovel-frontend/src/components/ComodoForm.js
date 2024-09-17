import React, { useState } from 'react';

const ComodoForm = ({ onAddComodo }) => {
  const [comodo, setComodo] = useState({ nome: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddComodo(comodo);
    setComodo({ nome: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Nome do Cômodo:</label>
      <input
        type="text"
        value={comodo.nome}
        onChange={(e) => setComodo({ nome: e.target.value })}
      />
      <button type="submit">Adicionar Cômodo</button>
    </form>
  );
};

export default ComodoForm;
