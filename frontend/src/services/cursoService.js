import axios from 'axios';

const API_URL = 'http://localhost:5000/api/cursos';

export const obtenerCursos = () => axios.get(API_URL);
export const obtenerCursoPorId = (id) => axios.get(`${API_URL}/${id}`);
export const crearCurso = (curso) => axios.post(API_URL, curso);
export const actualizarCurso = (id, curso) => axios.put(`${API_URL}/${id}`, curso);
export const eliminarCurso = (id) => axios.delete(`${API_URL}/${id}`);
