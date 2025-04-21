import mongoose from 'mongoose';

const evaluacionSchema = new mongoose.Schema({
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
    required: true
  },
  perfil: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Perfil',
    required: true
  },
  nota: {
    type: Number,
    required: true,
    min: 0,
    max: 10
  },
  docente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  fecha: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Evaluacion', evaluacionSchema);
