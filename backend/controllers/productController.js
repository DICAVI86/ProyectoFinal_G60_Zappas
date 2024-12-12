import pool from '../config/db.js';
import { upload } from '../middlewares/uploadMiddleware.js';  // Importamos el middleware de multer para las imágenes

// Crear producto
export const createProduct = async (req, res) => {
  const { nombre, marca, talla, ano, uso, precio, categoria, descripcion } = req.body;
  const usuario_id = req.user.userId; // El userId está decodificado del JWT

  // Obtener las imágenes de la solicitud (multiples archivos)
  const imagenes = req.files.map((file) => file.filename); // Los nombres de los archivos que multer guardó

  if (!imagenes.length) {
    return res.status(400).json({ error: 'Debe subir al menos una imagen.' });
  }

  try {
    // 1. Primero, insertemos la categoría si no existe
    let categoriaId;
    const categoriaExistente = await pool.query('SELECT id FROM categorias WHERE nombre = $1', [categoria]);
    if (categoriaExistente.rows.length > 0) {
      categoriaId = categoriaExistente.rows[0].id;  // Si la categoría existe, la usamos
    } else {
      // Si la categoría no existe, la insertamos
      const categoriaResult = await pool.query(
        'INSERT INTO categorias (nombre) VALUES ($1) RETURNING id',
        [categoria]
      );
      categoriaId = categoriaResult.rows[0].id;
    }

    // 2. Insertar el producto
    const productResult = await pool.query(
      `INSERT INTO productos (usuario_id, nombre, descripcion, precio, condicion, categoria_id, marca, talla, ano)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`,
      [
        usuario_id,
        nombre,
        descripcion,
        precio,
        uso, // Asumimos que 'uso' es el campo de condición
        categoriaId,
        marca,
        talla,
        ano
      ]
    );
    const productoId = productResult.rows[0].id;

    // 3. Insertar las imágenes en la tabla imagenes_productos
    const imagenesPromises = imagenes.map((imagen) =>
      pool.query('INSERT INTO imagenes_productos (producto_id, url_imagen) VALUES ($1, $2)', [productoId, imagen])
    );

    await Promise.all(imagenesPromises); // Esperamos a que todas las inserciones de imágenes se completen

    res.status(201).json({ message: 'Producto creado exitosamente', id: productoId });
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ error: 'Error al crear producto' });
  }
};
