import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com/',
  headers: { 'Content-Type': 'application / json' },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => `${err} :Something went wrong`
);

export default api;
