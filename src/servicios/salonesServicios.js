import salonesDb from "../db/salonesDB.js";

export default class salonesServicios{

    constructor(){
        this.salones = new salonesDb();
    }
    //obtener todos los salones
    getAllSalones = () => {
        return this.salones.getSalones();
    }

    //obtener mediante el id
    getSalonConId = (salon_id) => {
        return this.salones.getSalonConId(salon_id);
    }   

    //crear nuevo salon
    createSalones = (data) => {
        return this.salones.createSalon(data);
    }
    
    //modificar
    editSalones = (salon_id, data) => {
        const exist = this.salones.getSalonConId(salon_id);
        if (!exist){
            return null
        }
        return this.salones.editSalon(salon_id, data);
    }

    //eliminar
    deleteSalones = (salon_id) => {
        return this.salones.deleteSalon(salon_id);
    }
    }