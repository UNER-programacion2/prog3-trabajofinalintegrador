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
  postReservasServicios = async (reserva_id, servicios, conn) => {
    const db = conn || (await conexion.getConnection());
    const autoGestion = !conn; 

    try {
      if (autoGestion) await db.beginTransaction();

      for (const servicio of servicios) {
        const sql = "INSERT INTO reservas_servicios (reserva_id, servicio_id, importe) VALUES (?, ?, ?)";
       
        await db.execute(sql, [reserva_id, servicio.servicio_id, servicio.importe]);
      }

      if (autoGestion) await db.commit();
      return true;

    } catch (error) {
      if (autoGestion && db.rollback) await db.rollback();
      console.log(`Error en postReservasServicios: ${error.message}`);
      throw error; 

    } finally {
      if (autoGestion && db.release) db.release();
    }
  };

  // Eliminar registro de tabla intermedia
  deleteReservasServicios = async (reserva_servicio_id) => {
    const sql = `DELETE FROM reservas_servicios WHERE reserva_servicio_id = ?`;
    const [results] = await conexion.execute(sql, [reserva_servicio_id]);
    return results;
  };

  deleteServiciosPorReservaId = async (reserva_id, conn) => {
    const db = conn || conexion; 
    const sql = `DELETE FROM reservas_servicios WHERE reserva_id = ?`;
    const [results] = await db.execute(sql, [reserva_id]);
    return results;
  };
}