import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, Alert, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";  // Asegúrate de que esta ruta esté correcta

function Perfil() {
  const [userProducts, setUserProducts] = useState([]); // Inicializa como array vacío
  const [userProfile, setUserProfile] = useState(null); // Estado para almacenar el perfil del usuario
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProfilePicUrl, setNewProfilePicUrl] = useState("");  // Estado para almacenar la nueva URL de la foto de perfil
  const [showInput, setShowInput] = useState(false);  // Estado para mostrar el input de la URL
  const [updatingPic, setUpdatingPic] = useState(false);  // Estado para indicar si la foto está siendo actualizada
  const navigate = useNavigate();

  // Función para obtener productos del usuario autenticado
  const fetchUserProducts = async () => {
    try {
      const response = await api.get("/products/user", {
        headers: {
          "Cache-Control": "no-cache",
        },
      });
      setUserProducts(response.data.products || []);
    } catch (error) {
      setError("Hubo un problema al cargar los productos.");
      setUserProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // Función para obtener el perfil del usuario autenticado
  const fetchUserProfile = async () => {
    try {
      const response = await api.get("/users/profile");
      setUserProfile(response.data);  // Guardamos los datos del perfil en el estado
    } catch (error) {
      setError("Hubo un problema al cargar tu perfil.");
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar la foto de perfil
  const handleProfilePicChange = async (event) => {
    event.preventDefault();
    if (newProfilePicUrl) {
      setUpdatingPic(true);  // Indicamos que estamos actualizando la foto
      try {
        const response = await api.put("/users/updateProfilePic", {
          foto_perfil: newProfilePicUrl,  // Enviar la URL de la foto
        });

        setUserProfile(prevState => ({
          ...prevState,
          foto_perfil: newProfilePicUrl,  // Actualizamos el estado con la nueva foto
        }));

        setShowInput(false);  // Ocultamos el input después de actualizar la foto
        setNewProfilePicUrl("");  // Limpiamos el campo de URL
      } catch (error) {
        setError("Hubo un problema al actualizar la foto de perfil.");
      } finally {
        setUpdatingPic(false);  // Terminamos el proceso de actualización
      }
    } else {
      setError("Por favor, ingresa una URL válida.");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  useEffect(() => {
    fetchUserProducts();
    fetchUserProfile();
  }, []);

  const handleAddProduct = () => {
    navigate("/crearproducto");
  };

  const handleViewDetail = (productId) => {
    navigate(`/detalle/${productId}`);
  };

  const handleAvatarClick = () => {
    setShowInput(true);  // Mostramos el input cuando se hace clic en el avatar
  };

  return (
    <Container className="py-5">
      <Row className="my-5">
        <Col md={3} className="text-center">
          <div className="profile-picture">
            {userProfile ? (
              <img
                src={userProfile?.foto_perfil || "https://via.placeholder.com/150"}
                alt="Foto de perfil"
                className="rounded-circle"
                style={{
                  width: "150px",
                  height: "150px",
                  objectFit: "cover",
                  cursor: "pointer"  // Indicamos que la imagen es clickeable
                }}
                onClick={handleAvatarClick}  // Activamos el input al hacer clic en el avatar
              />
            ) : (
              <Spinner animation="border" />
            )}

            {showInput && (
              <Form onSubmit={handleProfilePicChange}>
                <Form.Group>
                  <Form.Label>URL de la Foto de Perfil</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ingresa la URL de la foto"
                    value={newProfilePicUrl}
                    onChange={(e) => setNewProfilePicUrl(e.target.value)}
                  />
                </Form.Group>
                <Button
                  type="submit"
                  variant="primary"
                  className="mt-3"
                  disabled={updatingPic}  // Deshabilitamos el botón mientras se está actualizando
                >
                  {updatingPic ? "Actualizando..." : "Cambiar Foto"}
                </Button>
              </Form>
            )}
          </div>
          <div className="profile-info text-center">
            <h3 className="profile-name mt-3 mb-2">
              {userProfile ? `${userProfile.nombre} ${userProfile.apellido}` : "Cargando..."}
            </h3>
            <p className="profile-email text-muted">
              <strong>Correo:</strong> {userProfile ? userProfile.correo : ""}
            </p>
            <p className="profile-location text-muted">
              <strong>Ciudad:</strong> {userProfile ? userProfile.ciudad : ""},
              <strong>Región:</strong> {userProfile ? userProfile.region : ""}
            </p>
            <Button
              variant="primary"
              className="mt-4 mb-3"
              onClick={handleAddProduct}
              style={{ fontSize: "1.1rem", padding: "10px 20px" }}
            >
              Agregar Producto
            </Button>
          </div>


        </Col>

        <Col md={9}>
          <h4>Mis Productos</h4>

          {loading && <p>Cargando productos...</p>}
          {error && <Alert variant="danger">{error}</Alert>}
          {!loading && Array.isArray(userProducts) && userProducts.length === 0 && (
            <p>No tienes productos creados.</p>
          )}
          {!loading && Array.isArray(userProducts) && userProducts.length > 0 && (
            <Row>
              {userProducts.map((product) => (
                <Col key={product.id} md={4} className="mb-4">
                  <Card className="shadow-sm">
                    <Card.Img
                      variant="top"
                      src={product.imagenes?.[0] || "https://via.placeholder.com/150"}
                      alt="Producto"
                      className="card-img-top"
                    />
                    <Card.Body>
                      <Card.Title>{product.nombre}</Card.Title>
                      <Card.Text><strong>Condición: </strong>{product.condicion}</Card.Text>
                      <Card.Text><strong>Año: </strong>{product.ano}</Card.Text>
                      <Card.Text><strong>Precio: </strong> {formatPrice(product.precio)}</Card.Text>
                      <Button
                        variant="primary"
                        onClick={() => handleViewDetail(product.id)}
                        className="w-100"
                      >
                        Detalle
                      </Button>
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