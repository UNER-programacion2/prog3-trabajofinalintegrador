import express from 'express';
import salonesController from '../controllers/salones.js'; 
const salonesRouter = express.Router();

//const salonesController = new salonesRouter();


salonesRouter.get('/', salonesController.getSalones);
salonesRouter.get('/:salon_id', salonesController.getSalonConId);
salonesRouter.post('/', salonesController.postSalon);
salonesRouter.put('/:salon_id', salonesController.putSalon);
salonesRouter.delete('/:salon_id', salonesController.deleteSalon);

export { salonesRouter };