import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import api from '../services/api'; // Asegúrate de tener configurado tu cliente API

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [forum, setForum] = useState([]); // Estado para el foro
  const [newQuestion, setNewQuestion] = useState(''); // Nueva pregunta

  // Obtener detalles del producto y las consultas
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        // Obtener detalles del producto
        const productResponse = await api.get(`/products/${id}`);
        console.log('Respuesta del producto:', productResponse.data); // Log de la respuesta
        setProduct(productResponse.data); // Suponiendo que la respuesta tiene los detalles del producto
  
        // Obtener consultas relacionadas con el producto
        const forumResponse = await api.get(`/consultas/${id}`);
        console.log('Respuesta de las consultas:', forumResponse.data); // Log de las consultas
        setForum(forumResponse.data); // Suponiendo que la respuesta tiene las consultas
      } catch (error) {
        setError('Error al obtener los detalles del producto o las consultas.');
        console.error('Error:', error); // Log del error
      }
    };
  
    fetchProductDetails();
  }, [id]);
  

  const handleAddToCart = () => {
    console.log(`Producto ${product.nombre} agregado al carrito`);
  };

  const handlePostQuestion = async () => {
    if (newQuestion.trim()) {
      try {
        const response = await api.post('/consultas', {
          producto_id: product.id,
          pregunta: newQuestion,
        });

        // Agregar la nueva pregunta al foro en el estado
        setForum([...forum, { pregunta: newQuestion, respuesta: null }]);
        setNewQuestion(''); // Limpiar la entrada de la nueva pregunta
      } catch (error) {
        console.error('Error al enviar la pregunta:', error);
      }
    }
  };

  const handleAnswerQuestion = (index, answer) => {
    const updatedForum = [...forum];
    updatedForum[index].respuesta = answer;
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
            <Card.Img variant="top" src={product.imagenes[0]} alt={product.nombre} />
          </Card>
        </Col>

        {/* Columna de detalles */}
        <Col md={4}>
          <Card style={{backgroundColor: '#F2EBDC', border: 'none'}}>
            <Card.Body>
              <Card.Title>{product.nombre}</Card.Title>
              <Card.Text>
                <strong>Condición:</strong> {product.condicion}
              </Card.Text>
              <Card.Text>
                <strong>Descripción:</strong> {product.descripcion}
              </Card.Text>
              <Card.Text>
                <strong>Precio:</strong> {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product.precio)}
              </Card.Text>
              <Card.Text>
                <strong>Fecha de creación:</strong> {new Date(product.creado_en).toLocaleDateString()}
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
                <Card.Text><strong>Pregunta:</strong> {entry.pregunta}</Card.Text>
                {entry.respuesta ? (
                  <Card.Text><strong>Respuesta:</strong> {entry.respuesta}</Card.Text>
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


