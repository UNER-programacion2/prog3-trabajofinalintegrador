import { check } from 'express-validator';
import { validarCampos } from '../middleware/validarCampos.js';


export const validarCreateUsuario = [ 
    check('nombre')
        .not().isEmpty().withMessage("El nombre es obligatorio.")
        .isString().withMessage("Debe ser una cadena de texto."),

    check('apellido')
        .not().isEmpty().withMessage("El apellido es obligatorio.")
        .isString().withMessage("Debe ser una cadena de texto."),
    
    check('nombre_usuario') 
        .not().isEmpty().withMessage("El nombre_usuario es obligatorio.")
        .isString().withMessage("Debe ser una cadena de texto."),

    check('contrasenia')
        .not().isEmpty().withMessage("La contraseña es obligatoria.")
        .isString().withMessage("Debe ser una cadena de texto.")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
        .withMessage("La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales."),

    check('tipo_usuario')
        .not().isEmpty().withMessage("El tipo_usuario es obligatorio.")
        .isString().withMessage("Debe ser una cadena de texto."),
    
    validarCampos
    
];


export const validarEditUsuario = [
    check('nombre')
        .optional() 
        .not().isEmpty().withMessage("El nombre no puede estar vacío.") 
        .isString().withMessage("Debe ser una cadena de texto."),

    check('apellido')
        .optional()
        .not().isEmpty().withMessage("El apellido no puede estar vacío.")
        .isString().withMessage("Debe ser una cadena de texto."),
    
    check('nombre_usuario') 
        .optional()
        .not().isEmpty().withMessage("El nombre_usuario no puede estar vacío.")
        .isString().withMessage("Debe ser una cadena de texto."),

    check('contrasenia')
        .optional()
        .isString().withMessage("Debe ser una cadena de texto.")
        .isLength({ min: 8 }).withMessage("La contraseña debe tener al menos 8 caracteres.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
        .withMessage("La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales."),

    check('tipo_usuario')
        .optional()
        .not().isEmpty().withMessage("El tipo_usuario no puede estar vacío.")
        .isString().withMessage("Debe ser una cadena de texto."),
    
    validarCampos

];
