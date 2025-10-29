import reservasServiciosDb from "../db/reservasServiciosDb.js";

export default class salonesServicios{

    constructor(){
        this.reservaServicio = new reservasServiciosDb();
    }
    // //obtener todos los salones
    // getAllReservasServicios = () => {
    //     return this.reservaServicio.getReservasServicios();
    // }

    // //obtener mediante el id
    // getReservaServicioConId = (reserva_servicio_id) => {
    //     return this.reservaServicio.getReservasServiciosId(reserva_servicio_id);
    // }   

    //crear nuevo salon
    addServicioReserva = async (data) => {
        return await this.reservaServicio.postReservasServicios(data);
    }
    

    eliminar
    deleteReservaServicio = (reserva_servicio_id) => {
        return this.reservaServicio.deleteReservasServicios(reserva_servicio_id);
    }
}

// //modificar
    // updateReservaServicio = (reserva_servicio_id, data) => {
    //     const exist = this.reservaServicio.getReservasServiciosId(reserva_servicio_id);
    //     if (!exist){
    //         return null
    //     }
    //     return this.reservaServicio.putReservasServicios(reserva_servicio_id, data);
    // }