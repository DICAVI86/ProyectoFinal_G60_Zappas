import express from 'express';
import { createProduct } from '../controllers/productController.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import { upload } from '../middlewares/uploadMiddleware.js';

const router = express.Router();

// Ruta para crear un producto
router.post('/create', authenticateToken, upload.array('images'), createProduct);

export default router;
