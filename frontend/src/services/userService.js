import axios from 'axios';

const config = () => {
    const token = localStorage.getItem('token'); // O desde tu context/auth provider
    return {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
  };

const API_USUARIOS_URL = 'http://localhost:5000/api/usuarios'; // Ruta para obtener docentes
export const obtenerDocentes = () => axios.get(`${API_USUARIOS_URL}?rol=docente`);
export const cambiarContrasenia = () => axios.put(`${API_USUARIOS_URL}/cambiar-password`, config());