// Importa las funciones necesarias de React
import { createContext, useContext, useState } from "react";

// Importa las funciones que interactúan con la API para gestionar tareas
import {
  createTaskRequest,
  deleteTaskRequest,
  getTasksRequest,
  getTaskRequest,
  updateTaskRequest,
} from "../api/tasks";

// Crea un contexto llamado TaskContext
const TaskContext = createContext();

// Hook personalizado para usar el contexto de tareas en otros componentes
export const useTasks = () => {
  // Obtiene el contexto
  const context = useContext(TaskContext);

  // Si el contexto no está disponible, lanza un error
  if (!context) throw new Error("useTasks must be used within a TaskProvider");

  // Devuelve el contexto
  return context;
};

// Define el proveedor de contexto para manejar el estado de las tareas
export function TaskProvider({ children }) {
  // Estado local que almacenará las tareas
  const [tasks, setTasks] = useState([]);

  // Función para obtener todas las tareas desde la API
  const getTasks = async () => {
    const res = await getTasksRequest(); // Llama a la API para obtener las tareas
    setTasks(res.data); // Guarda las tareas en el estado
  };

  // Función para eliminar una tarea por su ID
  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id); // Llama a la API para eliminar la tarea
      if (res.status === 204) {
        // Si la tarea se eliminó correctamente (código 204)
        setTasks(tasks.filter((task) => task._id !== id)); // Filtra las tareas y actualiza el estado
      }
    } catch (error) {
      console.log(error); // Muestra el error en la consola si ocurre un problema
    }
  };

  // Función para crear una nueva tarea
  const createTask = async (task) => {
    try {
      const res = await createTaskRequest(task); // Llama a la API para crear la tarea
      console.log(res.data); // Muestra la respuesta en la consola (puede ser útil para depuración)
    } catch (error) {
      console.log(error); // Muestra el error si la creación falla
    }
  };

  // Función para obtener una tarea específica por su ID
  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id); // Llama a la API para obtener la tarea
      return res.data; // Devuelve los datos de la tarea obtenida
    } catch (error) {
      console.error(error); // Muestra el error en la consola si ocurre un problema
    }
  };

  // Función para actualizar una tarea por su ID
  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task); // Llama a la API para actualizar la tarea
    } catch (error) {
      console.error(error); // Muestra el error si la actualización falla
    }
  };

  // Retorna el proveedor de contexto con las funciones y el estado de las tareas
  return (
    <TaskContext.Provider
      value={{
        tasks,        // Lista de tareas almacenadas en el estado
        getTasks,     // Función para obtener todas las tareas
        deleteTask,   // Función para eliminar una tarea
        createTask,   // Función para crear una nueva tarea
        getTask,      // Función para obtener una tarea específica
        updateTask,   // Función para actualizar una tarea
      }}
    >
      {children} {/* Renderiza los componentes hijos que consumirán este contexto */}
    </TaskContext.Provider>
  );
}
