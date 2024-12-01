import React from 'react';
import { Card, Button } from 'react-bootstrap';
import '../App.css'


function CardZapa({ product, addToCart }) {
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
        <Button class='custom-button' onClick={() => addToCart(product.id)}>
          Agregar al Carrito
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CardZapa;
