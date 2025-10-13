import axios from 'axios';

const api = axios.create({
  baseURL: 'https://fakeshjgjhtoreapi.com/',
  // headers: { 'Content-Type': 'application / json' },
});

api.interceptors.response.use(
  (res) => res.data,
  (err) => err
);

export default api;
