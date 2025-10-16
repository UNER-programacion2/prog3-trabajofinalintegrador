import {conexion} from "./conexion.js";

export default class reservasServiciosDb{

    getReservasServicios = async() => {
        const sql = 'SELECT * FROM reservas_servicios';
        const [rows] = await conexion.query(sql);
        return rows;
    }

    getReservasServiciosId = async (reserva_servicio_id) => {
        const sql = `SELECT * FROM reservas_servicios WHERE reserva_servicio_id = ?`;
        const [results] = await conexion.execute(sql,[reserva_servicio_id]);
        return results;
    }

    postReservasServicios = async ({reserva_id, servicio_id, importe})=>{
        console.log(reserva_id, servicio_id, importe);
        
        const sql = 'INSERT INTO reservas_servicios (reserva_id, servicio_id, importe) VALUES (?,?,?)';
        const [result]= await conexion.execute(sql, [reserva_id, servicio_id, importe]);
        return result;
    }

    putReservasServicios = async(reserva_servicio_id, { reserva_id, servicio_id, importe}) => {
        const sql = `UPDATE reservas_servicios SET reserva_id = ?, servicio_id = ?, importe = ? WHERE reserva_servicio_id = ?`;
        const [results] = await conexion.execute(sql,[reserva_id, servicio_id, importe, reserva_servicio_id]);
        return results;
    }

    // deleteReservasServicios = async(reserva_servicio_id) => {
    //     const sql= `UPDATE reservas_servicios SET WHERE reserva_servicio_id = ? `;
    //     const [results] = await conexion.execute(sql, [reserva_servicio_id]);
    //     return results
    // }

};
