import express from "express";
import {
  listarInscripcionesAlumno,
  inscribirseACurso,
  darseDeBaja,
  obtenerMisAlumnos,
  actualizarNotaFinal
} from "../controllers/inscripcionController.js";

import { verificarToken, verificarRol } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/alumno/cursos", verificarToken, verificarRol(['alumno']), listarInscripcionesAlumno);

router.post(
  "/alumno/inscripciones",
  verificarToken,
  verificarRol(['alumno']),
  inscribirseACurso
);

router.delete(
  "/alumno/inscripciones/:id", verificarToken, verificarRol(['alumno']),
  darseDeBaja
);

router.get("/mis-alumnos", verificarToken, verificarRol(['docente']),
  obtenerMisAlumnos
);

router.put('/:id/actualizar-nota', verificarToken,  verificarRol(['docente']), 
  actualizarNotaFinal
);


export default router;
