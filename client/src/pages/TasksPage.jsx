// Importamos useEffect para manejar efectos secundarios
import { useEffect } from "react";

// Importamos el contexto de tareas para obtener las tareas y la función para obtenerlas
import { useTasks } from "../context/tasksContext";

// Importamos el componente TaskCard que representa una tarea individual
import { TaskCard } from "../components/tasks/TaskCard";

// Importamos un icono para mostrar cuando no hay tareas
import { ImFileEmpty } from "react-icons/im";

export function TasksPage() {
  // Extraemos tasks (lista de tareas) y getTasks (función para obtener tareas)
  const { tasks, getTasks } = useTasks();

  // useEffect se ejecuta cuando se monta el componente para obtener las tareas
  useEffect(() => {
    getTasks();
  }, []); // Se ejecuta solo una vez al montar el componente

  return (
    <>
      {/* Si no hay tareas, se muestra el mensaje con el icono */}
      {tasks.length === 0 && (
        <div className="flex justify-center items-center p-10">
          <div>
            <ImFileEmpty className="text-6xl text-gray-400 m-auto my-2" />
            <h1 className="font-bold text-xl text-gray-600">
              No tasks yet, please add a new task
            </h1>
          </div>
        </div>
      )}

      {/* Si hay tareas, se muestran en un grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
        {tasks.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))}
      </div>
    </>
  );
}
