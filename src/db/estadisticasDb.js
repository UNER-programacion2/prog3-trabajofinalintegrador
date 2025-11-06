

import {conexion} from "./conexion.js";

export default class EstadisticasDb {
  // Ya no acepta argumentos y ya no usa placeholder (?)
  async getReservasPorSalon() { 
    // La llamada no lleva '?' y no lleva argumentos en el segundo parámetro.
    const [result] = await conexion.query("CALL sp_estadistica_reservas_por_salon();");
    return result[0]; 
  }
  
    getIngresosUltimoMes = async () => {
        try {
            const [rows] = await conexion.query('CALL sp_ingresos_ultimo_mes()');
            
            return rows[0][0]; 
            //toma la primera fila del set del resultado.
            
        } catch (error) {
            console.log("Error en estadisticasDb.getIngresosUltimoMes:", error);
            throw new Error('Error al consultar la base de datos');
        }
    }
}

