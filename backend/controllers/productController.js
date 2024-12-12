import pool from '../config/db.js'; // Importar el pool de conexiones

const createProduct = async (req, res) => {
  const {
    nombre,
    marca,
    talla,
    ano,
    condicion,
    precio,
    categoria,
    descripcion,
    imagenes,
    usuario_id,
  } = req.body;

  try {
    // Validar que todos los campos obligatorios estén presentes
    if (
      !nombre || 
      !marca || 
      !talla || 
      !ano || 
      !condicion || 
      !precio || 
      !categoria || 
      !descripcion || 
      !usuario_id
    ) {
      return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    // Validar el campo `imagenes`
    const imageArray = 
      typeof imagenes === 'string' 
        ? JSON.parse(imagenes) 
        : Array.isArray(imagenes) 
          ? imagenes 
          : [];

    if (!Array.isArray(imageArray) || imageArray.length === 0) {
      return res.status(400).json({ message: 'Debe proporcionar al menos una URL de imagen' });
    }

    // Insertar en la base de datos
    const query = `
      INSERT INTO productos 
      (nombre, marca, talla, ano, condicion, precio, categoria, descripcion, imagenes, usuario_id) 
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`;
    const values = [nombre, marca, talla, ano, condicion, precio, categoria, descripcion, imageArray, usuario_id];

    const result = await pool.query(query, values);

    // Respuesta de éxito
    res.status(201).json({
      message: 'Producto creado con éxito',
      product: result.rows[0],
    });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({
      message: 'Error al crear el producto',
      error: error.message,
    });
  }
};

const getProducts = async (req, res) => {
  try {
    // Consultamos todos los productos de la base de datos
    const result = await pool.query(
      'SELECT id, usuario_id, nombre, descripcion, precio, condicion, categoria, marca, talla, ano, imagenes, creado_en, actualizado_en FROM productos'
    );

    // Enviamos la lista de productos como respuesta
    res.status(200).json({
      message: 'Productos obtenidos con éxito',
      products: result.rows, // Devuelves los productos que obtuviste
    });
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({
      message: 'Error al obtener los productos',
      error: error.message,
    });
  }
};

// Función para obtener productos de un usuario
const getUserProducts = async (req, res) => {
  const usuario_id = req.user?.id; // Asegúrate de que req.user tenga el id correcto

  if (!usuario_id) {
    return res.status(400).json({ message: 'ID de usuario no encontrado en el token.' });
  }

  try {
    const query = 'SELECT * FROM productos WHERE usuario_id = $1';
    const result = await pool.query(query, [usuario_id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No se encontraron productos para este usuario.' });
    }

    res.status(200).json({
      message: 'Productos obtenidos con éxito',
      products: result.rows, // Devuelves los productos que obtuviste
    });
  } catch (error) {
    console.error('Error al obtener los productos del usuario:', error);
    res.status(500).json({
      message: 'Error al obtener los productos',
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    // Asegurarse de devolver los datos correctamente en formato JSON
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener el producto:', error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};









export { createProduct, getUserProducts, getProducts, getProductById }; // Exportamos ambos métodos



