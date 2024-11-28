import { Route, Routes } from "react-router-dom";
import './App.css'
import Home from "./views/Home"
import InicioSesion from "./views/InicioSesion"

function App() {

  return (

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/iniciosesion" element={<InicioSesion />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/crearusuario" element={<CrearUsuario />} />
          <Route path="/crearproducto" element={<CrearProducto />} />
          <Route path="/detalleproducto" element={<DetalleProducto />} />
          <Route path="/favoritos" element={<Favoritos />} />
          <Route path="/carro" element={<Carro />} />
        </Routes>

  )
}

export default App
