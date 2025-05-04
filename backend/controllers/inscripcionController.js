import Inscripcion from "../models/Inscripcion.js";
import Curso from "../models/Curso.js";

// Listar inscripciones del alumno autenticado
export const listarInscripcionesAlumno = async (req, res) => {
  try {
    const alumnoId = req.user.id;

    const inscripciones = await Inscripcion.find({ alumno: alumnoId })
      .populate({
        path: "curso",
        populate: {
          path: "docente",
          select: "nombre correo"
        }
      })
      .sort({ createdAt: -1 }        
      );
    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las inscripciones.", error });
  }
};


// se inscribe a un curso
export const inscribirseACurso = async (req, res) => {
  try {
    const alumnoId = req.user._id || req.user.id;
    const { cursoId } = req.body;

    // valido si ya está inscrito
    const yaInscripto = await Inscripcion.findOne({ alumno: alumnoId, curso: cursoId });
    if (yaInscripto) {
      return res.status(400).json({ mensaje: "Ya estás inscrito en este curso." });
    }

    const inscripcion = new Inscripcion({
      curso: cursoId,
      alumno: alumnoId,
    });

    await inscripcion.save();
    res.status(201).json({ mensaje: "Inscripción realizada correctamente.", inscripcion });

  } catch (error) {
    console.error("Error en inscribirseACurso:", error); // Este es el más importante
    res.status(500).json({ mensaje: "Error al realizar la inscripción.", error });
  }
};

// Darse de baja de un curso si no tiene nota final. con rol=alumno
export const darseDeBaja = async (req, res) => {
  try {
    const inscripcionId = req.params.id;
    const inscripcion = await Inscripcion.findById(inscripcionId);

    if (!inscripcion) {
      return res.status(404).json({ mensaje: "Inscripción no encontrada." });
    }

    if (inscripcion.notaFinal !== null) {
      return res.status(400).json({ mensaje: "No puede darse de baja de un curso con nota asignada." });
    }

    await inscripcion.deleteOne();
    res.json({ mensaje: "Inscripción Cancelada correctamente." });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al intentar Cancedlar la Inscripcioón.", error });
  }
};

// GET /api/inscripciones/mis-alumnos
export const obtenerMisAlumnos = async (req, res) => {
  try {
    const docenteId = req.user.id; // del token
    const cursos = await Curso.find({ docente: docenteId }).select('_id');

    const inscripciones = await Inscripcion.find({ curso: { $in: cursos } })
      .populate('alumno', 'nombre correo rol')
      .populate('curso', 'nombre nivel duracion');

    res.json(inscripciones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener inscripciones' });
  }
};


export const actualizarNotaFinal = async (req, res) => {
  const { id } = req.params;
  const { notaFinal } = req.body;

  try {
    const inscripcion = await Inscripcion.findById(id);
    if (!inscripcion) {
      return res.status(404).json({ mensaje: 'Inscripción no encontrada' });
    }

    inscripcion.notaFinal = notaFinal;
    await inscripcion.save();

    res.json({ mensaje: 'Nota actualizada correctamente' });
  } catch (error) {
    console.error('Error en actualizarNotaFinal:', error);
    res.status(500).json({ mensaje: 'Error al actualizar la nota' });
  }
};

