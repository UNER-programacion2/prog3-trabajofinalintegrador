import express from 'express';

import turnosController from '../controllers/turnos.js';
import { cacheMinutes} from '../middleware/cache.js';
import { validarCreateTurno, validarEditTurno } from '../middleware/turnosValidator.js';
import { validarId } from '../middleware/validacionId.js';
import autorizarUsuarios from '../middleware/autorizarUsuarios.js';

const turnosRouter = express.Router();
const controller = new turnosController();
//get
turnosRouter.get('/', 
    autorizarUsuarios(1,2,3),
    cacheMinutes,
    controller.getTurnos
);

// post
turnosRouter.post('/', 
    autorizarUsuarios(1,2),
    validarCreateTurno,
    controller.addTurno,
);


turnosRouter.route('/:turno_id')
    // GET turno por ID
    .get( 
        autorizarUsuarios(1,2),
        validarId('turno_id'),
        cacheMinutes,
        controller.getTurnoConId)

    // PUT turno  
    .put( 
        autorizarUsuarios(1,2),
        validarId('turno_id'),
        validarEditTurno,
        controller.updateTurno)

    // DELETE turno          
    .delete(
        autorizarUsuarios(1,2),
        validarId('turno_id'),
        controller.deleteTurno); 


export {turnosRouter} ;





