import mysql from 'mysql2/promise';

export const conexion = await mysql.createConnection({
  host: 'localhost',
  user: 'adminReservas',
  database: 'reservas',
  password: 'pass1234'
});