import axios from 'axios';

const API_USUARIOS_URL = 'http://localhost:5000/api/usuarios'; // Ruta para obtener docentes

export const obtenerDocentes = () => axios.get(`${API_USUARIOS_URL}?rol=docente`);