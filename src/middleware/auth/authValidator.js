import { check } from 'express-validator';
import { validarCampos } from '../validators/validarCampos.js';


export const validacionLogin = [
    check('nombre_usuario', 'El correo electrónico es requerido!').not().isEmpty(),
    check('nombre_usuario', 'Revisar el formato del correo electrónico!').isEmail(),
    check('contrasenia', 'La contrasenia es requerida!').not().isEmpty(),
    validarCampos
]


