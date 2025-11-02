import reservasDb from "../db/reservasDb.js";
import { validarFKsReserva } from "./validacionesFk.js";
import reservaServicioServicios from "./reservaServiciosService.js";



export default class reservasServicios {
  constructor() {
    this.reservas = new reservasDb();
    this.reservaServicioServicios = new reservaServicioServicios();
  }

  // GET - obtener todas las reservas
  getAllReservas = async (usuario) => {
    const reservasBase = 
      usuario.tipo_usuario < 3 
          ? await this.reservas.getReservas()
          : await this.reservas.getPropiasReservas(usuario.usuario_id);

    // agregamos los servicios
    const reservasConServicios = await Promise.all(
      reservasBase.map(async (reserva) => {
        const servicios = await this.reservaServicioServicios.getServiciosDeReserva(reserva.reserva_id);
        return { ...reserva, servicios };
      })
    );
    return reservasConServicios;
  };
  
  // GET BY ID - obtener una reserva por su id
  getReservaConId = async (reserva_id) => {
     const reservaBase = await this.reservas.getReservaConId(reserva_id);
    if (!reservaBase || reservaBase.length === 0) return null;

    const reserva = reservaBase[0];
    const servicios = await this.reservaServicioServicios.getServiciosDeReserva(reserva_id);

    return { ...reserva, servicios };
  };


  // POST - crear nueva reserva 
  createReserva = async (reserva) => {
    await validarFKsReserva(reserva);
  
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