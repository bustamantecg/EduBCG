import Inscripcion from "../models/Inscripcion.js";

// Listar inscripciones del alumno autenticado
export const listarInscripcionesAlumno = async (req, res) => {
  try {
    const alumnoId = req.user._id; // se asume middleware auth

    const inscripciones = await Inscripcion.find({ alumno: alumnoId })
      .populate("curso")
      .sort({ createdAt: -1 });

    res.json(inscripciones);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener las inscripciones.", error });
  }
};

// se inscribe a un curso
export const inscribirseACurso = async (req, res) => {
  try {
    const alumnoId = req.user._id;
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
    res.status(500).json({ mensaje: "Error al realizar la inscripción.", error });
  }
};

// Darse de baja de un curso si no tiene nota final
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
    res.json({ mensaje: "Baja del curso realizada correctamente." });

  } catch (error) {
    res.status(500).json({ mensaje: "Error al intentar darse de baja.", error });
  }
};
