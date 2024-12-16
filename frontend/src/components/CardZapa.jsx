import React, { useState, useEffect, useContext } from "react";
import { useCart } from "../context/cartContext";
import { FavoritosContext } from "../context/favoritosContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext"; // Importamos el contexto de autenticación

function CardZapa({ product }) {
  const { addToCart } = useCart();
  const { favoritos, addFavorito, removeFavorito } = useContext(FavoritosContext);
  const { isLoggedIn } = useAuth(); // Obtenemos el estado de autenticación
  const navigate = useNavigate();

  const [isFavorito, setIsFavorito] = useState(false);

  useEffect(() => {
    setIsFavorito(favoritos.some((fav) => fav.id === product.id));
  }, [favoritos, product.id]);

  const toggleFavorito = () => {
    if (isFavorito) {
      removeFavorito(product.id);
    } else {
      addFavorito(product);
    }
    setIsFavorito((prev) => !prev);
  };

  const handleViewDetail = () => {
    navigate(`/detalle/${product.id}`, { state: { product } });
  };

  const handleAddToCart = () => {
    if (isLoggedIn) {
      addToCart(product);
    } else {
      alert("Necesitas estar logueado para agregar al carrito");
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
    }).format(price);
  };

  return (
    <div className="card m-3" style={{ width: "18rem", position: "relative" }}>
      {/* Imagen del producto */}
      <img src={product.imagenes[0]} alt={product.nombre} className="card-img-top" />

      {/* Corazón favoritos */}
      <span
        className={`heart-icon ${isFavorito ? "active" : ""}`}
        onClick={toggleFavorito}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          cursor: "pointer",
        }}
      >
        ♥
      </span>

      <div className="card-body text-center">
        {/* Nombre del producto */}
        <h5 className="card-title">{product.nombre}</h5>

        {/* Condición del producto */}
        <p className="card-text">
          <strong>Condición:</strong> {product.condicion}
        </p>

        {/* Año del producto */}
        <p className="card-text">
          <strong>Año:</strong> {product.ano || "No especificado"}
        </p>

        {/* Precio del producto */}
        <p className="card-text">
          <strong>Precio:</strong> <span style={{ fontWeight: "bold" }}>{formatPrice(product.precio)}</span>
        </p>

        {/* Botones */}
        <div className="d-flex justify-content-between align-items-center">
          <button className="btn btn-secondary m-1 custom-button" onClick={handleAddToCart}>
            Agregar al carrito
          </button>
          <button className="btn btn-primary m-1 custom-button" onClick={handleViewDetail}>
            Detalle
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardZapa;