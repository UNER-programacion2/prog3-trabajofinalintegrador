import express from 'express';

import { validarCreateSalon, validarEditSalon } from '../middleware/salonesValidator.js';
import salonesController from '../controllers/salones.js'; 
import { cacheMinutes} from '../middleware/cache.js';
import { validarId } from '../middleware/validacionId.js'

const salonesRouter = express.Router();
const controller = new salonesController();

salonesRouter.get('/',
    cacheMinutes,
    controller.getSalones);


salonesRouter.post('/', 
    validarCreateSalon, 
    controller.createSalon,
);


salonesRouter.route('/:salon_id')
    .get(
        validarId('salon_id'),
        cacheMinutes, 
        controller.getSalonConId)

    .put(
        validarId('salon_id'),
        validarEditSalon,
        controller.editSalon)

    .delete(
        validarId('salon_id'),
        controller.deleteSalon)



export { salonesRouter };



