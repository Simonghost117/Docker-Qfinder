// Importamos el contexto de autenticación
import { useAuth } from "../context/authContext";

// Importamos Link para navegar entre páginas y useNavigate para redirecciones programáticas
import { Link, useNavigate } from "react-router-dom";

// Importamos react-hook-form para manejar el formulario
import { useForm } from "react-hook-form";

// Importamos useEffect para manejar efectos secundarios
import { useEffect } from "react";

// Importamos el resolver de Zod para validar el formulario con `zod`
import { zodResolver } from "@hookform/resolvers/zod";

// Importamos componentes de UI personalizados
import { Card, Message, Button, Input, Label } from "../components/ui";

// Importamos el esquema de validación de inicio de sesión
import { loginSchema } from "../schemas/auth";

export function LoginPage() {
  // Configuración del formulario con react-hook-form y Zod
  const {
    register, // Para registrar los campos del formulario
    handleSubmit, // Maneja el envío del formulario
    formState: { errors }, // Captura los errores de validación
  } = useForm({
    resolver: zodResolver(loginSchema), // Usa Zod para validar el formulario
  });

  // Extraemos funciones y estados del contexto de autenticación
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();

  // Hook de navegación para redirigir después del login
  const navigate = useNavigate();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = (data) => signin(data);

  // Redirección automática si el usuario ya está autenticado
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/tasks"); // Redirige a la página de tareas
    }
  }, [isAuthenticated]); // Se ejecuta cuando cambia `isAuthenticated`

  return (
    <>
    <div className="shape-container">
      <svg className="shape-svg" viewBox="0 0 300 1000" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <path fill="#0072ff" d="
          M0,0 
          C80,150 20,300 100,450 
          C180,600 0,750 80,900 
          C160,1050 0,1200 0,1200 
          L0,1000 
          L0,0 Z" />
      </svg>
    </div>
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <div className="max-w-md w-full p-10 rounded-md bg-white">
        {/* Muestra mensajes de error en caso de fallos de autenticación */}
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        
        {/* Título del formulario */}
        <Link to="/">
          <img src="/logo.png" alt="Logo" className="text-center mx-auto mb-4" />
        </Link>
        <h1 className="text-2xl font-bold text-gray-600">Login</h1>
        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de Email */}
          <label htmlFor="email" className="text-xs block my-1 text-gray-500">Email:</label>
          <input
            label="Write your email"
            type="email"
            name="email"
            placeholder="youremail@domain.tld"
            className="w-full bg-cyan-100 text-white px-4 py-2 rounded-md text-black"
            {...register("email", { required: true })} // Validación con react-hook-form
          />
          <p className="text-red-500">{errors.email?.message}</p> {/* Muestra mensaje de error si existe */}

          {/* Campo de Contraseña */}
          <label htmlFor="password" className="text-xs block my-1 text-gray-500">Password:</label>
          <input
            type="password"
            name="password"
            placeholder="Write your password"
            className="w-full bg-cyan-100 text-white px-4 py-2 rounded-md text-black"
            {...register("password", { required: true, minLength: 6 })} // Validación
          />
          <p className="text-red-500">{errors.password?.message}</p> {/* Muestra mensaje de error si existe */}

          {/* Botón de inicio de sesión */}
          <Button>Login</Button>
        </form>

        {/* Enlace para registrarse si el usuario no tiene una cuenta */}
        <p className="flex gap-x-2 justify-between text-gray-600">
          Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </div>
    </div>
    </>
  );
}
