import express from 'express';
import passport from 'passport';

import { validarCreateSalon, validarEditSalon } from '../middleware/salonesValidator.js';
import salonesController from '../controllers/salones.js'; 
import { cacheMinutes} from '../middleware/cache.js';
import { validarId } from '../middleware/validacionId.js'
import autorizarUsuarios from '../middleware/autorizarUsuarios.js';

const salonesRouter = express.Router();
const controller = new salonesController();
const authJwt = passport.authenticate('jwt', { session: false });

salonesRouter.get('/',
    cacheMinutes,
    authJwt,
    autorizarUsuarios(1,2,3),
    controller.getSalones);


salonesRouter.post('/', 
    validarCreateSalon,
    autorizarUsuarios(1,2), 
    controller.createSalon,
);


salonesRouter.route('/:salon_id')
    .get(
        validarId('salon_id'),
        cacheMinutes,
        autorizarUsuarios(1,2),
        controller.getSalonConId)

    .put(
        validarId('salon_id'),
        validarEditSalon,
        autorizarUsuarios(1,2),
        controller.editSalon)

    .delete(
        validarId('salon_id'),
        autorizarUsuarios(1,2),
        controller.deleteSalon)



export { salonesRouter };



