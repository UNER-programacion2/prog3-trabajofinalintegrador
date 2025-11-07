import { conexion } from "./conexion.js";

export default class serviciosDb {

  getServicios = async () => {
    const sql = "SELECT * FROM servicios WHERE activo = 1";
    const [results] = await conexion.execute(sql);
    return results;
  };

  getServicioConId = async (servicio_id) => {
    const sql = "SELECT * FROM servicios WHERE servicio_id = ? AND activo = 1";
    const [result] = await conexion.execute(sql, [servicio_id]);
    return result[0] || null;
  };
  
  getServiciosByIds = async (ids) => {
    if (!ids.length) return [];
    const sql = `
      SELECT servicio_id, descripcion AS nombre_servicio, importe
      FROM servicios
      WHERE servicio_id IN (${ids.join(",")}) AND activo = 1
    `;
    const [rows] = await conexion.query(sql);
    return rows;
  };

  addServicio = async ({ descripcion, importe }) => {
    const sql = "INSERT INTO servicios (descripcion, importe, activo) VALUES (?, ?, 1)";
    const [result] = await conexion.execute(sql, [descripcion, importe]);
    return result;
  };

  editServicio = async (servicio_id, { descripcion, importe }) => {
    const sql = "UPDATE servicios SET descripcion=?, importe=? WHERE servicio_id=? AND activo=1";
    const [result] = await conexion.execute(sql, [descripcion, importe, servicio_id]);
    return result;
  };

  deleteServicio = async (servicio_id) => {
    const sql = "UPDATE servicios SET activo=0 WHERE servicio_id=?";
    const [result] = await conexion.execute(sql, [servicio_id]);
    return result;
  };
}