import express from 'express';
import { getSalones, getSalonConId, postSalon } from '../controllers/salones.js';
const salonesRouter = express.Router();

salonesRouter.get('/', getSalones);
salonesRouter.get('/:salon_id', getSalonConId);
salonesRouter.post('/', postSalon);
//salonesRouter.put('/', putSalon);

export { salonesRouter };