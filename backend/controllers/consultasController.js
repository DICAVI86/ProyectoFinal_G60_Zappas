import pool  from '../config/db.js'; // Ajusta esto según tu configuración de la base de datos

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
  const usuario_id = req.user.id; // Suponiendo que el usuario está autenticado y el id está en el token
  
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
