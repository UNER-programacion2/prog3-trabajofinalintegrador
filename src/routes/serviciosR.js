import express from 'express';
import passport from 'passport';

import serviciosController from '../controllers/servicios.js'; 
import { validarCreateServicio, validarEditServicio  } from '../middleware/validators/serviciosValidator.js';
import { validarId } from '../middleware/validators/validacionId.js';
import { cacheMinutes} from '../middleware/cache/cache.js';
import autorizarUsuarios from '../middleware/auth/autorizarUsuarios.js';

const serviciosRouter = express.Router();
const controller = new serviciosController(); 


serviciosRouter.get('/',
    cacheMinutes,
    controller.getServicios);

serviciosRouter.post('/',
    passport.authenticate('jwt', { session: false }),
    autorizarUsuarios(1,2),
    validarCreateServicio,
    controller.addServicio,
);

serviciosRouter.route('/:servicio_id')
    .get(
        passport.authenticate('jwt', { session: false }),
        autorizarUsuarios(1,2),
        validarId('servicio_id'),
        cacheMinutes,
        controller.getServicioConId)

    .put(
        passport.authenticate('jwt', { session: false }),
        validarId('servicio_id'),
        autorizarUsuarios(1,2),
        validarEditServicio,
        controller.editServicio)

    .delete(
        passport.authenticate('jwt', { session: false }),
        autorizarUsuarios(1,2),
        validarId('servicio_id'),
        controller.deleteServicio);


/**
 * @swagger
 * tags:
 *   name: Servicios
 *   description: Endpoints para los servicios adicionales
 */

/**
 * @swagger
 * /servicios:
 *   get:
 *     summary: Listar todos los servicios disponibles
 *     tags: [Servicios]
 *     responses:
 *       200:
 *         description: Lista de servicios
 *
 *   post:
 *     summary: Crear un nuevo servicio
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       201:
 *         description: Servicio creado
 *
 * /servicios/{servicio_id}:
 *   get:
 *     summary: Obtener un servicio por su ID
 *     tags: [Servicios]
 *     parameters:
 *       - name: servicio_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Servicio encontrado
 *       404:
 *         description: Servicio no encontrado
 *
 *   put:
 *     summary: Actualizar un servicio existente
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: servicio_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *     responses:
 *       200:
 *         description: Servicio actualizado
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Servicio no encontrado
 *
 *   delete:
 *     summary: Eliminar un servicio
 *     tags: [Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: servicio_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Servicio eliminado (desactivado)
 *       404:
 *         description: Servicio no encontrado
 */

export { serviciosRouter };