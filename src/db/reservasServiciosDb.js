import {conexion} from "./conexion.js";

export default class reservasServiciosDb{
    
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

    postReservasServicios = async (reserva_id, servicios)=>{

        try{
            await conexion.beginTransaction();

            for (const servicio of servicios){
                const sql = `INSERT INTO reservas_servicios (reserva_id, servicio_id, importe)
                VALUES (?,?,?);`;
                await conexion.execute(sql, [reserva_id, servicio.servicio_id, servicio.importe ]);
            }
            await conexion.commit();
            return true;

        }catch(error){
            await conexion.rollback();
            console.log(`error ${error}`);
            return false;
        }
    
    }

    deleteReservasServicios = async(reserva_servicio_id) => {
        const sql= `DELETE FROM reservas_servicios WHERE reserva_servicio_id = ? `;
        const [results] = await conexion.execute(sql, [reserva_servicio_id]);
        return results;
    }

};
