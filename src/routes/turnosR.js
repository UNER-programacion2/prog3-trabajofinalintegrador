import express from 'express';

import turnosController from '../controllers/turnos.js';
import { cacheMinutes} from '../middleware/cache.js';
import { validarCreateTurno, validarEditTurno } from '../middleware/turnosValidator.js';
import { validarId } from '../middleware/validacionId.js'

const turnosRouter = express.Router();
const controller = new turnosController();
//get
turnosRouter.get('/', 
    cacheMinutes,
    controller.getTurnos
);

// post
turnosRouter.post('/', 
    validarCreateTurno,
    controller.addTurno,
);


turnosRouter.route('/:turno_id')
    // GET turno por ID
    .get( 
        validarId('turno_id'),
        cacheMinutes,
        controller.getTurnoConId)

    // PUT turno  
    .put( 
        validarId('turno_id'),
        validarEditTurno,
        controller.updateTurno)

    // DELETE turno          
    .delete(
        validarId('turno_id'),
        controller.deleteTurno); 


export {turnosRouter} ;





