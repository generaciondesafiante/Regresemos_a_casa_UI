import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { HTTP_STATUS, PUBLIC_ROUTES } from './constants';
import { useUserStore } from '@/shared/store/user-store';

/**
 * Configura los interceptores para la instancia de Axios
 * @param axiosInstance Instancia de Axios a configurar
*/
export const setupInterceptors = (axiosInstance: AxiosInstance): void => {

  // Interceptor de solicitudes
  axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = useUserStore.getState().user?.token;
      // Verificar si la ruta requiere autenticación
      const isPublicRoute = PUBLIC_ROUTES.some(route => 
        config.url?.includes(route)
      );
      
      // Si no es una ruta pública, añadir el token de autenticación
      if (!isPublicRoute) {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
      
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Interceptor de respuestas
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;
      const token = useUserStore.getState().user?.token;
      
      if (error.response?.status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
        originalRequest._retry = true;
        
        try {
          const refreshToken =token;
          
          if (refreshToken) {
     
          }
        } catch (refreshError) {
          
          
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }
      }
      
      if (error.response?.status === HTTP_STATUS.FORBIDDEN) {
        if (typeof window !== 'undefined') {
          window.location.href = '/unauthorized';
        }
      }
      
      return Promise.reject(error);
    }
  );
};