import reservasDb from "../db/reservasDb.js";
import { validarFKsReserva } from "./validacionesFk.js";
import reservaServicioServicios from "./reservaServiciosService.js";
import NotificacionesService from "./notificacionesService.js";
import { conexion } from "../db/conexion.js";
import salonesServicios from "./salonesServicios.js";
import serviciosServicios from "./servicioService.js";



export default class reservasServicios {
  constructor() {
    this.reservas = new reservasDb();
    this.reservaServicioServicios = new reservaServicioServicios();
    this.notificacionesService = new NotificacionesService();
    this.salones = new salonesServicios();
    this.servicios = new serviciosServicios();
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


  createReserva = async (reserva) => {
  await validarFKsReserva(reserva);

  // ✅ Obtener conexión del pool
  const conn = await conexion.getConnection();
  await conn.beginTransaction();

  try {
    const {
      fecha_reserva,
      salon_id,
      usuario_id,
      turno_id,
      foto_cumpleaniero = null,
      tematica = null,
      servicios = []
    } = reserva;

    const salon = await this.salones.getSalonConId(salon_id);
if (!salon) throw new Error("El salón especificado no existe.");

// convierte a número (si el campo en DB se llama precio, usa salon.precio)
const importe_salon = Number(salon.importe ?? salon.precio ?? 0);

// obtiene los servicios con importe
const serviciosData = servicios.length
  ? await this.servicios.getServicioConIds(servicios)
  : [];

const totalServicios = serviciosData.reduce((acc, s) => acc + Number(s.importe), 0);

// suma total
const importe_total = importe_salon + totalServicios;

// ⚠️ Log para verificar que todo sea número
console.log(">>> importe_salon:", importe_salon);
console.log(">>> totalServicios:", totalServicios);
console.log(">>> importe_total:", importe_total);



    // 1️⃣ Obtener precios
    // const salon = await this.salones.getSalonConId(salon_id);
    // if (!salon) throw new Error("El salón especificado no existe.");

    // const serviciosData = servicios.length
    //   ? await this.servicios.getServicioConIds(servicios)
    //   : [];

    // const importe_salon = salon.importe;
    // const totalServicios = serviciosData.reduce((acc, s) => acc + s.importe, 0);
    // const importe_total = importe_salon + totalServicios;

    // 2️⃣ Crear reserva
    console.log("Insertando reserva con datos:", {
      fecha_reserva,
      salon_id,
      usuario_id,
      turno_id,
      foto_cumpleaniero,
      tematica,
      importe_salon,
      importe_total,
    });

    const result = await this.reservas.postReserva({
      fecha_reserva,
      salon_id,
      usuario_id,
      turno_id,
      foto_cumpleaniero,
      tematica,
      importe_salon,
      importe_total,
    });
    console.log(serviciosData)
    const reservaId = result.insertId;
    const servicioId = serviciosData.servicio_id
    console.log(servicioId);
    // 3️⃣ Insertar servicios asociados
    await this.reservaServicioServicios.addServicioReserva(reservaId, serviciosData);

    await conn.commit();

    // 4️⃣ Notificar
    // const datosParaNotificacion = await this.reservas.datosParaNotificacion(reservaId);
    // if (datosParaNotificacion?.length) {
    //   await this.notificacionesService.enviarCorreo(datosParaNotificacion);
    // }

    return this.reservas.getReservaConId(reservaId);

  } catch (error) {
    await conn.rollback();
    console.error("❌ Error en createReserva:", error);
    throw error;
  } finally {
    conn.release(); // ✅ ahora funciona porque conn viene del pool
  }
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