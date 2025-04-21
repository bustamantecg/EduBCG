import express from 'express';
import {
  crearEvaluacion,
  obtenerEvaluacionesPorDocente
} from '../controllers/evaluacionController.js';

import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Solo docentes pueden crear y ver evaluaciones
router.post('/', verificarToken, verificarRol('docente'), crearEvaluacion);
router.get('/', verificarToken, verificarRol('docente'), obtenerEvaluacionesPorDocente);

export default router;
