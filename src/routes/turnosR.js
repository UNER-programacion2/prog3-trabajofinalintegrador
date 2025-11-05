import express from 'express';

import turnosController from '../controllers/turnos.js';
import { cacheMinutes} from '../middleware/cache.js';
import { validarCreateTurno, validarEditTurno } from '../middleware/turnosValidator.js';
import { validarId } from '../middleware/validacionId.js';
import autorizarUsuarios from '../middleware/autorizarUsuarios.js';

const turnosRouter = express.Router();
const controller = new turnosController();
//get
turnosRouter.get('/', 
    autorizarUsuarios(1,2,3),
    cacheMinutes,
    controller.getTurnos
);

// post
turnosRouter.post('/', 
    autorizarUsuarios(1,2),
    validarCreateTurno,
    controller.addTurno,
);


turnosRouter.route('/:turno_id')
    // GET turno por ID
    .get( 
        autorizarUsuarios(1,2),
        validarId('turno_id'),
        cacheMinutes,
        controller.getTurnoConId)

    // PUT turno  
    .put( 
        autorizarUsuarios(1,2),
        validarId('turno_id'),
        validarEditTurno,
        controller.updateTurno)

    // DELETE turno          
    .delete(
        autorizarUsuarios(1,2),
        validarId('turno_id'),
        controller.deleteTurno); 

/**
 * @swagger
 * tags:
 *   - name: Turnos
 *     description: Endpoints para gestionar los turnos (ej. Mañana, Tarde, Noche).
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Turno:
 *       type: object
 *       properties:
 *         turno_id:
 *           type: integer
 *           description: El ID autogenerado del turno.
 *           example: 1
 *         orden:
 *           type: integer
 *           description: Número para ordenar los turnos (ej. 1, 2, 3).
 *           example: 1
 *         hora_desde:
 *           type: string
 *           description: Hora de inicio del turno (formato HH:MM).
 *           example: "09:00"
 *         hora_hasta:
 *           type: string
 *           description: Hora de fin del turno (formato HH:MM).
 *           example: "17:00"
 *         activo:
 *           type: integer
 *           description: Indica si el turno está activo (1) o no (0).
 *           example: 1
 *         creado:
 *           type: string
 *           format: date-time
 *           description: Fecha de creación del registro.
 *     TurnoInput:
 *       type: object
 *       required:
 *         - orden
 *         - hora_desde
 *         - hora_hasta
 *       properties:
 *         orden:
 *           type: integer
 *           description: "Número para ordenar los turnos (ej. 1 para Mañana, 2 para Tarde)"
 *           example: 1
 *         hora_desde:
 *           type: string
 *           description: "Hora de inicio en formato HH:MM"
 *           example: "09:00"
 *         hora_hasta:
 *           type: string
 *           description: "Hora de fin en formato HH:MM"
 *           example: "17:00"
 */

/**
 * @swagger
 * /turnos:
 *   get:
 *     summary: Obtener todos los turnos activos
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de turnos activos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Turno'
 *       '401':
 *         description: No autorizado.
 *   post:
 *     summary: Crear un nuevo turno
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurnoInput'
 *     responses:
 *       '201':
 *         description: Turno creado exitosamente.
 *       '400':
 *         description: Datos de entrada inválidos.
 *       '401':
 *         description: No autorizado.
 *
 * /turnos/{turno_id}:
 *   get:
 *     summary: Obtener un turno por su ID
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: turno_id
 *         in: path
 *         required: true
 *         description: ID del turno a obtener.
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Datos del turno.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turno'
 *       '401':
 *         description: No autorizado.
 *       '404':
 *         description: Turno no encontrado.
 *   put:
 *     summary: Actualizar un turno existente por ID
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: turno_id
 *         in: path
 *         required: true
 *         description: ID del turno a actualizar.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       description: "Puedes enviar uno o más campos para actualizar."
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TurnoInput'
 *     responses:
 *       '200':
 *         description: Turno actualizado exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Turno'
 *       '400':
 *         description: Datos de entrada inválidos (o ningún dato enviado).
 *       '401':
 *         description: No autorizado.
 *       '404':
 *         description: Turno no encontrado.
 *   delete:
 *     summary: Eliminar un turno (desactivación lógica)
 *     tags: [Turnos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: turno_id
 *         in: path
 *         required: true
 *         description: ID del turno a eliminar (lógicamente).
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Turno eliminado (desactivado) exitosamente.
 *       '401':
 *         description: No autorizado.
 *       '404':
 *         description: Turno no encontrado.
 */

export {turnosRouter} ;





