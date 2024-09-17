import axios from 'axios';

const API_URL = 'http://localhost:3001/imoveis';

// Obter todos os imóveis
export const getImoveis = () => axios.get(API_URL);

// Criar um imóvel
export const createImovel = (imovel) => axios.post(API_URL, imovel);

// Obter um imóvel por ID
export const getImovelById = (id) => axios.get(`${API_URL}/${id}`);

// Atualizar um imóvel
export const updateImovel = (id, imovel) => axios.put(`${API_URL}/${id}`, imovel);


// Deletar um imóvel
export const deleteImovel = (id) => axios.delete(`${API_URL}/${id}`);
