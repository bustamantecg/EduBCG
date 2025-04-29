import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
dotenv.config();

const SECRET = process.env.JWT_SECRET;

// Registrar usuario
export const registrarUsuario = async (req, res) => {
  try {
    const { nombre, correo, contrasenia, rol } = req.body;    
    // Verificar si el correo ya existe
    const existe = await User.findOne({ correo });
    if (existe) {
      return res.status(400).json({ mensaje: 'El correo ya está registrado' });
    }

    // Hashear contraseña
    const hash = await bcrypt.hash(contrasenia, 10);

    const nuevoUsuario = new User({
      nombre,
      correo,
      contrasenia: hash,
      rol
    });
    
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario', error });
  }
};

// Login usuario
export const loginUsuario = async (req, res) => {
  try {
    const { correo, contrasenia } = req.body;
    const usuario = await User.findOne({ correo });

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Dato Incorrecto' });
    }

    const coincide = await bcrypt.compare(contrasenia, usuario.contrasenia);
    if (!coincide) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol,
        nombre: usuario.nombre
      },
      SECRET,
      { expiresIn: '4h' }
    );

    res.status(200).json({ token, usuario });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};

// Obtener todos los usuarios (solo admin)
export const obtenerUsuarios = async (req, res) => {
  try {
    const { rol } = req.query;
    const filtro = rol ? { rol } : {}; // Si hay rol, filtra. Si no, devuelve todos.

    const usuarios = await User.find(filtro)
    .sort({ nombre: 1 }) // ordno ascendente por nombre
    .populate('perfiles'); 
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuarios', error });
  }
};

// Obtener perfil del usuario autenticado,no es igual al del Perfil.obtenerPerfilesDelUsuario
export const obtenerPerfil = (req, res) => {
  const { id, nombre, rol } = req.user;
  res.status(200).json({ id, nombre, rol });
};

// DELETE /api/cursos/:id
export const eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await User.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar Usuario' });
  }
};