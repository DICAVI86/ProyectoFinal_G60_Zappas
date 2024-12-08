// routes/orderRoutes.js

import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';  // Asegúrate de que esta importación sea correcta

const router = express.Router();

// Ruta para crear un pedido
router.post('/create', createOrder);

// Ruta para obtener todos los pedidos
router.get('/', getOrders);

export default router;