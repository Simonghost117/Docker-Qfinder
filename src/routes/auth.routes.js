// Importamos el módulo Router de Express para definir rutas en la aplicación.
import { Router } from "express";

// Importamos los controladores de autenticación que manejan la lógica de cada ruta.
import {
  login,      // Controlador para iniciar sesión.
  logout,     // Controlador para cerrar sesión.
  register,   // Controlador para registrar nuevos usuarios.
  verifyToken // Middleware/controlador para verificar tokens de autenticación.
} from "../controllers/auth.controller.js";

// Importamos un middleware para validar los esquemas de datos enviados en las solicitudes.
import { validateSchema } from "../middlewares/validator.middleware.js";

// Importamos los esquemas de validación para el registro e inicio de sesión.
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";

// Creamos una instancia de Router para definir las rutas de autenticación.
const router = Router();

// Definimos la ruta para registrar un nuevo usuario.
// Antes de ejecutar la lógica de registro, validamos los datos con el esquema "registerSchema".
router.post("/register", validateSchema(registerSchema), register);

// Definimos la ruta para iniciar sesión.
// Antes de ejecutar la lógica de inicio de sesión, validamos los datos con el esquema "loginSchema".
router.post("/login", validateSchema(loginSchema), login);

// Definimos la ruta para verificar la autenticación del usuario mediante un token.
router.get("/verify", verifyToken);

// Definimos la ruta para cerrar sesión.
// Antes de ejecutar la lógica de logout, verificamos que el usuario tenga un token válido.
router.post("/logout", verifyToken, logout);

// Exportamos el router para poder usarlo en otras partes de la aplicación.
export default router;
