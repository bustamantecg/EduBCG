import express from 'express';
import {
  obtenerCursos,
  obtenerCursoPorId,
  crearCurso,
  actualizarCurso,
  eliminarCurso,
  obtenerCursoPorDocente
} from '../controllers/cursoController.js';

import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';

const router = express.Router();

// /api/cursos.....
// 📌 Rutas públicas /api/cursos.....
router.get('/', obtenerCursos);
router.get('/:id', obtenerCursoPorId);

// 📌 Rutas protegidas (sólo para admin y docentes)
router.get('/docente/:id', verificarToken, verificarRol(['admin', 'docente']), obtenerCursoPorDocente);
router.post('/', verificarToken, verificarRol(['admin', 'docente']), crearCurso);
router.put('/:id', verificarToken, verificarRol(['admin', 'docente']), actualizarCurso);
router.delete('/:id', verificarToken, verificarRol(['admin', 'docente']), eliminarCurso);

export default router;
