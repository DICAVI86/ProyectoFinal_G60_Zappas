import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import api from '../services/api'; // Asegúrate de que esta ruta esté correcta

function CrearProducto() {
  const [productData, setProductData] = useState({
    nombre: "",
    marca: "",
    talla: "",
    ano: "",
    uso: "Nuevo",
    precio: "",
    categoria: "",
  });

  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Generar previsualización
    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setPreviews(previewUrls);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // Añadir los datos del producto
    Object.keys(productData).forEach(key => formData.append(key, productData[key]));
    
    // Añadir las imágenes
    images.forEach(image => formData.append('imagenes', image));  // Asegúrate de que el campo sea 'imagenes'

    try {
      const response = await api.post('/products/create', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Agrega el token JWT en la cabecera
        },
      });      
      console.log('Producto creado:', response.data);
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Agregar Producto</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Nombre Producto</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa el nombre del producto"
            name="nombre"
            value={productData.nombre}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Row>
          <Form.Group className="mb-3" controlId="productBrand" as={Col}>
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa la marca del producto"
              name="marca"
              value={productData.marca}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productSize" as={Col}>
            <Form.Label>Talla</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresa la talla"
              name="talla"
              value={productData.talla}
              onChange={handleInputChange}
              required
            />
          </Form.Group>
        </Row>

        <Row>
          <Form.Group className="mb-3" controlId="productYear" as={Col}>
            <Form.Label>Año</Form.Label>
            <Form.Control
              type="number"
              placeholder="Ingresa el año"
              name="ano" // Asegúrate de que coincida con el campo en productData
              value={productData.ano}
              onChange={handleInputChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCondition" as={Col}>
            <Form.Label>Uso</Form.Label>
            <Form.Select
              name="uso"
              value={productData.uso}
              onChange={handleInputChange}
            >
              <option value="Nuevo">Nuevo</option>
              <option value="Medio">Medio</option>
              <option value="Bastante">Bastante</option>
            </Form.Select>
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="productPrice">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ingresa el precio"
            name="precio"
            value={productData.precio}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productCategory">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingresa la categoría"
            name="categoria"
            value={productData.categoria}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="productImages">
          <Form.Label>Subir Imágenes</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <Row className="mt-3">
            {previews.map((src, index) => (
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