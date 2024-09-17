import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ImovelList from './components/ImovelList';
import ImovelForm from './components/ImovelForm';

function App() {
  return (
    <Router>
      <div className="container">
        {/* Certifique-se de que as rotas estão dentro do BrowserRouter */}
        <Routes>
          {/* Página inicial para criar imóveis */}
          <Route path="/" element={<ImovelForm />} />
          
          {/* Rota para a lista de imóveis */}
          <Route path="/imovel/lista" element={<ImovelList />} />
          
          {/* Rota para editar um imóvel */}
          <Route path="/imovel/editar/:id" element={<ImovelForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
