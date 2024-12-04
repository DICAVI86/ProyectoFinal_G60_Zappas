import { createContext, useState } from "react";

export const FavoritosContext = createContext();

export function FavoritosProvider({ children }) {
  const [favoritos, setFavoritos] = useState([]);

  const addFavorito = (product) => {
    setFavoritos([...favoritos, product]);
  };

  const removeFavorito = (id) => {
    setFavoritos(favoritos.filter((product) => product.id !== id));
  };

  return (
    <FavoritosContext.Provider value={{ favoritos, addFavorito, removeFavorito }}>
      {children}
    </FavoritosContext.Provider>
  );
}
