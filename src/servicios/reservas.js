import reservasDb from "../db/reservasDb.js";
import { validarFKsReserva } from "./validacionesFk.js";
import reservaServicioServicios from "./reservaServiciosService.js";


export default class reservasServicios {
  constructor() {
    this.reservas = new reservasDb();
    this.reservaServicioServicios = reservaServicioServicios();
  }

  // GET - obtener todas las reservas
  getAllReservas = async () => {
    return await this.reservas.getReservas();
  };

  // GET BY ID - obtener una reserva por su id
  getReservaConId = async (reserva_id) => {
    return await this.reservas.getReservaConId(reserva_id);
  };


  // POST - crear nueva reserva 
  createReserva = async (data) => {
    await validarFKsReserva(data);
    //return await this.reservas.postReserva(data);

    const result = await this.reservas.postReserva(data);

    if (!result){
      return null
    }
    
    //relacion con servicios
    if (data.servicios && data.servicios.length > 0) {
      await this.reservas_servicios.crear(result.reserva_id, data.servicios);
    }
    return { ok: true, reserva_id: result.reserva_id };

};

  // PUT - editar reserva existente
  editReserva = async (reserva_id, data) => {
    await validarFKsReserva(data);
    return await this.reservas.putReserva(reserva_id, data);
  };

  // DELETE - eliminar (soft delete) reserva
  deleteReserva = async (reserva_id) => {
    return await this.reservas.deleteReserva(reserva_id);
  };
}