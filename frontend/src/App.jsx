import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider } from './context/authContext'; // Asegúrate de importar el contexto
import { CartProvider } from './context/cartContext';
import { FavoritosProvider } from "./context/favoritosContext";
import Home from "./views/Home";
import InicioSesion from "./views/InicioSesion";
import Perfil from "./views/Perfil";
import CrearUsuario from "./views/CrearUsuario";
import CrearProducto from "./views/CrearProducto";
import DetalleProducto from "./views/DetalleProducto";
import Favoritos from "./views/Favoritos";
import Carro from "./views/Carro";
import Navegador from './components/Navegador';
import Footer from './components/Footer';



function App() {

  return (
    
    <BrowserRouter>
     <CartProvider>
      <AuthProvider>
      <FavoritosProvider>
        <Navegador />
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
        </FavoritosProvider>
      </AuthProvider>
        <Footer />
      </CartProvider>
    </BrowserRouter>

  )
}

export default App
