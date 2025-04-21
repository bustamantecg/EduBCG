import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// Conexión a la base de datos
import connectDB from "./config/db.js";

// Rutas
import rolRoutes from "./routes/rolRoutes.js";
import evaluacionRoutes from "./routes/evaluacionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import perfilRoutes from "./routes/perfilRoutes.js";
import cursoRoutes from "./routes/cursoRoutes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas API
app.use("/api/roles", rolRoutes);             // Pruebas de acceso según rol
app.use("/api/evaluaciones", evaluacionRoutes); // Evaluaciones de cursos
app.use("/api/usuarios", userRoutes);         // Usuarios para Login, registro
app.use("/api/perfiles", perfilRoutes);       // Perfiles asociados al usuario
app.use("/api/cursos", cursoRoutes);          // Gestión de cursos

// Escuchar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en el puerto ${PORT}`);
});
