// config/db.js

import pkg from 'pg';
const { Pool } = pkg;
import { config } from './config.js';

const pool = new Pool({
  connectionString: config.databaseUrl, // Usamos la URL de conexión desde el archivo de configuración
});

export default pool;