import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function Perfil() {
  const [userProducts, setUserProducts] = useState([]); // Inicializa como array vacío
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Función para obtener productos
  const fetchUserProducts = async () => {
    try {
      const response = await api.get("/products", {  
        headers: {
          "Cache-Control": "no-cache",
        },
      });
  
      // Verifica la respuesta
      console.log("Respuesta de la API:", response.data);
  
      setUserProducts(response.data.products || []);
    } catch (error) {
      console.error("Error al obtener los productos:", error.response?.data || error.message);
      setError("Hubo un problema al cargar los productos.");
      setUserProducts([]);
    } finally {
      setLoading(false);
    }
  };
  
  
  

  useEffect(() => {
    fetchUserProducts();
  }, []);

  const handleAddProduct = () => {
    navigate("/crearproducto");
  };

  return (
    <Container>
      <Row className="my-5">
        <Col md={3} className="text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Foto del Usuario"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
            }}
          />
          <h3 className="mt-3">Nombre del Usuario</h3>
          <Button variant="primary" className="mt-3" onClick={handleAddProduct}>
            Agregar Producto
          </Button>
        </Col>

        <Col md={6}>
          <h4>Mis Productos</h4>

          {/* Indicador de carga */}
          {loading && <p>Cargando...</p>}

          {/* Mensaje de error */}
          {error && <Alert variant="danger">{error}</Alert>}

          {/* Mensaje si no hay productos */}
          {!loading && Array.isArray(userProducts) && userProducts.length === 0 && (
            <p>No tienes productos creados.</p>
          )}

          {/* Lista de productos */}
          {!loading && Array.isArray(userProducts) && userProducts.length > 0 && (
            <Row>
              {userProducts.map((product) => (
                <Col key={product.id} md={6} className="mb-4">
                  <Card>
                    <Card.Img
                      variant="top"
                      src={product.imagenes?.[0] || "https://via.placeholder.com/150"}
                      alt="Producto"
                    />
                    <Card.Body>
                      <Card.Title>{product.nombre}</Card.Title>
                      <Card.Text>{product.descripcion}</Card.Text>
                      <Card.Text>
                        <strong>Precio:</strong> ${product.precio}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Perfil;



