import axios from 'axios';

const instance = axios.create({
  baseURL:  "https://my-website-7d766.firebaseio.com"
});
// eslint-disable-next-line func-names
// instance.interceptors.request.use(function (config) {
//   const token = localStorage.getItem('token');
//   config.headers.Authorization = token ? `Bearer ${token}` : '';
//   return config;
// });

export default instance;
