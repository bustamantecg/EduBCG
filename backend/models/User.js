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
    enum: ['admin', 'docente', 'alumno'],
    default: 'alumno'
  },
  perfiles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Perfil'
  }]
}, { timestamps: true });

export default mongoose.model('User', userSchema);
