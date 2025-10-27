import turnosDb from "../db/turnosDB.js";

export default class turnosServicios{
    constructor(){
        this.turnos = new turnosDb();
    }
    //obtener todos los turnos
    getAllTurnos = () => {
        return this.turnos.getTurnos();
    }

    //obtener mediante el id
    getTurnoConId = (turno_id) => {
        return this.turnos.getTurnoConId(turno_id);
    }   

    //crear nuevo turno
    createTurno = (data) => {
        return this.turnos.createTurno(data);
    }
    
    //modificar
    editTurno = (turno_id, datos) => {
        const exist = this.turnos.getTurnoConId(turno_id);
        if (!exist){
            return null
        }
        return this.turnos.editTurno(turno_id, datos);
    }

    //eliminar
    deleteTurno = (turno_id) => {
        return this.turnos.deleteTurno(turno_id);
    }

}