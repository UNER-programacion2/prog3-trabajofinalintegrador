import express from 'express';
import apicache from 'apicache';
import { check } from 'express-validator';
import { validarCampos } from '../middleware/validarCampos.js';
import salonesController from '../controllers/salones.js'; 

const salonesRouter = express.Router();
const controller = new salonesController();
const cache = apicache.middleware;

salonesRouter.get('/', cache('5 minutes'),controller.getSalones);
salonesRouter.get('/:salon_id', controller.getSalonConId);
salonesRouter.post('/', 
    [check('titulo', 'El titulo es necesario.').notEmpty(),
    check('direccion', 'La direccion es necesaria.').notEmpty(),
    check('capacidad', 'La capacidad es necesaria.').notEmpty(),
    check('importe', 'El importe es necesario.').notEmpty(),
    validarCampos
    ],
    controller.createSalon);
salonesRouter.put('/:salon_id', 
    [ check('titulo', 'El titulo no puede estar vacio.').notEmpty(),
    check('direccion', 'La direccion es necesaria.').notEmpty(),
    check('capacidad', 'La capacidad es necesaria.').notEmpty(),
    check('importe', 'El importe es necesario.').notEmpty(),
    validarCampos],
   
    controller.editSalon);
salonesRouter.delete('/:salon_id', controller.deleteSalon);

export { salonesRouter };