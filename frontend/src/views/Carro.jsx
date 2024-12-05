import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/cartContext'; // Usamos el hook del contexto

function Carro() {
  const { cart, removeFromCart, updateQuantity, clearCart, calculateTotal } = useCart();

  const handleProceedToCheckout = () => {
    alert('Procediendo al pago...');
    // Aquí puedes redirigir a una página de pago o implementar la lógica correspondiente
  };

  return (
    <div className="m-5 carro">
      <h2>Mi Carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {cart.map((item) => (
              <li key={item.id}>
                <div className='custom-card-item-cart'>
                  <div>
                    <img  className="m-2" 
                          src={item.image_url} 
                          alt={item.name} 
                          style={{ width: '200px' }} />
                  </div>
                  <div>
                  <div className='m-2 justify-content-center'>
                    <h3><strong>{item.name}</strong></h3>
                  </div>

                  <div className='m-2'
                      style={{ height: 'auto' }}>
                    <Button
                      onClick={() => updateQuantity(item.id, Math.max(item.quantity - 1, 1))}
                    >
                      -
                    </Button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, Math.max(parseInt(e.target.value), 1))}
                        style={{ width: '50px', height: '40px' }}
                      />
                    <Button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>

                  <div>
                    Precio: ${item.price}
                  </div>

                  <div>
                    Subtotal: ${item.price * item.quantity}
                  </div>

                    <Button className="m-2" 
                            variant="danger" 
                            onClick={() => removeFromCart(item.id)}>
                      Eliminar
                    </Button>


                  </div>
                  

                </div>

              </li>
            ))}
          </ul>
          <div className="total">
            <strong>Total: ${calculateTotal()}</strong>
          </div>
          <div className="actions">
            <Button className="m-2" variant="warning" onClick={clearCart}>
              Vaciar Carrito
            </Button>
            <Button className="m-2" variant="success" onClick={handleProceedToCheckout}>
              Proceder a Pagar
            </Button>
          </div>
        </div>
      )}

      <Link to="/">Volver al Inicio</Link>
    </div>
  );
}

export default Carro;
