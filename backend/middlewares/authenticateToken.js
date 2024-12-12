// Middleware para verificar JWT

// middlewares/authenticateToken.js
import jwt from 'jsonwebtoken';
import { config } from '../config/config.js';

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. No hay token.' });
  }

  try {
    const decoded = jwt.verify(token, config.jwtSecret);
    console.log('Usuario ID desde el token:', decoded.userId);  // Verificar el campo correcto
    req.user = { id: decoded.userId }; // Asegurarse de pasar el ID al objeto user
    next();
  } catch (error) {
    console.error('Token inválido:', error.message);
    res.status(400).json({ error: 'Token inválido.' });
  }
};




export default authenticateToken;