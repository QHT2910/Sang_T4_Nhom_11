import axios from 'axios';

const BASE_PORT = "http://localhost:3000/api"

const api = axios.create({
  baseURL: BASE_PORT,
});

export default api;