import express from 'express';
import passport from 'passport';

import ReservasController from '../controllers/reservas.js';
import { validarCreateReserva, validarEditReserva } from '../middleware/reservasValidaciones/reservasValidator.js';
import autorizarUsuarios from '../middleware/autorizarUsuarios.js';

const reservasRouter = express.Router();
const controller = new ReservasController();

// GET todas las reservas
reservasRouter.get('/', 
    passport.authenticate('jwt', { session: false }),
    autorizarUsuarios(1,2,3),
    controller.getReservas);

// POST crear una nueva reserva
reservasRouter.post('/', 
    passport.authenticate('jwt', { session: false }),
    autorizarUsuarios(1,3),
    validarCreateReserva, 
    controller.postReserva);

// Rutas con ID
reservasRouter.route('/:reserva_id')
// GET reserva por ID
    .get(
        passport.authenticate('jwt', { session: false }),
        autorizarUsuarios(1,3),
        controller.getReservaConId) 
// PUT actualizar reserva          
    .put( 
        passport.authenticate('jwt', { session: false }),
        autorizarUsuarios(1),
        controller.putReserva) 
// DELETE eliminar reserva              
    .delete(
        passport.authenticate('jwt', { session: false }),
        autorizarUsuarios(1),
        controller.deleteReserva); 

export { reservasRouter };

// 1 = admin
// 2 = empleado
// 3 = cliente