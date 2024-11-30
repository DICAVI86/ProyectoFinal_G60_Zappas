import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/authContext'; // Importamos el hook para el contexto
import logoPrimary from '../assets/logo_primary.png'

function Navegador() {
  const { isLoggedIn, login, logout } = useAuth(); // Usamos el hook del contexto

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    logout(); // Cerrar sesión usando el contexto
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
              {/* Enlace a Perfil */}
              <Nav.Link as={Link} to="/perfil">Usuario</Nav.Link>
              <Nav.Link as={Link} to="/favoritos">Favoritos</Nav.Link>
              {/* El botón de compra redirige a /iniciosesion si no está logueado */}
              <Nav.Link as={Link} to={isLoggedIn ? "/carro" : "/iniciosesion"}>
                {isLoggedIn ? "Carrito de Compras" : "Inicia sesión para comprar"}
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



