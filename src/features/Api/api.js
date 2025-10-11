import axios from 'axios';

const api = axios.create({
  baseURL: 'x',
  timeout: 5000,
  headers: { 'Content-Type': 'application / json' },
});

// api.interceptors.response.use();
// const api = function (url) {
//   axios.get(url).then((res) => setcard(res));
// };
