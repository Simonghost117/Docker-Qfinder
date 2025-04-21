// Importa el hook `useTasks` desde el contexto de tareas
import { useTasks } from "../../context/tasksContext";

// Importa los componentes UI reutilizables
import { Button, ButtonLink, Card } from "../ui";

// Componente `TaskCard`, que representa una tarjeta de tarea individual
export function TaskCard({ task }) {
  // Extrae la función `deleteTask` del contexto de tareas
  const { deleteTask } = useTasks();

  return (
    // Componente `Card` que contiene la estructura visual de la tarea
    <Card>
      {/* Encabezado de la tarjeta con el título y botones de acciones */}
      <header className="flex justify-between">
        {/* Título de la tarea en formato grande y negrita */}
        <h1 className="text-2xl font-bold text-gray-700">{task.title}</h1>

        {/* Contenedor para los botones de eliminar y editar */}
        <div className="flex gap-x-2 items-center">
          {/* Botón para eliminar la tarea, al hacer clic ejecuta `deleteTask` con el ID de la tarea */}
          <Button onClick={() => deleteTask(task._id)}>Delete</Button>

          {/* Botón de enlace para editar la tarea, redirige a la página de edición */}
          <ButtonLink to={`/tasks/${task._id}`}>Edit</ButtonLink>
        </div>
      </header>

      {/* Descripción de la tarea en un color gris claro */}
      <div className="flex flex-wrap">

        <p className="text-gray-600">{task.description}</p>
      </div>

      {/* Muestra la fecha de la tarea formateada si existe */}
      <p>
        {task.date &&
          new Date(task.date).toLocaleDateString("en-US", {
            weekday: "long",  // Nombre del día (ej. Monday)
            year: "numeric",  // Año en formato numérico (ej. 2025)
            month: "long",    // Nombre del mes (ej. March)
            day: "numeric",   // Día del mes (ej. 17)
          })}
      </p>
    </Card>
  );
}
