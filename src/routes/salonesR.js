import express from 'express';

import { validarCreateSalon, validarEditSalon } from '../middleware/salonesValidator.js';
import salonesController from '../controllers/salones.js'; 
import { cacheMinutes} from '../middleware/cache.js';

const salonesRouter = express.Router();
const controller = new salonesController();

salonesRouter.get('/',
    cacheMinutes,
    controller.getSalones);

salonesRouter.get('/:salon_id',
    cacheMinutes, 
    controller.getSalonConId);

salonesRouter.post('/', 
    validarCreateSalon, 
    controller.createSalon,
);

salonesRouter.put('/:salon_id', 
    validarEditSalon,
    controller.editSalon,
);

salonesRouter.delete('/:salon_id', 
    controller.deleteSalon,
);


export { salonesRouter };



