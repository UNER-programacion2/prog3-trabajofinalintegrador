import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config(); // Cargar variables de entorno primero

console.log('Conectando a MySQL con:');
console.log('Puerto:', process.env.DB_PORT);
console.log('Host:', process.env.DB_HOST);
console.log('Usuario:', process.env.DB_USER);
console.log('Contraseña:', process.env.DB_PASS ? '******' : '(vacía)');
console.log('Base de datos:', process.env.DB_NAME);

// ✅ Crear un pool de conexiones en lugar de una conexión única
export const conexion = mysql.createPool({
  port: process.env.DB_PORT,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10, // número máximo de conexiones simultáneas
  queueLimit: 0
});

try {
  const conn = await conexion.getConnection();
  console.log('Conexión a MySQL exitosa ✅');
  conn.release(); // ✅ la liberamos al pool
} catch (error) {
  console.error('Error al conectar a MySQL ❌', error);
}