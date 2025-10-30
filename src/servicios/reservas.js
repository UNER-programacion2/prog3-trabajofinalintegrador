import reservasDb from "../db/reservasDb.js";
import { validarFKsReserva } from "./validacionesFk.js";
import reservaServicioServicios from "./reservaServiciosService.js";


export default class reservasServicios {
  constructor() {
    this.reservas = new reservasDb();
    this.reservaServicioServicios = new reservaServicioServicios();
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
  createReserva = async (reserva) => {
    await validarFKsReserva(reserva);
    //return await this.reservas.postReserva(data);

  const {
          fecha_reserva,
          salon_id,
          usuario_id,
          turno_id,
          foto_cumpleaniero, 
          tematica,
          importe_salon,
          importe_total,
          servicios } = reserva;

      const nuevaReserva = {
          fecha_reserva,
          salon_id,
          usuario_id,
          turno_id,
          foto_cumpleaniero, 
          tematica,
          importe_salon,
          importe_total
        }    

    const result = await this.reservas.postReserva(nuevaReserva);

    if (!result){
      return null
    }
    
    await this.reservaServicioServicios.addServicioReserva(result.insertId, servicios);
    //return { ok: true, reserva_id: result.reserva_id };
    return this.reservas.getReservaConId(result.insertId);

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