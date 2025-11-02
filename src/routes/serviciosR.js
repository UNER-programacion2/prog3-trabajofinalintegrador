// /routes/serviciosR.js
import express from 'express';
import serviciosController from '../controllers/servicios.js'; 
import { validarCreateServicio, validarEditServicio  } from '../middleware/serviciosValidator.js';
import { validarId } from '../middleware/validacionId.js'
import { cacheMinutes} from '../middleware/cache.js';
import autorizarUsuarios from '../middleware/autorizarUsuarios.js';

const serviciosRouter = express.Router();
const controller = new serviciosController(); 


serviciosRouter.get('/',
    autorizarUsuarios(1,2,3),
    cacheMinutes,
    controller.getServicios);

serviciosRouter.post('/',
    autorizarUsuarios(1,2),
    validarCreateServicio,
    controller.addServicio,
);

serviciosRouter.route('/:servicio_id')
    .get(
        autorizarUsuarios(1,2),
        validarId('servicio_id'),
        cacheMinutes,
        controller.getServicioConId)
    .put(
        validarId('servicio_id'),
        autorizarUsuarios(1,2),
        validarEditServicio,
        controller.editServicio)
    .delete(
        autorizarUsuarios(1,2),
        validarId('servicio_id'),
        controller.deleteServicio);

export { serviciosRouter };