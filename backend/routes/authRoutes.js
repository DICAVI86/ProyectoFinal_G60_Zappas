//routes/authRoutes
import express from 'express';
import { registerUser, loginUser, getUsers, getProfile, updateProfilePic } from '../controllers/authController.js';
import validateInputs from '../middlewares/validateInputs.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', validateInputs, registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta para obtener todos los usuarios (requiere autenticación)
router.get('/', authenticateToken, getUsers);

// Ruta para obtener la información de mi usuario autenticado
router.get('/profile', authenticateToken, getProfile);

// Ruta para actualizar la foto de perfil
router.put('/updateProfilePic', authenticateToken, updateProfilePic);

export default router;