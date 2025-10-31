import { conexion } from "./conexion.js";

export default class UsuariosDb {

  // GET: busca en la db
  getUsuarios = async (nombre_usuario, contrasenia) => {
    const sql = `SELECT u.usuario_id, CONCAT(u.nombre, ' ', u.apellido) as usuario, u.tipo_usuario
                    FROM usuarios  AS u
                    WHERE u.nombre_usuario = ? 
                      AND u.contrasenia = SHA2(?, 256) 
                      AND u.activo = 1
                      `;
    const [rows] = await conexion.execute(sql,[nombre_usuario, contrasenia]);
    return rows;
  };
  
  getAllUsuarios = async () => {
      const sql = `SELECT u.usuario_id, CONCAT(u.nombre, ' ', u.apellido) as usuario, u.tipo_usuario
                      FROM usuarios  AS u
                      WHERE u.activo = 1
                      `;
      const [rows] = await conexion.execute(sql);
      return rows;
    };


  // GET: usuario por ID
  getUsuarioConId = async (usuario_id) => {
    const sql = `SELECT CONCAT(u.nombre, ' ', u.apellido) as usuario, u.tipo_usuario, u.usuario_id
                        FROM usuarios  AS u
                        WHERE u.usuario_id = ? AND u.activo = 1
                        `;
    const [rows] = await conexion.execute(sql, [usuario_id]);
    return rows;
  };

  // POST: crear nuevo usuario
  postUsuario = async ({ nombre, apellido, nombre_usuario, contrasenia, tipo_usuario }) => {
    const sql = `
      INSERT INTO usuarios (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario)
      VALUES (?, ?, ?, SHA2(?, 256), ?)
    `;
    const [result] = await conexion.execute(sql, [
      nombre,
      apellido,
      nombre_usuario,
      contrasenia,
      tipo_usuario,
    ]);
    return result;
  };

  // PUT: actualizar usuario existente
  putUsuario = async (usuario_id, { nombre, apellido, nombre_usuario, contrasenia, tipo_usuario }) => {
    const sql = `
      UPDATE usuarios
      SET nombre = ?, apellido = ?, nombre_usuario = ?,contrasenia = SHA2(?, 256), tipo_usuario = ?
      WHERE usuario_id = ? AND activo = 1
    `;
    const [result] = await conexion.execute(sql, [
      nombre,
      apellido,
      nombre_usuario,
      contrasenia,
      tipo_usuario,
      usuario_id,
    ]);
    return result;
  };

  // DELETE: marcar usuario como inactivo
  deleteUsuario = async (usuario_id) => {
    const sql = "UPDATE usuarios SET activo = 0 WHERE usuario_id = ?";
    const [result] = await conexion.execute(sql, [usuario_id]);
    return result;
  };
}