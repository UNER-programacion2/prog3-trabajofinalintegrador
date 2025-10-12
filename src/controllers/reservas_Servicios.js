//bread reservas-salones
import { conexion } from "../db/conexion.js";
import  reservasServicioService from "../servicios/reservaServiciosService.js";

export default class reservasSalones{

    constructor(){
        this.reservasServicios = new reservasServicioService();
    }

    // GET browser
    getReservasServicios =  async(req, res) => {
            try {
                const salones = await this.reservasServicios.getReservasServicios();
                res.json
                    ({ok:true, salones :salones});
            } catch (error) {
                console.log('error en GET/reservas_servicios', error);
                res.status(500).json
                    ({ ok: false, mensaje: "Error interno del servidor" });
            }
        }   

    }

    // GET BY ID  
    getReservasServiciosId = async (req, res) => {
        try {
            const { id } = req.params;
            const sql = "SELECT * FROM reservas_servicios WHERE id = ? AND activo = 1";
            const [results] = await conexion.query(sql, [id]);

            if (results.length === 0) {
            return res.status(404).json({ ok: false, mensaje: "Servicios reservado no encontrado" });
            }

            res.json({ ok: true, reservasServicios: results[0] });
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, mensaje: "Error al obtener Servicio reservado" });
        }
    };

        // POST 
    addServicioReserva = async (req, res) => {
        try {
            const { fecha, salon_id, servicio_id, cliente } = req.body;
            const sql = "INSERT INTO reservas_servicios (fecha, salon_id, servicio_id, cliente, activo) VALUES (?, ?, ?, ?, 1)";
            const [result] = await conexion.query(sql, [fecha, salon_id, servicio_id, cliente]);

            res.json({ ok: true, id: result.insertId, fecha, salon_id, servicio_id, cliente });
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, mensaje: "Error al crear la reserva de servicio" });
        }
    };

        // PUT 
    updateReservaServicio = async (req, res) => {
        try {
            const { id } = req.params;
            const { fecha, salon_id, servicio_id, cliente } = req.body;

            const sql = "UPDATE reservas_servicios SET fecha=?, salon_id=?, servicio_id=?, cliente=? WHERE id=? AND activo=1";
            const [result] = await conexion.query(sql, [fecha, salon_id, servicio_id, cliente, id]);

            if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "Reserva del servicio creada" });
            }

            res.json({ ok: true, mensaje: "" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, mensaje: "Error al crear la reserva de servicio" });
        }
    };

        // --------- DELETE 
    deleteRerservaServicio = async (req, res) => {
        try {
            const { id } = req.params;
            const sql = "UPDATE reservas_servicios SET activo=0 WHERE id=?";
            const [result] = await conexion.query(sql, [id]);

            if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "Reserva del servicio eliminado" });
            }

            res.json({ ok: true, mensaje: "Error al eliminar servicio" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, mensaje: "" });
        }
    };


