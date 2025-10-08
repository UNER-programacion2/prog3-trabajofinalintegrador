import { conexion } from "../db/conexion.js";

export default class UsuariosDb {
  getUsuarios = async () => {
    const sql = "SELECT * FROM usuarios WHERE activo = 1";
    const [rows] = await conexion.execute(sql);
    return rows;
  };

  getUsuarioConId = async (usuario_id) => {
    const sql = "SELECT * FROM usuarios WHERE usuario_id = ? AND activo = 1";
    const [rows] = await conexion.execute(sql, [usuario_id]);
    return rows;
  };

  addUsuario = async ({ nombre, apellido, nombre_usuario, contrasenia, tipo_usuario }) => {
    const sql = `
      INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await conexion.execute(sql, [nombre, apellido, nombre_usuario, contrasenia, tipo_usuario]);
    return result;
  };

  deleteUsuario = async (usuario_id) => {
    const sql = "UPDATE usuarios SET activo = 0 WHERE usuario_id = ?";
    const [result] = await conexion.execute(sql, [usuario_id]);
    return result;
  };
}