import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Importamos el hook para el contexto
import { useCart } from '../context/cartContext'; // Importamos el hook del contexto del carrito
import logoPrimary from '../assets/logo_primary.png'

function Navegador() {
  const { isLoggedIn, login, logout } = useAuth(); // Usamos el hook para el contexto de autenticación
  const { cart } = useCart(); // Usamos el hook para acceder al carrito

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Cerrar sesión usando el contexto
  };

  // Calcular la cantidad total de productos en el carrito
  const getTotalItemsInCart = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      <Navbar className="custom-navbar-bg" expand="lg" data-bs-theme="dark">
        <Container>
          {/* Logo */}
          <Navbar.Brand as={Link} to="/">
            <img
              src={logoPrimary}
              alt="Logo Marca Zappas"
            />
          </Navbar.Brand>

          {/* Siempre visible el botón de hamburguesa (toggle) */}
          <Navbar.Toggle aria-controls="navbar-nav" />

          {/* El menú que se pliega o expande */}
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              {/* Enlace a Favoritos */}
              <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
              {/* Enlace Carrito de Compras */}
              <Nav.Link as={Link} to={isLoggedIn ? "/carro" : "/iniciosesion"}>
                {isLoggedIn
                  ? `Carrito de Compras (${getTotalItemsInCart()})`
                  : "Inicia sesión para comprar"}
              </Nav.Link>
            </Nav>
            {/* Menú hamburguesa adicional */}
            <Nav>
              <Nav.Link as={Link} to={isLoggedIn ? "/perfil" : "/crearusuario"}>
                {isLoggedIn ? "Hola, Usuario" : "Hola, Crea tu Usuario"}
              </Nav.Link>
              {/* Botón de Cerrar Sesión */}
              {isLoggedIn && (
                <Nav.Link as={Link} to="/" onClick={handleLogout}>Cerrar Sesión</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navegador;
