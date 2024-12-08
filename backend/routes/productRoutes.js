// routes/productRoutes.js
import express from 'express';
import { createProduct, getProducts } from '../controllers/productController.js';

const router = express.Router();

// Ruta para crear un producto
router.post('/create', createProduct);

// Ruta para obtener todos los productos
router.get('/', getProducts);

export default router;