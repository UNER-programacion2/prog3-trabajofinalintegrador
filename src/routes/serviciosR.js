// /routes/serviciosR.js
import express from 'express';
import serviciosController from '../controllers/servicios.js'; 
import { validarCreateServicio, validarEditServicio  } from '../middleware/serviciosValidator.js';
import { validarId } from '../middleware/validacionId.js'
import { cacheMinutes} from '../middleware/cache.js';

const serviciosRouter = express.Router();
const controller = new serviciosController(); 


serviciosRouter.get('/',
    cacheMinutes,
    controller.getServicios);

serviciosRouter.post('/',
    validarCreateServicio,
    controller.addServicio,
);

serviciosRouter.route('/:servicio_id')
    .get(
        validarId('servicio_id'),
        cacheMinutes,
        controller.getServicioConId)
    .put(
        validarId('servicio_id'),
        validarEditServicio,
        controller.editServicio)
    .delete(
        validarId('servicio_id'),
        controller.deleteServicio);

export { serviciosRouter };