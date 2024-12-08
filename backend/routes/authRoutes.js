//routes/authRoutes
import express from 'express';
import { registerUser, loginUser, getUsers } from '../controllers/authController.js';
import validateInputs from '../middlewares/validateInputs.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', validateInputs, registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener todos los usuarios (requiere autenticación)
router.get('/', authenticateToken, getUsers);

export default router;