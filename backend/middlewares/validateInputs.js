// Middleware para validar datos de entrada

// middlewares/validateInputs.js
const validateInputs = (req, res, next) => {
  const { nombre, apellido, correo, contrasena, direccion, region, ciudad, comuna } = req.body;

  
    if (!nombre || !apellido || !correo || !contrasena || !direccion || !region || !ciudad || !comuna) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios.' });
    }
  
    next();
  };
  
  export default validateInputs;
  