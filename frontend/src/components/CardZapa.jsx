import React, { useState, useEffect, useContext } from "react";
import { useCart } from "../context/cartContext";
import { FavoritosContext } from "../context/favoritosContext";
import { useNavigate } from "react-router-dom";

function CardZapa({ product }) {
  const { addToCart } = useCart();
  const { favoritos, addFavorito, removeFavorito } = useContext(FavoritosContext);
  const navigate = useNavigate(); // Hook para navegación

  // Estado inicial sincronizado con el contexto
  const [isFavorito, setIsFavorito] = useState(false);

  useEffect(() => {
    // Sincronizar estado local con el contexto al montar el componente o cambiar los favoritos
    setIsFavorito(favoritos.some((fav) => fav.id === product.id));
  }, [favoritos, product.id]);

  const toggleFavorito = () => {
    if (isFavorito) {
      removeFavorito(product.id); // Quitar de favoritos
    } else {
      addFavorito(product); // Agregar a favoritos
    }
    setIsFavorito((prev) => !prev); // Actualizar el estado visual
  };

  const handleViewDetail = () => {
    navigate(`/detalle/${product.id}`, { state: { product } }); // Navega al detalle del producto con datos
  };

  return (
    <div className="card m-3" style={{ width: "18rem", position: "relative" }}>
      {/* Imagen del producto */}
      <img src={product.image_url} alt={product.name} className="card-img-top" />

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

      <div className="card-body">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text">{product.description}</p>
        <p>
          <strong>Precio:</strong> ${product.price}
        </p>
        <div className="d-flex justify-content-between align-items-center">

          <button className="btn btn-secondary m-1 custom-button" onClick={() => addToCart(product)}>
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
