import express from 'express';
import reservasServiciosController from '../controllers/reservas_Servicios.js';
import { validarCreateReservaServicio } from '../middleware/serviciosReservasValidator.js';
import { validarId } from '../middleware/validacionId.js'
import autorizarUsuarios from '../middleware/autorizarUsuarios.js';


const reservasServiciosR = express.Router();
const controller = new reservasServiciosController();


reservasServiciosR.post('/',
    validarCreateReservaServicio,
    autorizarUsuarios(1),
    controller.addServicioReserva
);


reservasServiciosR.delete('/:id',
    validarId('id'),
    autorizarUsuarios(1),
    controller.deleteRerservaServicio

);

export { reservasServiciosR };
