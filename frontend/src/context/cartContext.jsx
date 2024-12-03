import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto del carrito
const CartContext = createContext();

// Crear un proveedor para el contexto
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    return savedCart ? savedCart : [];
  });

  // Función para actualizar el carrito en localStorage
  const updateCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Función para agregar productos al carrito
  const addToCart = (product) => {
    const productInCart = cart.find((item) => item.id === product.id);

    if (productInCart) {
      const newCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      updateCart(newCart);
    } else {
      updateCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Función para eliminar un producto del carrito
  const removeFromCart = (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    updateCart(newCart);
  };

  // Función para actualizar la cantidad de un producto
  const updateQuantity = (productId, newQuantity) => {
    const newCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    updateCart(newCart);
  };

  // Función para vaciar el carrito
  const clearCart = () => {
    updateCart([]);
  };

  // Función para calcular el total
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        calculateTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  return useContext(CartContext);
};
