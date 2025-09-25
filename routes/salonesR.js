import express from 'express';
import { getSalones, getSalonConId, postSalon, putSalon, deleteSalon } from '../controllers/salones.js';
const salonesRouter = express.Router();

salonesRouter.get('/', getSalones);
salonesRouter.get('/:salon_id', getSalonConId);
salonesRouter.post('/', postSalon);
salonesRouter.put('/:salon_id', putSalon);
salonesRouter.delete('/:salon_id', deleteSalon);

export { salonesRouter };