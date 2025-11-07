import  reservasServicioService from '../servicios/reservaServiciosService.js';

export default class reservasServiciosController{

    constructor(){
        this.reservasServicios = new reservasServicioService();
    }
    
   
    // POST 
    addServicioReserva = async (req, res) => {
        try {
            const { reserva_id, servicios } = req.body;
            const result = await this.reservasServicios.addServicioReserva(reserva_id, servicios);

            if (result === true) {
                res.status(201).json({ ok: true, mensaje: 'Servicios agregados a la reserva' });
            } else {
                res.status(400).json({ ok: false, mensaje: "Error al crear la reserva de servicio" });
            }

        
        } catch (error) {
            console.log(error);
            res.status(500).json({ estado: false, mensaje: "Error al crear la reserva de servicio" });
        }
    };

    //DELETE 
    deleteRerservaServicio = async (req, res) => {
        try {
            const {id} = req.params;
            const result = await this.reservasServicios.deleteReservaServicio(id);

            if (result.affectedRows === 0) {
            return res.status(404).json({ ok: false, mensaje: "No se encontró la reserva servicio." });
            }

            res.json({ estado: true, mensaje: "reserva servicio eliminada correctamente" });
        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false, mensaje: "Error al eliminar reserva servicio" });
        }
    }
};