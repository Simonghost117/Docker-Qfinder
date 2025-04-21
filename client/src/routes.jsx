// Importamos Navigate y Outlet de react-router-dom para manejar la navegación y el enrutamiento anidado
import { Navigate, Outlet } from "react-router-dom";

// Importamos el hook useAuth para acceder al estado de autenticación del usuario
import { useAuth } from "./context/authContext";

// Definimos el componente ProtectedRoute que protegerá ciertas rutas
export const ProtectedRoute = () => {
  // Extraemos isAuthenticated y loading del contexto de autenticación
  const { isAuthenticated, loading } = useAuth();

  // Si la aplicación todavía está cargando, mostramos un mensaje de carga
  if (loading) return <h1>Loading...</h1>;

  // Si el usuario no está autenticado y la carga ha terminado, lo redirigimos a la página de login
  if (!isAuthenticated && !loading) return <Navigate to="/login" replace />;

  // Si el usuario está autenticado, renderizamos el contenido de la ruta protegida
  return <Outlet />;
};
