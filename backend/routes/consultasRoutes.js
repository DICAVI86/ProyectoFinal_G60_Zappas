import express from 'express';
import { getConsultasByProduct, createConsulta } from '../controllers/consultasController.js';
import authenticateToken from '../middlewares/authenticateToken.js'; // Asegura que el usuario esté autenticado

const router = express.Router();

// Obtener todas las consultas de un producto
router.get('/:id', getConsultasByProduct);

// Crear una nueva consulta (requiere autenticación)
router.post('/', authenticateToken, createConsulta);

export default router;
