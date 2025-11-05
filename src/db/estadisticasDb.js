import { conexion } from "./conexion.js";

export default class EstadisticasDb {

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