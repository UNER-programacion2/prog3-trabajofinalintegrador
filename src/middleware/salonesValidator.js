import { check } from 'express-validator';
import { validarCampos } from '../middleware/validarCampos.js';

export const validarCreateSalon = [
    check('titulo', 'El titulo es necesario.').notEmpty(),
    check('direccion', 'La direccion es necesaria.').notEmpty(),
    check('capacidad', 'La capacidad es necesaria.').isInt(), 
    check('importe', 'El importe es necesario.') .notEmpty().isFloat(), 
    validarCampos
];


export const validarEditSalon = [
    check('titulo', 'El titulo no puede estar vacio.').notEmpty(),
    check('direccion', 'La direccion es necesaria.').notEmpty(),
    check('capacidad', 'La capacidad es necesaria.').notEmpty().isInt(), 
    check('importe', 'El importe es necesario.').notEmpty().isFloat(), 
    validarCampos
];
