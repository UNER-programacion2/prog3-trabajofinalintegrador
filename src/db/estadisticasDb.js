import {conexion} from "../db/conexion.js";

export default class EstadisticasDb {
  async getReservasPorSalon() { 
    const [result] = await conexion.query("CALL sp_estadistica_reservas_por_salon();");
    return result[0]; 
  }
    getIngresosUltimoMes = async () => {
        try {
            const [rows] = await conexion.query('CALL sp_ingresos_ultimo_mes()');
            
            return rows[0][0];             
        } catch (error) {
            console.log("Error en estadisticasDb.getIngresosUltimoMes:", error);
            throw new Error('Error al consultar la base de datos');
        }
    }
}

