import pool from '../config/db.js'; // Ajusta esto según tu configuración de la base de datos

// Obtener las consultas de un producto específico
export const getConsultasByProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM consultas WHERE producto_id = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las consultas' });
  }
};

// Crear una nueva consulta
export const createConsulta = async (req, res) => {
  const { producto_id, pregunta } = req.body;
  const usuario_id = req.user.id; // Asegúrate de que el usuario está autenticado

  try {
    const result = await pool.query(
      'INSERT INTO consultas (usuario_id, producto_id, pregunta) VALUES ($1, $2, $3) RETURNING *',
      [usuario_id, producto_id, pregunta]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear la consulta' });
  }
};


// Actualizar la respuesta de una consulta
export const updateConsulta = async (req, res) => {
  const { id } = req.params;  // Obtener el id de la consulta desde la URL
  const { respuesta } = req.body;  // Obtener la respuesta enviada en la solicitud

  try {
    // Verificar si la consulta existe
    const consultaResult = await pool.query('SELECT * FROM consultas WHERE id = $1', [id]);
    const consulta = consultaResult.rows[0];

    if (!consulta) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }

    // Obtener el producto asociado a la consulta
    const productoResult = await pool.query('SELECT * FROM productos WHERE id = $1', [consulta.producto_id]);
    const producto = productoResult.rows[0];

    // Verificar si el usuario autenticado es el dueño del producto o el autor de la consulta
    if (producto.usuario_id !== req.user.id && consulta.usuario_id !== req.user.id) {
      return res.status(403).json({ error: 'No tienes permiso para responder esta consulta' });
    }

    // Actualizar la respuesta de la consulta
    const updateResult = await pool.query(
      'UPDATE consultas SET respuesta = $1, respondido_por = $2, respondida = true WHERE id = $3 RETURNING *',
      [respuesta, req.user.id, id]
    );

    res.json(updateResult.rows[0]);  // Responder con la consulta actualizada
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la consulta' });
  }
};

// Eliminar una consulta

export const deleteConsulta = async (req, res) => {
  const { id } = req.params;

  try {
    // Eliminar la consulta usando PostgreSQL
    const result = await pool.query('DELETE FROM consultas WHERE id = $1 RETURNING *', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Consulta no encontrada' });
    }

    res.status(200).json({ message: 'Consulta eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la consulta' });
  }
};