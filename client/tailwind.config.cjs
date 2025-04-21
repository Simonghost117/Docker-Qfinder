/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "azul": "#4B9AF6",
        "verdeOscuro": "#048C22",
        "verdeClaro": "#13BA6A",
        "azulMyClaro": "#84B6F4",
        "purpuraAzul": "#271E4A",
        "azulAgua": "#70C8FA4A",
        "rojo": "#CA0000",
        "grisTrasparente": "rgba(242,242,242, 53%)",
        "grisTexto": "#585757",
        "azulClApp1": "#c3deff",
        "textoGris": "#858585"
      },
      backgroundImage: {
        'slide1': "linear-gradient(90deg, #84B6F4 -10%, transparent 90%), url('images/slide-1.jpg')",
        'bgServicios': "linear-gradient(rgba(0, 117, 255, 17%), rgba(0, 117, 255, 17%)), url('images/bg-servicios.png')",
        'dapp': 'linear-gradient(to right, #FFF -2%, #FFF 50%, #B6D2FC 50%)',
        'bgAbuelaMedico': 'url(/images/elipse-abuela-medico.png)',
        'cldescarga': 'url(/images/elipse-movil.png)'
      },
      screens: {
        'mq1360': { 'raw': '(min-width: 1360px)' },
        'mq1200': { 'raw': '(min-width: 1200px)' },
        'mq1080': { 'raw': '(min-width: 1080px)' },
        'mq810': { 'raw': '(min-width: 810px)' },
      },
      boxShadow:{
        "sliderShadowText": "2px 2px 1px #00000030"
      },
      backgroundSize: {
        "92%": "92%",
        "65%": "65%"
      },
      keyframes: {
        celular: {
          '0%': { transform: 'translateY(0deg)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
      animation: {
        celular: 'celular 2s linear infinite',
      }
    },
  },
  plugins: [],
};
