import { conexion } from "./conexion.js";

export default class serviciosDb {

    getServicios = async () => {
        const sql = 'SELECT * FROM servicios WHERE activo = 1';
        const [results] = await conexion.query(sql);
        return results;
    }

    getServicioConId = async (servicio_id) => {
        const sql = 'SELECT * FROM servicios WHERE servicio_id = ? AND activo = 1';
        const [result] = await conexion.query(sql, [servicio_id]);
        
        if (result.length === 0) {
            return null;
        }
        return result[0]; 
    }

    addServicio = async ({ descripcion, importe }) => {
        const sql = 'INSERT INTO servicios (descripcion, importe, activo) VALUES (?, ?, 1)';
        const [result] = await conexion.query(sql, [descripcion, importe]);
        return result; 
    }

    editServicio = async (servicio_id, { descripcion, importe }) => {
        const sql = 'UPDATE servicios SET descripcion=?, importe=? WHERE servicio_id=? AND activo=1';
        const [result] = await conexion.query(sql, [descripcion, importe, servicio_id]);
        return result; 
    }

    deleteServicio = async (servicio_id) => {
        const sql = 'UPDATE servicios SET activo=0 WHERE servicio_id=?';
        const [result] = await conexion.query(sql, [servicio_id]);
        return result; 
    }
}