//bread reservas-salones
import  reservasServicioService from "../servicios/reservaServiciosService.js";

export default class reservasServiciosController{

    constructor(){
        this.reservasServicios = new reservasServicioService();
    }

    // GET browser
    getReservasServicios =  async(req, res) => {
            try {
                const reserva_servicio = await this.reservasServicios.getAllReservasServicios();
                res.json
                    ({estado:true,  reserva_servicio: reserva_servicio});
            } catch (error) {
                console.log('error en GET/reservas_servicios', error);
                res.status(500).json
                    ({ ok: false, mensaje: "Error interno del servidor" });
            }
        }   

   

    // GET BY ID  
     getReservaServicioConId = async (req, res) => {
        try {
            const id = req.params.id;
            const reserva_servicio = await this.reservasServicios.getReservaServicioConId(id);

            if (!reserva_servicio) {
            return res.status(404).json
                ({ estado: false, mensaje: "Servicios reservado no encontrado" });
            }

            res.json
                ({ estado: true, reservasServicios: reserva_servicio[0] });
                
        } catch (error) {
            console.log(error);
            res.status(500).json
                ({ ok: false, mensaje: "Error al obtener Servicio reservado" });
        }
    };

    // POST 
    addServicioReserva = async (req, res) => {
        try {
            const { reserva_id, servicio_id, importe } = req.body;
            const result = await this.reservasServicios.addServicioReserva
            ({reserva_id, 
                servicio_id, 
                importe});

            res.json
                ({ ok: true, idReserva: result.insertId, servicio : result.servicio_id, reserva :result.reserva_id });
        } catch (error) {

            console.log(error);
            res.status(500).json({ estado: false, mensaje: "Error al crear la reserva de servicio" });
        }
    };

        // PUT 
    updateReservaServicio = async (req, res) => {
        try {
            const { id } = req.params;
            const { reserva_id, servicio_id, importe } = req.body;
            const result = await this.reservasServicios.updateReservaServicio(id, {reserva_id, servicio_id, importe});

            if (reserva_id === undefined || servicio_id === undefined || importe === undefined) {
            return res.status(404).json
                ({ ok: false, mensaje: "Debe enviar reserva_id, servicio_id e importe" });
            }

            if (result.affectedRows === 0) {
            return res.status(404).json({
                ok: false,
                mensaje: "No se encontro la reserva de servicio"
            });
        }
            res.json({ estado: true, mensaje: "Reserva de servicio actualizada correctamente" });

        } catch (error) {
            console.log(error);
            res.status(500).json
                ({ estado: false, mensaje: "Error al crear la reserva de servicio" });
        }
    };

        // --------- DELETE 
//     deleteRerservaServicio = async (req, res) => {
//         try {
//             const {id} = req.params;
//             const [result] = await this.reservasServicios.deleteRerservaServicio(id);

//             if (result.affectedRows === 0) {
//             return res.status(404).json({ ok: false, mensaje: "Reserva del servicio eliminado" });
//             }

//             res.json({ estado: true, mensaje: "Error al eliminar servicio" });
//         } catch (error) {
//             console.log(error);
//             res.status(500).json({ ok: false, mensaje: "" });
//         }
// }
};