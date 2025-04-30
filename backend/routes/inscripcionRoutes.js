import express from "express";
import {
  listarInscripcionesAlumno,
  inscribirseACurso,
  darseDeBaja
} from "../controllers/inscripcionController.js";

import { verificarToken, verificarRol } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get(
  "/alumno/cursos",
  verificarToken,
  verificarRol(['alumno']),
  listarInscripcionesAlumno
);

router.post(
  "/alumno/inscripciones",
  verificarToken,
  verificarRol(['alumno']),
  inscribirseACurso
);

router.delete(
  "/alumno/inscripciones/:id",
  verificarToken,
  verificarRol(['alumno']),
  darseDeBaja
);

export default router;
