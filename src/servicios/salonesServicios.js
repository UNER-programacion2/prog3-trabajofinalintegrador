import Salones from "../db/salonesDB.js";

export default class salonesServicios{
    constructor(){
        this.salones = Salones();
    }

    getSalones = () => {
        return this.salones.getSalones();
        }

    getSalonesConId = () => {
        return this.salones.getSalonesConId();
        }
    
    postSalones = () => {
        return this.salones.postSalones();
        }

    putSalones = () => {
        return this.salones.putSalones();
        }
        
    deleteSalones = () => {
        return this.salones.deleteSalones();
        }

}