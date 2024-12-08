// Lógica de autenticación y registro de usuarios

// controllers/authController.js
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { config } from '../config/config.js';

// Registrar un nuevo usuario
export const registerUser = async (req, res) => {
  const { nombre, apellido, correo, contrasena, direccion, region, ciudad, comuna } = req.body;
  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    if (result.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario con este correo ya existe.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    const query = `
      INSERT INTO usuarios (nombre, apellido, correo, contrasena, direccion, region, ciudad, comuna)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id, nombre, apellido, correo, direccion, region, ciudad, comuna
    `;
    const values = [nombre, apellido, correo, hashedPassword, direccion, region, ciudad, comuna];
    const newUser = await pool.query(query, values);

    res.status(201).json(newUser.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al registrar usuario.' });
  }
};

// Iniciar sesión
export const loginUser = async (req, res) => {
  const { correo, contrasena } = req.body;
  console.log('Correo:', correo); // Asegúrate de que los datos son los esperados
  console.log('Contraseña:', contrasena);

  try {
    const result = await pool.query('SELECT * FROM usuarios WHERE correo = $1', [correo]);
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado.' });
    }

    const match = await bcrypt.compare(contrasena, user.contrasena);
    if (!match) {
      return res.status(400).json({ error: 'Contraseña incorrecta.' });
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al iniciar sesión.' });
  }
};


// Obtener todos los usuarios
export const getUsers = async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT id, nombre, apellido, correo, direccion, region, ciudad, comuna, creado_en FROM usuarios'
    );
    res.status(200).json(result.rows); // Enviamos los usuarios como respuesta
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los usuarios.' });
  }
};