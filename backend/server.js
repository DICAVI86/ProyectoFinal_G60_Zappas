// Configuración de arranque del servidor Express

const app = require('./app');
const PORT = 3000

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
