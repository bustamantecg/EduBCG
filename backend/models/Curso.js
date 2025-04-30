import mongoose from 'mongoose';

const cursoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  nivel: {
    type: String,
    enum: ['principiante', 'intermedio', 'avanzado'],
    required: true
  },
  duracion: {
    type: String, // ejemplo: "4 semanas", "10 horas"
    required: true
  },
  urlVideo: {
    type: String,
    required: true
  },
  portada: {
    type: String, // URL de la imagen
    required: true
  },
  docente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Curso', cursoSchema);
