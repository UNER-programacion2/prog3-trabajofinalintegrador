import { conexion } from "./conexion.js";

export default class reservasDb{

    getReservas = async() =>{
        const sql = "SELECT r.reserva_id, r.fecha_reserva, r.salon_id, s.titulo AS nombre_salon, r.usuario_id, CONCAT(u.nombre, ' ', u.apellido) AS usuario, t.hora_desde, t.hora_hasta, r.tematica, r.importe_total FROM reservas AS r JOIN salones AS s ON r.salon_id = s.salon_id JOIN usuarios AS u ON r.usuario_id = u.usuario_id JOIN turnos as t ON r.turno_id = t.turno_id where r.activo = 1";
        const [rows] = await conexion.execute(sql);
        return rows;
    }

    getReservaConId  = async (reserva_id) => {
        const sql = "SELECT r.reserva_id, r.fecha_reserva, r.salon_id, s.titulo AS nombre_salon, r.usuario_id, CONCAT(u.nombre, ' ', u.apellido) AS usuario, t.hora_desde, t.hora_hasta, r.tematica, r.importe_total FROM reservas AS r JOIN salones AS s ON r.salon_id = s.salon_id JOIN usuarios AS u ON r.usuario_id = u.usuario_id JOIN turnos as t ON r.turno_id = t.turno_id where r.reserva_id = ? AND r.activo = 1"
        const [result] = await conexion.execute(sql, [reserva_id]);
        return result;
    }

    postReserva = async ({fecha_reserva, salon_id, usuario_id,turno_id,foto_cumpleaniero,tematica,importe_total }) =>{
        const sql = `INSERT INTO reservas (fecha_reserva, salon_id, usuario_id,turno_id,foto_cumpleaniero,tematica,importe_total)
        VALUES (?, ?, ?, ?, ?,?,?)`

        const [result] = await conexion.execute(sql, [
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero,
            tematica,
            importe_total
        ])
        return result;
    }

    putReserva = async (reserva_id,{fecha_reserva, salon_id, usuario_id,turno_id,foto_cumpleaniero,tematica,importe_total }) =>{ 
        const sql = `
        UPDATE reservas
        SET fecha_reserva = ?, salon_id = ?, usuario_id = ?, turno_id = ?, foto_cumplaniero = ?, tematica = ?, importe_total = ?
        WHERE reserva_id = ? AND activo = 1
        `;
        
        const  [result] = await conexion.execute(sql,[
           
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero,
            tematica,
            importe_total,
            reserva_id
        ])
        return result;
    }   
}