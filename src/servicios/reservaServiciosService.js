import reservasServiciosDb from "../db/reservasServiciosDb.js";

export default class reservaServicioServicios{

    constructor(){
        this.reservaServicio = new reservasServiciosDb();
    }


    // agrear
    addServicioReserva = async (reserva_id, servicios) => {
        return await this.reservaServicio.postReservasServicios(reserva_id, servicios);
    }
    
    //eliminar
    deleteReservaServicio = (reserva_servicio_id) => {
        return this.reservaServicio.deleteReservasServicios(reserva_servicio_id);
    }
    //buscar
    getServiciosDeReserva = async (reserva_id) => {
        return await this.reservaServicio.getServiciosConDetalle(reserva_id);
    };
}

