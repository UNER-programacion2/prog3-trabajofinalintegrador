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
  postReservasServicios = async (reserva_id, servicios) => {
  const conn = await conexion.getConnection ? await conexion.getConnection() : conexion;

  try {
    await conn.beginTransaction();

    for (const servicio of servicios) {
      const sql = "INSERT INTO reservas_servicios (reserva_id, servicio_id, importe) VALUES (?, ?, ?)";
      await conn.execute(sql, [reserva_id, servicio.servicio_id, servicio.importe]);
    }

    await conn.commit();
    return true;

  } catch (error) {
    if (conn.rollback) await conn.rollback();
    console.log(`❌ Error en postReservasServicios: ${error.message}`);
    return false;

  } finally {
    if (conn.release) conn.release();
  }
};

  // Eliminar un registro de la tabla intermedia
  deleteReservasServicios = async (reserva_servicio_id) => {
    const sql = `DELETE FROM reservas_servicios WHERE reserva_servicio_id = ?`;
    const [results] = await conexion.execute(sql, [reserva_servicio_id]);
    return results;
  };
}