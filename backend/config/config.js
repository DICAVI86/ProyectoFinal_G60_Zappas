// config/config.js
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 'mi-secreto-para-jwt',
  databaseUrl: process.env.DATABASE_URL || 'postgres://usuario:contraseña@localhost:5432/myapp',
};