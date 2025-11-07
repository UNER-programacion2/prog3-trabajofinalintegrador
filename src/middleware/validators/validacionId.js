import { param } from 'express-validator';
import { validarCampos } from './validarCampos.js';

export const validarId = (nombreParam) => {
    if (typeof nombreParam !== 'string' || nombreParam.trim() === '') {
        throw new Error("validarId necesita un nombre de parámetro válido, p.ej. validarId('id')");
    }

    return [
        param(nombreParam)
            .exists().withMessage(`Falta el parámetro '${nombreParam}' en la ruta.`)
            .bail()
            .isInt({ min: 1 }).withMessage(`El ID '${nombreParam}' no es válido. Debe ser un entero positivo.`)
            .toInt(),
        validarCampos
    ];
};