import dotenv from 'dotenv';
dotenv.config(); // Cargar variables de entorno primero

import mysql from 'mysql2/promise';

console.log('Conectando a MySQL con:');
console.log('Puerto:', process.env.DB_PORT);
console.log('Host:', process.env.DB_HOST);
console.log('Usuario:', process.env.DB_USER);
console.log('Contraseña:', process.env.DB_PASS ? '******' : '(vacía)');
console.log('Base de datos:', process.env.DB_NAME);

export const conexion = await mysql.createConnection({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

try {
  await conexion.connect();
  console.log('Conexión a MySQL exitosa ✅');
} catch (error) {
  console.error('Error al conectar a MySQL ❌', error);
}