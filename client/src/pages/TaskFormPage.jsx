// Importamos useEffect para manejar efectos secundarios y useNavigate para la navegación
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Importamos dayjs y su plugin utc para manejar fechas en formato UTC
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

// Importamos componentes de UI personalizados
import { Button, Card, Input, Label } from "../components/ui";
import { Textarea } from "../components/ui/Textarea";

// Importamos el contexto de tareas para gestionar las tareas
import { useTasks } from "../context/tasksContext";

// Importamos react-hook-form para gestionar el formulario
import { useForm } from "react-hook-form";

export function TaskFormPage() {
  // Extraemos funciones del contexto de tareas
  const { createTask, getTask, updateTask } = useTasks();

  // Hook de navegación para redirigir a otras páginas
  const navigate = useNavigate();

  // Hook para obtener los parámetros de la URL (usado para edición de tareas)
  const params = useParams();

  // Configuración del formulario con react-hook-form
  const {
    register, // Para registrar los campos del formulario
    setValue, // Para establecer valores en los campos
    handleSubmit, // Maneja el envío del formulario
    formState: { errors }, // Captura errores de validación
  } = useForm();

  // Función que se ejecuta al enviar el formulario
  const onSubmit = async (data) => {
    try {
      if (params.id) {
        // Si hay un ID en los parámetros, significa que estamos editando una tarea
        updateTask(params.id, {
          ...data,
          date: dayjs.utc(data.date).format(), // Convertimos la fecha a UTC
        });
      } else {
        // Si no hay un ID, estamos creando una nueva tarea
        createTask({
          ...data,
          date: dayjs.utc(data.date).format(), // Convertimos la fecha a UTC
        });
      }

      // Redirige a la lista de tareas después de crear o actualizar
      // navigate("/tasks");
    } catch (error) {
      console.log(error);
      // En caso de error, podríamos redirigir al usuario a la página principal
      // window.location.href = "/";
    }
  };

  // useEffect para cargar una tarea si estamos en modo edición
  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        // Si hay un ID en los parámetros, obtenemos la tarea correspondiente
        const task = await getTask(params.id);

        // Llenamos el formulario con los valores de la tarea existente
        setValue("title", task.title);
        setValue("description", task.description);
        setValue(
          "date",
          task.date ? dayjs(task.date).utc().format("YYYY-MM-DD") : ""
        );
        setValue("completed", task.completed);
      }
    };

    loadTask();
  }, []); // Se ejecuta una sola vez al cargar el componente

  return (
    <Card>
      {/* Formulario de creación/edición de tareas */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Campo para el título */}
        <Label htmlFor="title">Title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Title"
          {...register("title", { required: true })}
          autoFocus
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">Please enter a title.</p>
        )}

        {/* Campo para la descripción */}
        <Label htmlFor="description">Description</Label>
        <Textarea
          name="description"
          id="description"
          rows="3"
          placeholder="Description"
          {...register("description")}
        ></Textarea>

        {/* Campo para la fecha */}
        <Label htmlFor="date">Date</Label>
        <Input type="date" name="date" {...register("date")} />

        {/* Botón para enviar el formulario */}
        <Button>Save</Button>
      </form>
    </Card>
  );
}
