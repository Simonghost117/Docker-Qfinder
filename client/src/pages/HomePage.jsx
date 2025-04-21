// Importamos Link de react-router-dom para manejar la navegación sin recargar la página
import { Link } from "react-router-dom";

// Definimos el componente funcional HomePage
function HomePage() {
  return (
    // Sección principal con estilos de Tailwind CSS para centrar el contenido
    <section className="bg-red-500 flex justify-center items-center">
      
      {/* Contenedor del encabezado con fondo oscuro y padding */}
      <header className="bg-zinc-800 p-10">
        
        {/* Título principal con estilos para tamaño y espaciado */}
        <h1 className="text-5xl py-2 font-bold">React Tasks</h1>

        {/* Párrafo con texto de relleno y color gris claro */}
        <p className="text-md text-slate-400">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos
          fugit doloremque molestias recusandae labore repellat amet dicta tempore
          necessitatibus facilis repellendus voluptas ducimus maiores deserunt sed
          quo ratione provident debitis aut, voluptatem aliquam iste blanditiis
          ex? Voluptatibus, fuga quasi necessitatibus cumque optio error enim,
          officia accusantium vitae doloremque, molestias modi.
        </p>

        {/* Botón de navegación que lleva a la página de registro */}
        <Link
          className="bg-zinc-500 text-white px-4 py-2 rounded-md mt-4 inline-block"
          to="/register"
        >
          Get Started
        </Link>

      </header>
    </section>
  );
}

// Exportamos el componente para que pueda ser usado en otras partes de la aplicación
export default HomePage;
