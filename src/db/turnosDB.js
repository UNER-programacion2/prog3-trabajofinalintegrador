import { conexion } from "../db/conexion.js";

export default class turnosDb{

    // GET browser
    getTurnos = async () => {
        const sql = "SELECT * FROM turnos WHERE activo = 1";
        const [turnos] = await conexion.execute(sql);
            return turnos;
        
    };

    // GET BY ID  
    getTurnoConId = async (turno_id) => {
        const sql = "SELECT * FROM turnos WHERE turno_id = ? AND activo = 1";
        const [turno] = await conexion.query(sql, [turno_id]);

        if (turno.length === 0) {
            return null
        }
        return turno;

    };

    // POST 
    createTurno = async ({ orden, hora_desde, hora_hasta }) => {
        const sql = "INSERT INTO `turnos` (`orden`,`hora_desde`,`hora_hasta`,`activo`,`creado`) VALUES (?, ?, ?, 1, NOW())";
        const [results] = await conexion.query(sql, [orden, hora_desde, hora_hasta]);
       
        return results;
    } 

    // PUT 
    editTurno = async (turno_id, datos) => {
        const campos = Object.keys(datos);
        
        if (campos.lenght === 0){  
            return null
        }
                        
        const valores = Object.values(datos);
        const setValores = campos.map(campos => `${campos} = ?`).join(', ');

        const sql = `UPDATE turnos SET ${setValores} WHERE turno_id = ? `;
        const [results] = await conexion.execute(sql,[...valores,turno_id]);

        if (results.affectedRows === 0){ 
            return null
        }
        return this.getTurnoConId(turno_id);

     
    };

    //DELETE 
    deleteTurno = async (turno_id) => {
        const sql = "UPDATE turnos SET activo=0 WHERE turno_id=?";
        const [results] = await conexion.query(sql, [turno_id]);
                
        return results
    };
}
      
