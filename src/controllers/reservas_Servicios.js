//bread reservas-salones
import  reservasServicioService from "../servicios/reservaServiciosService.js";

export default class reservasServiciosController{

    constructor(){
        this.reservasServicios = new reservasServicioService();
    }

    
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


        //--------- DELETE 
    deleteRerservaServicio = async (req, res) => {
        try {
            const {id} = req.params;
            const [result] = await this.reservasServicios.deleteReservaServicio(id);

            if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "Reserva del servicio eliminado" });
            }

            res.json({ estado: true, mensaje: "Error al eliminar servicio" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, mensaje: "" });
        }
}



};