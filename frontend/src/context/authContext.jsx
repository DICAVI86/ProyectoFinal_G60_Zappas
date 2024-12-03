import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Inicializamos el estado de autenticación con el valor de localStorage si está disponible
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    // Verificar si el token de sesión está en localStorage
    const storedToken = localStorage.getItem('authToken');
    return storedToken ? true : false;
  });

  // Función para iniciar sesión
  const login = () => {
    // Guardamos un token ficticio en localStorage al iniciar sesión
    localStorage.setItem('authToken', 'some_token_value');
    setIsLoggedIn(true); // Actualizamos el estado
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.removeItem('authToken'); // Eliminamos el token de localStorage
    setIsLoggedIn(false); // Actualizamos el estado
  };

  // En el hook useEffect, podemos recuperar el estado al cargar la aplicación
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setIsLoggedIn(true); // Si existe el token, el usuario está logueado
    } else {
      setIsLoggedIn(false); // Si no hay token, el usuario no está logueado
    }
  }, []);
  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder al contexto en otros componentes
export const useAuth = () => useContext(AuthContext);

