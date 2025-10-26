import reservasDb from "../db/reservasDb";

export default class reservasServicios{
    constructor(){
        this.reservas = new reservasDb();
    }

    getAllReservas = () => {
        return this.reservas.getReservas();
    }

    getReservaConId = (reservas_id) =>{
        return this.reservas.getReservasConId(reservas_id)
    }

    postReserva = async (data) =>{
        return await this.reservas.postReserva(data);
    }

    putR
}