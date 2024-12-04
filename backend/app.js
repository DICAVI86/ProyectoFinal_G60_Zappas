// app.js
import express from 'express';
import productRoutes from './routes/productRoutes.js'; 
import authRoutes from './routes/authRoutes.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());  // Para manejar JSON en las peticiones

// Rutas
app.use('/api/products', productRoutes); // Aquí estamos usando '/api/producrs' como el prefijo para las rutas de los productos
app.use('/api/users', authRoutes); // Aquí estamos usando '/api/users' como el prefijo para las rutas de usuarios

export default app;
