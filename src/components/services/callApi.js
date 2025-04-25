import axios from 'axios';
import { getAccessTokenSilently } from '@auth0/auth0-react';

// Base URL de API Express
const API_BASE = 'http://localhost:5173';

/**
 * Helper para hacer peticiones con Axios + Auth0
 * @param {object} options  Axios config (method, url, data, etc)
 */
export async function callApi(options) {
  // Primero, consigue el token
  const token = await getAccessTokenSilently();
  // Luego haz la petición con Axios
  const response = await axios({
    baseURL: API_BASE,
    headers: {
      Authorization: `Bearer ${token}`
    },
    ...options
  });
  return response.data;
}
