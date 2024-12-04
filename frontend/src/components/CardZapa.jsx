import React, { useState, useContext, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext';
import { FavoritosContext } from "../context/favoritosContext";
import '../App.css';

function CardZapa({ product }) {
  const { addToCart } = useCart();
  const { favoritos, addFavorito, removeFavorito } = useContext(FavoritosContext);

  // Estado inicial sincronizado con el contexto
  const [isFavorito, setIsFavorito] = useState(false);

  useEffect(() => {
    // Verificar si el producto ya está en favoritos al montar el componente
    setIsFavorito(favoritos.some((fav) => fav.id === product.id));
  }, [favoritos, product.id]);

  const toggleFavorito = () => {
    if (isFavorito) {
      removeFavorito(product.id)
      console.log("Favorito antes:", isFavorito);
    } else {
      addFavorito(product)
      console.log("Favorito después:", !isFavorito);
    }
    // Cambiar el estado visual inmediatamente
    setIsFavorito((prev) => !prev);
  };

  return (
    <Card className="mb-3">
      <Card.Img variant="top" src={product.image_url} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {product.condition} - {new Date(product.created_at).toLocaleDateString()}
        </Card.Subtitle>
        <Card.Text>{product.description}</Card.Text>
        <Card.Text><strong>Precio:</strong> ${product.price}</Card.Text>
        <div className="d-flex justify-content-around align-items-center">
          <Button className="custom-button" onClick={() => addToCart(product)}>
            Agregar al Carrito
          </Button>
          <Button
            as={Link}
            to="/detalleproducto"
            variant="info"
            className="custom-button"
            state={{ product }}
          >
            Detalle
          </Button>
        </div>
        <div className="d-flex justify-content-end align-items-center mt-3">
          {/* Ícono de Corazón */}
          <span
            className={`heart-icon ${isFavorito ? 'active' : ''}`}
            onClick={toggleFavorito}
          >
            ❤
          </span>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardZapa;
