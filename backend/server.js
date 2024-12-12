// Configuración de arranque del servidor Express

// server.js
import app from './app.js';
import { config } from './config/config.js';

// Middleware para servir el frontend
app.use(express.static(path.join(__dirname, "public")));

// API de ejemplo
app.get("/api", (req, res) => {
  res.json({ message: "¡Hola desde el backend!" });
});

// Redirigir cualquier ruta desconocida al frontend
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(config.port, () => {
  console.log(`Servidor corriendo en el puerto ${config.port}`);
});
