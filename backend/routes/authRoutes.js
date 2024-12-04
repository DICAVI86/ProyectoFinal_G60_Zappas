// routes/authRoutes.js
import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import validateInputs from '../middlewares/validateInputs.js';

const router = express.Router();

// Ruta para registrar un usuario
router.post('/register', validateInputs, registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

export default router;

