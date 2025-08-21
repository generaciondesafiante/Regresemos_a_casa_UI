import axios from 'axios';
import { API_URL, DEFAULT_HEADERS } from './constants';
import { setupInterceptors } from './interceptors';

// Crear instancia base de axios
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: DEFAULT_HEADERS,
  timeout: 10000, // 10 segundos
});

// Configurar interceptores
setupInterceptors(axiosInstance);

// Función helper para manejar errores
export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    return {
      message: error.response?.data?.message ?? 'Error en la petición',
      status: error.response?.status,
      data: error.response?.data
    };
  }
  return {
    message: 'Error inesperado',
    status: 500,
    data: null
  };
};

export default axiosInstance;
