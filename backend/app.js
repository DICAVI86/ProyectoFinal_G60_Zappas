// app.js
import express from 'express';
import productRoutes from './routes/productRoutes.js';
import authRoutes from './routes/authRoutes.js';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:5173',  // Permite solicitudes solo desde este origen
};

app.use(cors(corsOptions));

// Hacer que la carpeta 'uploads' sea accesible públicamente
app.use('/uploads', express.static('uploads'));

// Rutas
app.use('/api/products', productRoutes); // Aquí estamos usando '/api/products' como el prefijo para las rutas de los productos
app.use('/api/users', authRoutes); // Aquí estamos usando '/api/users' como el prefijo para las rutas de usuarios

export default app;