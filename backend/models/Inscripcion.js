import mongoose from 'mongoose';

const inscripcionSchema = new mongoose.Schema({
  curso: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso',
    required: true
  },
  alumno: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', 
    required: true
  },
  notaFinal: {
    type: Number,
    min: 0,
    max: 10,
    default: null
  },
  fechaInscripcion: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.model('Inscripcion', inscripcionSchema);
