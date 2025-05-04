import Curso from '../models/Curso.js';

// GET /api/cursos?page=1&limit=5
export const obtenerCursos = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1; // Página actual (por defecto 1)
      const limit = parseInt(req.query.limit) || 10; // Registros por página (por defecto 10)
      const skip = (page - 1) * limit;
  
      const [cursos, total] = await Promise.all([
        Curso.find().populate('docente', 'nombre correo rol').skip(skip).limit(limit),
        Curso.countDocuments()
      ]);
  
      res.json({
        cursos,
        total,
        totalPages: Math.ceil(total / limit),
        currentPage: page
      });
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al obtener los cursos' });
    }
  };
  

// GET /api/cursos/:id
export const obtenerCursoPorId = async (req, res) => {
  try {
    const curso = await Curso.findById(req.params.id).populate('docente', 'nombre correo rol');
    if (!curso) return res.status(404).json({ mensaje: 'Curso no encontrado' });
    res.json(curso);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al buscar el curso' });
  }
};

// POST /api/cursos
export const crearCurso = async (req, res) => {
    try {
      const { nombre, nivel, duracion, urlVideo, portada, docente } = req.body;
  
      // Validación básica de campos
      if (!nombre || !nivel || !duracion || !urlVideo || !portada || !docente) {
        return res.status(400).json({ mensaje: 'Todos los campos son obligatorios' });
      }
  
      const nuevoCurso = new Curso({ nombre, nivel, duracion, urlVideo, portada, docente });
      const cursoGuardado = await nuevoCurso.save();
  
      res.status(201).json(cursoGuardado);
    } catch (error) {
      console.error('Error al crear el curso bckend:', error);
      res.status(500).json({ mensaje: 'Error al crear el curso', error });
    }
  };
  

// PUT /api/cursos/:id
export const actualizarCurso = async (req, res) => {
  try {
    const cursoActualizado = await Curso.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cursoActualizado) return res.status(404).json({ mensaje: 'Curso no encontrado' });
    res.json(cursoActualizado);
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al actualizar el curso' });
  }
};

// DELETE /api/cursos/:id
export const eliminarCurso = async (req, res) => {
  try {
    const cursoEliminado = await Curso.findByIdAndDelete(req.params.id);
    if (!cursoEliminado) return res.status(404).json({ mensaje: 'Curso no encontrado' });
    res.json({ mensaje: 'Curso eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al eliminar el curso' });
  }
};

// get api/cursos/docente/:id
export const obtenerCursoPorDocente = async (req, res) => {
  const { id } = req.params;

  try {
    const cursos = await Curso.find({ docente: id }).populate('docente', 'nombre correo');
    res.json(cursos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al buscar los cursos del docente' });
  }
};

