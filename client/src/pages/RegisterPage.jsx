// Importamos useEffect para manejar efectos secundarios en el componente
import { useEffect } from "react";

// Importamos useAuth para acceder al contexto de autenticación
import { useAuth } from "../context/authContext";

// Importamos Link y useNavigate para manejar la navegación entre rutas
import { Link, useNavigate } from "react-router-dom";

// Importamos componentes personalizados para la interfaz de usuario
import { Card, Message, Button, Input, Label } from "../components/ui";

// Importamos useForm de react-hook-form para gestionar el formulario
import { useForm } from "react-hook-form";

// Importamos el esquema de validación con Zod para los datos del formulario
import { registerSchema } from "../schemas/auth";
import { zodResolver } from "@hookform/resolvers/zod";

function Register() {
  // Extraemos las funciones y estados necesarios del contexto de autenticación
  const { signup, errors: registerErrors, isAuthenticated } = useAuth();

  // Configuramos useForm con validación usando Zod
  const {
    register, // Función para registrar los campos del formulario
    handleSubmit, // Función para manejar el envío del formulario
    formState: { errors }, // Obtenemos los errores de validación
  } = useForm({
    resolver: zodResolver(registerSchema), // Integración de la validación con Zod
  });

  // Hook para redireccionar al usuario después del registro
  const navigate = useNavigate();

  // Función que se ejecuta cuando el usuario envía el formulario
  const onSubmit = async (value) => {
    await signup(value);
  };

  // useEffect para redirigir a la página de tareas si el usuario está autenticado
  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]); // Se ejecuta cuando cambia el estado de autenticación

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
        {/* Tarjeta contenedora del formulario */}
        <div className="max-w-md w-full p-10 rounded-md bg-white">
          {/* Muestra mensajes de error en caso de que existan */}
          {registerErrors.map((error, i) => (
            <Message message={error} key={i} />
          ))}
          <Link to="/">
            <img src="/logo.png" alt="Logo" className="text-center mx-auto mb-4" />
          </Link>
          {/* Título del formulario */}
          <h1 className="text-2xl font-bold text-gray-600">Register</h1>

          {/* Formulario de registro */}
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Campo para el nombre de usuario */}
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              name="username"
              placeholder="Write your name"
              {...register("username")}
              autoFocus
            />
            {/* Muestra un mensaje de error si el campo es inválido */}
            {errors.username?.message && (
              <p className="text-red-500">{errors.username?.message}</p>
            )}

            {/* Campo para el email */}
            <Label htmlFor="email">Email:</Label>
            <Input
              name="email"
              placeholder="youremail@domain.tld"
              {...register("email")}
            />
            {/* Muestra un mensaje de error si el campo es inválido */}
            {errors.email?.message && (
              <p className="text-red-500">{errors.email?.message}</p>
            )}

            {/* Campo para la contraseña */}
            <Label htmlFor="password">Password:</Label>
            <Input
              type="password"
              name="password"
              placeholder="********"
              {...register("password")}
            />
            {/* Muestra un mensaje de error si el campo es inválido */}
            {errors.password?.message && (
              <p className="text-red-500">{errors.password?.message}</p>
            )}

            {/* Campo para confirmar la contraseña */}
            <Label htmlFor="confirmPassword">Confirm Password:</Label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="********"
              {...register("confirmPassword")}
            />
            {/* Muestra un mensaje de error si el campo es inválido */}
            {errors.confirmPassword?.message && (
              <p className="text-red-500">{errors.confirmPassword?.message}</p>
            )}

            {/* Botón para enviar el formulario */}
            <Button>Submit</Button>
          </form>

          {/* Enlace para los usuarios que ya tienen una cuenta */}
          <p className="flex gap-x-2 justify-between text-gray-600">
            Already Have an Account?{" "}
            <Link className="text-sky-500" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

// Exportamos el componente para que pueda ser utilizado en otras partes de la aplicación
export default Register;
