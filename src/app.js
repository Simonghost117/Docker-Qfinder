import express from "express";// se importa express para crear el servidor web y manejar las rutas
import cors from "cors"; //Midleware para permitir peticiones entre diferentes dominios, desde el frontend
import morgan from "morgan";// morgan es un midleware para ver las peticiones que llegan al servidor en la consola
import cookieParser from "cookie-parser";// midleware para manejar las cookies en las solicitudes HTTP
import authRoutes from "./routes/auth.routes.js"; //se importan las rutas de autenticacion
import taksRoutes from "./routes/tasks.routes.js"; //se importan las rutas de las tareas
import { FRONTEND_URL } from "./config.js"; // se importa la URL del frontend

const app = express(); // se crea la aplicacion express

app.use(
  cors({
    credentials: true, // habilita las credenciales para las peticiones HTTP
    origin: FRONTEND_URL, // se habilita el origen de las peticiones HTTP desde el frontend
  })
);
app.use(express.json());// habilita el uso de JSON en las peticiones HTTP en el backend
app.use(morgan("dev"));// es util para ver las peticiones que llegan al servidor en la consola
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);

if (process.env.NODE_ENV === "production") {
  const path = await import("path");//se importa path para manejar las rutas de los archivos
  app.use(express.static("client/dist"));// se habilita la carpeta dist para servir los archivos estaticos

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html") );// se envia el archivo index.html al cliente
    res.sendFile(path.resolve("client", "dist", "index.html"));// se envia el archivo index.html al cliente
  });
}

export default app;
