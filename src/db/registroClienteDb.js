import { conexion } from "./conexion.js";

export default class RegistroClienteDb {
    
    postCliente = async ({ nombre, apellido, nombre_usuario, contrasenia }) => {
    const sql = `
      INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario)
      VALUES (?, ?, ?, SHA2(?, 256), 3)
    `;
    const [result] = await conexion.execute(sql, [
      nombre,
      apellido,
      nombre_usuario,
      contrasenia,
      
    ]);
    return result;
  };
}