import express from 'express';
import ReservasController from '../controllers/reservas.js';

const reservasRouter = express.Router();
const controller = new ReservasController();

// GET todas las reservas
reservasRouter.get('/', controller.getReservas);

// POST crear una nueva reserva
reservasRouter.post('/', controller.postReserva);

// Rutas con ID
reservasRouter.route('/:reserva_id')
    .get(controller.getReservaConId)   // GET reserva por ID
    .put(controller.putReserva)        // PUT actualizar reserva
    .delete(controller.deleteReserva); // DELETE eliminar reserva

export { reservasRouter };