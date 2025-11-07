import reservasServiciosDb from '../db/reservasServiciosDb.js';

export default class reservaServicioServicios{

    constructor(){
        this.reservaServicio = new reservasServiciosDb();
    }

    addServicioReserva = async (reserva_id, servicios, conn) => {
        return await this.reservaServicio.postReservasServicios(reserva_id, servicios, conn);
    }
    
    //eliminar
    deleteReservaServicio = (reserva_servicio_id) => {
        return this.reservaServicio.deleteReservasServicios(reserva_servicio_id);
    }

    deleteServiciosPorReservaId = (reserva_id, conn) => {
        return this.reservaServicio.deleteServiciosPorReservaId(reserva_id, conn);
    }

    getServiciosDeReserva = async (reserva_id) => {
        return await this.reservaServicio.getServiciosConDetalle(reserva_id);
    };
}

