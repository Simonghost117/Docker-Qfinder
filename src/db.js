import mongoose from "mongoose";
import { MONGODB_URI } from "./config.js";
// Configuración global de Mongoose
mongoose.set("strictQuery", false); // Para evitar warning de queries estrictos
// Eventos de conexión
mongoose.connection.on("connected", () => {
  console.log("✅ MongoDB connection established");
});
mongoose.connection.on("disconnected", () => {
  console.log("❌ MongoDB connection lost");
});
mongoose.connection.on("error", (error) => {
  console.error("🔥 MongoDB connection error:", error.message);
});
export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      maxPoolSize: 15,          
      minPoolSize: 5,           
      serverSelectionTimeoutMS: 8000, 
      socketTimeoutMS: 45000,   
      heartbeatFrequencyMS: 30000, 
      waitQueueTimeoutMS: 3000  
    });
    // Estadísticas de conexión (opcional para debug)
    setInterval(() => {
      const poolStats = mongoose.connections[0].getClient().s.options;
      console.log(`📊 MongoDB Pool Stats: 
      Connections (active/idle): ${poolStats.currentPoolSize}/${poolStats.waitingClients}`);
    }, 60000);
  } catch (error) {
    console.error("❌ Critical MongoDB connection error:", {
      message: error.message,
      stack: error.stack,
      connectionString: MONGODB_URI
    });
    // Forzar cierre limpio de la aplicación
    process.exit(1);
  }
};