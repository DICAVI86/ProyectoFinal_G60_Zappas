import React, { useState } from 'react';
import {Button, Container} from 'react-bootstrap';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function CrearUsuario() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '', 
    confirmarContrasena: '',
    direccion: '',
    region: '',
    ciudad: '',
    comuna: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { nombre, apellido, correo, contrasena, confirmarContrasena, direccion, region, ciudad, comuna } = formData;

    if (!nombre || !apellido || !correo || !contrasena || !confirmarContrasena || !direccion || !region || !ciudad || !comuna) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    if (contrasena !== confirmarContrasena) { 
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (contrasena.length < 6) { 
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }


    try {
      const response = await api.post('/users/register', {
        nombre,
        apellido,
        correo,
        contrasena, 
        direccion,
        region,
        ciudad,
        comuna,
      });

      if (response.status === 201) {
        navigate('/iniciosesion');
      } else {
        setError('Error al registrar el usuario');
      }
    } catch (error) {
      console.error(error);
      setError('Hubo un error al crear el usuario. Intenta nuevamente.');
    }
  };

  return (
    <Container className='m-5'>
      <Form onSubmit={handleSubmit}>
        <h1>Crear Usuario</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              placeholder="Nombre"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              type="text"
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              placeholder="Apellido"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              placeholder="Correo electrónico"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="contrasena"
              value={formData.contrasena}
              onChange={handleChange}
              placeholder="Contraseña"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Confirmar Contraseña</Form.Label>
            <Form.Control
              type="password"
              name="confirmarContrasena"
              value={formData.confirmarContrasena}
              onChange={handleChange}
              placeholder="Confirmar Contraseña"
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Dirección</Form.Label>
          <Form.Control
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            placeholder="Dirección"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Región</Form.Label>
            <Form.Control
              type="text"
              name="region"
              value={formData.region}
              onChange={handleChange}
              placeholder="Región"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Ciudad</Form.Label>
            <Form.Control
              type="text"
              name="ciudad"
              value={formData.ciudad}
              onChange={handleChange}
              placeholder="Ciudad"
            />
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Comuna</Form.Label>
            <Form.Control
              type="text"
              name="comuna"
              value={formData.comuna}
              onChange={handleChange}
              placeholder="Comuna"
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Registrar
        </Button>
      </Form>
    </Container>
  );
}

export default CrearUsuario;


