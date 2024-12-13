import express from 'express';
import { getConsultasByProduct, createConsulta, updateConsulta, deleteConsulta } from '../controllers/consultasController.js';
import authenticateToken from '../middlewares/authenticateToken.js'; // Asegura que el usuario esté autenticado

const router = express.Router();

// Obtener todas las consultas de un producto
router.get('/:id', getConsultasByProduct);

// Crear una nueva consulta (requiere autenticación)
router.post('/', authenticateToken, createConsulta);

// Actualizar una consulta (requiere autenticación)
router.put('/:id', authenticateToken, updateConsulta);

// Eliminar una consulta (requiere autenticación)
router.delete('/:id', authenticateToken, deleteConsulta);

export default router;