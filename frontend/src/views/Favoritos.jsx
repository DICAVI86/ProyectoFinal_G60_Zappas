import { useContext } from "react";
import { FavoritosContext } from "../context/favoritosContext";
import { Card, Button } from "react-bootstrap";

function Favoritos() {
  const { favoritos, removeFavorito } = useContext(FavoritosContext);

  return (
    <div>
      <h1>Favoritos</h1>
      <div className="d-flex flex-wrap">
        {favoritos.length > 0 ? (
          favoritos.map((product) => (
            <Card key={product.id} className="m-3" style={{ width: "18rem", position: "relative" }}>
              <button
                className="remove-button"
                onClick={() => removeFavorito(product.id)}
                aria-label="Eliminar de favoritos"
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
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>No tienes productos favoritos</p>
        )}
      </div>
    </div>
  );
}

export default Favoritos;
