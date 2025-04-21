import express from 'express';
import { verificarToken, verificarRol } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Ruta solo para docentes
router.get('/docente/evaluaciones', verificarToken, verificarRol('docente'), (req, res) => {
  res.json({ mensaje: `Bienvenido docente ${req.user.nombre}, aquí están tus evaluaciones.` });
});

// Ruta solo para alumnos
router.get('/alumno/mi-perfil', verificarToken, verificarRol('alumno'), (req, res) => {
  res.json({ mensaje: `Bienvenido alumno ${req.user.nombre}, este es tu perfil.` });
});

export default router;
