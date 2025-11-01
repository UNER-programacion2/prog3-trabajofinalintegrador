import { check } from 'express-validator';
import { validarCampos } from '../middleware/validarCampos.js';

// crear reserva_servicio
export const validarCreateReservaServicio = [
  check('reserva_id')
    .not().isEmpty().withMessage("El campo 'reserva_id' es obligatorio.")
    .isInt({ gt: 0 }).withMessage("El campo 'reserva_id' debe ser un número entero positivo."),

  check('servicios') 
    .isArray({ min: 1 }).withMessage("Debe incluir un array 'servicios' con al menos un servicio."),

  check('servicios.*.servicio_id')
    .not().isEmpty().withMessage("Cada servicio debe tener un 'servicio_id' obligatorio.")
    .isInt({ gt: 0 }).withMessage("El 'servicio_id' debe ser un número entero positivo."),

  check('servicios.*.importe')
    .not().isEmpty().withMessage("Cada servicio debe tener un 'importe' obligatorio.")
    .isFloat({ gt: 0 }).withMessage("El 'importe' debe ser un número positivo."),

  validarCampos
];