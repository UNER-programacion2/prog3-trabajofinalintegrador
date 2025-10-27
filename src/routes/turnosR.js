import express from 'express';
import turnosController from '../controllers/turnos.js';
import { cacheMinutes} from '../middleware/cache.js';
//agregar validacion turnos

const turnosRouter = express.Router();
const controller = new turnosController();
//get
turnosRouter.get('/', 
    cacheMinutes,
    controller.getTurnos
);
// get id
turnosRouter.get('/:turno_id', 
    cacheMinutes,
    controller.getTurnoConId
);

// post
turnosRouter.post('/', 
    controller.addTurno,
);

turnosRouter.put('/:turno_id', 
    controller.updateTurno,
);

turnosRouter.delete('/:turno_id', 
    controller.deleteTurno,
);



export {turnosRouter} ;





