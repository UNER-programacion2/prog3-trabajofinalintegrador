import {conexion} from "./conexion.js";

export default class salonesDb{

    getSalones = async() => {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [salones] = await conexion.query(sql);
        return salones;
    }

    getSalonConId = async (salon_id) => {
        const sql = `SELECT * FROM salones WHERE activo = 1 and salon_id = ?`;
        const [results] = await conexion.execute(sql,[salon_id]);
        return results;
    }

    postSalon = async ({titulo, direccion, capacidad, importe})=>{ 
        const sql = 'INSERT INTO salones (titulo, direccion, capacidad, importe) VALUES (?,?,?,?)';
        const [result]= await conexion.execute(sql, [titulo, direccion, capacidad, importe]);
        return result;
    }

    putSalon = async(salon_id, { titulo, direccion, capacidad, importe }) => {
        const sql = `UPDATE salones SET titulo = ?, direccion = ?, capacidad = ?, importe = ? WHERE salon_id = ? AND activo = 1`;
        const [results] = await conexion.execute(sql,[titulo, direccion, capacidad, importe, salon_id]);
        return results;
    }

    deleteSalon = async(salon_id) => {
        const sql= `UPDATE salones SET activo = 0 WHERE salon_id = ? `;
        const [results] = await conexion.execute(sql, [salon_id]);
        return results
    }


    
}