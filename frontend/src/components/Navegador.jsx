import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useCart } from "../context/cartContext";
import logoPrimary from "../assets/logo_primary.png";

function Navegador() {
  const { isLoggedIn, login, logout } = useAuth();
  const { cart } = useCart();

  const handleLogout = () => {
    logout();
  };

  const getTotalItemsInCart = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <Navbar className="custom-navbar shadow-lg" expand="lg" sticky="top">
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={logoPrimary}
            alt="Logo Marca Zappas"
            style={{ width: "120px", height: "auto" }}
          />
        </Navbar.Brand>

        {/* Toggle para pantallas pequeñas */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Menú Expandible */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {/* Favoritos */}
            <Nav.Link as={Link} to="/favoritos" className="nav-link-hover">
              Favoritos
            </Nav.Link>
            {/* Carrito */}
            <Nav.Link
              as={Link}
              to={isLoggedIn ? "/carro" : "/iniciosesion"}
              className="nav-link-hover"
            >
              {isLoggedIn ? (
                <>
                  Carrito de Compras{" "}
                  <span className="badge bg-primary">
                    {getTotalItemsInCart()}
                  </span>
                </>
              ) : (
                "Inicia Sesión"
              )}
            </Nav.Link>
          </Nav>
          <Nav>
            {/* Perfil */}
            <Nav.Link
              as={Link}
              to={isLoggedIn ? "/perfil" : "/crearusuario"}
              className="nav-link-hover"
            >
              {isLoggedIn ? "Perfil" : "Crea tu Usuario"}
            </Nav.Link>
            {/* Cerrar Sesión */}
            {isLoggedIn && (
              <Nav.Link
                as={Link}
                to="/"
                onClick={handleLogout}
                className="nav-link-hover"
              >
                Cerrar Sesión
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navegador;
