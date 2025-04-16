import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  correo: {
    type: String,
    required: true,
    unique: true
  },
  contrasenia: {
    type: String,
    required: true
  },
  rol: {
    type: String,
    enum: ['admin', 'alumno', "docente"],
    default: 'alumno'
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);
