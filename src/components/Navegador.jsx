import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom'

function Navegador() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#">LogoHome</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#">Usuario</Nav.Link>
            <Nav.Link href="#">Favoritos</Nav.Link>
            <Nav.Link href="#">Carro</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navegador;