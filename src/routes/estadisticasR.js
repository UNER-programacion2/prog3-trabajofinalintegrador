import express from 'express';
import EstadisticasController from "../controllers/estadisticasController.js";
import autorizarUsuarios from '../middleware/autorizarUsuarios.js'; 

const estadisticasRouter = express.Router();
const controller = new EstadisticasController();


estadisticasRouter.get('/',
    autorizarUsuarios(1), 
    controller.getReporteIngresos
);

/**
 * @swagger
 * /:
 *   get:
 *     summary: Obtiene el reporte de ingresos de los últimos 30 días.
 *     tags:
 *       - Estadisticas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Reporte generado con éxito (o $0 si no hay ingresos).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Total de ingresos generados en los últimos 30 días:"
 *                 total:
 *                   type: number
 *                   example: 15000.50
 *       '403':
 *         description: Acceso Denegado. Se requiere rol de Administrador (ID 1).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Acceso denegado"
 *       '500':
 *         description: Error interno del servidor al generar el reporte.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *                   example: "Error al generar reporte"
 *                 error:
 *                   type: string
 */

export { estadisticasRouter};