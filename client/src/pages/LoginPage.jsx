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
    <div className="h-[calc(100vh-100px)] flex items-center justify-center">
      <Card>
        {/* Muestra mensajes de error en caso de fallos de autenticación */}
        {loginErrors.map((error, i) => (
          <Message message={error} key={i} />
        ))}
        
        {/* Título del formulario */}
        <h1 className="text-2xl font-bold">Login</h1>

        {/* Formulario de inicio de sesión */}
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Campo de Email */}
          <Label htmlFor="email">Email:</Label>
          <Input
            label="Write your email"
            type="email"
            name="email"
            placeholder="youremail@domain.tld"
            {...register("email", { required: true })} // Validación con react-hook-form
          />
          <p>{errors.email?.message}</p> {/* Muestra mensaje de error si existe */}

          {/* Campo de Contraseña */}
          <Label htmlFor="password">Password:</Label>
          <Input
            type="password"
            name="password"
            placeholder="Write your password"
            {...register("password", { required: true, minLength: 6 })} // Validación
          />
          <p>{errors.password?.message}</p> {/* Muestra mensaje de error si existe */}

          {/* Botón de inicio de sesión */}
          <Button>Login</Button>
        </form>

        {/* Enlace para registrarse si el usuario no tiene una cuenta */}
        <p className="flex gap-x-2 justify-between">
          Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
        </p>
      </Card>
    </div>
  );
}
