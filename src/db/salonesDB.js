import {conexion} from "./conexion.js";

export default class salonesDb{

    getSalones = async() => {
        const sql = 'SELECT * FROM salones WHERE activo = 1';
        const [salones] = await conexion.execute(sql);
        return salones;
    }

    getSalonConId = async (salon_id) => {
        const sql = `SELECT * FROM salones WHERE activo = 1 and salon_id = ?`;
        const [salon] = await conexion.execute(sql,[salon_id]);
        
        if (salon.length === 0){
            return null
        }
        return salon;
    }

    createSalon = async ({titulo, direccion, capacidad, importe})=>{ 
        const sql = 'INSERT INTO salones (titulo, direccion, capacidad, importe) VALUES (?,?,?,?)';
        const [result]= await conexion.execute(sql, [titulo, direccion, capacidad, importe]);
        return result;
    }

    editSalon = async(salon_id, datos) => {
        const campos = Object.keys(datos);

        if (campos.length === 0){
            return null //devuelve null si no hay campos(query vacia)
        }

        const valores = Object.values(datos);
        //esto genera la parte de sql que dice que columnas actualizar
        const setValores = campos.map(campo => `${campo} = ?`).join(', ');
        
        //query final
        const sql = `UPDATE salones SET ${setValores} WHERE salon_id = ? `;
        const [results] = await conexion.execute(sql,[...valores,salon_id]);

        if (results.affectedRows === 0){  //comprueba los cambios
            return null
        }
        return this.getSalonConId(salon_id);
    }

    deleteSalon = async(salon_id) => {
        const sql= `UPDATE salones SET activo = 0 WHERE salon_id = ? `;
        const [results] = await conexion.execute(sql, [salon_id]);
        return results
    }


    
}