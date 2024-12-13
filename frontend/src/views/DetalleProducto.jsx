import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap';
import api from '../services/api';
import { useCart } from '../context/cartContext';
import { FavoritosContext } from '../context/favoritosContext';

function DetalleProducto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favoritos, addFavorito, removeFavorito } = useContext(FavoritosContext);

  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const [forum, setForum] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isFavorito, setIsFavorito] = useState(false);
  const [showMoreQuestions, setShowMoreQuestions] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const productResponse = await api.get(`/products/${id}`);
        setProduct(productResponse.data);
        setMainImage(productResponse.data.imagenes[0]);

        const forumResponse = await api.get(`/consultas/${id}`);
        setForum(forumResponse.data);

        setIsFavorito(favoritos.some((fav) => fav.id === productResponse.data.id));
      } catch (error) {
        setError('Error al obtener los detalles del producto o las consultas.');
      }
    };

    fetchProductDetails();
  }, [id, favoritos]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const toggleFavorito = () => {
    if (isFavorito) {
      removeFavorito(product.id);
    } else {
      addFavorito(product);
    }
    setIsFavorito((prev) => !prev);
  };

  const handlePostQuestion = async () => {
    if (newQuestion.trim()) {
      try {
        const response = await api.post('/consultas', {
          producto_id: product.id,
          pregunta: newQuestion,
        });

        setForum([...forum, { ...response.data, respuesta: null }]);
        setNewQuestion('');
      } catch (error) {
        console.error('Error al enviar la pregunta:', error);
      }
    } else {
      console.log('Por favor, ingresa una pregunta');
    }
  };

  const getUserFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload ? { id: payload.userId } : null;
  };

  const handleAnswerQuestion = async (index, answer) => {
    const entry = forum[index];
    const user = getUserFromToken();

    if (product?.usuario_id !== user?.id) {
      alert('Solo el dueño del producto puede responder');
      return;
    }

    try {
      const response = await api.put(`/consultas/${entry.id}`, { respuesta: answer });
      const updatedForum = [...forum];
      updatedForum[index].respuesta = response.data.respuesta;
      setForum(updatedForum);
    } catch (error) {
      console.error('Error al responder la pregunta:', error);
    }
  };

  const handleDeleteQuestion = async (index) => {
    const entry = forum[index];
    const user = getUserFromToken();

    if (product?.usuario_id !== user?.id) {
      alert('Solo el dueño del producto puede eliminar preguntas');
      return;
    }

    try {
      await api.delete(`/consultas/${entry.id}`);
      const updatedForum = forum.filter((_, i) => i !== index);
      setForum(updatedForum);
    } catch (error) {
      console.error('Error al eliminar la pregunta:', error);
    }
  };

  return (
    <Container className="detalle-producto mt-4">
      <h2 className="text-center mb-4">{product?.nombre}</h2>
      <Row>
        <Col md={4}>
          <Card>
            <Card.Img variant="top" src={mainImage} alt={product?.nombre} />
          </Card>
          <div className="image-gallery d-flex mt-3">
            {product?.imagenes.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setMainImage(img)}
                style={{
                  width: '60px',
                  height: '60px',
                  marginRight: '10px',
                  cursor: 'pointer',
                  filter: mainImage === img ? 'none' : 'grayscale(100%)',
                }}
              />
            ))}
          </div>
        </Col>

        <Col md={4}>
          <Card style={{ backgroundColor: '#F2EBDC', border: 'none' }}>
            <Card.Body>
              <Card.Text><strong>Marca:</strong> {product?.marca}</Card.Text>
              <Card.Text>
                <strong>Precio:</strong> {new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(product?.precio)}
              </Card.Text>
              <Card.Text><strong>Talla:</strong> {product?.talla}</Card.Text>
              <Card.Text><strong>Condición:</strong> {product?.condicion}</Card.Text>
              <Card.Text><strong>Categoría:</strong> {product?.categoria}</Card.Text>
              <Card.Text><strong>Año:</strong> {product?.ano}</Card.Text>
              <Card.Text>
                <strong>Descripción:</strong> {showFullDescription ? product?.descripcion : `${product?.descripcion.slice(0, 150)}...`}
                <span
                  style={{ color: 'blue', cursor: 'pointer' }}
                  onClick={() => setShowFullDescription(!showFullDescription)}
                >
                  {showFullDescription ? ' Ver menos' : ' Ver más'}
                </span>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4} className="d-flex flex-column align-items-start">
          <Button variant="primary" className="mb-2" onClick={handleAddToCart}>
            Agregar al Carrito
          </Button>
          <Button
            variant={isFavorito ? 'danger' : 'outline-danger'}
            className="mb-2"
            onClick={toggleFavorito}
          >
            {isFavorito ? '❤️ Quitar de Favoritos' : '🤍 Agregar a Favoritos'}
          </Button>
          <Button variant="success" onClick={() => alert('Función pendiente')}>
            Compra Inmediata
          </Button>
        </Col>
      </Row>

      {/* Foro */}
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

          {forum.slice(0, 3).map((entry, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Text><strong>Pregunta:</strong> {entry.pregunta}</Card.Text>
                {entry.respuesta ? (
                  <Card.Text><strong>Respuesta:</strong> {entry.respuesta}</Card.Text>
                ) : (
                  getUserFromToken()?.id === product?.usuario_id && (
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const answer = e.target.elements.answer.value;
                        handleAnswerQuestion(index, answer);
                      }}
                    >
                      <Form.Group controlId={`answer-${index}`}>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Escribe tu respuesta..."
                          name="answer"
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit" className="mt-2">
                        Enviar Respuesta
                      </Button>
                    </Form>
                  )
                )}
                {product?.usuario_id === getUserFromToken()?.id && (
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => handleDeleteQuestion(index)}
                  >
                    Eliminar Pregunta
                  </Button>
                )}
              </Card.Body>
            </Card>
          ))}

          {forum.length > 3 && !showMoreQuestions && (
            <Button variant="link" onClick={() => setShowMoreQuestions(true)}>
              Ver más preguntas
            </Button>
          )}

          {showMoreQuestions && forum.slice(3).map((entry, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Text><strong>Pregunta:</strong> {entry.pregunta}</Card.Text>
                {entry.respuesta ? (
                  <Card.Text><strong>Respuesta:</strong> {entry.respuesta}</Card.Text>
                ) : (
                  getUserFromToken()?.id === product?.usuario_id && (
                    <Form
                      onSubmit={(e) => {
                        e.preventDefault();
                        const answer = e.target.elements.answer.value;
                        handleAnswerQuestion(index + 3, answer);
                      }}
                    >
                      <Form.Group controlId={`answer-${index}`}>
                        <Form.Control
                          as="textarea"
                          rows={2}
                          placeholder="Escribe tu respuesta..."
                          name="answer"
                        />
                      </Form.Group>
                      <Button variant="primary" type="submit" className="mt-2">
                        Enviar Respuesta
                      </Button>
                    </Form>
                  )
                )}
                {product?.usuario_id === getUserFromToken()?.id && (
                  <Button
                    variant="danger"
                    className="mt-2"
                    onClick={() => handleDeleteQuestion(index + 3)}
                  >
                    Eliminar Pregunta
                  </Button>
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