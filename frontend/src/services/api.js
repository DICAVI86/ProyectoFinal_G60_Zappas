// services/api.js
import axios from 'axios';

// Configura la URL base de la API. Asegúrate de que el servidor Express esté corriendo en el puerto adecuado.
const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Cambia esta URL según sea necesario
  headers: {
    'Content-Type': 'application/json',
  },
});

// Puedes configurar un interceptor para agregar el token JWT en todas las peticiones
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token'); // Obtén el token de JWT de localStorage (si existe)
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`; // Agrega el token en la cabecera
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
