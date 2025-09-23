// import { conexion } from '../db/conexion.js';

// /* GET SERVICIOS*/
//     const getServicios = async (req, res) =>{
//     try {
//         const sql = 'SELECT * FROM servicios WHERE activo = 1';
//         const [results] = await conexion.query(sql);
//         console.log(results);
//         res.json({
//              ok: true, servicios: results
//             });

//     } catch (error) {
//         res.status(500).json({ message: 'Error del lado del servidor al traer los servicios', error: error.message });
//         console.log(error);
//     }
// }

// /* GET SERVICIOS con ID*/
// const getServicioConId = async (req, res) => {
//     try {
//         const servicio_id = parseInt(req.params.servicio_id);
//         console.log(servicio_id);
//         if (Number.isNaN(servicio_id)) {
//             return res.status(400)
//                       .json({ ok: false, mensaje: 'ID inválido' });
//         }   
//         const sql = `SELECT * FROM servicios WHERE servicio_id = ${servicio_id} AND activo = 1`;
//         const [result] = await conexion.query(sql);
//         if(result.length === 0){
//             res.status(404)
//             .json({ ok: false, mensaje: `No existe Servicio con el ID ${servicio_id}` })
//             console.log(result);
//         }else{
//             console.log(result);
//             res.json({ ok: true, usuario: result });
//     } 
//     } catch (error) {
//         console.log(error);
//         res.status(500)
//         .json({ ok: false, mensaje: 'Error al obtener servicios' });
//     }
// }
// /* add(POST) Usuario nuevo*/
// const addServicio = async (req, res) => {
    
// }

// /* edit(PUT) Usuario con ID*/
// const editServicio  = async (req, res) =>{

// }
// /* DELETE Usuario*/
// const deleteServicio = async (req, res) => {

// }

// export{getServicios, getServicioConId, addServicio, editServicio, deleteServicio};

// controllers/serviciosController.js
import { conexion } from '../db/conexion.js';

class ServiciosController {
  // GET todos los servicios
  static async getServicios(req, res) {
    try {
      const sql = 'SELECT * FROM servicios WHERE activo = 1';
      const [results] = await conexion.query(sql);
      res.json({ ok: true, servicios: results });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ ok: false, mensaje: 'Error al traer los servicios', error: error.message });
    }
  }

  // GET servicio por ID
  static async getServicioConId(req, res) {
    try {
      const servicio_id = parseInt(req.params.servicio_id, 10);
      if (Number.isNaN(servicio_id)) {
        return res.status(400).json({ ok: false, mensaje: 'ID inválido' });
      }

      const sql = 'SELECT * FROM servicios WHERE servicio_id = ? AND activo = 1';
      const [result] = await conexion.query(sql, [servicio_id]);

      if (result.length === 0) {
        return res
          .status(404)
          .json({ ok: false, mensaje: `No existe Servicio con el ID ${servicio_id}` });
      }

      res.json({ ok: true, servicio: result[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, mensaje: 'Error al obtener servicios', error: error.message });
    }
  }

  // POST servicio nuevo
  static async addServicio(req, res) {
    try {
      const { descripcion, importe, creado, modificado } = req.body;
      if (!descripcion) {
        return res.status(400).json({ ok: false, mensaje: 'Descripcion es requerido' });
      }

      const sql = 'INSERT INTO servicios (descripcion, importe, activo) VALUES (?, ?, 1)';
      const [result] = await conexion.query(sql, [descripcion, importe]);

      res.status(201).json({ ok: true, mensaje: 'Servicio creado', id: result.servicio_id
       });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, mensaje: 'Error al crear servicio', error: error.message });
    }
  }

  // PUT servicio existente
  static async editServicio(req, res) {
    try {
      const servicio_id = parseInt(req.params.servicio_id, 10);
      const {descripcion, importe } = req.body;
      if (Number.isNaN(servicio_id)) {
        return res.status(400).json({ ok: false, mensaje: 'ID inválido' });
      }

      const sql = 'UPDATE servicios SET descripcion=? importe=? WHERE servicio_id=? AND activo=1';
      await conexion.query(sql, [descripcion, importe, servicio_id]);

      res.json({ ok: true, mensaje: 'Servicio actualizado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, mensaje: 'Error al actualizar servicio', error: error.message });
    }
  }

  // DELETE servicio
  static async deleteServicio(req, res) {
    try {
      const servicio_id = parseInt(req.params.servicio_id, 10);
      if (Number.isNaN(servicio_id)) {
        return res.status(400).json({ ok: false, mensaje: 'ID inválido' });
      }

      // Baja lógica (activo=0)
      const sql = 'UPDATE servicios SET activo=0 WHERE servicio_id=?';
      await conexion.query(sql, [servicio_id]);

      res.json({ ok: true, mensaje: 'Servicio eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ ok: false, mensaje: 'Error al eliminar servicio', error: error.message });
    }
  }
}

export default ServiciosController;
