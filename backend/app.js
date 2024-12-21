import express from 'express';
import productRoutes from './routes/productRoutes.js';
import consultasRoutes from './routes/consultasRoutes.js'; // Importa las rutas de consultas
import authRoutes from './routes/authRoutes.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
  origin: 'https://tu-dominio-en-render.com', // Actualiza con el dominio de tu frontend en producción
};
app.use(cors(corsOptions));

// Hacer que la carpeta 'uploads' sea accesible públicamente
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/products', productRoutes);
app.use('/api/consultas', consultasRoutes); // Rutas para consultas
app.use('/api/users', authRoutes);

export default app;

