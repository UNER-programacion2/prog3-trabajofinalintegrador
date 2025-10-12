import {conexion} from "./conexion.js";

export default class salonesDb{

    getReservasServicios = async() => {
        const sql = 'SELECT * FROM reservas_servicios WHERE activo = 1';
        const [rows] = await conexion.query(sql);
        return rows;
    }

    getReservasServiciosId = async (reserva_servicio_id) => {
        const sql = `SELECT * FROM reservas_servicios WHERE activo = 1 and reserva_servicio_id = ?`;
        const [results] = await conexion.execute(sql,[reserva_servicio_id]);
        return results;
    }

    postReservasServicios = async ({importe, creado, modificado})=>{ 
        const sql = 'INSERT INTO reservas_servicios (importe, creado, modificado) VALUES (?,?,?)';
        const [result]= await conexion.execute(sql, [titulo, direccion, capacidad, importe]);
        return result;
    }

    putReservasServicios = async(reserva_servicio_id, { importe, creado, modificado }) => {
        const sql = `UPDATE reservas_servicios SET importe = ?, creado = ?, modificado = ? WHERE reserva_servicio_id = ? AND activo = 1`;
        const [results] = await conexion.execute(sql,[importe, creado, modificado, reserva_servicio_id]);
        return results;
    }

    deleteReservasServicios = async(reserva_servicio_id) => {
        const sql= `UPDATE reservas_servicios SET activo = 0 WHERE reserva_servicio_id = ? `;
        const [results] = await conexion.execute(sql, [reserva_servicio_id]);
        return results
    }

}