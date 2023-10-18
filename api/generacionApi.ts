import axios from 'axios';

const generacionApi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL
});

  generacionApi.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['x-token'] = token;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default generacionApi;
