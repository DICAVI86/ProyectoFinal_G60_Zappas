import React, { useContext } from "react";
import { FavoritosContext } from "../context/favoritosContext";
import CardZapa from "../components/CardZapa";
import { Container, Row, Col } from "react-bootstrap";

function Favoritos() {
  const { favoritos } = useContext(FavoritosContext);

  return (
    <Container className="m-5">
      <h1>Mis Favoritos</h1>
      <Row className="mt-4">
        {favoritos.length > 0 ? (
          favoritos.map((product) => (
            <Col sm={12} md={6} lg={4} key={product.id}>
              <CardZapa product={product} />
            </Col>
          ))
        ) : (
          <p>No tienes productos en tus favoritos.</p>
        )}
      </Row>
    </Container>
  );
}

export default Favoritos;