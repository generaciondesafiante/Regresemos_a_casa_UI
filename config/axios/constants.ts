if (!process.env.NEXT_PUBLIC_BACKEND_URL) {
  throw new Error('NEXT_PUBLIC_BACKEND_URL no está configurado.');
}

export const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

// Cabeceras por defecto para todas las peticiones
export const DEFAULT_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
  'Access-Control-Allow-Origin': '*',
};

// Tiempo máximo de espera para las peticiones (en milisegundos)
export const REQUEST_TIMEOUT = 15000;

// Rutas que no requieren autenticación
export const PUBLIC_ROUTES = [
  '/auth/login',
  '/auth/register',
  '/auth/forgot-password',
  '/auth/reset-password',
];

// Códigos de error HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};