import express from 'express';
import {
  crearPerfil,
  obtenerPerfilesDelUsuario,
  editarPerfil,
  eliminarPerfil
} from '../controllers/perfilController.js';
import { verificarToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', verificarToken, crearPerfil);
router.get('/', verificarToken, obtenerPerfilesDelUsuario);
router.put('/:id', verificarToken, editarPerfil);
router.delete('/:id', verificarToken, eliminarPerfil);

export default router;
