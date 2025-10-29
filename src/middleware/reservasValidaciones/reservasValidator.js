import { check } from 'express-validator';
import { validarCampos } from '../validarCampos.js';

export const validarCreateReserva = [
  check('fecha_reserva')
    .notEmpty().withMessage('La fecha de reserva es obligatoria.')
    .isISO8601().withMessage('Debe tener un formato de fecha válido (YYYY-MM-DD).'),

  check('salon_id')
    .notEmpty().withMessage('El ID del salón es obligatorio.')
    .isInt({ gt: 0 }).withMessage('El ID del salón debe ser un número entero positivo.'),

  check('usuario_id')
    .notEmpty().withMessage('El ID del usuario es obligatorio.')
    .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero positivo.'),

  check('turno_id')
    .notEmpty().withMessage('El ID del turno es obligatorio.')
    .isInt({ gt: 0 }).withMessage('El ID del turno debe ser un número entero positivo.'),

  check('importe_total')
    .notEmpty().withMessage('El importe total es obligatorio.')
    .isFloat({ gt: 0 }).withMessage('El importe total debe ser un número positivo.'),

  validarCampos
];

export const validarEditReserva = [
  check('fecha_reserva')
    .notEmpty().withMessage('La fecha de reserva es obligatoria.')
    .isISO8601().withMessage('Debe tener un formato de fecha válido (YYYY-MM-DD).'),

  check('salon_id')
    .notEmpty().withMessage('El ID del salón es obligatorio.')
    .isInt({ gt: 0 }).withMessage('El ID del salón debe ser un número entero positivo.'),

  check('usuario_id')
    .notEmpty().withMessage('El ID del usuario es obligatorio.')
    .isInt({ gt: 0 }).withMessage('El ID del usuario debe ser un número entero positivo.'),

  check('turno_id')
    .notEmpty().withMessage('El ID del turno es obligatorio.')
    .isInt({ gt: 0 }).withMessage('El ID del turno debe ser un número entero positivo.'),

  check('foto_cumpleaniero')
    .optional()
    .isURL().withMessage('La foto del cumpleañero debe ser una URL válida.'),

  check('tematica')
    .notEmpty().withMessage('La temática es obligatoria.')
    .isLength({ max: 100 }).withMessage('La temática no puede exceder los 100 caracteres.'),


  check('importe_total')
    .notEmpty().withMessage('El importe total es obligatorio.')
    .isFloat({ gt: 0 }).withMessage('El importe total debe ser un número positivo.'),

  validarCampos
];