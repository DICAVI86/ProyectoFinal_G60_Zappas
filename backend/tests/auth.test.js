// Usar npm test en la terminal para realizar los test

import request from 'supertest';
import app from '../app.js';
import pool from '../config/db.js';

// Limpiar la base de datos antes de cada prueba
beforeEach(async () => {
  await pool.query('TRUNCATE TABLE usuarios RESTART IDENTITY CASCADE'); // Elimina todos los usuarios y reinicia las IDs
});

describe('Auth Routes Tests', () => {
  test('POST /api/users/register - Registro exitoso', async () => {
    const response = await request(app)
      .post('/api/users/register')
      .send({
        nombre: 'Juan',
        apellido: 'Perez',
        correo: 'juanperez@test.com',
        contrasena: 'password123',
        direccion: 'Calle Falsa 123',
        region: 'Región 1',
        ciudad: 'Ciudad A',
        comuna: 'Comuna X'
      });
    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('correo', 'juanperez@test.com');
  });

  test('POST /api/users/register - Registro fallido (correo duplicado)', async () => {
    // Primero registra un usuario
    await request(app)
      .post('/api/users/register')
      .send({
        nombre: 'Juan',
        apellido: 'Perez',
        correo: 'juanperez@test.com',
        contrasena: 'password123',
        direccion: 'Calle Falsa 123',
        region: 'Región 1',
        ciudad: 'Ciudad A',
        comuna: 'Comuna X'
      });

    // Luego intenta registrar el mismo correo
    const response = await request(app)
      .post('/api/users/register')
      .send({
        nombre: 'Pedro',
        apellido: 'Gonzalez',
        correo: 'juanperez@test.com', // Correo duplicado
        contrasena: 'password456',
        direccion: 'Calle Verdadera 456',
        region: 'Región 2',
        ciudad: 'Ciudad B',
        comuna: 'Comuna Y'
      });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'El usuario con este correo ya existe.');
  });

  test('POST /api/users/login - Inicio de sesión exitoso', async () => {
    // Registra un usuario primero
    await request(app)
      .post('/api/users/register')
      .send({
        nombre: 'Juan',
        apellido: 'Perez',
        correo: 'juanperez@test.com',
        contrasena: 'password123',
        direccion: 'Calle Falsa 123',
        region: 'Región 1',
        ciudad: 'Ciudad A',
        comuna: 'Comuna X'
      });

    // Luego intenta iniciar sesión
    const response = await request(app)
      .post('/api/users/login')
      .send({
        correo: 'juanperez@test.com',
        contrasena: 'password123'
      });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('token');
  });

  test('POST /api/users/login - Inicio de sesión fallido (credenciales incorrectas)', async () => {
    // Intenta iniciar sesión con credenciales incorrectas
    const response = await request(app)
      .post('/api/users/login')
      .send({
        correo: 'juanperez@test.com',
        contrasena: 'incorrectpassword'
      });

    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error', 'Usuario no encontrado.');
  });

  test('GET /api/users - Obtener usuarios sin token', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(401);
    expect(response.body).toHaveProperty('error', 'Acceso denegado. No hay token.');
  });
});