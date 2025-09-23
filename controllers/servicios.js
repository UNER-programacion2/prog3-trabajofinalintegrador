import { conexion } from '../db/conexion.js';

/* GET SERVICIOS*/
    const getServicios = async (req, res) =>{
    try {
        const sql = 'SELECT * FROM servicios WHERE activo = 1';
        const [results] = await conexion.query(sql);
        console.log(results);
        res.json({
             ok: true, usuarios: results
            });

    } catch (error) {
        res.status(500).json({ message: 'Error del lado del servidor al traer los servicios', error: error.message });
        console.log(error);
    }
}

/* GET SERVICIOS con ID*/
const getServicioConId = async (req, res) => {
    try {
        const servicio_id = parseInt(req.params.servicio_id);
        console.log(servicio_id);
        if (Number.isNaN(servicio_id)) {
            return res.status(400)
                      .json({ ok: false, mensaje: 'ID inválido' });
        }   
        const sql = `SELECT * FROM servicios WHERE servicio_id = ${servicio_id} AND activo = 1`;
        const [result] = await conexion.query(sql);
        if(result.length === 0){
            res.status(404)
            .json({ ok: false, mensaje: `No existe Servicio con el ID ${servicio_id}` })
            console.log(result);
        }else{
            console.log(result);
            res.json({ ok: true, usuario: result });
    } 
    } catch (error) {
        console.log(error);
        res.status(500)
        .json({ ok: false, mensaje: 'Error al obtener servicios' });
    }
}
/* add(POST) Usuario nuevo*/
const addServicio = async (req, res) => {
    
}

/* edit(PUT) Usuario con ID*/
const editServicio  = async (req, res) =>{

}
/* DELETE Usuario*/
const deleteServicio = async (req, res) => {

}

export{getServicios, getServicioConId, addServicio, editServicio, deleteServicio};

