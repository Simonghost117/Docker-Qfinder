// Importamos Link de react-router-dom para manejar la navegación sin recargar la página.
import { Link } from "react-router-dom";

// Importamos el hook useAuth desde el contexto de autenticación para acceder al estado del usuario.
import { useAuth } from "../context/authContext";

// Importamos el componente ButtonLink, que probablemente es un botón estilizado con funcionalidad de enlace.
import { ButtonLink } from "./ui/ButtonLink";

// Definimos el componente Navbar, que se encargará de mostrar la barra de navegación.
export function Navbar() {
  // Extraemos isAuthenticated (booleano que indica si el usuario está autenticado),
  // logout (función para cerrar sesión) y user (datos del usuario) desde el contexto de autenticación.
  const { isAuthenticated, logout, user } = useAuth();
  
  // Imprimimos en consola el estado de autenticación y los datos del usuario (esto solo se verá en la consola del navegador).
  console.log(isAuthenticated, user);

  return (
    // Contenedor de la barra de navegación con estilos de Tailwind CSS.
    <nav className="bg-white my-3 flex justify-between py-5 px-10 rounded-lg">
      
      {/* Título de la aplicación con un enlace. Si el usuario está autenticado, lo redirige a "/tasks", si no, lo lleva a la página de inicio ("/"). */}
      <h1 className="text-2xl font-bold text-black">
        <Link to={isAuthenticated ? "/tasks" : "/"}>QfindeR</Link>
      </h1>

      {/* Lista de elementos de navegación. */}
      <ul className="flex gap-x-2">
        
        {/* Si el usuario está autenticado, mostramos estas opciones: */}
        {isAuthenticated ? (
          <>
            {/* Mensaje de bienvenida con el nombre de usuario. */}
            <li>
              Welcome {user.username}
            </li>
            
            {/* Botón para agregar una nueva tarea. */}
            <li>
              <ButtonLink to="/add-task">Add Task</ButtonLink>
            </li>

            {/* Enlace para cerrar sesión. Al hacer clic, ejecuta la función logout. */}
            <li>
              <Link to="/" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </>
        ) : (
          // Si el usuario NO está autenticado, mostramos los botones de Login y Register.
          <>
            <li>
              <ButtonLink to="/login">Login</ButtonLink>
            </li>
            <li>
              <ButtonLink to="/register">Register</ButtonLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}
