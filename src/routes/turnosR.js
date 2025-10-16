import express from 'express';
import { getTurnos, getTurnoConId, addTurno, updateTurno, deleteTurno } from '../controllers/turnos.js';

const turnosRouter = express.Router();

turnosRouter.get('/', getTurnos);
turnosRouter.get('/:turno_id', getTurnoConId);
turnosRouter.post('/', addTurno);
turnosRouter.put('/:turno_id', updateTurno);
turnosRouter.delete('/:turno_id', deleteTurno);

export default turnosRouter ;
