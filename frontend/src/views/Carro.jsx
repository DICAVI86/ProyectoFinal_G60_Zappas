import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { useCart } from '../context/cartContext'; // Asegúrate de que el contexto esté importado

function Carro() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  // Formato para mostrar valores en pesos chilenos (CLP)
  const formatCurrency = (value) => {
    return value.toLocaleString('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 0, // Elimina los decimales innecesarios
    });
  };

  // Función para manejar la cantidad al presionar aumentar o disminuir
  const handleQuantityChange = (productId, adjustment) => {
    const product = cart.find((item) => item.id === productId);
    if (!product) return;

    const newQuantity = product.quantity + adjustment;
    if (newQuantity < 1) return; // Evita cantidades menores a 1
    updateQuantity(productId, newQuantity);
  };

  // Calcular el subtotal y total
  const calculateSubtotal = (product) => product.precio * product.quantity;
  const calculateTotal = () =>
    cart.reduce((total, product) => total + calculateSubtotal(product), 0);

  // Mostrar un mensaje si el carrito está vacío
  if (cart.length === 0) {
    return (
      <Container className="text-center mt-5">
        <h3>No hay productos en el carrito</h3>
      </Container>
    );
  }

  return (
    <Container className="m-5">
      <h1>Carrito de compras</h1>
      <Row>
        {cart.map((product) => (
          <Col sm={12} md={6} lg={4} key={product.id}>
            <Card className="mb-3">
              <Card.Img variant="top" src={product.imagenes[0]} alt={product.nombre} />
              <Card.Body>
                <Card.Title>{product.nombre}</Card.Title>
                <Card.Text>
                  Precio: {formatCurrency(Number(product.precio))} {/* Conversión explícita */}
                  <br />
                  Subtotal: {formatCurrency(calculateSubtotal(product))}
                </Card.Text>
                <div className="d-flex align-items-center">
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(product.id, -1)}
                  >
                    -
                  </Button>
                  <span className="mx-3">{product.quantity}</span>
                  <Button
                    variant="outline-secondary"
                    onClick={() => handleQuantityChange(product.id, 1)}
                  >
                    +
                  </Button>
                </div>
                <Button
                  variant="danger"
                  className="mt-2"
                  onClick={() => removeFromCart(product.id)}
                >
                  Eliminar
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <div className="d-flex justify-content-between mt-3">
        <h3>Total: {formatCurrency(calculateTotal())}</h3>
        <Button variant="success" onClick={() => alert('Proceder a la compra')}>
          Proceder a la compra
        </Button>
      </div>

      <Button variant="danger" className="mt-3" onClick={clearCart}>
        Vaciar carrito
      </Button>
    </Container>
  );
}

export default Carro;