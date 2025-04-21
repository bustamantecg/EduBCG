import Perfil from '../models/Perfil.js';

// Crear un nuevo perfil para un usuario
export const crearPerfil = async (req, res) => {
  try {
    const { nombre, fechaNacimiento, tipo } = req.body;
    const usuario_id = req.user.id; // extraído del token

    const nuevoPerfil = new Perfil({
      nombre,
      fechaNacimiento,
      tipo,
      usuario_id
    });

    await nuevoPerfil.save();
    res.status(201).json({ mensaje: 'Perfil creado correctamente', perfil: nuevoPerfil });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear perfil', error });
  }
};

// Obtener todos los perfiles del usuario logueado
export const obtenerPerfilesDelUsuario = async (req, res) => {
  try {
    const usuario_id = req.user.id;
    const perfiles = await Perfil.find({ usuario_id }).populate('watchlist');
    res.status(200).json(perfiles);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener perfiles', error });
  }
};

// Editar un perfil (solo del mismo usuario)
export const editarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const perfil = await Perfil.findOneAndUpdate(
      { _id: id, usuario_id },
      req.body,
      { new: true }
    );

    if (!perfil) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado o no autorizado' });
    }

    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al editar perfil', error });
  }
};

// Eliminar un perfil
export const eliminarPerfil = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario_id = req.user.id;

    const perfil = await Perfil.findOneAndDelete({ _id: id, usuario_id });

    if (!perfil) {
      return res.status(404).json({ mensaje: 'Perfil no encontrado o no autorizado' });
    }

    res.status(200).json({ mensaje: 'Perfil eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al eliminar perfil', error });
  }
};
