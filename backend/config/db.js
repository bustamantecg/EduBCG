import mongoose from "mongoose";
import dotenv from "dotenv";

// Carga las variables de entorno
dotenv.config();

const  connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("🔴 💀 La variable de entorno MONGO_URI no está definida");
    }

    //const conn = await mongoose.connect(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);

    console.log(`🟢 🔓 Conectado a MongoDB en: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error("🔴 💀 Error al conectar a MongoDB:", error.message);
    process.exit(1);
  }
};

export default connectDB;
