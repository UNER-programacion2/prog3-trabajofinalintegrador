import { conexion } from "./conexion.js";

export default class reservasServiciosDb {

  // Obtener los servicios asociados a una reserva
  getServiciosConDetalle = async (reserva_id) => {
    const sql = `
      SELECT rs.reserva_servicio_id, s.servicio_id, s.descripcion, rs.importe
      FROM reservas_servicios AS rs
      JOIN servicios AS s ON rs.servicio_id = s.servicio_id
      WHERE rs.reserva_id = ?
    `;
    const [rows] = await conexion.execute(sql, [reserva_id]);
    return rows;
  };

  // Obtener datos de servicios por sus IDs (para calcular totales)
  

  // Insertar servicios asociados a una reserva
  insertServiciosReserva = async (conn, reserva_id, servicios) => {
    if (!servicios || servicios.length === 0) return;

    const values = servicios.map((s) => [reserva_id, s.servicio_id, s.importe]);
    const sql = `
      INSERT INTO reservas_servicios (reserva_id, servicio_id, importe)
      VALUES ?
    `;
    await conn.query(sql, [values]);
  };

  // Eliminar un registro de la tabla intermedia
  deleteReservasServicios = async (reserva_servicio_id) => {
    const sql = `DELETE FROM reservas_servicios WHERE reserva_servicio_id = ?`;
    const [results] = await conexion.execute(sql, [reserva_servicio_id]);
    return results;
  };
}