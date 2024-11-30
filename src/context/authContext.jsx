import React, { createContext, useState, useContext } from 'react';

// Crear el contexto de autenticación
const AuthContext = createContext();

// Crear un proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para iniciar sesión
  const login = () => {
    setIsLoggedIn(true);
  };

  // Función para cerrar sesión
  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto en otros componentes
export const useAuth = () => useContext(AuthContext);
