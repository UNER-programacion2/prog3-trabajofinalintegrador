import reservasServiciosDb from "../db/reservasServiciosDb.js";

export default class reservaServicioServicios{

    constructor(){
        this.reservaServicio = new reservasServiciosDb();
    }

    // agrear
    addServicioReserva = async (data) => {
        return await this.reservaServicio.postReservasServicios(data);
    }
    
    //eliminar
    deleteReservaServicio = (reserva_servicio_id) => {
        return this.reservaServicio.deleteReservasServicios(reserva_servicio_id);
    }
}

