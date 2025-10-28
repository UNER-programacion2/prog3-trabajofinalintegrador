import reservasDb from "../db/reservasDb.js";
import { validarFKsReserva } from "./validacionesFk.js";
export default class reservasServicios {
  constructor() {
    this.reservas = new reservasDb();
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
    return await this.reservas.postReserva(data);
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