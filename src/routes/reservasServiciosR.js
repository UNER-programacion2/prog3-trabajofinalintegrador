import express from 'express';
import reservasServiciosController from '../controllers/reservas_Servicios.js';
import { validarCreateReservaServicio } from '../middleware/validators/serviciosReservasValidator.js';
import { validarId } from '../middleware/validators/validacionId.js';
import autorizarUsuarios from '../middleware/auth/autorizarUsuarios.js';


const reservasServiciosR = express.Router();
const controller = new reservasServiciosController();


reservasServiciosR.post('/',
    validarCreateReservaServicio,
    autorizarUsuarios(1),
    controller.addServicioReserva
);


reservasServiciosR.delete('/:id',
    validarId('id'),
    autorizarUsuarios(1),
    controller.deleteRerservaServicio

);


/**
 * @swagger
 * tags:
 *   name: Reservas-Servicios
 *   description: Relación entre reservas y servicios contratados
 */

/**
 * @swagger
 * /reservas_servicios:
 *   get:
 *     summary: Obtener todas las relaciones reserva-servicio
 *     tags: [Reservas-Servicios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de relaciones
 */

/**
 * @swagger
 * /reservas_servicios:
 *   post:
 *     summary: Asignar servicios a una reserva
 *     tags: [Reservas-Servicios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reserva_id:
 *                 type: integer
 *               servicios:
 *                 type: array
 *                 items:
 *                   type: integer
 *     responses:
 *       201:
 *         description: Servicios asignados a la reserva
 */

/**
 * @swagger
 * /reservas_servicios/{id}:
 *   delete:
 *     summary: Eliminar un servicio asignado a una reserva
 *     tags: [Reservas-Servicios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la relación reserva-servicio a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Relación eliminada correctamente
 *       401:
 *         description: No autorizado
 *       404:
 *         description: Relación no encontrada
 */

export { reservasServiciosR };
