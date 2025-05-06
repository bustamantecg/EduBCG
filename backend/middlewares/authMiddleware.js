import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

// Verifica que el token JWT sea válido
export const verificarToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Formato: Bearer <token>
  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }
  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded; // Guarda la info del usuario en la request
    next();
  } catch (error) {
    return res.status(401).json({ mensaje: 'Token inválido' });
  }
};

// Solo permite acceso a usuarios con rol 'admin'
export const esAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ mensaje: 'Acceso denegado. Solo administradores.' });
  }
  next();
};

// Permite acceso solo si el usuario tiene alguno de los roles permitidos
export const verificarRol = (rolesPermitidos = []) => {
  return (req, res, next) => {
    const { rol } = req.user;
    if (!rolesPermitidos.includes(rol)) {
      return res.status(403).json({ mensaje: 'Acceso denegado: rol no autorizado' });
    }
    next();
  };
};
