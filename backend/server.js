import app from './app.js';
import { config } from './config/config.js';
import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

// Middleware para servir el frontend
app.use(express.static(path.join(__dirname, 'public')));

// API de ejemplo
app.get('/api', (req, res) => {
  res.json({ message: '¡Hola desde el backend!' });
});

// Redirigir cualquier ruta desconocida al frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;

app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});

