import { check } from 'express-validator';
import { validarCampos } from '../middleware/validarCampos.js';

// create servicio
export const validarCreateServicio = [

  check('descripcion')
    .isString().withMessage("La descripción debe ser una cadena de texto.")
    .isLength({ max: 500 }).withMessage("La descripción no puede superar los 500 caracteres.")
    .escape(),

  check('importe')
    .not().isEmpty().withMessage("El importe es obligatorio.")
    .isFloat({ gt: 0 }).withMessage("El importe debe ser un número positivo."),

  check('activo')
    .optional()
    .isBoolean().withMessage("El campo 'activo' debe ser verdadero o falso (true/false, 1/0)."),

  validarCampos
];


// edit 
export const validarEditServicio = [

  check('descripcion')
    .optional({ checkFalsy: true })
    .isString().withMessage("La descripción debe ser una cadena de texto.")
    .isLength({ max: 500 }).withMessage("La descripción no puede superar los 500 caracteres.")
    .escape(),

  check('importe')
    .optional({ checkFalsy: true })
    .isFloat({ gt: 0 }).withMessage("El importe debe ser un número positivo."),

  check('activo')
    .optional()
    .isBoolean().withMessage("El campo 'activo' debe ser verdadero o falso (true/false, 1/0)."),

  validarCampos
];