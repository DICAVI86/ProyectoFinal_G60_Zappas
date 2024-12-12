import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [forum, setForum] = useState([]); // Estado para el foro
  const [newQuestion, setNewQuestion] = useState(''); // Nueva pregunta

  const generateProducts = () => {
    const products = [];
    for (let i = 1; i <= 90; i++) {
      products.push({
        id: i,
        name: `Producto ${i}`,
        description: `Descripción del producto ${i}`,
        price: (Math.random() * (200 - 50) + 50).toFixed(2),
        image_url: 'https://via.placeholder.com/300',
        condition: i % 2 === 0 ? 'Nuevo' : 'Usado',
        created_at: '2024-01-01',
      });
    }
    return products;
  };

  useEffect(() => {
    const productos = generateProducts();
    const productoEncontrado = productos.find((p) => p.id === parseInt(id));

    if (!productoEncontrado) {
      setError('Producto no encontrado');
    } else {
      setProduct(productoEncontrado);
    }
  }, [id]);

  const handleAddToCart = () => {
    console.log(`Producto ${product.name} agregado al carrito`);
  };

  const handlePostQuestion = () => {
    if (newQuestion.trim()) {
      setForum([...forum, { question: newQuestion, answer: null }]);
      setNewQuestion('');
    }
  };

  const handleAnswerQuestion = (index, answer) => {
    const updatedForum = [...forum];
    updatedForum[index].answer = answer;
    setForum(updatedForum);
  };

  if (error) {
    return <Container><p>{error}</p></Container>;
  }

  if (!product) {
    return <Container><p>Cargando detalles del producto...</p></Container>;
  }

  return (
    <Container className="detalle-producto mt-4">
      <h2 className="text-left">Nombre Producto</h2>
      <Row className="mt-4">
        {/* Columna de la imagen */}
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={product.image_url} />
          </Card>
        </Col>

        {/* Columna de detalles */}
        <Col md={4}>
          <Card style={{backgroundColor: '#F2EBDC', border: 'none'}}>
            <Card.Body>
              <Card.Title style={{color: '#5944A6'}}>{product.name}</Card.Title>
              <Card.Text>
                <strong>Condición:</strong> {product.condition}
              </Card.Text>
              <Card.Text>
                <strong>Descripción:</strong> {product.description}
              </Card.Text>
              <Card.Text>
                <strong>Precio:</strong> ${product.price}
              </Card.Text>
              <Card.Text>
                <strong>Fecha de creación:</strong> {new Date(product.created_at).toLocaleDateString()}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        {/* Columna de botones */}
        <Col md={4} className="d-flex flex-column align-items-start">
          <Button variant="primary" className="mb-2" onClick={handleAddToCart}>
            Agregar al Carrito
          </Button>
          <Button variant="success" onClick={() => alert('Función pendiente')}>
            Compra Inmediata
          </Button>
        </Col>
      </Row>

      {/* Zona del foro */}
      <Row className="mt-5">
        <Col>
          <h4>Foro de Preguntas y Respuestas</h4>
          <Form className="mb-3">
            <Form.Group controlId="newQuestion">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Escribe tu pregunta..."
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
              />
            </Form.Group>
            <Button variant="secondary" className="mt-2" onClick={handlePostQuestion}>
              Enviar Pregunta
            </Button>
          </Form>

          {forum.map((entry, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Text><strong>Pregunta:</strong> {entry.question}</Card.Text>
                {entry.answer ? (
                  <Card.Text><strong>Respuesta:</strong> {entry.answer}</Card.Text>
                ) : (
                  <Form.Group controlId={`answer-${index}`}>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      placeholder="Escribe tu respuesta..."
                      onBlur={(e) => handleAnswerQuestion(index, e.target.value)}
                    />
                  </Form.Group>
                )}
              </Card.Body>
            </Card>
          ))}
        </Col>
      </Row>
    </Container>
  );
}

export default DetalleProducto;
