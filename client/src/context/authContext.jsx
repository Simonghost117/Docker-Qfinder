// Importamos los hooks de React necesarios
import { useEffect } from "react";
import { createContext, useContext, useState } from "react";

// Importamos las funciones para interactuar con la API de autenticación
import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";

// Importamos la librería js-cookie para manejar las cookies
import Cookies from "js-cookie";

// Creamos un contexto de autenticación que almacenará y compartirá la información del usuario
const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación de manera más sencilla
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

// Definimos el proveedor de autenticación que envolverá la aplicación
export const AuthProvider = ({ children }) => {
  // Estado para almacenar la información del usuario autenticado
  const [user, setUser] = useState(null);
  
  // Estado para saber si el usuario está autenticado o no
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Estado para almacenar posibles errores en autenticación
  const [errors, setErrors] = useState([]);
  
  // Estado para manejar la carga mientras se verifica la autenticación
  const [loading, setLoading] = useState(true);

  // useEffect para limpiar los errores después de 5 segundos
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  // Función para registrar un usuario
  const signup = async (user) => {
    try {
      const res = await registerRequest(user); // Llamamos a la API de registro
      if (res.status === 200) { // Si el registro es exitoso
        setUser(res.data); // Guardamos los datos del usuario en el estado
        setIsAuthenticated(true); // Marcamos al usuario como autenticado
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message); // Guardamos el error en el estado
    }
  };

  // Función para iniciar sesión
  const signin = async (user) => {
    try {
      const res = await loginRequest(user); // Llamamos a la API de inicio de sesión
      setUser(res.data); // Guardamos los datos del usuario en el estado
      setIsAuthenticated(true); // Marcamos al usuario como autenticado
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message); // Descomentar para manejar errores
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    Cookies.remove("token"); // Eliminamos la cookie del token
    setUser(null); // Eliminamos los datos del usuario
    setIsAuthenticated(false); // Marcamos al usuario como no autenticado
  };

  // useEffect para verificar si el usuario está autenticado al cargar la app
  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get(); // Obtenemos las cookies almacenadas
      if (!cookies.token) { // Si no hay token, el usuario no está autenticado
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token); // Verificamos el token en la API
        console.log(res);
        if (!res.data) return setIsAuthenticated(false); // Si no hay datos, el usuario no está autenticado
        setIsAuthenticated(true); // Si el token es válido, autenticamos al usuario
        setUser(res.data); // Guardamos los datos del usuario en el estado
        setLoading(false); // Marcamos la carga como completada
      } catch (error) {
        setIsAuthenticated(false); // Si hay un error, marcamos al usuario como no autenticado
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  // Retornamos el proveedor con los valores de autenticación disponibles para la aplicación
  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children} {/* Renderiza los componentes hijos dentro del proveedor */}
    </AuthContext.Provider>
  );
};

// Exportamos el contexto de autenticación
export default AuthContext;
