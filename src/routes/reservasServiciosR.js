import express from 'express';
import reservasServiciosController from '../controllers/reservas_Servicios.js';
import { validarCreateReservaServicio } from '../middleware/serviciosReservasValidator.js';
import { validarId } from '../middleware/validacionId.js'


const reservasServiciosR = express.Router();
const controller = new reservasServiciosController();


reservasServiciosR.post('/',
    validarCreateReservaServicio,
    controller.addServicioReserva
);


reservasServiciosR.delete('/:id',
    validarId('id'),
    controller.deleteRerservaServicio
);

export { reservasServiciosR };
