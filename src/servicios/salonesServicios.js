import salonesDb from "../db/salonesDB.js";

export default class salonesServicios{

    constructor(){
        this.salones = new salonesDb();
    }

    getSalones = () => {
        return this.salones.getSalones();
    }

    getSalonConId = (salon_id) => {
        return this.salones.getSalonConId(salon_id);
    }

    postSalones = (data) => {
        return this.salones.postSalon(data);
    }

    putSalones = (salon_id, data) => {
        return this.salones.putSalon(salon_id, data);
    }

    deleteSalones = (salon_id) => {
        return this.salones.deleteSalon(salon_id);
    }
    }