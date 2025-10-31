// BREAD RESERVAS
import ReservasServicios from "../servicios/reservas.js";

export default class ReservasController {

  constructor() {
    this.ReservasServicios = new ReservasServicios();
  }

  // GET - OBTENER TODAS LAS RESERVAS
  getReservas = async (req, res) => {
    try {
      const usuarioArray = req.user;
      if (!usuarioArray || usuarioArray.length === 0) {
            return res.status(401).json({ estado: false, mensaje: 'Usuario no autenticado.' });
        }
      const usuario = usuarioArray[0];

      const reservas = await this.ReservasServicios.getAllReservas(usuario);
      res.json({ estado: true, datos: reservas });
      
    } catch (error) {
      console.log('Error en GET /reservas', error);
      res.status(500).json({
        estado: false,
        mensaje: 'Error interno del servidor.'
      });
    }
  };

  // GET BY ID - OBTENER UNA RESERVA POR ID
  getReservaConId = async (req, res) => {
    try {
      const reserva_id = parseInt(req.params.reserva_id);

      // Validar ID
      if (isNaN(reserva_id)) {
        return res.status(400).json({
          ok: false,
          mensaje: "ID de reserva inválido."
        });
      }

      // Obtener reserva
      const reserva = await this.ReservasServicios.getReservaConId(reserva_id);

      // Si la consulta devuelve un array vacío o undefined
      if (!reserva || reserva.length === 0) {
        return res.status(404).json({
          ok: false,
          mensaje: "Reserva no encontrada."
        });
      }

      // Respuesta exitosa
      res.json({
        ok: true,
        reserva: reserva[0] || reserva // por si el servicio devuelve un array o un objeto
      });

    } catch (error) {
      console.error("Error en GET /reservas/:reserva_id", error);
      res.status(500).json({
        ok: false,
        mensaje: "Error interno del servidor."
      });
    }
  };

  // POST - CREAR NUEVA RESERVA
  postReserva = async (req, res) => {
  try {
    const {
      fecha_reserva,
      salon_id,
      usuario_id,
      turno_id,
      foto_cumpleaniero,
      tematica,
      importe_total,
      servicios
    } = req.body;

    // Validar campos mínimos
    if (!fecha_reserva || !salon_id || !usuario_id || !turno_id || !importe_total) {
      return res.status(400).json({
        estado: false,
        mensaje: 'Faltan campos requeridos.'
      });
    }

    const reserva = {
      fecha_reserva,
      salon_id,
      usuario_id,
      turno_id,
      foto_cumpleaniero,
      tematica,
      importe_total,
      servicios
    };

    // Intentar crear la reserva
    const nuevaReserva = await this.ReservasServicios.createReserva(reserva);

    res.status(201).json({
      estado: true,
      mensaje: `Reserva creada con ID ${nuevaReserva.usuario_id}`
    });

  } catch (error) {
    console.log('Error en POST /reservas:', error);

    //  servicio tira error con mensaje controlado (validación de FK)
    if (
      error.message.includes('no existe') || 
      error.message.includes('inválido')
    ) {
      return res.status(400).json({
        estado: false,
        mensaje: error.message
      });
    }

    //  error inesperado (fallo de DB, conexión)
    res.status(500).json({
      estado: false,
      mensaje: 'Error interno del servidor.'
    });
  }
};

  // PUT - EDITAR RESERVA
  putReserva = async (req, res) => {
    try {
      const reserva_id = req.params.reserva_id;
      const datos = req.body;

      const reservaModificada = await this.ReservasServicios.editReserva(reserva_id, datos);

      if (!reservaModificada) {
        return res.status(404).json({
          estado: false,
          mensaje: 'Reserva no encontrada.'
        });
      }

      res.status(200).json({
        estado: true,
        mensaje: `Reserva modificada con id ${reserva_id}`
      });
    } catch (error) {
      console.log('Error en PUT /reservas/:reserva_id', error);
      res.status(500).json({
        estado: false,
        mensaje: 'Error interno del servidor.'
      });
    }
  };

  // DELETE - ELIMINAR RESERVA (soft delete)
  deleteReserva = async (req, res) => {
    try {
      const reserva_id = req.params.reserva_id;
      const reservaEliminada = await this.ReservasServicios.deleteReserva(reserva_id);

      if (reservaEliminada.affectedRows === 0) {
        return res.status(404).json({
          estado: false,
          mensaje: 'La reserva no existe o ya fue eliminada.'
        });
      }

      res.status(200).json({
        estado: true,
        mensaje: `Reserva eliminada. id ${reserva_id}`
      });
    } catch (error) {
      console.log('Error en DELETE /reservas', error);
      res.status(500).json({
        estado: false,
        mensaje: 'Error interno del servidor.'
      });
    }
  };
}