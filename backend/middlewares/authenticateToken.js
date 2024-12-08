// Middleware para verificar JWT

// middlewares/authenticateToken.js
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Obtener token del header Authorization

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    req.user = decoded; // Almacenamos la información decodificada del usuario en el objeto req
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token inválido.' });
  }
};

export default authenticateToken;