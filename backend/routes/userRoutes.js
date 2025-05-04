import express from 'express';
import {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarios,
  obtenerPerfil,
  eliminarUsuario,
  cambiarPassword
} from '../controllers/userController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/registro', registrarUsuario);
router.post('/login', loginUsuario);
router.get('/perfil', verificarToken, obtenerPerfil);
router.get('/', verificarToken, esAdmin, obtenerUsuarios); // solo admin puede ver todos
router.delete('/:id', verificarToken, esAdmin, eliminarUsuario);
router.put('/cambiar-password', verificarToken, cambiarPassword);

export default router;
