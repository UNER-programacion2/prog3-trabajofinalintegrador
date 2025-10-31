import express from 'express';

import ReservasController from '../controllers/reservas.js';
import { validarCreateReserva } from '../middleware/reservasValidaciones/reservasValidator.js';
import autorizarUsuarios from '../middleware/autorizarUsuarios.js';

const reservasRouter = express.Router();
const controller = new ReservasController();

// GET todas las reservas
reservasRouter.get('/', 
    autorizarUsuarios([1,2,3]),
    controller.getReservas);

// POST crear una nueva reserva
reservasRouter.post('/', 
    autorizarUsuarios([1,3]),
    validarCreateReserva, 
    controller.postReserva);

// Rutas con ID
reservasRouter.route('/:reserva_id')
    .get(
        autorizarUsuarios([1,3]),
        controller.getReservaConId) 
          // GET reserva por ID
    .put(
        autorizarUsuarios([1]),
        controller.putReserva) 
               // PUT actualizar reserva
    .delete(
        autorizarUsuarios([1]),
        controller.deleteReserva); // DELETE eliminar reserva

export { reservasRouter };

// 1 = admin
// 2 = empleado
// 3 = cliente