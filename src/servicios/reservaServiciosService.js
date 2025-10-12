import salonesDb from "../db/reservasServiciosDb.js";

export default class salonesServicios{

    constructor(){
        this.reservaServicio = new reservaServicio();
    }
    //obtener todos los salones
    getAllReservasServicios = () => {
        return this.salones.getAllReservasServicios();
    }

    //obtener mediante el id
    getSalonConId = (salon_id) => {
        return this.salones.getSalonConId(salon_id);
    }   

    //crear nuevo salon
    postSalones = (data) => {
        return this.salones.postSalon(data);
    }
    
    //modificar
    putSalones = (salon_id, data) => {
        const exist = this.salones.getSalonConId(salon_id);
        if (!exist){
            return null
        }
        return this.salones.putSalon(salon_id, data);
    }

    //eliminar
    deleteSalones = (salon_id) => {
        return this.salones.deleteSalon(salon_id);
    }
    }