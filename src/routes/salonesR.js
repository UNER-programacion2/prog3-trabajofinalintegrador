import express from 'express';
import passport from 'passport';

import { validarCreateSalon, validarEditSalon } from '../middleware/validators/salonesValidator.js';
import salonesController from '../controllers/salones.js'; 
import { cacheMinutes} from '../middleware/cache/cache.js';
import { validarId } from '../middleware/validators/validacionId.js';
import autorizarUsuarios from '../middleware/auth/autorizarUsuarios.js';

const salonesRouter = express.Router();
const controller = new salonesController();
const authJwt = passport.authenticate('jwt', { session: false });

salonesRouter.get('/',
    cacheMinutes,
    authJwt,
    autorizarUsuarios(1,2,3),
    controller.getSalones);


salonesRouter.post('/', 
    validarCreateSalon,
    autorizarUsuarios(1,2), 
    controller.createSalon,
);


salonesRouter.route('/:salon_id')
    .get(
        validarId('salon_id'),
        cacheMinutes,
        autorizarUsuarios(1,2),
        controller.getSalonConId)

    .put(
        validarId('salon_id'),
        validarEditSalon,
        autorizarUsuarios(1,2),
        controller.editSalon)

    .delete(
        validarId('salon_id'),
        autorizarUsuarios(1,2),
        controller.deleteSalon)

/**
 * @swagger
 * /salones:
 *   get:
 *     summary: Obtener todos los salones activos
 *     tags:
 *       - Salones
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de salones activos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Salon'
 *       '401':
 *         description: No autorizado (token no válido o no provisto).
 *   post:
 *     summary: Crear un nuevo salón
 *     tags:
 *       - Salones
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalonInput'
 *     responses:
 *       '201':
 *         description: Salón creado exitosamente.
 *       '400':
 *         description: Datos de entrada inválidos.
 *       '401':
 *         description: No autorizado.
 *
 * /salones/{salon_id}:
 *   get:
 *     summary: Obtener un salón por su ID
 *     tags:
 *       - Salones
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: salon_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Datos del salón.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Salon'
 *       '401':
 *         description: No autorizado.
 *       '404':
 *         description: Salón no encontrado.
 *   put:
 *     summary: Actualizar un salón existente por ID
 *     tags:
 *       - Salones
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: salon_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalonInput'
 *     responses:
 *       '200':
 *         description: Salón actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Salon'
 *       '400':
 *         description: Datos de entrada inválidos.
 *       '401':
 *         description: No autorizado.
 *       '404':
 *         description: Salón no encontrado.
 *   delete:
 *     summary: Eliminar un salón (desactivación lógica)
 *     tags:
 *       - Salones
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: salon_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Salón eliminado (desactivado) exitosamente.
 *       '401':
 *         description: No autorizado.
 *       '404':
 *         description: Salón no encontrado.
 */

export { salonesRouter };



