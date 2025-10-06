import {conexion} from "./conexion.js";

export default class salonesDb{

    getSalones = async() => {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [salones] = await conexion.query(sql);
        return salones;
    }

    getSalonConId = async (salon_id) => {
        const salon_id = req.params.salon_id
        const sql = `SELECT * FROM salones WHERE activo = 1 and salon_id = ?`;
        const valores = [salon_id];
        const results = await conexion.execute(sql,valores);
        return results;
    }

    postSalon = async ({titulo, direccion, capacidad, importe})=>{ 
        const sql = 'INSERT INTO salones (titulo, direccion, capacidad, importe) VALUES (?,?,?,?)';
        const valores = [titulo, direccion, capacidad, importe];
        const [result]= await conexion.execute(sql, valores);
        return result.insertId;
    }
    putSalon = async(salon_id, { titulo, direccion, capacidad, importe }) => {
        const sql = `SELECT * FROM salones WHERE activo = 1 and salon_id = ?`;
        const valores = [titulo, direccion, capacidad, importe, salon_id];
        const results = await conexion.execute(sql, valores);
        return results;
    }

    deleteSalon = async(salon_id) => {
        const sql= `UPDATE salones SET activo = 0 WHERE salon_id = ? `;
        const results = await conexion.execute(sql, [salon_id]);
        return results
    }


    
}