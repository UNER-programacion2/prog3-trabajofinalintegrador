import serviciosServicios from "../servicios/servicioService.js";
import { clearCache } from "../middleware/cache.js";


export default class serviciosController {

    constructor() {
        this.serviciosServicios = new serviciosServicios();
    }

    // GET 
    getServicios = async (req, res) => {
        try {
            const servicios = await this.serviciosServicios.getAllServicios();
            res.json({ ok: true, servicios: servicios });
        } catch (error) {
            console.error(error);
            res.status(500).json({ ok: false, mensaje: 'Error al traer los servicios', error: error.message });
        }
    }

    // GET servicio por id
    getServicioConId = async (req, res) => {
        try {
            const { servicio_id } = req.params; 

            const servicio = await this.serviciosServicios.getServicioConId(servicio_id);

            if (!servicio) {
                return res.status(404).json({ ok: false, mensaje: `No existe Servicio con el ID ${servicio_id}` });
            }

            res.json({ ok: true, servicio: servicio });
        } catch (error) {
            console.error(error);
            res.status(500).json({ ok: false, mensaje: 'Error al obtener servicios', error: error.message });
        }
    }

    // POST servicio
    addServicio = async (req, res) => {
        try {
            const { descripcion, importe } = req.body;
            
            if (!descripcion) {
                return res.status(400).json({ ok: false, mensaje: 'Descripcion es requerido' });
            }

            const data = { descripcion, importe };
            const result = await this.serviciosServicios.createServicio(data);

            res.status(201).json({
                ok: true,
                mensaje: 'Servicio creado',
                id: result.insertId 
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ ok: false, mensaje: 'Error al crear servicio', error: error.message });
        }
    }

    // PUT servicio 
    editServicio = async (req, res) => {
        try {

            const { servicio_id } = req.params; 
            const { descripcion, importe } = req.body;

            const datos = { descripcion, importe };
            const result = await this.serviciosServicios.editServicio(servicio_id, datos);

            if (!result) {
                return res.status(404).json({ ok: false, mensaje: `No existe Servicio con ID ${servicio_id}` });
            }

            res.json({ ok: true, mensaje: 'Servicio actualizado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ ok: false, mensaje: 'Error al actualizar servicio', error: error.message });
        }
    }

    // DELETE servicio
    deleteServicio = async (req, res) => {
        try {
            const { servicio_id } = req.params; 

            const result = await this.serviciosServicios.deleteServicio(servicio_id);

            if (result.affectedRows === 0) {
                return res.status(404).json({ ok: false, mensaje: `No existe Servicio con ID ${servicio_id}` });
            }

            res.json({ ok: true, mensaje: 'Servicio eliminado' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ ok: false, mensaje: 'Error al eliminar servicio', error: error.message });
        }
    }
}