import express from 'express';
import { getSalones, getSalonConId } from '../controllers/salones.js';
const salonesRouter = express.Router();

salonesRouter.get('/', getSalones);
salonesRouter.get('/:salon_id', getSalonConId);

export { salonesRouter };