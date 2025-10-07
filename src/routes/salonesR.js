import express from 'express';
import salonesController from '../controllers/salones.js'; 


const salonesRouter = express.Router();
const controller = new salonesController();


salonesRouter.get('/', controller.getSalones);
salonesRouter.get('/:salon_id', controller.getSalonConId);
salonesRouter.post('/', controller.postSalon);
salonesRouter.put('/:salon_id', controller.putSalon);
salonesRouter.delete('/:salon_id', controller.deleteSalon);

export { salonesRouter };