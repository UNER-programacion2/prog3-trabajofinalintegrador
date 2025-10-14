import salonesDb from "../db/reservasServiciosDb.js";

export default class salonesServicios{

    constructor(){
        this.reservaServicio = new reservaServicio();
    }
    //obtener todos los salones
    getAllReservasServicios = () => {
        return this.reservaServicio.getAllReservasServicios();
    }

    //obtener mediante el id
    getReservaServicioConId = (reserva_servicio_id) => {
        return this.reservaServicio.getReservaServicioConId(reserva_servicio_id);
    }   

    //crear nuevo salon
    createReservaServicio = (data) => {
        return this.reservaServicio.createReservaServicio(data);
    }
    
    //modificar
    editReservaServicio = (reserva_servicio_id, data) => {
        const exist = this.reservaServicio.getReservaServicioConId(reserva_servicio_id);
        if (!exist){
            return null
        }
        return this.reservaServicio.editReservaServicio(reserva_servicio_id, data);
    }

    //eliminar
    deleteReservaServicio = (reserva_servicio_id) => {
        return this.reservaServicio.deleteReservaServicio(reserva_servicio_id);
    }
}