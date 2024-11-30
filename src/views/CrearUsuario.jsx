import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router-dom';  // Para redirigir al usuario después del registro

function CrearUsuario() {
  // Estado de los campos del formulario
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmarContraseña, setConfirmarContraseña] = useState('');
  const [direccion, setDireccion] = useState('');
  const [region, setRegion] = useState('');
  const [ciudad, setCiudad] = useState('');
  const [comuna, setComuna] = useState('');

  // Estado para manejar errores de validación
  const [error, setError] = useState('');

  const navigate = useNavigate(); // Para redirigir a otra página después del registro

  // Función para manejar el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();

    // Validar campos requeridos
    if (!nombre || !apellido || !email || !contraseña || !confirmarContraseña || !direccion || !region || !ciudad || !comuna) {
      setError('Todos los campos son obligatorios.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (contraseña !== confirmarContraseña) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    // Validar que la contraseña tenga al menos 6 caracteres
    if (contraseña.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Si todo es válido, hacer la solicitud para crear el usuario (por ahora solo un console.log)
    const usuario = {
      nombre,
      apellido,
      email,
      contraseña,
      direccion,
      region,
      ciudad,
      comuna,
    };

    // Aquí se puede hacer una solicitud a la API, por ejemplo:
    // fetch('/api/registro', { method: 'POST', body: JSON.stringify(usuario) })
    //   .then(response => response.json())
    //   .then(data => console.log('Usuario registrado', data))
    //   .catch(error => console.error('Error:', error));

    console.log('Usuario registrado:', usuario);

    // Redirigir a la página de inicio de sesión o donde desees después del registro
    navigate('/iniciosesion');
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h1>Crear Usuario</h1>

      {/* Mostrar errores si existen */}
      {error && <div className="alert alert-danger">{error}</div>}

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Apellido</Form.Label>
          <Form.Control
            type="text"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Correo electrónico</Form.Label>
          <Form.Control
            type="email"
            placeholder="e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="mínimo 6 caracteres"
            value={contraseña}
            onChange={(e) => setContraseña(e.target.value)}
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Confirmar contraseña</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmar contraseña"
            value={confirmarContraseña}
            onChange={(e) => setConfirmarContraseña(e.target.value)}
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Dirección</Form.Label>
        <Form.Control
          type="text"
          placeholder="Dirección"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Región</Form.Label>
          <Form.Control
            type="text"
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            placeholder="Escribe la región"
          />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Ciudad</Form.Label>
          <input
            type="text"
            className="form-control"
            value={ciudad}
            onChange={(e) => setCiudad(e.target.value)}
            placeholder="Escribe la ciudad"
          />
        </Form.Group>


        <Form.Group as={Col}>
          <Form.Label>Comuna</Form.Label>
          <Form.Control
            type="text"
            value={comuna}
            onChange={(e) => setComuna(e.target.value)}
            placeholder="Escribe la comuna"
          />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        Registrar
      </Button>
    </Form>
  );
}

export default CrearUsuario;
