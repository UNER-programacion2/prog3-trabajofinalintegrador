import { conexion } from "./conexion";

export default class reservasDb{

    getReservas = async() =>{
        const sql = "SELECT * FROM reservas where activo = 1";
        const [rows] = await conexion.execute(sql);
        return rows;
    }

    getUsuarioConId  = async (reserva_id) => {
        const sql = "SELECT * FROM reservas where reserva_id = ? AND activo = 1"
        const [rows] = await conexion.execute(sql, [reserva_id]);
    }

    postUsuario = async ({fecha_reserva, salon_id, usuario_id,turno_id,foto_cumpleaniero,tematica,importe_total }) =>{
        const sql = `INSERT INTO reservas (fecha_reserva, salon_id, usuario_id,turno_id,foto_cumpleaniero,tematica,importe_total)
        VALUES (?, ?, ?, ?, ?,?,?)`

        Const [result] = await conextion.execute(sql, [
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

    putUsusario = async (reservas_id,{fecha_reserva, salon_id, usuario_id,turno_id,foto_cumpleaniero,tematica,importe_total }) =>{ 
        const sql = `
        UPDATE reservas
        SET fecha_reserva = ?, salon_id = ?, usuario_id = ?, turno_id = ?, foto_cumplaniero = ?, tematica = ?, importe_total = ?
        WHERE usuario_id = ? AND activo = 1
        `;
        
        const  [result] = await conexion.execute(sql,[
           
            fecha_reserva,
            salon_id,
            usuario_id,
            turno_id,
            foto_cumpleaniero,
            tematica,
            importe_total
        ])
    }   
}