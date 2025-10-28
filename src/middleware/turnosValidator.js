import { check } from 'express-validator';
import { validarCampos } from '../middleware/validarCampos.js';

// create turno
export const validarCreateTurno = [
  check('orden')
    .not().isEmpty().withMessage("El campo 'orden' es obligatorio.")
    .isInt({ gt: 0 }).withMessage("El orden debe ser un número entero positivo."),

  check('hora_desde')
    .not().isEmpty().withMessage("La hora de inicio es obligatoria.")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage("El formato de la hora de inicio debe ser HH:mm (ejemplo: 09:30)."),

  check('hora_hasta')
    .not().isEmpty().withMessage("La hora de fin es obligatoria.")
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage("El formato de la hora de fin debe ser HH:mm (ejemplo: 10:30)."),

  check('activo')
    .optional()
    .isBoolean().withMessage("El campo 'activo' debe ser verdadero o falso (true/false, 1/0)."),

  validarCampos
];


// editar turno
export const validarEditTurno = [
  check('orden')
    .optional()
    .isInt({ gt: 0 }).withMessage("El orden debe ser un número entero positivo."),

  check('hora_desde')
    .optional()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage("El formato de la hora de inicio debe ser HH:mm (ejemplo: 09:30)."),

  check('hora_hasta')
    .optional()
    .matches(/^([0-1]\d|2[0-3]):([0-5]\d)$/).withMessage("El formato de la hora de fin debe ser HH:mm (ejemplo: 10:30)."),

  check('activo')
    .optional()
    .isBoolean().withMessage("El campo 'activo' debe ser verdadero o falso (true/false, 1/0)."),

  validarCampos
];
