import express from 'express';
import { getProductById, createProduct, getUserProducts, getProducts } from '../controllers/productController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

// Crear un producto (requiere autenticación)
router.post('/create', authenticateToken, createProduct);

// Obtener todos los productos
router.get('/', getProducts);

// Obtener productos de un usuario específico (requiere autenticación)
router.get('/user', authenticateToken, getUserProducts);

// Obtener un producto por su ID
router.get('/:id', getProductById);


export default router;



