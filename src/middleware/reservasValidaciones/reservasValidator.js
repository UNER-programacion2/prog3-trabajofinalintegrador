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

  // //check('servicio_id') 
  //   .notEmpty().withMessage('El ID del servicio es obligatorio.')
  //   .isInt({ gt: 0 }).withMessage('El ID del servicio debe ser un número entero positivo.'),


  check('servicios')
    .notEmpty().withMessage('La lista de servicios es obligatoria.')
    .isArray({ min: 1 }).withMessage('Debe proporcionar al menos un servicio.'),

  check('servicios.*.importe')
    .isFloat().withMessage('El importe del servicio debe ser un número válido.'),
    
  check('importe_total')
    .notEmpty().withMessage('El importe total es obligatorio.')
    .isFloat({ gt: 0 }).withMessage('El importe total debe ser un número positivo.'),

  validarCampos
];