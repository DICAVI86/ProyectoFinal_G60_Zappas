import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import { useCart } from '../context/cartContext';  // Usamos el hook del contexto
import '../App.css';

function CardZapa({ product }) {
  const { addToCart } = useCart();  // Usamos la función addToCart del contexto

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
          <Button className="custom-button" 
                  onClick={() => addToCart(product)}>
            Agregar al Carrito
          </Button>
          <Button
            as={Link}
            to="/detalleproducto"
            variant="info"
            className="custom-button"
            state={{ product }} // Pasamos el producto a la ruta de detalle
          >
            Detalle
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default CardZapa;
