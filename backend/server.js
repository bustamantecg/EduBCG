// server.js
import express from "express";
import dotenv from "dotenv";
import mongoose from 'mongoose';
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoutes.js'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Conectado a MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
  })
  .catch(error => {
    console.error('🔴 Error al conectar a MongoDB', error);
  });