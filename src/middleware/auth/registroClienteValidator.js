import { check } from 'express-validator';
import { validarCampos } from '../validators/validarCampos.js';


export const validarRegistroCliente = [ 
    check('nombre')
        .not().isEmpty().withMessage("El nombre es obligatorio.")
        .isString().withMessage("Debe ser una cadena de texto."),

    check('apellido')
        .not().isEmpty().withMessage("El apellido es obligatorio.")
        .isString().withMessage("Debe ser una cadena de texto."),
    
    check('nombre_usuario')
        .isEmail().withMessage('El nombre de usuario tiene que ser un correo')
        .trim()
        .not().isEmpty().withMessage('El email es obligatorio'),

    check('contrasenia')
        .not().isEmpty().withMessage("La contraseña es obligatoria.")
        .isString().withMessage("Debe ser una cadena de texto.")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
        .withMessage("La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales."),
    
    validarCampos
    
];