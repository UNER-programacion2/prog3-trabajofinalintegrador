import express from 'express';
import { getTurnos, getTurnoConId, addTurno, updateTurno, deleteTurno } from '../controllers/turnos.js';

const turnosRouter = express.Router();

turnosRouter.get('/', getTurnos);
turnosRouter.get('/turnos/:id', getTurnoConId);
turnosRouter.post('/turnos', addTurno);
turnosRouter.put('/turnos/:id', updateTurno);
turnosRouter.delete('/turnos/:id', deleteTurno);

export default turnosRouter ;
