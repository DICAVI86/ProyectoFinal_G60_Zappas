import React from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

function CrearUsuario() {
  return (
    <Form>
        <h1>Crear Usuario</h1>
      <Row className="mb-3">
        <Form.Group as={Col}>
          <Form.Label>Nombre</Form.Label>
          <Form.Control placeholder="Nombre" />
        </Form.Group>

        <Form.Group as={Col}>
          <Form.Label>Apellido</Form.Label>
          <Form.Control placeholder="Apellido" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
            <Form.Label>Correo electronico</Form.Label>
            <Form.Control type="email" placeholder="e-mail" />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col}>
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="minimo 6 caracteres" />
        </Form.Group>

        <Form.Group as={Col}>
            <Form.Label>Confirmar contraseña</Form.Label>
            <Form.Control type="password" placeholder="" />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Direccion</Form.Label>
        <Form.Control placeholder="Direccion" />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Región</Form.Label>
          <Form.Control />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Ciudad</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>Choose...</option>
            <option>...</option>
          </Form.Select>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Comuna</Form.Label>
          <Form.Control />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit">
        OK
      </Button>
    </Form>
  )
}

export default CrearUsuario