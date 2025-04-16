import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Registro de usuario
export const register = async (req, res) => {
  const { nombre, correo, contrasenia, rol } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existeUsuario = await User.findOne({ correo });
    if (existeUsuario) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Encriptar contrasenia
    const salt = await bcrypt.genSalt(10);
    const contraseniaHash = await bcrypt.hash(contrasenia, salt);

    // Crear nuevo usuario
    const nuevoUsuario = new User({
      nombre,
      correo,
      contrasenia: contraseniaHash,
      rol // puede ser 'admin', 'docente', 'alumno'
    });

    await nuevoUsuario.save();

    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};

// Login de usuario
export const login = async (req, res) => {
  const { correo, contrasenia } = req.body;

  try {
    const usuario = await User.findOne({ correo });
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!contraseniaValida) {
      return res.status(401).json({ mensaje: 'contrasenia incorrecta' });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        id: usuario._id,
        correo: usuario.correo,
        rol: usuario.rol
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ token, usuario: { nombre: usuario.nombre, rol: usuario.rol } });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor', error });
  }
};
