import { check } from 'express-validator';
import { validarCampos } from '../middleware/validarCampos.js';

export const validarCreateSalon = [ 
    check('titulo')
        .not().isEmpty().withMessage("El título es obligatorio.")
        .isString().withMessage("Debe ser una cadena de texto."),

    check('direccion')
        .not().isEmpty().withMessage("La direccion es obligatoria.")
        .isString().withMessage("Debe ser una cadena de texto."),
    
    check('capacidad') 
        .not().isEmpty().withMessage("La capacidad es obligatoria.")
        .isNumeric().withMessage("La capacidad debe ser un número entero positivo."),

    check('importe')
        .not().isEmpty().withMessage("La importe es obligatoria.")
        .isNumeric().withMessage("El importe debe ser un número entero positivo."),
    
    validarCampos
];


export const validarEditSalon = [
    check('titulo')
        .optional()
        .not().isEmpty().withMessage("El título es obligatorio.")
        .isString().withMessage("Debe ser una cadena de texto."),

    check('direccion')
        .optional()
        .not().isEmpty().withMessage("La direccion es obligatoria.")
        .isString().withMessage("Debe ser una cadena de texto."),
    
    check('capacidad') 
        .optional()
        .not().isEmpty().withMessage("La capacidad es obligatoria.")
        .isNumeric(({ gt: 0 })).withMessage("La capacidad debe ser un número entero positivo."),

    check('importe')
        .optional()
        .not().isEmpty().withMessage("La importe es obligatoria.")
        .isNumeric(({ gt: 0 })).withMessage("El importe debe ser un número entero positivo."),
    
    validarCampos

];
