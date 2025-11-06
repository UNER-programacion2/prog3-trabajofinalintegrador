import express from 'express';

import ReservasController from '../controllers/reservas.js';
import { validarCreateReserva, validarEditReserva } from '../middleware/validators/reservasValidator.js';
import autorizarUsuarios from '../middleware/auth/autorizarUsuarios.js';
import { validarId } from '../middleware/validators/validacionId.js'
const reservasRouter = express.Router();
const controller = new ReservasController();

// GET todas las reservas
reservasRouter.get('/', 
    autorizarUsuarios(1,2,3),
    controller.getReservas);

// POST crear una nueva reserva
reservasRouter.post('/', 
    autorizarUsuarios(1,3),
    validarCreateReserva, 
    controller.postReserva);

// Rutas con ID
reservasRouter.route('/:reserva_id')
// GET reserva por ID
    .get(
        validarId('reserva_id'),
        autorizarUsuarios(1),
        controller.getReservaConId) 
// PUT actualizar reserva          
    .put( 
        validarId('reserva_id'),
        autorizarUsuarios(1),
        controller.putReserva) 
// DELETE eliminar reserva              
    .delete(
        validarId('reserva_id'),
        autorizarUsuarios(1),
        controller.deleteReserva); 


/**
 * @swagger
 * tags:
 *   - name: Reservas
 *     description: Endpoints para gestionar reservas de salones
 */

/**
 * @swagger
 * /reservas:
 *   get:
 *     summary: Obtener todas las reservas
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de reservas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   reserva_id:
 *                     type: integer
 *                   fecha_reserva:
 *                     type: string
 *                     format: date
 *                   salon_id:
 *                     type: integer
 */

/**
 * @swagger
 * /reservas:
 *   post:
 *     summary: Crear una nueva reserva
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fecha_reserva:
 *                 type: string
 *                 example: "2025-12-24"
 *               salon_id:
 *                 type: integer
 *                 example: 2
 *               usuario_id:
 *                 type: integer
 *                 example: 5
 *               turno_id:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       '201':
 *         description: Reserva creada exitosamente
 */

/**
 * @swagger
 * /reservas/{reserva_id}:
 *   put:
 *     summary: Actualizar una reserva existente
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: reserva_id
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
 *               fecha_reserva:
 *                 type: string
 *               salon_id:
 *                 type: integer
 *     responses:
 *       '200':
 *         description: Reserva actualizada
 */

/**
 * @swagger
 * /reservas/{reserva_id}:
 *   delete:
 *     summary: Eliminar una reserva
 *     tags:
 *       - Reservas
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: reserva_id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Reserva eliminada
 */

export { reservasRouter };

// 1 = admin
// 2 = empleado
// 3 = cliente