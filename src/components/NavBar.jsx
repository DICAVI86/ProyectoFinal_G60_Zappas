import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function Navegador() {
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">LogoHome</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Usuario</Nav.Link>
            <Nav.Link href="#features">Favoritos</Nav.Link>
            <Nav.Link href="#pricing">Carro</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Navegador;