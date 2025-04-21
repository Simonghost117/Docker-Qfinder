// Importamos React para poder utilizar la sintaxis JSX y sus funcionalidades.
import React from 'react'

// Importamos ReactDOM para renderizar la aplicación en el DOM del navegador.
import ReactDOM from 'react-dom/client'

// Importamos el componente principal de la aplicación (App), que contiene toda la lógica de las rutas y la estructura principal.
import App from './App'

// Importamos los estilos globales de la aplicación desde el archivo index.css.
import './index.css'

// Seleccionamos el elemento con id "root" en el HTML y lo convertimos en el punto de entrada de la aplicación.
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode es una herramienta de desarrollo que ayuda a detectar problemas potenciales en la aplicación.
  <React.StrictMode>
    {/* Renderizamos el componente principal de la aplicación dentro de StrictMode. */}
    <App />
  </React.StrictMode>
)
