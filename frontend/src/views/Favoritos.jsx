import { useContext } from "react";
import { FavoritosContext } from "../context/favoritosContext";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

function Favoritos() {
  const { favoritos, removeFavorito } = useContext(FavoritosContext);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  return (
    <Container className="m-5">
      <h1>Favoritos</h1>
      <div className="d-flex flex-wrap">
        {favoritos.length > 0 ? (
          favoritos.map((product) => (
            <Card
              key={product.id}
              className="m-3"
              style={{ width: "18rem", position: "relative" }}
            >
              {/* Botón para eliminar de favoritos */}
              <button
                className="remove-button"
                onClick={() => removeFavorito(product.id)}
                aria-label="Eliminar de favoritos"
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  background: "none",
                  border: "none",
                  color: "red",
                  fontSize: "20px",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>

              <Card.Img variant="top" src={product.image_url} alt={product.name} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>
                  <strong>Precio:</strong> ${product.price}
                </Card.Text>

                {/* Botones de funcionalidad */}
                <div className="d-flex justify-content-between">
                  <Button
                    variant="secondary"
                    onClick={() => addToCart(product)}
                  >
                    Agregar al carrito
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => navigate(`/detalle/${product.id}`)}
                  >
                    Detalle
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No tienes productos favoritos</p>
        )}
      </div>
    </Container>
  );
}

export default Favoritos;
