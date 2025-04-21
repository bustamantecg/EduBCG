import mongoose from 'mongoose';

const perfilSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  fechaNacimiento: {
    type: Date,
    required: true
  },
  tipo: {
    type: String,
    enum: ['adulto', 'niño', 'invitado'],
    default: 'invitado'
  },
  watchlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Curso'
  }],
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, { timestamps: true });

export default mongoose.model('Perfil', perfilSchema);
