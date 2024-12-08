import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

function Perfil() {
  // Simulación de datos de productos del usuario
  const userProducts = [
    {
      id: 1,
      name: "Producto 1",
      description: "Descripción del producto 1",
      price: 100,
      image_url: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Producto 2",
      description: "Descripción del producto 2",
      price: 200,
      image_url: "https://via.placeholder.com/150",
    },
  ];

  // Simulación de historial de compras
  const purchaseHistory = [
    {
      id: 1,
      name: "Producto Comprado 1",
      date: "2024-01-01",
      price: 150,
      buyer: "Usuario123",
      rating: 4,
    },
    {
      id: 2,
      name: "Producto Comprado 2",
      date: "2024-02-01",
      price: 250,
      buyer: "Usuario456",
      rating: 5,
    },
  ];

  // Función para manejar la edición de información
  const handleEditInfo = () => {
    alert("Redirigiendo a la página para editar información.");
    console.log("Editar información del usuario.");
  };

  // Función para manejar la edición de productos
  const handleEditProduct = (productId) => {
    alert(`Editando producto con ID: ${productId}`);
    console.log(`Editando producto con ID: ${productId}`);
  };

  // Función para manejar la eliminación de productos
  const handleDeleteProduct = (productId) => {
    alert(`Eliminando producto con ID: ${productId}`);
    console.log(`Eliminando producto con ID: ${productId}`);
  };

  // Función para renderizar estrellas de puntuación
  const renderStars = (rating) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  return (
    <Container>
      <Row className="my-5">
        {/* Primera columna: Perfil del usuario */}
        <Col md={3} className="text-center">
          <div className="profile-photo-wrapper">
            <img
              src="https://via.placeholder.com/150"
              alt="Foto del Usuario"
              className="profile-photo"
              style={{
                width: "150px",
                height: "150px",
                objectFit: "cover",
                borderRadius: "50%",
              }}
            />
          </div>
          <h3 className="mt-3">Nombre del Usuario</h3>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleEditInfo();
            }}
            style={{ color: "#007bff", textDecoration: "underline", cursor: "pointer" }}
          >
            Editar Información
          </a>
          <Button variant="primary" className="mt-3">
            Agregar Producto
          </Button>
        </Col>

        {/* Segunda columna: Productos del usuario */}
        <Col md={6}>
          <h4>Mis Productos</h4>
          {userProducts.length > 0 ? (
            <Row>
              {userProducts.map((product) => (
                <Col key={product.id} md={6} className="mb-4">
                  <Card>
                    <Card.Img variant="top" src={product.image_url} />
                    <Card.Body>
                      <Card.Title>{product.name}</Card.Title>
                      <Card.Text>{product.description}</Card.Text>
                      <Card.Text>
                        <strong>Precio:</strong> ${product.price}
                      </Card.Text>
                      <div className="d-flex justify-content-between">
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => handleEditProduct(product.id)}
                        >
                          Editar
                        </Button>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Eliminar
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            <p>No tienes productos creados.</p>
          )}
        </Col>

        {/* Tercera columna: Historial de compras */}
        <Col md={3}>
          <h4>Historial de Compras</h4>
          {purchaseHistory.length > 0 ? (
            <ul className="list-group">
              {purchaseHistory.map((purchase) => (
                <li key={purchase.id} className="list-group-item">
                  <strong>{purchase.name}</strong>
                  <br />
                  Fecha: {purchase.date}
                  <br />
                  Precio: ${purchase.price}
                  <br />
                  Comprado por: {purchase.buyer}
                  <br />
                  Puntuación: <span>{renderStars(purchase.rating)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p>No tienes historial de compras.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;
