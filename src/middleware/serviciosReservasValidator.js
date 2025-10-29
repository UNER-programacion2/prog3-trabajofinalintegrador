import { check } from 'express-validator';
import { validarCampos } from '../middleware/validarCampos.js';

// crear reserva_servicio
export const validarCreateReservaServicio = [
  check('reserva_id')
    .not().isEmpty().withMessage("El campo 'reserva_id' es obligatorio.")
    .isInt({ gt: 0 }).withMessage("El campo 'reserva_id' debe ser un número entero positivo."),

  check('servicio_id')
    .not().isEmpty().withMessage("El campo 'servicio_id' es obligatorio.")
    .isInt({ gt: 0 }).withMessage("El campo 'servicio_id' debe ser un número entero positivo."),

  check('cantidad')
    .optional({ checkFalsy: true })
    .isInt({ gt: 0 }).withMessage("La cantidad debe ser un número entero positivo."),

  check('importe')
    .optional({ checkFalsy: true })
    .isFloat({ gt: 0 }).withMessage("El importe debe ser un número positivo."),

  check('activo')
    .optional()
    .isBoolean().withMessage("El campo 'activo' debe ser verdadero o falso (true/false, 1/0)."),

  validarCampos
];


// editar resrva_servicio
export const validarEditReservaServicio = [
  check('reserva_id')
    .optional({ checkFalsy: true })
    .isInt({ gt: 0 }).withMessage("El campo 'reserva_id' debe ser un número entero positivo."),

  check('servicio_id')
    .optional({ checkFalsy: true })
    .isInt({ gt: 0 }).withMessage("El campo 'servicio_id' debe ser un número entero positivo."),

  check('cantidad')
    .optional({ checkFalsy: true })
    .isInt({ gt: 0 }).withMessage("La cantidad debe ser un número entero positivo."),

  check('importe')
    .optional({ checkFalsy: true })
    .isFloat({ gt: 0 }).withMessage("El importe debe ser un número positivo."),

  check('activo')
    .optional()
    .isBoolean().withMessage("El campo 'activo' debe ser verdadero o falso (true/false, 1/0)."),

  validarCampos
];
