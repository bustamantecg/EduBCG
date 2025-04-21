import Evaluacion from '../models/Evaluacion.js';
import User from '../models/User.js';

export const crearEvaluacion = async (req, res) => {
  try {
    const { alumno, materia, nota } = req.body;

    // Verificamos si el alumno existe y es de tipo 'alumno'
    const alumnoExistente = await User.findById(alumno);
    if (!alumnoExistente || alumnoExistente.rol !== 'alumno') {
      return res.status(404).json({ mensaje: 'Alumno no válido' });
    }

    const nuevaEvaluacion = new Evaluacion({
      alumno,
      docente: req.user.id,
      materia,
      nota
    });

    await nuevaEvaluacion.save();
    res.status(201).json(nuevaEvaluacion);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear evaluación', error });
  }
};

export const obtenerEvaluacionesPorDocente = async (req, res) => {
  try {
    const evaluaciones = await Evaluacion.find({ docente: req.user.id })
      .populate('alumno', 'nombre email');

    res.status(200).json(evaluaciones);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener evaluaciones', error });
  }
};
