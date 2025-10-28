import express from 'express';
import reservasServiciosController from '../controllers/reservas_Servicios.js';
import { validarCreateReservaServicio, validarEditReservaServicio } from '../middleware/serviciosReservasValidator.js';
import { cacheMinutes} from '../middleware/cache.js';
import { validarId } from '../middleware/validacionId.js'


const reservasServiciosR = express.Router();
const controller = new reservasServiciosController();


reservasServiciosR.get('/',
  cacheMinutes,
  controller.getReservasServicios
);


reservasServiciosR.post('/',
  validarCreateReservaServicio,
  controller.addServicioReserva
);


reservasServiciosR
  .route('/:reserva_servicio_id')
    .get(
        validarId('reserva_servicio_id'),
        cacheMinutes,
        controller.getReservaServicioConId
    )

    .put(
        validarId('reserva_servicio_id'),
        validarEditReservaServicio,
        controller.updateReservaServicio
    )

    // .delete(
    //     validarId,
    //     controller.
    // );


export { reservasServiciosR };
