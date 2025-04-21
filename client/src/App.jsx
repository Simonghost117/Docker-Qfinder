// Importamos los módulos necesarios de react-router-dom para manejar la navegación en la aplicación.
import { BrowserRouter, Routes, Route } from "react-router-dom"; 

// Importamos el componente Navbar que será la barra de navegación de la aplicación.
import { Navbar } from "./components/Navbar";

// Importamos el contexto de autenticación para manejar el estado de autenticación de los usuarios.
import { AuthProvider } from "./context/authContext";

// Importamos la ruta protegida, que restringirá el acceso a ciertas rutas a usuarios autenticados.
import { ProtectedRoute } from "./routes";

// Importamos las páginas principales de la aplicación.
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import { TaskFormPage } from "./pages/TaskFormPage";
import { LoginPage } from "./pages/LoginPage";
import { TasksPage } from "./pages/TasksPage";

// Importamos el contexto de tareas para manejar el estado global de las tareas.
import { TaskProvider } from "./context/tasksContext";

function App() {
  return (
    // Envuelve toda la aplicación dentro del AuthProvider, proporcionando acceso a la autenticación en toda la app.
    <AuthProvider>
      {/* Envuelve la aplicación en TaskProvider para que todas las páginas puedan acceder al estado de las tareas. */}
      <TaskProvider>
        {/* BrowserRouter maneja la navegación dentro de la aplicación. */}
        <BrowserRouter>
          {/* Contenedor principal de la aplicación con estilos de Tailwind CSS. */}
          <main className="container content-container mx-auto px-10 md:px-0">
            {/* Navbar se muestra en todas las páginas. */}
            <Navbar />

            {/* Routes define las rutas de la aplicación. */}
            <Routes>
              {/* Ruta principal que carga la página de inicio. */}
              <Route path="/" element={<HomePage />} />

              {/* Ruta para la página de inicio de sesión. */}
              <Route path="/login" element={<LoginPage />} />

              {/* Ruta para la página de registro. */}
              <Route path="/register" element={<RegisterPage />} />

              {/* Rutas protegidas: Solo accesibles para usuarios autenticados. */}
              <Route element={<ProtectedRoute />}>
                {/* Página donde se listan las tareas. */}
                <Route path="/tasks" element={<TasksPage />} />

                {/* Página para agregar una nueva tarea. */}
                <Route path="/add-task" element={<TaskFormPage />} />

                {/* Página para editar una tarea específica, identificada por su ID en la URL. */}
                <Route path="/tasks/:id" element={<TaskFormPage />} />

                {/* Página de perfil del usuario (aún sin contenido). */}
                <Route path="/profile" element={<h1>Profile</h1>} />
              </Route>
            </Routes>
          </main>
        </BrowserRouter>
      </TaskProvider>
    </AuthProvider>
  );
}

// Exportamos el componente App para que pueda ser utilizado en la aplicación.
export default App;
