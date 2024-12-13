import React, { useState } from "react";
import { Container, Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function CrearProducto() {
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [talla, setTalla] = useState("");
  const [ano, setAno] = useState("");
  const [condicion, setCondicion] = useState("Nuevo");
  const [precio, setPrecio] = useState("");
  const [categoria, setCategoria] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(""); // URL individual
  const [imagenes, setImagenes] = useState([]); // Array de URLs
  const navigate = useNavigate();

  const agregarImagen = () => {
    if (imagen.trim() !== "" && !imagenes.includes(imagen)) {
      setImagenes([...imagenes, imagen]);
      setImagen(""); // Limpiar el campo
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const producto = {
      nombre,
      marca,
      talla,
      ano,
      condicion,
      precio,
      categoria,
      descripcion,
      imagenes,
    };

    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token no encontrado");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const usuario_id = decodedToken.userId;

    if (!usuario_id) {
      console.error("No se encontró el usuario_id en el token");
      return;
    }

    try {
      const response = await api.post(
        "/products/create",
        { ...producto, usuario_id },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        }
      );
      console.log("Producto creado:", response.data);
      navigate("/perfil");
    } catch (error) {
      console.error(
        "Error al crear producto:",
        error.response ? error.response.data : error.message
      );
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Agregar Producto</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </Form.Group>
        

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Marca</Form.Label>
              <Form.Control
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Talla</Form.Label>
              <Form.Control
                type="text"
                value={talla}
                onChange={(e) => setTalla(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Año</Form.Label>
              <Form.Control
                type="number"
                value={ano}
                onChange={(e) => setAno(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Condición</Form.Label>
              <Form.Select
                value={condicion}
                onChange={(e) => setCondicion(e.target.value)}
              >
                <option value="Nuevo">Nuevo</option>
                <option value="Usado">Usado</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Agregar Imágenes (URLs)</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la URL de la imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
          <Button variant="secondary" onClick={agregarImagen} className="mt-2">
            Agregar URL
          </Button>
          <Row className="mt-3">
            {imagenes.map((src, index) => (
              <Col key={index} xs={3} className="mb-3">
                <img
                  src={src}
                  alt={`preview-${index}`}
                  className="img-fluid rounded"
                />
              </Col>
            ))}
          </Row>
        </Form.Group>

        <Button variant="primary" type="submit">
          Agregar Producto
        </Button>
      </Form>
    </Container>
  );
}

export default CrearProducto;





