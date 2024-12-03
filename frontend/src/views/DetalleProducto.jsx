import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function DetalleProducto() {
  const location = useLocation();
  const navigate = useNavigate(); // Inicializamos el hook useNavigate
  const { product } = location.state || {}; // Obtenemos los datos del producto desde el state

  if (!product) {
    return <p>Producto no encontrado</p>;
  }

  const handleDevolver = () => {
    navigate('/'); // Navega a la página principal
  };

  return (
    <div className="detalle-producto m-4">
      <h2>Detalle del Producto</h2>
      <img src={product.image_url} alt={product.name} />
      <h3>{product.name}</h3>
      <p><strong>Condición:</strong> {product.condition}</p>
      <p><strong>Descripción:</strong> {product.description}</p>
      <p><strong>Precio:</strong> ${product.price}</p>
      <p><strong>Fecha de creación:</strong> {new Date(product.created_at).toLocaleDateString()}</p>
      
      <div className="d-flex justify-content-left mt-4">
        <button className="btn btn-secondary" onClick={handleDevolver}>
          volver
        </button>
      </div>
    </div>
  );
}

export default DetalleProducto;
