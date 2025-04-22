import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { connectDB } from "./db.js";
import { FRONTEND_URL, PORT } from "./config.js";
import path from 'path';
import { fileURLToPath } from 'url';
// Configuración de ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
// Conexión a MongoDB
await connectDB();
// Configuración CORS
app.use(cors({
  credentials: true,
  origin: FRONTEND_URL
}));
// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
// Rutas
import authRoutes from "./routes/auth.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
app.use("/api", authRoutes);
app.use("/api", tasksRoutes);
// Servir frontend en producción
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}
// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
});
